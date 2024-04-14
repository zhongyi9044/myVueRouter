import Base from "./base";

function ensureSlash() {
  //看看路径有没有hash
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'//自动添加/#
}

function getHash() {
  return window.location.hash.slice(1)
}

class HashHistory extends Base {
  constructor(router) {
    super(router)
    //初始化hash模式
    this.type='hash'
    ensureSlash()
  }

  // 监听路径变化
  setupListener() {
    window.addEventListener('hashchange',()=> {
      this.transationTo(getHash())
    })
  }
  //获取路径
  getCurrentLocation() {
    return getHash()
  }
}

export default HashHistory