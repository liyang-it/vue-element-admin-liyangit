<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-banner">
        <div data-v-f24f3646="" class="logo" />
        <img data-v-f24f3646="" src="../../../public/login-banner-img.png" class="banner">
      </div>
      <div class="login-right-form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          autocomplete="on"
          class="login-form"
          label-position="left"
          @keyup.enter.native="handleLogin"
        >
          <div class="title-container">
            <h3 class="title">
              {{ $t('login.title') }}
            </h3>
            <div class="lang_select">
              <lang-select class="set-language" />
            </div>

          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <i class="el-icon-user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              autocomplete="on"
              placeholder="$t('login.username')"
              tabindex="1"
              type="text"
              clearable
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" manual placement="right">
            <el-form-item prop="password">
              <span class="svg-container">
                <i class="el-icon-lock" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                clearable
                :type="passwordType"
                autocomplete="on"
                name="password"
                placeholder="password"
                tabindex="2"
                @blur="capsTooltip = false"
                @keyup.native="checkCapslock"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-button
            :loading="loading"
            style="width: 100%; margin-bottom: 30px"
            type="primary"
            @click.native.prevent="handleLogin"
          >{{ $t('login.logIn') }}
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="bottomFilingInformationCss" v-html="bottomFilingInformation" />
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      nowDate: new Date(),
      bottomFilingInformation: '',
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.bottomFilingInformation = 'Copyright © 2022-' + this.nowDate.getFullYear() + ' 六点半投资有限公司. All rights reserved  <a @click="toRedirection("湘ICP备123123123123号-1")">湘ICP备123123123123号-1</a>'
    // window.addEventListener('storage', this.afterQRScan)
    console.error('登录要实现自己后端的实例，请参考 mock/user.js 中的login、info测试接口返回数据格式')
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 调用登录api接口
          console.info('点击登录')
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              // 登陆成功，进行跳转主页等逻辑， 设置token，等信息并不在这里！！！
              // 设置 token 逻辑 在 /store/modules/user.js 中
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
              console.info('登陆成功')
            })
            .catch(() => {
              // 登录失败
              console.info('登录失败')
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
// 登录输入框文字颜色
$light_gray: #362a2a;
// 登录输入框光标颜色
$cursor: #362a2a;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      appearance: none;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $klyl-bg: #012ea5;
  $dfll-bg: #82d8cf;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-box{
    height: 600px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%) translateY(-50%);
    background-color: var(--el-bg-color);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
  }

  // 屏幕大于 0px 并且小于 1156px
  @media screen and (min-width: 0px) and (max-width: 998px){
    .login-banner{
      display: none;
    }
  }

    // 屏幕大于 0px 并且小于 552px
    @media screen and (min-width: 0px) and (max-width: 552px){
    .login-box{
      width: 100%;
    }
    .login-form{
      width: 100% !important;
      padding: 10px !important;
    }
    .login-right-form{
      width: 100% !important;
    }
  }
  .login-banner{
    position: relative;
    width: 450px;
    background-color: #f5f7fa;
    overflow: hidden;
    img{
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .logo{
      position: absolute;
      top: 20px;
      left: 20px;
      width: 50px;
      height: 50px;
      border-radius: 4px;
      background: url(../../../public/logo.png) no-repeat;
      background-size: contain;
    }
  }

  .login-right-form{
    width: 550px;
  }
    .login-form {
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      padding: 0px 20px 0px 50px;
      width: 500px;
    }

  /**
 * 必应每日壁纸API， <a href="https://blog.oneneko.com/posts/2020/07/01/bing-api.html">参考地址</a>>
 */
  .login-container {
    //background-color: $bg;
    // background: url(https://api.oneneko.com/v1/bing_today) rgba(0, 0, 0, 0.5) no-repeat center center;
    min-height: 100%;
    width: 100%;
    // background: url(../../../../public/login-bg1.jpg) rgb(222 74 74 / 50%) no-repeat 50%;
    background-color: #fafafa;
    background-blend-mode: multiply;
    overflow: hidden;

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 20px;
        color: #302424;
        margin: 0px auto 40px auto;
        text-align: left;
        font-family: inherit;
      }
      .lang_select{
        width: 50px;
        margin-left: 100px;
        position: absolute;
        top: 1px;
        right: -25px;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .bottomFilingInformationCss{
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 10px;
      color: #646566;
      font-size: 15px;
      font-family: initial;
      font-weight: bold;
    }
  }
</style>
