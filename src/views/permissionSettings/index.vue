<template>
  <div class="ps_con">
    <el-dialog title="新增角色" :visible.sync="dialogVisible" width="45%">
      <el-steps :active="steps_active" align-center>
        <el-step title="基本设置"></el-step>
        <el-step title="选择权限"></el-step>
      </el-steps>
      <div class="step_1" v-show="steps_active===1">
        <el-form :model="add_form">
          <el-form-item label="角色名称：" :label-width="formLabelWidth">
            <el-input v-model="add_form.name" style="width: 70%" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述：" :label-width="formLabelWidth">
            <el-input v-model="add_form.description" style="width: 70%" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="step_1" v-show="steps_active===2">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange(0,0)"
          style="margin-left:2.8%;margin-top:30px"
        >
          <span style="font-size:16px">区块链管理</span>
        </el-checkbox>
        <div class="checkbox_div">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange(0,1)">
            <el-checkbox
              border
              v-for="city in cityOptions"
              :label="city.id"
              :key="city.id"
              style="width:28%;margin-left:1.5%;margin-top:15px"
            >{{city.label}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <el-checkbox
          :indeterminate="isIndeterminate_1"
          v-model="checkAll_1"
          @change="handleCheckAllChange(1,0)"
          style="margin-left:2.8%;margin-top:30px"
        >
          <span style="font-size:16px">区块链管理</span>
        </el-checkbox>
        <div class="checkbox_div">
          <el-checkbox-group v-model="checkedCities_1" @change="handleCheckedCitiesChange(1,1)">
            <el-checkbox
              border
              v-for="city in cityOptions_1"
              :label="city.id"
              :key="city.id"
              style="width:28%;margin-left:1.5%;margin-top:15px"
            >{{city.label}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <el-checkbox
          :indeterminate="isIndeterminate_2"
          v-model="checkAll_2"
          @change="handleCheckAllChange(2,0)"
          style="margin-left:2.8%;margin-top:30px"
        >
          <span style="font-size:16px">区块链管理</span>
        </el-checkbox>
        <div class="checkbox_div">
          <el-checkbox-group v-model="checkedCities_2" @change="handleCheckedCitiesChange(2,1)">
            <el-checkbox
              border
              v-for="city in cityOptions_2"
              :label="city.id"
              :key="city.id"
              style="width:28%;margin-left:1.5%;margin-top:15px"
            >{{city.label}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <el-checkbox
          :indeterminate="isIndeterminate_3"
          v-model="checkAll_3"
          @change="handleCheckAllChange(3,0)"
          style="margin-left:2.8%;margin-top:30px"
        >
          <span style="font-size:16px">区块链管理</span>
        </el-checkbox>
        <div class="checkbox_div">
          <el-checkbox-group v-model="checkedCities_3" @change="handleCheckedCitiesChange(3,1)">
            <el-checkbox
              border
              v-for="city in cityOptions_3"
              :label="city.id"
              :key="city.id"
              style="width:28%;margin-left:1.5%;margin-top:15px"
            >{{city.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-show="steps_active===1">
        <el-button @click="add_canale()">取 消</el-button>
        <el-button type="primary" @click="next_tep()">下一步</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-show="steps_active===2">
        <el-button @click="add_canale() ">取 消</el-button>
        <el-button type="primary" @click="add_true() ">确 定</el-button>
      </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="角色" name="first">
        <div class="roles">
          <div>
            <el-button @click="add_roles()" type="primary">新增角色</el-button>
          </div>
          <div class="roles_search">
            <el-input v-model="search_value" placeholder="请输入角色身份进行搜索" class="input_style"></el-input>
            <div class="roles_search_button">
              <el-button @click="search_roles()" type="primary">搜索</el-button>
            </div>
          </div>
        </div>
        <div class="con_table">
          <el-table
            :data="table_data"
            border
            max-height="590"
            style="width: 100%;margin-bottom: 30px;margin-top: 40px"
            :header-cell-style="this.tableHeaderColor"
          >
            <el-table-column label="名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <span class="operational_style" @click="roles_detailed(scope.row.node_number)">详情</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限列表" name="second">
        <!-- permiss_list -->
        <div v-for="(city,index) in permiss_list" :key="index">
          <span style="font-size:16px">{{city.name}}</span>
          <div class="checkbox_div_1">
            <span
              class="per_block_style"
              v-for="(item,index) in city.list"
              :key="index"
            >{{item.name}}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "permissionSettings",
  components: {},
  data() {
    return {
      table_data: [
        { name: "aaa", node_number: 2 },
        { name: "bbb", node_number: 3 },
        { name: "ccc", node_number: 5 },
        { name: "ddd", node_number: 7 },
        { name: "eee", node_number: 4 },
        { name: "eee", node_number: 4 }
      ],
      activeName: "first",
      search_value: "",
      dialogVisible: false,
      add_form: {
        description: "",
        name: ""
      },
      formLabelWidth: "200px",
      steps_active: 1,

      cityOptions: [
        { id: 0, label: "区块链监控" },
        { id: 1, label: "节点管理-查看状态" },
        { id: 2, label: "节点管理-添加节点" },
        { id: 3, label: "节点管理-停用节点" },
        { id: 4, label: "节点管理-启动/重启节" },
        { id: 5, label: "联盟管理-查看联盟" },
        { id: 6, label: "联盟管理-邀请机构" },
        { id: 7, label: "联盟管理-退出联盟" },
        { id: 8, label: "联盟管理-删除管理员" }
      ],
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false,
      cityOptions_1: [
        { id: 0, label: "区块链监控" },
        { id: 1, label: "h-查看状态" },
        { id: 2, label: "节点管理-添加节点" },
        { id: 3, label: "节点管理-停用节点" }
      ],
      checkAll_1: false,
      checkedCities_1: [],
      isIndeterminate_1: false,
      cityOptions_2: [
        { id: 0, label: "q" },
        { id: 1, label: "ss" },
        { id: 2, label: "g-添加节点" },
        { id: 3, label: "节点管理-停用节点" }
      ],
      checkAll_2: false,
      checkedCities_2: [],
      isIndeterminate_2: false,
      cityOptions_3: [
        { id: 0, label: "ad" },
        { id: 1, label: "a-查看状态" },
        { id: 2, label: "t-添加dsd节点" },
        { id: 3, label: "节点管理-ddddddddddd" }
      ],
      checkAll_3: false,
      checkedCities_3: [],
      isIndeterminate_3: false,
      // 权限列表
      permiss_list: [
        {
          name: "区块链管理",
          list: [
            { name: "区块链监控" },
            { name: "节点管理-查看状态" },
            { name: "节点管理-添加节点" },
            { name: "节点管理-停用节点" },
            { name: "节点管理-启动/重启节点" },
            { name: "联盟管理-查看联盟" },
            { name: "联盟管理-邀请机构" },
            { name: "联盟管理-退出联盟" },
            { name: "联盟管理-删除管理员" }
          ]
        },
        {
          name: "合约管理",
          list: [
            { name: "查看合约" },
            { name: "新建合约" },
            { name: "升级合约" },
            { name: "部署合约" },
            { name: "停用合约" }
          ]
        },
        {
          name: "工单管理",
          list: [{ name: "查看工单" }, { name: "审批工单" }]
        },
        {
          name: "权限管理",
          list: [
            { name: "成员管理-查看成员" },
            { name: "成员管理-新增成员" },
            { name: "成员管理-编辑成员信息" },
            { name: "成员管理-修改成员密码" },
            { name: "成员管理-停用成员" },
            { name: "权限管理-查看角色" },
            { name: "权限管理-新增角色" },
            { name: "权限管理-查看权限列表" }
          ]
        }
      ]
    };
  },

  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName);
    },
    // 角色搜索
    search_roles() {
      console.log(this.search_value);
    },
    // 角色详情
    roles_detailed() {},
    //添加角色弹框
    add_roles() {
      this.dialogVisible = true;
    },
    // 下一步
    next_tep() {
      if (this.add_form.name === "") {
        this.$message.error("角色名称不能为空！");
      } else {
        this.steps_active = 2;
      }
    },
    // 取消添加
    add_canale() {
      this.dialogVisible = false;
      this.checkAll = false;
      this.checkedCities = [];
      this.isIndeterminate = false;
      this.checkAll_1 = false;
      this.checkedCities_1 = [];
      this.isIndeterminate_1 = false;
      this.checkAll_2 = false;
      this.checkedCities_2 = [];
      this.isIndeterminate_2 = false;
      this.checkAll_3 = false;
      this.checkedCities_3 = [];
      this.isIndeterminate_3 = false;
      this.add_form = {
        description: "",
        name: ""
      };
      this.steps_active = 1;
    },
    // 确认添加
    add_true() {
      console.log(this.checkedCities);
      console.log(this.checkedCities_1);
      console.log(this.checkedCities_2);
      console.log(this.checkedCities_3);
    },
    handleCheckAllChange(q, w) {
      if (q === 0) {
        this.checkAll = !!this.checkAll;
        let checked = this.cityOptions.map(function(item) {
          return item.id;
        });
        this.checkedCities = this.checkAll ? checked : [];
        this.isIndeterminate = false;
      } else if (q === 1) {
        this.checkAll_1 = !!this.checkAll_1;
        let checked = this.cityOptions_1.map(function(item) {
          return item.id;
        });
        this.checkedCities_1 = this.checkAll_1 ? checked : [];
        this.isIndeterminate_1 = false;
      } else if (q === 2) {
        this.checkAll_2 = !!this.checkAll_2;
        let checked = this.cityOptions_2.map(function(item) {
          return item.id;
        });
        this.checkedCities_2 = this.checkAll_2 ? checked : [];
        this.isIndeterminate_2 = false;
      } else if (q === 3) {
        this.checkAll_3 = !!this.checkAll_3;
        let checked = this.cityOptions_3.map(function(item) {
          return item.id;
        });
        this.checkedCities_3 = this.checkAll_3 ? checked : [];
        this.isIndeterminate_3 = false;
      }
    },
    handleCheckedCitiesChange(q, w) {
      if (q === 0) {
        let checkedCount = this.checkedCities.length;
        this.checkAll = checkedCount === this.cityOptions.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cityOptions.length;
      } else if (q === 1) {
        let checkedCount = this.checkedCities_1.length;
        this.checkAll_1 = checkedCount === this.cityOptions_1.length;
        this.isIndeterminate_1 =
          checkedCount > 0 && checkedCount < this.cityOptions_1.length;
      } else if (q === 2) {
        let checkedCount = this.checkedCities_2.length;
        this.checkAll_2 = checkedCount === this.cityOptions_2.length;
        this.isIndeterminate_2 =
          checkedCount > 0 && checkedCount < this.cityOptions_2.length;
      } else if (q === 3) {
        let checkedCount = this.checkedCities_3.length;
        this.checkAll_3 = checkedCount === this.cityOptions_3.length;
        this.isIndeterminate_3 =
          checkedCount > 0 && checkedCount < this.cityOptions_3.length;
      }
    }
  }
};
</script>
<style>
.ps_con .el-tabs__item {
  font-size: 18px;
}
</style>
<style scoped>
.roles {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.roles_search {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.input_style {
  /* margin-right: 30px; */
  margin-left: 35%;
  width: 50%;
}
.roles_search_button {
  width: 15%;
  text-align: right;
}
.step_1 {
  margin-top: 50px;
}
.checkbox_div {
  /* display: flex; */
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.per_block_style {
  background-color: rgb(255, 255, 255);
  text-align: center;
  display: inline-block;
  padding: 0px 10px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  line-height: 50px;
  height: 50px;
  width: 20%;
  margin-left: 1.5%;
  margin-top: 15px;
}
.checkbox_div_1 {
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
}
</style>
