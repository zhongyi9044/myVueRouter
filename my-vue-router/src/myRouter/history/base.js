function createRoute(record, location) {
  let matched = [];
  if (record) {
    while (record) {
      matched.unshift(record)
      record = record.parent
    }
  }
  return {
    matched,
    ...location
  }
}
// 调用钩子
function runQueue(queue, from, to, cb) {

  function next(index) {
    if (index >= queue.length) return cb()
    let hook = queue[index]
    hook(from, to, () => {
      next(index + 1)
    })
  }
  next(0)
}
class Base {
  constructor(router) {
    this.router = router

    this.current = createRoute(null, {
      path: '/'
    })
  }
  transationTo(location, listener) {

    //获取当前路径在映射表的对象
    let record = this.router.match(location)
    //每次更新的时候都能把一段路径所有‘/’的内容分段拿到
    let route = createRoute(record, { path: location })
    //如果当前路径的监听到变化的路径一致，就不动了
    if (location === this.current.path && route.matched.length === this.current.matched.length) {//因为开启了监听，防止重复跳转
      return
    }
    let queue = [].concat(this.router.beforeEachHooks)
    runQueue(queue, this.current, route, () => {
      this.current = route
      
      this.cb && this.cb(route)


      listener && listener()
    })

  }
  listen(cb) {
    this.cb = cb
  }
}

export default Base