import createMatcher from "./createMatcher"
import HashHistory from "./history/hash"
import BrowserHistory from "./history/history"
import install, { Vue } from "./install"

class VueRouter {
  constructor(options) {

    //用户的路由配置
    let routes = options.routes
    this.beforeEachHooks=[]//路由钩子

    //构成映射，后续匹配添加等
    this.matcher = createMatcher(routes)

    let mode = options.mode || 'hash'
    if (mode === 'hash') {
      //hash模式
      this.history = new HashHistory(this)
    } else if (mode === 'history') {
      //history模式
      this.history = new BrowserHistory(this)
    }
  }
  match(location){//方便调用
    return this.matcher.match(location)
  }
  push(location){
    this.history.transationTo(location,()=>{
      if(this.history.type==='history'){
        history.pushState({},'',location)
      }else{
        window.location.hash=location
      }
    })
  }
  beforeEach(cb){
    this.beforeEachHooks.push(cb)
    //每次调用钩子就往数组放，在transationTo里用
  }
  //router初始化
  init(app) {
    let history = this.history
    let location = history.getCurrentLocation()
    //先跳转一次再监听
    history.transationTo(location,()=>{
      history.setupListener()//监听路由变化
    })
    history.listen((newRoute)=>{
      app._route=newRoute
    })
  }
}

VueRouter.install = install

export default VueRouter