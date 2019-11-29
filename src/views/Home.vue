<template>
  <el-container style="height: 100%">
    <slide-bar></slide-bar>
    <div class="con">
      <Header></Header>
      <div class="router_class">
        <router-view></router-view>
      </div>
    </div>
  </el-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import userApi from "../apis/userApi";
const { mapGetters, mapMutations } = createNamespacedHelpers("user");
/*home内容显示*/
import Header from "../components/header";
/*左侧导航栏*/
import SlideBar from "../components/slidebar";
export default {
  name: "home",
  components: { SlideBar, Header },
  data() {
    return {};
  },
  created() {
    // console.log(this.isLogin)
    // if (!this.isLogin) {
    //   this.$router.replace('/login')
    // } else {
    //   userApi.getPermissions().then((res) => {
    //     let data = res['data'] || []
    //     this.SET_PERMISSION_LIST(data)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // }
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    ...mapMutations(["SET_PERMISSION_LIST"])
  }
};
</script>
<style scoped>
.router_class {
  height: 94.3%;
  margin-top: 0.2%;
  overflow: auto;
  padding: 30px 3%;
}
.router_class::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.router_class::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #eeeeee;
  background: #c1c1c1;
}

.router_class::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #eeeeee;
  border-radius: 10px;
  background: #eeeeee;
}

.con {
  width: 100%;
  margin-left: 210px;
  min-width: 1070px;
}
</style>
