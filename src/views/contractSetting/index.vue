<template>
  <div class="cs_con">
    <div class="cs_con_title">
      <div class="tcw_main_title">合约管理</div>
      <el-button type="primary" @click="to_new()">新建合约</el-button>
    </div>
    <p class="tcw_text">注：一个合约只能部署在一条区块链上，如果其他链上需要使用类似内容的合约，请重新进行部署，多链间的合约数据暂时无法互通。</p>
    <div class="con_table">
      <el-table
        :data="table_data"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="合约名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合约ID" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合约版本" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属链" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.node_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <span class="operational_style" @click="exit_league(scope.row.node_number)">启用</span>
            <span class="operational_style" @click="exit_league(scope.row.node_number)">升级</span>
            <span class="operational_style" @click="exit_league(scope.row.node_number)">部署</span>
            <span class="operational_style" @click="exit_league(scope.row.node_number)">停用</span>
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
  </div>
</template>

<script>
export default {
  name: "contractSetting",
  components: {},
  data() {
    return {
      table_data: [
        { name: "aaa", node_number: 2 },
        { name: "bbb", node_number: 3 },
        { name: "ccc", node_number: 5 },
        { name: "ddd", node_number: 7 },
        { name: "eee", node_number: 4 }
      ],
      currentPage: 1,
      pagesize: 10,
      totla: 0
    };
  },

  created() {},
  mounted() {},
  computed: {},
  methods: {
    to_new() {
      this.$router.push("/");
    },
    currentPageChange(e) {
      this.currentPage = e;
    }
  }
};
</script>
<style>
</style>
<style  scoped>
.cs_con_title {
  display: flex;
  justify-content: space-between;
}
.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-bottom: 0px;
}
</style>