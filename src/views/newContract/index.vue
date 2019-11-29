<template>
  <div class="nc_con">
    <div class="tcw_main_title">新建合约</div>
    <div class="nc_all">
      <el-form label-position="right" label-width="80px" :model="con_form">
        <el-form-item label="合约名称：" :label-width="formLabelWidth">
          <el-input style="width:80%" placeholder="请设置合约名称" v-model="con_form.name"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <span class="tcw_text">合约名必须由6-20数字加字母组成</span>
        </el-form-item>
        <el-form-item label="合约版本：" :label-width="formLabelWidth">
          <span class="nomal_font">V1</span>
        </el-form-item>
        <el-form-item label="上传方式：" :label-width="formLabelWidth">
          <span class="active_font" @click="edit_con()">在线编辑</span>
        </el-form-item>
        <el-form-item label="编译状态：" :label-width="formLabelWidth">
          <span class="nomal_font">已保存，可</span>
          <span class="active_font">修改</span>
        </el-form-item>
        <el-form-item label="接口文档：" :label-width="formLabelWidth">
          <el-upload
            style="width: 60%;height: 100px"
            class="upload-demo"
            ref="upload"
            action
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            :on-change="up_file"
            :auto-upload="false"
          >
            <el-button style="font-size: 14px" slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 30px;font-size: 14px"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="合约描述（选填）：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea_value"
            maxlength="200"
            show-word-limit
            style="width:80%"
            :autosize="{ minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:120px" label :label-width="formLabelWidth">
          <el-button style="font-size: 14px" type="primary" @click="save_contract()">保存合约</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "newContract",
  components: {},
  data() {
    return {
      con_form: {
        name: "",
        desc: ""
      },
      formLabelWidth: "200px",
      fileList: [],
      textarea_value: ""
    };
  },

  created() {},
  mounted() {},
  computed: {},
  methods: {
    //   在线编辑
    edit_con() {},
    // 文件上传
    up_file(file, fileList) {
      this.fileList = fileList;
    },
    submitUpload() {
      console.log(this.fileList);
      if (this.fileList.length == 0) {
        this.$message.error("请先上传文件！");
      } else {
        let data = new FormData();
        data.append("file", this.fileList[0].raw);
        uploadSendtxFile(data).then(response => {
          if (response.eCode == 200) {
            this.timestamp = response.data.timestamp;
            this.$message.success("上传文件成功！");
            this.fileList = [];
          } else {
            this.$message.error("上传文件失败，请确认文件类型后稍后重试！");
          }
        });
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      console.log(file, "1111");
    },
    // 保存合约
    save_contract() {
      let test_name = new RegExp(
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$"
      );
      if (this.con_form.name === "") {
        this.$message.error("合约名称不能为空,请正确填写后重试！");
      } else {
        if (test_name.test(this.con_form.name)) {
          if (this.fileList.length === 0) {
            this.$message.error("请上传接口文档,请正确上传后重试！");
          } else {
          }
        } else {
          this.$message.error(
            "合约名必须由6-20数字加字母组成,请正确填写后重试！"
          );
        }
      }
    }
  }
};
</script>

<style>
.nc_con .el-form-item__label {
  font-size: 16px;
}
</style>
<style scoped>
.nc_all {
  width: 60%;
}
.nomal_font {
  font-size: 16px;
}
.active_font {
  font-size: 16px;
  cursor: pointer;
  color: purple;
}
</style>