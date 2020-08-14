//  获取角色信息，根据用户权限动态加载路由
import NProgress from "nprogress"
import router from "./index"
import store from "../vuex"
import fetchUser from "@/api/apis/user"
import { Message } from "element-ui"

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token && store.getters.token !== "undefined") {
    if (to.path === "/login") {
      next({path: "/"})
    } else {
      if (!store.getters.info) {
        (async function getAddRouters () {
          fetchUser.fetchGetUserInfo().then(async function (response) {
            let data = {
              authorityRouter: "1001,1002,1003,1004,1005,1006,10061,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,10181,10182,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1030,10301,1031,1032,10181,1033,1034,1035,1036,1037,1038,1039,10391,1040,1041,10411,1042,1043,1044,1045,1046,1047,1048,1049,1050",
              avatar: "https://mock.yonyoucloud.com/image/logo@1x.png",
              id: 37,
              name: "admin",
              permissionButton: "101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120",
              role: "超级管理员"
            }
            await store.dispatch("getInfo", data)
           // await store.dispatch("getInfo", response.data.data)
            await store.dispatch("newRoutes", store.getters.info.authorityRouter)
            let newAddRouters = store.getters.addRouters
            await router.addRoutes(newAddRouters)
            next({path: to.path})
          }).catch(function (error) {
            Message.error('服务器出错了(:')
            console.log(error)
          })
        }())
      } else {
        let is404 = to.matched.some(record => {
          if (record.meta.role) {
            return store.getters.info.authorityRouter === -1
          }
        })
        if (is404) {
          next({path: "/404"})
          return false
        }
        next()
      }
    }
  } else {
    if (to.path === "/login") {
      next()
    }
    next({path: "/login"})
  }
})

router.afterEach(() => {
  NProgress.done()
})
