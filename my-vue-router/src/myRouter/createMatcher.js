//创建路由映射表方法
function createRouteMap(routes, _pathMap) {
  let pathMap = _pathMap || {}
  routes.forEach(route => {
    //往映射表添加
    addRouteRecord(route, pathMap)
  })
  console.log(pathMap)
  return{pathMap} 
}

//往映射表添加的方法
function addRouteRecord(route, pathMap, parentRecord) {

  let path = parentRecord ? `${parentRecord.path === '/' ? '' : `${parentRecord.path}`}/${route.path}` : route.path
  let record = {
    path,
    component: route.component,
    props: route.props,
    meta: route.meta,
    parent:parentRecord
  }
  if (!pathMap[path]) {
    pathMap[path] = record
  }
  route.children && route.children.forEach(childRoute => {
    addRouteRecord(childRoute, pathMap, record)
  })
}
export default function createMatcher(routes) {
  let {pathMap} = createRouteMap(routes)//创建路由映射表
  function addRoutes(routes) {//动态添加路由
    createRouteMap(routes, pathMap)//实现方法复用
  }
  function addRoute(route) {
    
    createRouteMap([route], pathMap)//实现方法复用
  }
  function match(location) {
    return pathMap[location]
  }
  return {
    addRoutes,//添加多个路由
    addRoute,//添加单个路由
    match//根据路径返回路由
  }
}