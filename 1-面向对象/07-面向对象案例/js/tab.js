// 要点1：点击标签栏可以切换相应样式
// 要点2：双击标签栏显示输入框，可修改其中的数据
// 要点3：点击添加按钮可添加标签栏
// 要点4：点击X可以删除标签栏

let that
class Tab {
  constructor(id) {
    that = this
    this.main = document.querySelector(id)
    // 获取添加按钮的元素
    this.add = this.main.querySelector(".tabadd")
    // 获取li的父元素
    this.ul = this.main.querySelector(".fisrstnav ul:first-child")
    // 获取section的父元素
    this.fsection = this.main.querySelector(".tabscon")
    this.init()
  }

  // 初始化操作，让相关的元素绑定事件
  init() {
    this.updateNode()
    // 为+绑定添加事件
    this.add.onclick = this.addTab
    // 为li绑定切换事件
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.guanbis[i].index = i
      this.guanbis[i].onclick = this.deleteTab
      // 绑定双击事件
      this.spans[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab
    }
  }

  // 动态添加元素后重新获取对应的元素
  updateNode() {
    this.lis = this.main.querySelectorAll("li")
    this.sections = this.main.querySelectorAll("section")
    this.guanbis = this.main.querySelectorAll(".icon-guanbi")
    this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child")
  }

  // 切换功能
  toggleTab() {
    // clearClass函数是类的公共函数，所以只能通过that调用
    that.clearClass()
    this.className = "liactive"
    // 该函数的调用者为li,所以函数内部的this指向的都是li元素，所以可以通过this.index获取到值
    that.sections[this.index].className = "conactive"
  }
  // 清除所有样式
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ""
      this.sections[i].className = ""
    }
  }
  // 添加功能
  addTab() {
    that.clearClass()
    // 添加tab和section
    let random = Math.random()
    let newTab = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
    let newSection = `<section class="conactive">测试${random}</section>`
    // 在ul内部的最后一个元素的后面添加标签
    that.ul.insertAdjacentHTML("beforeend", newTab)
    that.fsection.insertAdjacentHTML("beforeend", newSection)
    // 重新获取lis和sections元素，并绑定事件
    that.init()
  }
  // 删除功能
  deleteTab(e) {
    // 由于父元素绑定了点击切换事件，所以应该阻止点击时冒泡
    e.stopPropagation()
    // let index = this.parentNode.index
    let index = this.index
    // 删除对应的 li 和 section 和 guanbi
    that.lis[index].remove()
    that.sections[index].remove()
    // 删除后重新初始化
    that.init()
    // 删除的不是选中状态的li，原来的选中状态保持不变
    if (document.querySelector('.liactive')) return
    // 删除的是选中状态的li，选中删除元素的上一个元素
    index--
    that.lis[index] && that.lis[index].click()
  }
  // 编辑功能
  editTab() {
    // let _that = this
    // 双击时禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    // 为span的内容换成表单
    let str = this.innerHTML
    // 外单内双 '<input type="text" />'
    this.innerHTML = `<input type='text' value=${str} />`
    // 获取input的元素
    let input = this.children[0]
    // input.value = str
    // 选中input中的文字
    input.select()
    // 离开输出框
    input.onblur = function() {
      // _that.innerHTML = input.value
      this.parentNode.innerHTML = this.value
    }
    // 按回车键吧输入框值给父元素
    input.onkeyup = function(e) {
      if (e.keyCode == 13) {
        this.blur()
      }
    }
  }
}
let tab = new Tab("#tab")

/*
dom相关：
  获取单个dom元素：document.querySelector('.fisrstnav ul:first-child')
  获取所有满足条件的dom元素：.querySelectorAll("li")
  绑定单击事件：.onclick=function(){}
  绑定双击事件： .ondblclick
  在ul的最后一个元素的后面添加标签：ul.insertAdjacentHTML("beforeend", newTab) 其他取值：beforstart,afterstart,afterend
  阻止冒泡：e.stopPropagation()
  删除自身元素: .remove()
  双击禁止选中文字：window.getSelection ?window.getSelection().removeAllRanges() :document.selection.empty()
  选中输入框的文字：input.select()
  绑定失焦事件：input.onblur=function(){}
  添加回车键事件：input.onkeyup=function(e){if(e.keyCode===13){.......}}
*/
