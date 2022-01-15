window.onload = function() {
  let regTel = /^1[3|4|5|7|8]\d{9}$/ // 验证手机号
  let regQq = /^[1-9]\d{4,}$/ // 第一个qq号为10000
  let regNc = /^[\u4e00-\u9fa5]{2,8}$/ // 昵称为2~8个汉字
  let regMsg = /^\d{6}$/ // 验证码为6位数
  let regpwd = /^[0-9a-zA-Z_-]{6,16}$/ // 密码为6~16位的数字，英文字母，-，_的组合。

  let tel = document.querySelector('#tel')
  let qq = document.querySelector('#qq')
  let nc = document.querySelector('#nc')
  let msg = document.querySelector('#msg')
  let pwd = document.querySelector('#pwd')
  let confirmpwd = document.querySelector('#surepwd')
  reg(tel, regTel)
  reg(qq, regQq)
  reg(nc, regNc)
  reg(msg, regMsg)
  reg(pwd, regpwd)

  function reg(element, reg) {
    element.onblur = function() {
      if (reg.test(this.value)) {
        this.nextElementSibling.className = "success"
        this.nextElementSibling.innerHTML = `<i class="success_icon"></i>`
      } else {
        this.nextElementSibling.className = "error"
        this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式输入有误'
      }
    }
  }
  confirmpwd.onblur = function() {
    if (this.value === pwd.value) {
      this.nextElementSibling.className = "success"
      this.nextElementSibling.innerHTML = `<i class="success_icon"></i>`
    } else {
      this.nextElementSibling.className = "error"
      this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 两次密码输入不同`
    }
  }
}