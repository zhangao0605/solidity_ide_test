<template>
  <div class="mem_con">
    <el-dialog width="35%" title="新增成员" :visible.sync="dialogFormVisible">
      <el-form :model="add_from">
        <el-form-item label="登录名（邮箱）：" :label-width="formLabelWidth">
          <el-input
            v-model="add_from.email"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input
            v-model="add_from.name"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="初始密码：" :label-width="formLabelWidth">
          <el-input
            v-model="add_from.password"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          style="height:15px;line-height:15px;margin-top:-15px;margin-bottom:30px"
        >
          <span class="tcw_auxiliary_text"
            >密码由8-15位数字、字母、特殊符号至少两种组合组成</span
          >
        </el-form-item>
        <el-form-item label="用户权限：" :label-width="formLabelWidth">
          <el-select v-model="add_from.user_rights" placeholder="">
            <el-option
              v-for="item in rights_options"
              :key="item.batch"
              :label="item.batchName"
              :value="item.batch"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名：" :label-width="formLabelWidth">
          <el-input
            v-model="add_from.username"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input
            v-model="add_from.phone"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormcancle()">取消新增</el-button>
        <el-button type="primary" @click="dialogFormsure()">确认新增</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="35%"
      title="成员信息设置"
      :visible.sync="dialogFormVisible_1"
    >
      <el-form :model="edit_from">
        <el-form-item label="登录名（邮箱）：" :label-width="formLabelWidth">
          {{ edit_from.email }}
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input
            v-model="edit_from.name"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户权限：" :label-width="formLabelWidth">
          <el-select v-model="edit_from.user_rights" placeholder="">
            <el-option
              v-for="item in rights_options"
              :key="item.batch"
              :label="item.batchName"
              :value="item.batch"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名：" :label-width="formLabelWidth">
          <el-input
            v-model="edit_from.username"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input
            v-model="edit_from.phone"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_cancle()">取消编辑</el-button>
        <el-button type="primary" @click="edit_sure()">确认编辑</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      title="密码重置"
      :visible.sync="dialogFormVisible_2"
      center
    >
      <div class="dialog_ti_1 ">
        请正确输入该成员的新密码，修改成功后，原密码将失效，该成员需使用新密码进行登录！
      </div>
      <el-form :model="pas_form">
        <el-form-item label="新密码：" :label-width="formLabelWidth">
          <el-input
            v-model="pas_form.new_paw"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          style="height:15px;line-height:15px;margin-top:-15px;margin-bottom:30px"
        >
          <span class="tcw_auxiliary_text"
            >密码由8-15位数字、字母、特殊符号至少两种组成</span
          >
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth">
          <el-input
            v-model="pas_form.sure_paw"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paw_cancle()">取消重置</el-button>
        <el-button type="primary" @click="paw_sure()">确认重置</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      title="停用账户"
      :visible.sync="dialogFormVisible_3"
      center
    >
      <div class="dialog_ti_1 ">
        您正操作停用<span class="pop_up_prompt"> {{ admins }} </span
        >账户，账户停用后该用户将无法登录，不能进行操作，请务必确认后再进行操作！
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disable_cancle()">暂不停用</el-button>
        <el-button type="primary" @click="disable_sure()">确认停用</el-button>
      </div>
    </el-dialog>
    <div class="am_con_title">
      <div class="tcw_main_title">成员管理</div>
      <el-button type="primary" @click="add_member()">新增成员</el-button>
    </div>
    <div class="con_table">
      <el-table
        :data="table_data"
        border
        max-height="590"
        style="width: 100%;margin-bottom: 30px;margin-top: 40px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="成员角色" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="table_edit">
              <span
                class="operational_style"
                @click="table_edit(scope.row.node_number)"
                >编辑</span
              >
              <span
                class="operational_style"
                @click="table_reset_password(scope.row.node_number)"
                >重置密码</span
              >
              <span
                class="operational_style"
                @click="table_disable(scope.row.node_number)"
                >停用</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  validEmail,
  validPassword,
  validPhoneNumber
} from "../../utils/validate";
export default {
  name: "memberManagement",
  components: {},
  data() {
    return {
      table_data: [
        { name: "aaa", node_number: 2 },
        { name: "bbb", node_number: 3 },
        { name: "ccc", node_number: 5 },
        { name: "ddd", node_number: 7 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 }
      ],
      rights_options: [
        { batch: 1, batchName: "超级管理员" },
        { batch: 2, batchName: "管理员" },
        { batch: 3, batchName: "产品经理" },
        { batch: 4, batchName: "开发" },
        { batch: 5, batchName: "测试" }
      ],
      admins: "aaaaaaaaa",
      dialogFormVisible: false,
      dialogFormVisible_1: false,
      dialogFormVisible_2: false,
      dialogFormVisible_3: false,
      formLabelWidth: "150px",
      add_from: {
        name: "",
        email: "",
        password: "",
        user_rights: 1,
        username: "",
        phone: ""
      },
      edit_from: {
        name: "",
        email: "张三",
        user_rights: 2,
        username: "",
        phone: ""
      },
      pas_form: {
        new_paw: "",
        sure_paw: ""
      }
    };
  },
  created() {
    console.log();
  },
  mounted() {},
  computed: {},
  methods: {
    add_member() {
      this.dialogFormVisible = true;
    },
    // 确认新增成员
    dialogFormsure() {
      if (
        this.add_from.email === "" ||
        this.add_from.name === "" ||
        this.add_from.password === "" ||
        this.add_from.username === "" ||
        this.add_from.phone === ""
      ) {
        this.$message.error("表格内容为必填项，不可为空请正确填写后重试！");
      } else {
        if (validEmail(this.add_from.email) === true) {
          if (validPassword(this.add_from.password) === true) {
            if (validPhoneNumber(this.add_from.phone) === true) {
              console.log("正确");
            } else {
              this.$message.error("手机号格式错误，请检查正确填写后重试！");
            }
          } else {
            this.$message.error("密码格式错误，请检查正确填写后重试！");
          }
        } else {
          this.$message.error("登录名为邮箱格式，请检查正确填写后重试！");
        }
      }
    },
    // 取消新增成员
    dialogFormcancle() {
      this.dialogFormVisible = false;
      this.add_from = {
        name: "",
        email: "",
        password: "",
        user_rights: 1,
        username: "",
        phone: ""
      };
    },
    table_edit() {
      this.edit_from = {
        name: "",
        email: "",
        user_rights: "",
        username: "",
        phone: ""
      };
      this.dialogFormVisible_1 = true;
    },
    // 取消编辑
    edit_cancle() {
      this.edit_from = {
        name: "",
        email: "",
        user_rights: "",
        username: "",
        phone: ""
      };
      this.dialogFormVisible_1 = false;
    },
    // 确认编辑
    edit_sure() {
      if (
        this.edit_from.name === "" ||
        this.edit_from.username === "" ||
        this.edit_from.phone === ""
      ) {
        this.$message.error("表格内容为必填项，不可为空请正确填写后重试！");
      } else {
        if (validPhoneNumber(this.edit_from.phone) === true) {
          console.log("正确");
        } else {
          this.$message.error("手机号格式错误，请检查正确填写后重试！");
        }
      }
    },
    // 修改密码
    table_reset_password() {
      this.dialogFormVisible_2 = true;
    },
    // 修改是否停用
    table_disable() {
      this.dialogFormVisible_3 = true;
    },
    // 修改密码取消
    paw_cancle() {
      this.dialogFormVisible_2 = false;
      this.pas_form = {
        new_paw: "",
        sure_paw: ""
      };
    },
    // 修改密码确认
    paw_sure() {
      console.log(this.pas_form);
      //       pas_form: {
      //   new_paw: "",
      //   sure_paw: ""
      // }
      if (this.pas_form.new_paw === "" || this.pas_form.sure_paw === "") {
        this.$message.error("新密码与确认密码为必填项，请正确填写后重试！");
      } else {
        if (validPassword(this.pas_form.new_paw) != true) {
          this.$message.error("新密码不符合设定要求，请正确填写后重试！");
        } else {
          if (this.pas_form.new_paw != this.pas_form.sure_paw) {
            this.$message.error("密码与确认密码须保持一致，请正确填写后重试！");
          } else {
            console.log("正确");
          }
        }
      }
    },
    // 取消停用
    disable_cancle() {
      this.dialogFormVisible_3 = false;
    },
    // 确认停用
    disable_sure() {}
  }
};
</script>
<style></style>
<style scoped>
.am_con_title {
  display: flex;
  justify-content: space-between;
}
.table_edit {
  justify-content: space-evenly;
  display: flex;
}
.dialog_ti_1 {
  text-indent: 20px;
  margin-left: 10%;
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
}
.am_con_title {
  display: flex;
  justify-content: space-between;
}
</style>
