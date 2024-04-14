
export let Vue
//vue.use会优先调用install，如果没有install调用VueRouter会因为他是类会报错
export default function install(_Vue) {
  Vue = _Vue//把传入的Vue变成全局可用的

  //所有vue实例都有共享的router
  //router不能放在原型上是因为有些时候newVue不传递router
  Vue.mixin({
    //渲染是从父亲到儿子
    beforeCreate() {
      if (this.$options.router) {
        //如果是根实例，且传递了router参数，就存到_router
        this._routerRoot = this
        this._router = this.$options.router
        //给根做一次初始化
        this._router.init(this)
//给根实例添加一个_route属性,并且是响应式的，且他就是current
        Vue.util.defineReactive(this,'_route',this._router.history.current)
      } else {
        //如果是儿子且有父亲，那就从父亲这里取
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  //以后直接取$router就行
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot && this._routerRoot._router
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot && this._routerRoot._route
    }
  })
  Vue.component('router-link', {
    props: {
      to: { type: String, required: true },
      tag: { type: String, default: 'a' }
    },
    methods: {
      handler() {
        this.$router.push(this.to)
      }
    },
    render() {
      let tag = this.tag
      return <tag onclick={this.handler}>{this.$slots.default}</tag>
    }
  })

  Vue.component('router-view', {
    functional:true,
    render(h,{parent,data}) {
      data.routerView=true
      let route=parent.$route
      let depth=0

      while(parent){
        if(parent.$vnode && parent.$vnode.data.routerView){
          depth++
        }
        parent=parent.$parent
      }
      let record=route.matched[depth]
      if(!record){
        return
      }
      return h(record.component,data)
    }
  })
}