<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item prop="account">
      <el-input v-model="form.account" :placeholder="$lan('请输入您的账号(电子邮箱)')" class="height-configurable input"></el-input>
    </el-form-item>
    <el-form-item prop="imgCode">
      <el-input v-model="form.imgCode" :placeholder="$lan('验证码(不区分大小写)')" class="height-configurable input" style="width: 70%; display: inline-block"></el-input>
      <div @click="getImgCode" class="img-code" style="float: right">
        <el-image
            style="width: 120px; height: 50px;"
            :src="imgCodeUrl"
            fir="fill"></el-image>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="btn-next" :loading="btnLoading" @click="next">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { ruleOfEmail } from '@/utils/rules'
  import userApi from '@/apis/userApi'
  const { checkAccount, getImgCode } = userApi
  export default {
    name: 'AccountChecking',
    data () {
      return {
        form: {
          account: '',
          imgCode: ''
        },
        rules: {
          account: [
            { required: true, message: this.$lan('请输入您的账号'), trigger: 'blur' },
            { pattern: ruleOfEmail, message: this.$lan('请输入正确的邮箱'), trigger: 'blur' }

          ],
          imgCode: [
            { required: true, message: this.$lan('请输入图形验证码'), trigger: 'blur' }
          ]
        },
        imgCodeUrl: '',
        btnLoading: false
      }
    },
    methods: {
      getImgCode () {
        getImgCode().then((res) => {
          this.imgCodeUrl = res['data'] && res['data'].url
        }).catch(() => {
          // TODO
        })
      },
      next () {
        if (this.form.account && this.form.imgCode) {
          this.btnLoading = true
          checkAccount(this.form.account, this.form.imgCode).then((res) => {
            this.btnLoading = false
            this.$emit('handleNext')
          }).catch((err) => {
            this.btnLoading = false
            this.$alert(err.message, '提示', {
              confirmButtonText: '确定',
              callback: this.getImgCode
            })
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
