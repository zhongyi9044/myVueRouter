import Base from "./base";

function getPops() {
  return window.location.pathname
}
class BrowserHistory extends Base {
  constructor(router) {
    super(router)
    this.type = 'history'
  }
  // 监听路径变化
  setupListener() {
    console.log(this)
    window.addEventListener('popstate', ()=> {
      this.transationTo(getPops())
    })
  }
  //获取路径
  getCurrentLocation() {
    return getPops()
  }
}

export default BrowserHistory