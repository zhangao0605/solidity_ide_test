<template>
  <div class="flex-grow-1">
    <div class="h-100" v-on:resize="handleResize">
      <div :id="'editor' + _uid" class="h-100 w-100"></div>
    </div>

    <b-modal
      ref="deployModal"
      title="Deploy"
      ok-title="Deploy"
      v-on:ok="deployWithParams"
      content-class="bg-transparent"
      header-bg-variant="primary"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      ok-variant="success"
      cancel-variant="primary"
    >
      <p>
        The following contracts have constructor parameters:
      </p>
      <constructor-parameter
        v-for="contract in deployingContracts"
        v-bind:key="contract.id"
        v-bind:contract="contract"
        :ref="'contractParams_' + contract.name + '_' + contract.id"
      ></constructor-parameter>
    </b-modal>
  </div>
</template>

<script>
    import ConstructorParameter from "../components/ConstructorParameter.vue";

    const ace = require("brace");
    const Range = ace.acequire("ace/range").Range;
    require("ace-mode-solidity/build/remix-ide/mode-solidity");
    require("brace/theme/tomorrow_night");
    require("brace/ext/language_tools");

    export default {
        name: "editor",
        components: {
            "constructor-parameter": ConstructorParameter
        },
        data: function () {
            return {
                initContent: '',
                editor: null,
                langTools: null,
                fontSize: 14,
                content: [],
                fileName: "",
                sessions: {},
                errors: undefined,
                defaultSession: null,
                deployingContracts: [],
                idIncrement: 0,
            };
        },
        methods: {
            // 编译
            compile: function (callback) {
                console.log("aaaa");
                GlobalEvent.$emit("clearMessages");
                this.saveAll(() => {
                    GlobalEvent.$emit("processing", true);
                    window.axios
                        .get("http://localhost:8081/compile")
                        .then(
                            function (response) {

                                this.errors = response.data.errors;
                                this.updateAnnotations();
                                if (this.errors != undefined) {
                                    GlobalEvent.$emit("messages", this.errors);
                                    GlobalEvent.$emit("isShowSave",false);
                                }

                                if (!this.checkHasErrors()) {
                                    GlobalEvent.$emit("message", {
                                        severity: "success",
                                        formattedMessage: "Compilation successful."
                                    });
                                    GlobalEvent.$emit("isShowSave",true);
                                }

                                GlobalEvent.$emit("processing", false);
                                if (
                                    callback != undefined &&
                                    response.data.contracts != undefined
                                ) {
                                    callback(response.data.contracts);
                                }
                            }.bind(this)
                        )
                        .catch(function (error) {
                            GlobalEvent.$emit("message", {
                                severity: "error",
                                formattedMessage: "Compilation request failed: " + error.message
                            });
                            GlobalEvent.$emit("processing", false);
                        });
                });
            },
            // 部署
            deploy: function (contractName, compiledContract, params) {
                this.checkAbi(compiledContract.abi);
                const contract = new window.web3.eth.Contract(
                    compiledContract.abi,
                    undefined,
                    {transactionConfirmationBlocks: 1}
                );
                const activeAccount = window.accountManager.getActiveAccount();
                GlobalEvent.$emit("processing", true);

                contract
                    .deploy({
                        data: compiledContract.evm.bytecode.object,
                        arguments: params
                    })
                    .send({
                        from: activeAccount.address,
                        gas: "4700000"
                    })
                    .then(contract => {
                        if (typeof contract.options !== "undefined") {
                            GlobalEvent.$emit("message", {
                                severity: "success",
                                formattedMessage:
                                    contractName +
                                    ": Deploy success.\nContract address: " +
                                    contract.options.address
                            });
                            GlobalEvent.$emit("contract", {
                                contract: contract,
                                abi: compiledContract.abi,
                                name: contractName
                            });
                            GlobalEvent.$emit("refreshAccounts", [activeAccount.address]);
                        }
                        GlobalEvent.$emit("processing", false);
                    })
                    .catch(error => {
                        GlobalEvent.$emit("message", {
                            severity: "error",
                            formattedMessage: "Deploy failed: " + error.message
                        });
                        GlobalEvent.$emit("processing", false);
                    });
            },
            // 部署文件
            deployFile: function (file) {
                for (let key in file) {
                    this.deploy(key, file[key], []);
                }
            },
            // 使用参数部署
            deployWithParams: function () {
                let successCount = 0;
                GlobalEvent.$emit("processing", true);
                for (let key in this.deployingContracts) {
                    try {
                        const contract = this.deployingContracts[key];
                        console.log(
                            this.$refs["contractParams_" + contract.name + "_" + contract.id][0]
                        );
                        const params = this.$refs[
                        "contractParams_" + contract.name + "_" + contract.id
                            ][0].value;
                        this.deploy(contract.name, contract, JSON.parse(params));
                        successCount++;
                    } catch (error) {
                        GlobalEvent.$emit("message", {
                            severity: "error",
                            formattedMessage: "Deploy failed: " + error.message
                        });
                    }
                }

                if (successCount == 0) {
                    GlobalEvent.$emit("processing", false);
                }
            },
            // 编译部署
            compileAndDeploy: function () {
                this.compile(
                    function (files) {
                        if (this.fileName) {
                            this.deployingContracts = [];
                            if (window.accountManager.selectedAccount == -1) {
                                // Fetch accounts if missing
                                GlobalEvent.$emit("refreshAccounts", "all", () => {
                                    this.deployMultiple(files);
                                });
                            } else {
                                this.deployMultiple(files);
                            }
                        }
                    }.bind(this)
                );
            },
            // 部署多个
            deployMultiple: function (files) {
                const file = files[this.fileName];
                for (let keyContract in file) {
                    const contract = file[keyContract];
                    contract.name = keyContract;
                    contract.id = this.idIncrement++;
                    this.deployingContracts.push(contract);
                }

                window.Vue.nextTick(
                    function () {
                        if (!this.checkConstructorParametersVisible()) {
                            this.$refs.deployModal.hide();
                            this.deployFile(files[this.fileName]);
                        } else {
                            this.$refs.deployModal.show();
                        }
                    }.bind(this)
                );
            },
            // 检查构造函数参数
            checkConstructorParametersVisible: function () {
                for (let key in this.deployingContracts) {
                    const contract = this.deployingContracts[key];
                    if (
                        this.$refs["contractParams_" + contract.name + "_" + contract.id] &&
                        this.$refs["contractParams_" + contract.name + "_" + contract.id][0]
                            .visible
                    )
                        return true;
                }
                return false;
            },
            // 清除
            clear: function () {
                for (let key in this.sessions) {
                    const session = this.sessions[key];
                    this.clearMarkers(session);
                    session.clearAnnotations();
                }
            },
            // 更新注释
            updateAnnotations: function () {
                this.clear();
                if (this.errors != undefined) {
                    this.buildAnnotations();
                }
            },
            // 检查abi
            checkAbi: function (abi) {
                // Checks if abi contains a least one constructor. Injects default one if missing
                for (let key in abi) {
                    const method = abi[key];
                    if (method.type == "constructor") return;
                }

                abi.push({
                    constant: undefined,
                    inputs: [],
                    payable: false,
                    signature: "constructor",
                    stateMutability: "nonpayable",
                    type: "constructor"
                });
            },
            // 检查有错误
            checkHasErrors: function () {
                if (this.errors != undefined) {
                    for (let key in this.errors) {
                        if (this.errors[key].severity == "error") {
                            return true;
                        }
                    }
                }
                return false;
            },
            // 保存
            save: function (file, content) {
                return window.axios
                    .put("http://localhost:8081/save", {
                        file: file,
                        content: content
                    })
                    .then(
                        function () {
                            GlobalEvent.$emit("fileSaved", file);
                        }.bind(this)
                    )
                    .catch(function (error) {
                        if (error.response != undefined) {
                            GlobalEvent.$emit("message", {
                                severity: "error",
                                formattedMessage: "Couldn't save file: " + error.response.data
                            });
                        } else {
                            GlobalEvent.$emit("message", {
                                severity: "error",
                                formattedMessage: "Couldn't save file: no response from server"
                            });
                        }
                    });
            },
            // 保存全部
            saveAll: function (callback) {
                const promises = [];
                for (let key in this.sessions) {
                    console.log(key);
                    console.log(this.sessions);
                    console.log(this.sessions[key].getValue());
                    promises.push(
                        window.axios
                            .put("http://localhost:8081/save", {
                                file: key,
                                content: this.sessions[key].getValue()
                            })
                            .then(() => {
                                GlobalEvent.$emit("fileSaved", key);
                            })
                            .catch(error => {
                                if (error.response != undefined) {
                                    GlobalEvent.$emit("message", {
                                        severity: "error",
                                        formattedMessage: "Couldn't save file: " + error.response.data
                                    });
                                } else {
                                    GlobalEvent.$emit("message", {
                                        severity: "error",
                                        formattedMessage:
                                            "Couldn't save file: no response from server"
                                    });
                                }
                                return Promise.reject();
                            })
                    );
                }

                window.axios
                    .all(promises)
                    .then(function () {
                        if (callback != undefined) {
                            callback();
                        }
                    })
                    .catch(() => null);
            },
            // 加载
            load: function (file, force) {
                if (file != null) {
                    if (this.sessions[file] == undefined || force) {
                        window.axios
                            .get("http://localhost:8081/file", {
                                params: {
                                    file: file
                                }
                            })
                            .then(
                                function (response) {
                                    this.sessions[file] = ace.createEditSession(
                                        // response.data,
                                       this.initContent,
                                        "ace/mode/solidity"
                                    );
                                    this.sessions[file].on("change", function () {
                                        GlobalEvent.$emit("fileChanged", file);
                                    });
                                    this.fileName = file;
                                    localStorage.setItem("openFile", file);
                                    this.editor.setSession(this.sessions[file]);
                                    this.editor.setReadOnly(false);
                                    this.editor.focus();
                                    this.updateAnnotations();
                                    console.log(this.sessions[key].getValue());
                                }.bind(this)
                            )
                            .catch(
                                function (error) {
                                    GlobalEvent.$emit("clearMessages");
                                    if (error.response != undefined) {
                                        GlobalEvent.$emit("message", {
                                            severity: "error",
                                            formattedMessage:
                                                "Couldn't fetch file content: " + error.response.data
                                        });
                                    } else {
                                        GlobalEvent.$emit("message", {
                                            severity: "error",
                                            formattedMessage:
                                                "Couldn't fetch file content: no response from server"
                                        });
                                    }
                                    this.editor.setSession(this.defaultSession);
                                    this.editor.setReadOnly(true);
                                }.bind(this)
                            );
                    } else {
                        this.fileName = file;
                        localStorage.setItem("openFile", file);
                        this.editor.setSession(this.sessions[file]);
                        this.editor.setReadOnly(false);
                        this.editor.focus();
                    }
                } else {
                    this.fileName = null;
                    this.editor.setSession(this.defaultSession);
                    this.editor.setReadOnly(true);
                    this.updateAnnotations();
                }
            },
            // 建立注解
            buildAnnotations: function () {
                for (let key in this.errors) {
                    const message = this.errors[key];
                    const session = this.sessions[message.sourceLocation.file];
                    if (session != undefined) {
                        const rowStart = this.getRowAtPosition(
                            session,
                            message.sourceLocation.start
                        );
                        const rowEnd = this.getRowAtPosition(
                            session,
                            message.sourceLocation.end
                        );
                        const colStart =
                            message.sourceLocation.start -
                            this.getStartPositionForRow(session, rowStart) -
                            1;
                        const colEnd =
                            message.sourceLocation.end -
                            this.getStartPositionForRow(session, rowEnd) -
                            1;

                        const annotation = {
                            row: rowStart,
                            column: colStart,
                            text: message.message,
                            type: message.severity
                        };

                        const range = new Range(rowStart, colStart, rowEnd, colEnd);
                        session.addMarker(
                            range,
                            this.getMarkerClass(message.severity),
                            "line",
                            false
                        );
                        session.getAnnotations().push(annotation);
                        session.setAnnotations(session.getAnnotations());
                    }
                }
            },
            // 清除标记
            clearMarkers: function (session) {
                const markers = session.getMarkers();
                for (let key in markers) {
                    const marker = markers[key];
                    if (marker.clazz.indexOf("marker-") == 0)
                        session.removeMarker(marker.id);
                }
            },
            // 获取RowAt位置
            getRowAtPosition: function (session, pos) {
                const text = session.getValue();
                var count = 0;
                for (let i = 0; i < pos; i++) {
                    if (text.charAt(i) == "\n") {
                        count++;
                    }
                }
                return count;
            },
            // 获取行的开始位置
            getStartPositionForRow: function (session, row) {
                const text = session.getValue();
                const length = text.length;
                var count = 0;

                for (let i = 0; i < length; i++) {
                    if (text.charAt(i) == "\n") {
                        count++;
                    }

                    if (count == row) {
                        return i;
                    }
                }
                return -1;
            },
            // 获得标记类
            getMarkerClass: function (severity) {
                return "marker-" + severity;
            },
            // 解析RegEx错误
            parseRegExError: function (err) {
                return {
                    errFile: err[1],
                    errLine: parseInt(err[2], 10) - 1,
                    errCol: err[4] ? parseInt(err[4], 10) : 0
                };
            },
            // 调整大小
            handleResize: function () {
                this.editor.resize();
            },
            // 处理字体大小
            handleFontSize: function (up) {
                up ? this.fontSize++ : this.fontSize--;

                if (this.fontSize < 8) this.fontSize = 8;
                if (this.fontSize > 40) this.fontSize = 40;

                localStorage["font-size"] = this.fontSize;
                this.editor.setFontSize(this.fontSize);
            },
            // 处理文件删除
            handleFileDelete: function (file) {
                if (this.sessions[file] != undefined) {
                    if (file == this.fileName) {
                        this.fileName = null;
                        this.editor.setSession(this.defaultSession);
                        this.editor.setReadOnly(true);
                        this.updateAnnotations();
                    }
                    delete this.sessions[file];

                    for (let key in this.errors) {
                        const message = this.errors[key];
                        if (message.sourceLocation.file == file) {
                            delete this.errors[key];
                        }
                    }
                }
            },
            // 处理浏览器刷新
            handleBrowserRefresh: function () {
                for (let key in this.sessions) {
                    delete this.sessions[key];
                }

                this.errors = undefined;
                this.clear();
                if (this.fileName) {
                    this.load(this.fileName, true);
                }
            },
            //
            handleDirectoryChange: function () {
                this.fileName = null;
                localStorage.removeItem("openFile");
                this.sessions = {};
                this.editor.setSession(this.defaultSession);
                this.editor.setReadOnly(true);
            }
        },
        mounted() {
            this.langTools = ace.acequire("ace/ext/language_tools");
            this.langTools.setCompleters([this.langTools.keyWordCompleter]);

            this.editor = ace.edit("editor" + this._uid);
            this.defaultSession = this.editor.getSession();
            this.editor.getSession().setMode("ace/mode/solidity");
            this.editor.setTheme("ace/theme/tomorrow_night");
            this.editor.setOptions({
                autoScrollEditorIntoView: true,
                showPrintMargin: false,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                fontFamily: "'Monospace', monospace"
            });
            this.editor.setReadOnly(true);

            this.fontSize = localStorage["font-size"]
                ? parseInt(localStorage["font-size"])
                : 14;
            this.editor.setFontSize(this.fontSize);
            this.editor.resize();

            GlobalEvent.$on("compile", this.compile);
            GlobalEvent.$on("deploy", this.compileAndDeploy);
            GlobalEvent.$on("resizeEditor", this.handleResize);
            GlobalEvent.$on("fontSize", this.handleFontSize);
            GlobalEvent.$on("fileSelected", this.load);
            GlobalEvent.$on("fileDeleted", this.handleFileDelete);
            GlobalEvent.$on("browserRefresh", this.handleBrowserRefresh);
            GlobalEvent.$on("directoryChange", this.handleDirectoryChange);
        },
        beforeDestroy() {
            GlobalEvent.$off("compile", this.compile);
            GlobalEvent.$off("deploy", this.compileAndDeploy);
            GlobalEvent.$off("resizeEditor", this.handleResize);
            GlobalEvent.$off("fontSize", this.handleFontSize);
            GlobalEvent.$off("fileSelected", this.load);
            GlobalEvent.$off("fileDeleted", this.handleFileDelete);
            GlobalEvent.$off("browserRefresh", this.handleBrowserRefresh);
            GlobalEvent.$off("directoryChange", this.handleDirectoryChange);
            this.editor.destroy();
        },
        created() {
            // console.log(this.$store.getters.editConent)
            this.initContent=this.$store.getters.editConent
        }
    };
</script>
