<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    :before-close="handleClose"
    width="50%"
    @close="handleClose"
  >
    <span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Full name" prop="fullname">
          <el-input v-model="ruleForm.fullname" ></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email" >
          <el-input v-model="ruleForm.email" placeholder="Please input email" @change="onCheckExist"></el-input>
        </el-form-item>
        <el-form-item label="Account Code" prop="accountCode">
          <el-input v-model="ruleForm.accountCode" placeholder="Please input Account Code" @change="onCheckExist"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <el-select v-model="ruleForm.roleId" placeholder="Role">
            <el-option label="Staff" value="2"></el-option>
            <el-option label="Teacher" value="3"></el-option>
            <el-option label="Student" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Birthday" required>
          <el-form-item prop="birthday">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">OK</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
export default {
  name: 'FormValidation',
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
        var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the email'))
      }
      setTimeout(async () => {
        var res = await this.store.dispatch('account/checkEmailExist', value)
        if (res && res.data.data) {
          callback(new Error('The email is existed'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the Account Code'))
      }
      setTimeout(async () => {
        var res = await this.store.dispatch('account/checkCodeExist', value)
        if (res && res.data.data) {
          callback(new Error('The Account Code is existed'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      
      title: 'Create New Account',
      store: useStore(),
      searchValue: {},
      ruleForm: {
        fullname: '',
        password: '',
        email: '',
        accountCode: '',
        phone: '',
        address: '',
        roleId: '',
        birthday: '',
        id: '',
        status: 'Active',
      },
      emailCheck: false,
      rules: {
        fullname: [
          {
            required: true,
            message: 'Please input full name',
            trigger: 'blur',
          },
          // {
          //   min: 3,
          //   max: 5,
          //   message: 'Length should be 3 to 5',
          //   trigger: 'blur',
          // },
        ],
        email: [
                    {
            validator: checkEmail,
            trigger: 'blur',
          },
          {
            required: true,
            message: 'Please select email zone',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: 'Please select adress',
            trigger: 'change',
          },
        ],
        accountCode: [
          {
            validator: checkCode,
            trigger: 'blur',
          },
          {
            required: true,
            message: 'Please select code',
            trigger: 'change',
          },
        ],
        birthday: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],

        // address: [
        //   {
        //     required: true,
        //     message: 'Please input full name',
        //     trigger: 'blur',
        //   },
        // ],
      },
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose() {
      this.$emit('close')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var response = await this.store.dispatch('account/insertAccount', this.ruleForm)
          console.log(response);
          if (response.status === 'success') {
            this.$notify({
              title: 'Success',
              message: 'Insert successfully',
              type: 'success',
              
            })
              this.handleClose()
              await this.store.dispatch('account/searchListAccounts', this.searchValue)     
              this.resetForm('ruleForm')
              
          } else {
            this.$notify({
              title: 'Error',
              message: 'Insert failed',
              type: 'danger',
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    
  },
  watch: {
    visbleSync(val) {
      this.$emit('update:dialogVisibleAdd', val)
    },
  },
}
</script>

<style scoped>
</style>