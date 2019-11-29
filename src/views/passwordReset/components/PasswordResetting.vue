<template>
  <el-form ref="form" :rules="rules" :model="form" class="form" status-icon>
    <el-row>
      <el-col :span="4" class="label">
        新密码：
      </el-col>
      <el-col :span="20">
        <el-form-item prop="password">
          <el-input v-model="form.password" :placeholder="$lan('请输入您的新密码')" show-password autocomplete="off" class="height-configurable input"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="label">
        确认密码：
      </el-col>
      <el-col :span="20">
        <el-form-item prop="passwordDuplicate">
          <el-input v-model="form.passwordDuplicate" :placeholder="$lan('请再次输入密码')" show-password class="height-configurable input"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" class="btn-next" @click="resetPassword">确认重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { validPassword } from '@/utils/validate'
  import userApi from '@/apis/userApi'
  const { resetPassword } = userApi

  export default {
    name: 'PasswordResetting',
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入您的新密码'))
        }
        if (validPassword(value)) {
          callback()
        } else {
          callback(new Error('密码长度为8-15个字符，必须包含字母、数字、特殊符号其中的两种'))
        }
      }
      var validatePasswordDuplicate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请您再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次密码输入不一致，请重新输入'))
        } else {
          callback()
        }
      }
      return {
        form: {
          password: '',
          passwordDuplicate: ''
        },
        rules: {
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwordDuplicate: [
            { required: true, message: this.$lan('请再次输入密码'), trigger: 'blur' },
            { validator: validatePasswordDuplicate, trigger: 'blur' }
          ]
        },
        btnLoading: false
      }
    },
    methods: {
      resetPassword () {
        let password = this.form.password
        let passwordDuplicate = this.form.passwordDuplicate
        if (password && password === passwordDuplicate && validPassword(password)) {
          this.btnLoading = true
          resetPassword(password).then(() => {
            this.btnLoading = false
            this.$emit('onSetSuccessfully')
          }).catch(() => {
            this.btnLoading = false
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
