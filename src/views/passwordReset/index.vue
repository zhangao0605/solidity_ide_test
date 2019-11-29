<template>
   <div id="passwordReset">
      <div class="modal">
        <el-row>
          <el-col class="caption">
            重置密码
          </el-col>
        </el-row>
        <el-steps :active="currentStep" align-center class="step">
          <el-step title="账号检测"></el-step>
          <el-step title="手机号验证"></el-step>
          <el-step title="设置新密码"></el-step>
        </el-steps>
        <account-checking v-show="currentStep === 1" @handleNext="next"/>
        <phone-checking v-show="currentStep === 2" @handleNext="next"/>
        <password-resetting v-show="currentStep === 3" @onSetSuccessfully="next"/>
      </div>
   </div>
</template>

<script>
  import AccountChecking from './components/AccountChecking'
  import PhoneChecking from './components/PhoneChecking'
  import PasswordResetting from './components/PasswordResetting'

  export default {
    components: { AccountChecking, PhoneChecking, PasswordResetting },
    data () {
      return {
        currentStep: 1,
        phone: '',
        form2: {
          phone: '',
          code: ''
        }
      }
    },
    methods: {
      next () {
        console.log('this.currentStep' + this.currentStep)
        if (this.currentStep < 3) {
          this.currentStep++
        } else {
          this.$alert('密码重置成功，请前往登录页登录', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
      },
      complete () {

      }
    }
  }
</script>

<style scoped lang="scss">
  #passwordReset{
    height: 100%;
    background: #eee;
    position: relative;
    .caption{
      color: purple;
      text-align: center;
      font-size: 30px;
    }
    .modal {
      width: 30%;
      height: 30%;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: left;
      .step{
        margin: 50px 0 40px;
      }
      /deep/.label{
        line-height: 50px;
        color: #666;
      }
      /deep/.input{
        /*width: ;*/
        height: 50px;
      }
      /deep/.btn-next{
        width: 100%;
        height: 50px;
      }
      /deep/.img-code {
        cursor: pointer;
        height: 50px;
      }
      .forget-password{
        margin-bottom: 10px;
      }
    }
  }

</style>
