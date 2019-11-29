<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    menu-trigger="click"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    mode="vertical"
  >
    <el-menu-item index="0">
      <i class="iconfont el-icon-shouye"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>区块链管理</span>
      </template>
      <div class="slid_select">
        <el-select
          v-model="selectValue"
          disabled
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :change="modifyAName()"
          ></el-option>
        </el-select>
      </div>
      <el-menu-item-group>
        <el-menu-item index="1-1">区块链管理</el-menu-item>
        <el-menu-item index="1-2">节点管理</el-menu-item>
        <el-menu-item index="1-3">账户管理</el-menu-item>
        <el-menu-item index="1-4">交易详情</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-s-grid"></i>
      <span slot="title">联盟管理</span>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">成员管理</el-menu-item>
        <el-menu-item index="3-2">权限设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="11">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>合约管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="11-1">新建合约</el-menu-item>
        <el-menu-item index="11-2">升级合约</el-menu-item>
        <el-menu-item index="11-3">部署合约</el-menu-item>
        <el-menu-item index="11-4">合约设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="12">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>test</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="12-1">编辑器</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Slidebar",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "交易信息链"
        }
      ],
      selectValue: "1"
    };
  },
  computed: {
    // resturantName() {
    //   return this.$store.getters.resturantName
    // }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "0") {
        this.$router.push({ path: "/home" });
      } else if (key === "1-1") {
        this.$router.push({ path: "/blockchainManagement" });
      } else if (key === "1-2") {
        this.$router.push({ path: "/nodeManagement" });
      } else if (key === "1-3") {
        this.$router.push({ path: "/accountManagement" });
      } else if (key === "1-4") {
        this.$router.push({ path: "/dataManagement" });
      } else if (key === "2") {
        this.$router.push({ path: "/allianceManagement" });
      } else if (key === "3-1") {
        this.$router.push({ path: "/memberManagement" });
      } else if (key === "3-2") {
        this.$router.push({ path: "/permissionSettings" });
      } else if (key === "11-4") {
        this.$router.push({ path: "/contractSetting" });
      } else if (key === "11-1") {
        this.$router.push({ path: "/newContract" });
      } else if (key === "12-1") {
        this.$router.push({ path: "/contractEditor" });
      }
    },
    modifyAName() {
      // console.log(this.$store.state.app.resturantName)
      // this.$store.dispatch('app/modifyAName', this.selectValue)
      // console.log(this.$store.state.app.resturantName)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  text-align: left;
  /*min-width: 210px !important;*/
  width: 210px;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.slid_select {
  width: 82%;
  /*background-color: red*/
  margin-left: 9%;
}
</style>
