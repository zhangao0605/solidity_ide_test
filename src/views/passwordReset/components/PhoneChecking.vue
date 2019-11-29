<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item prop="phone">
      <el-input v-model="form.phone" :placeholder="$lan('请输入您绑定的手机号')" class="height-configurable input"></el-input>
    </el-form-item>
    <el-form-item prop="code" class="code">
      <el-input v-model="form.code" :placeholder="$lan('请输入验证码')" class="height-configurable input" style="width:40%;display:inline-block"></el-input>
      <el-link :underline="false" type="primary" @click="getCode" class="code-getting-text">{{codeGettingText}}</el-link>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="btn-next" :loading="btnLoading" @click="next">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { ruleOfPhoneNumber } from '@/utils/rules'
  import userApi from '@/apis/userApi'
  const { getPhoneCode, checkPhoneCode } = userApi
  const totalCountdownTime = 60 // 单位为s
  export default {
    name: 'PhoneChecking',
    data () {
      return {
        form: {
          phone: '',
          code: ''
        },
        rules: {
          phone: [
            { required: true, message: this.$lan('请输入您的手机号码'), trigger: 'blur' },
            { pattern: ruleOfPhoneNumber, message: this.$lan('请输入正确的手机号'), trigger: 'blur' }
          ],
          code: [
            { required: true, message: this.$lan('请输入验证码'), trigger: 'blur' }
          ]
        },
        countdownTime: totalCountdownTime,
        codeGettingText: '获取验证码',
        btnLoading: false,
        interval: null
      }
    },
    methods: {
      next () {
        if (this.form.phone && this.form.code) {
          this.btnLoading = true
          checkPhoneCode(this.form.phone, this.form.code).then(() => {
            this.$emit('handleNext')
            this.btnLoading = false
          }).catch(() => {
            this.btnLoading = false
            // TODO
          })
        }
      },
      // 获取验证码
      getCode () {
        if (this.countdownTime === totalCountdownTime) {
          getPhoneCode().then(() => {
            this.changeCodeGettingText()
          }).catch(() => {
            // TODO
          })
        }
      },
      changeCodeGettingText () {
        let that = this
        this.interval = setInterval(() => {
          if (that.countdownTime > 1) {
            that.countdownTime--
            that.codeGettingText = `${that.countdownTime}s后重新获取`
          } else {
            that.codeGettingText = '获取验证码'
            that.countdownTime = totalCountdownTime
            clearInterval(that.interval)
            that.interval = null
          }
        }, 1000)
      },
      beforeDestroy () {
        clearInterval(this.interval)
        this.interval = null
      }
    }
  }
</script>

<style scoped lang="scss">
  .code{
    position: relative;
    .code-getting-text{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
</style>
