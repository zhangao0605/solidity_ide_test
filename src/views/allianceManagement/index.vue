<template>
  <div class="am_con">
    <el-dialog width="30%" title="邀请机构" :visible.sync="dialogFormVisible" center>
      <div class="dialog_ti pop_up_prompt">请输入您想邀请机构的管理员用户邮箱和公司名称</div>
      <el-form :model="form">
        <el-form-item label="管理邮箱：" :label-width="formLabelWidth">
          <el-input v-model="form.email" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width: 70%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormcancle()">暂不邀请</el-button>
        <el-button type="primary" @click="dialogFormsure()">确认邀请</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" title :visible.sync="dialogFormVisible_1" center>
      <div
        class="dialog_ti pop_up_prompt dialog_ti_1"
      >极端危险操作，点击退出将退出联盟，旗下所有节点均停止运行，请务必再三确认清楚后执行该操作，该操作执行后需盟主审批后才能成功</div>
      <el-input
        style="width:80%;margin-left:10%;margin-top:20px"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6 }"
        placeholder="请输入内容"
        v-model="say_value"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type @click="exitCancle()">暂不退出</el-button>
        <el-button type="danger" @click="exitSure()">确认退出（危险操作）</el-button>
      </div>
    </el-dialog>

    <div class="am_con_title">
      <div class="tcw_main_title">企业管理</div>
      <el-button type="primary" @click="inviting_agency()">邀请机构</el-button>
    </div>
    <div class="con_table">
      <el-table
        :data="table_data"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="节点数量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <span class="operational_style" @click="exit_league(scope.row.node_number)">退出</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="totla"
      ></el-pagination>
    </div>
    <div class="am_con_title margin_top">
      <div class="tcw_main_title">管理员管理</div>
    </div>
    <div class="con_table">
      <el-table
        :data="table_data_1"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="管理员账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属机构" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="授权时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="授权人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template>
            <span class="operational_style" @click="delete_member()">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-bottom:50px"
        @current-change="currentPageChange_1"
        :current-page="currentPage_1"
        :page-size="pagesize_1"
        layout="total,prev, pager, next"
        :total="totla_1"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { validEmail } from "../../utils/validate";
export default {
  name: "allianceManagement",
  data() {
    return {
      table_data: [
        { name: "aaa", node_number: 2 },
        { name: "bbb", node_number: 3 },
        { name: "ccc", node_number: 5 },
        { name: "ddd", node_number: 7 },
        { name: "eee", node_number: 4 }
      ],
      table_data_1: [
        { name: "aaa1", node_number: 2 },
        { name: "bbb1", node_number: 3 },
        { name: "ccc1", node_number: 5 },
        { name: "ddd1", node_number: 7 },
        { name: "eee1", node_number: 4 }
      ],
      currentPage: 1,
      pagesize: 10,
      totla: 0,
      currentPage_1: 1,
      pagesize_1: 10,
      totla_1: 0,
      form: {
        name: "",
        email: ""
      },
      dialogFormVisible: false,
      dialogFormVisible_1: false,
      formLabelWidth: "150px",
      say_value: ""
    };
  },
  methods: {
    // 企业管理分页切换
    currentPageChange(e) {},
    // 管理员管理分页切换
    currentPageChange_1(e) {},
    inviting_agency() {
      this.dialogFormVisible = true;
    },
    // 确认邀请
    dialogFormsure() {
      if (this.form.name === "" || this.form.email === "") {
        this.$message.error("管理邮箱、公司名称不能为空!");
      } else {
        if (validEmail(this.form.email) === true) {
          let send_data = { name: this.form.name, email: this.form.email };
        } else {
          this.$message.error("管理邮箱格式错误，请检查后重试!");
        }
      }
    },
    // 取消邀请
    dialogFormcancle() {
      this.dialogFormVisible = false;
      this.form = {
        name: "",
        email: ""
      };
    },
    // 退出联盟
    exit_league(e) {
      this.dialogFormVisible_1 = true;
    },
    // 取消退出
    exitCancle() {
      this.dialogFormVisible_1 = false;
      this.say_value = "";
    },
    // 确认退出
    exitSure() {
      console.log(this.say_value);
    },
    // 删除
    delete_member() {}
  },
  created() {}
};
</script>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-bottom: 0px;
}
.am_con_title {
  display: flex;
  justify-content: space-between;
}
.margin_top {
  margin-top: 80px;
}
.dialog_ti {
  text-align: center;
  margin-bottom: 20px;
}
.dialog_ti_1 {
  text-indent: 20px;
  margin-left: 10%;
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
}
</style>
