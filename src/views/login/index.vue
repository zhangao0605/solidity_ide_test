<template>
  <div id="login">
    <div class="modal">
      <el-row class="welcome">
        <el-col :span="24">
          <img src="" alt="thinkey" class="logo">
          <span class="text">{{$lan('欢迎来到芯际BAAS平台')}}</span>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" type="tel" maxlength="11" :placeholder="$lan('请输入您的手机号码')" class="height-configurable input"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password :placeholder="$lan('请输入密码')" class="height-configurable input"></el-input>
        </el-form-item>
        <el-link @click="forgetPassword" type="info" class="forget-password">{{$lan('忘记密码')}}</el-link>
        <el-form-item>
          <el-button type="primary" @click="toLogin" :loading="btnLoading"  class="btn-login">{{$lan('登录')}}</el-button>
        </el-form-item>
        <el-link @click="toRegister" type="primary" class="register">{{$lan('注册用户')}}</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
  import userApi from '../../apis/userApi'
  import { setToken } from '@/utils/token'
  import { createNamespacedHelpers } from 'vuex'
  import { validPhoneNumber } from '@/utils/validate'
  import { ruleOfPhoneNumber } from '@/utils/rules'
  const { mapMutations } = createNamespacedHelpers('user')
  export default {
    name: 'login',
    data () {
      return {
        form: {
          phone: '',
          password: ''
        },
        rules: {
          phone: [
            { required: true, message: this.$lan('请输入您的手机号码'), trigger: 'blur' },
            { pattern: ruleOfPhoneNumber, message: this.$lan('请输入正确的手机号'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: this.$lan('请输入密码'), trigger: 'blur' }
          ]
        },
        btnLoading: false

      }
    },
    methods: {

      toLogin () {
        this.$router.push('/home')
        if (validPhoneNumber(this.form.phone) && this.form.password) {
          this.btnLoading = true
          userApi.loginByPassword(this.userName, this.password).then((res) => {
            let token = res['values'].token
            setToken(token)
            this.SET_TOKEN()

            this.btnLoading = false
          }).catch(() => {
            this.btnLoading = false
          })
        }
      },
      forgetPassword () {
        this.$router.push('/passwordReset')
      },
      toRegister () {
        this.$router.push('/register')
      },
      ...mapMutations(['SET_TOKEN'])
    }
  }
</script>

<style scoped lang="scss">
  #login {
    height: 100%;
    background: #eee;
    position: relative;
    .modal {
      width: 30%;
      height: 30%;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: right;
      .welcome{
        text-align: center;
        margin-bottom: 30px;
        .text{
          margin-left: 20px;
          color: #3a3a3a;
          font-size: 16px;
        }
      }
      .input,.btn-login{
        /*width: ;*/
        height: 50px;
        font-size: 18px;
        font-weight: bold;
      }
      .btn-login{
        width: 100%;
      }
      .forget-password{
        margin-bottom: 10px;
      }

    }
  }
</style>
