(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"+uAz":function(t,e,a){},"/pKv":function(t,e,a){"use strict";var s=a("+uAz");a.n(s).a},EDHI:function(t,e,a){"use strict";a.r(e);var s={name:"dynamicCommentList",components:{Comment:a("efCA").a},data:function(){return{dialogVisibleCmt:!1,bcommentName:"",radio:1,visibleList:[],tableData:[],emptyText:"加载中...",searchPage:{userId:"",page:1,pageSize:10,searchText:"",cmtLevel:1},totalCount:0,totalPage:0,cmtType:3}},methods:{lookComment:function(t,e){this.dialogVisibleCmt=!0,this.bcommentName=e.nickname,this.$refs.comment.getComment(3,e)},cmtCallback:function(){this.dialogVisibleCmt=!1},handleDelete:function(t,e){var a=this;this.$request.fetchDelStoryComment({photoCommentId:e}).then((function(e){200===e.data.code?(a.tableData.splice(t,1),a.$message.success("删除成功")):a.$message.error("删除失败")}))},handleSizeChange:function(t){this.searchPage.pageSize=t,this.getList(this.searchPage)},handleCurrentChange:function(t){this.searchPage.page=t,this.getList(this.searchPage)},onSubmit:function(){this.getList(this.searchPage)},getList:function(t){var e=this;this.$request.fetchGetDynamicCommentList(t).then((function(t){200===t.data.code?(e.tableData=t.data.data.list,e.searchPage.page=t.data.data.currPage,e.totalCount=t.data.data.totalCount,e.totalPage=t.data.data.totalPage):e.$message.error("数据获取失败"),e.emptyText="暂无数据"}))}},mounted:function(){this.getList(this.searchPage)},watch:{"searchPage.searchText":{handler:function(t){0===t.length&&(this.searchPage.page=1,this.getList(this.searchPage))}}}},n=(a("/pKv"),a("KHd+")),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[[a("el-card",[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:12}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.searchPage}},[a("el-form-item",{attrs:{label:"评论查询"}},[a("el-input",{attrs:{placeholder:"请输入评论人昵称查询"},model:{value:t.searchPage.searchText,callback:function(e){t.$set(t.searchPage,"searchText",e)},expression:"searchPage.searchText"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}})],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":t.emptyText}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-card",[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:24}},[a("el-row",[a("el-col",[t._v("评论内容:")]),t._v(" "),a("el-col",{staticClass:"cmbg"},[t._v(t._s(e.row.content))])],1)],1)],1),t._v(" "),a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:24}},[e.row.imgPath&&e.row.imgPath.length>0?[a("el-row",[a("el-col",[t._v("评论图片:")]),t._v(" "),a("el-col",{staticClass:"cmbg"},t._l(e.row.imgPath,(function(t){return a("el-image",{key:t,staticClass:"commentImg",attrs:{src:t,"preview-src-list":e.row.imgPath}})})),1)],1)]:t._e()],2)],1)],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"评论ID",prop:"id",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{label:"攻略标题",prop:"title",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"out-dot"},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"评论人",prop:"nickname",align:"center",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{label:"评论内容",prop:"content",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"out-dot"},[t._v(t._s(e.row.content))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"顶数",prop:"upCount",sortable:"",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{"disable-transitions":""}},[a("i",{staticClass:"fa fa-thumbs-o-up",attrs:{"aria-hidden":"true"}}),t._v("\n            "+t._s(e.row.upCount)+"\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"踩数",prop:"stepCount",sortable:"",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{"disable-transitions":""}},[a("i",{staticClass:"fa fa-hand-o-down",attrs:{"aria-hidden":"true"}}),t._v("\n            "+t._s(e.row.stepCount)+"\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"评论时间",prop:"createTime",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:12}},[0!==e.row.replyCount?a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"170",expression:"'170'"}],attrs:{size:"mini"},on:{click:function(a){return t.lookComment(e.$index,e.row)}}},[a("i",{staticClass:"fa fa-eye",attrs:{"aria-hidden":"true"}}),t._v("查看回复\n              ")]):a("div",{staticStyle:{height:"28px"}})],1),t._v(" "),a("el-col",{staticClass:"text-left",attrs:{span:12}},[a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"171",expression:"'171'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.$index,e.row.id)}}},[a("i",{staticClass:"el-icon-delete"}),t._v("删除\n              ")])],1)],1)]}}])})],1)],t._v(" "),[a("el-card",[a("el-pagination",{attrs:{"page-size":t.searchPage.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount,"prev-text":"上一页","next-text":"下一页"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],t._v(" "),a("Comment",{ref:"comment",attrs:{dialogVisible:t.dialogVisibleCmt,bcommentName:t.bcommentName,cmtType:t.cmtType},on:{cmtCallback:t.cmtCallback}})],2)}),[],!1,null,"3cc73157",null);e.default=i.exports},LSS3:function(t,e,a){"use strict";var s=a("odum");a.n(s).a},efCA:function(t,e,a){"use strict";var s={name:"comment",props:{dialogVisible:{type:Boolean,default:!1},bcommentName:String,cmtType:Number},data:function(){return{visible:this.dialogVisible,bName:"",count:0,loading:!1,isLoading:!0,cmtLoading:!1,totalPages:"",commentList:[],cmtPage:{page:1,pageSize:10,cmtLevel:2,parentId:null}}},computed:{noMore:function(){return this.count>=this.totalPages-1},disabled:function(){return this.cmtLoading||this.noMore}},methods:{closeCallback:function(){this.isLoading=!0,this.$emit("cmtCallback")},load:function(){this.cmtLoading=!0,this.count+=1,this.getComment({page:this.count,pageSize:10})},getComment:function(t,e){var a=this;this.commentList=[],this.visible=this.dialogVisible,this.isLoading&&(this.loading=!0),this.cmtPage.parentId=e.id,1===t&&this.$request.fetchGetStrategyCommentList(this.cmtPage).then((function(t){200===t.data.code?(a.commentList=a.commentList.concat(t.data.data.list),a.totalPages=t.data.data.totalPage,a.cmtLoading=!1,a.loading=!1,a.isLoading=!1):a.$message.error("数据获取失败")})),2===t&&this.$request.fetchGetStoryCommentList(this.cmtPage).then((function(t){200===t.data.code?(a.commentList=a.commentList.concat(t.data.data.list),a.totalPages=t.data.data.totalPage,a.cmtLoading=!1,a.loading=!1,a.isLoading=!1):a.$message.error("数据获取失败")})),3===t&&this.$request.fetchGetDynamicCommentList(this.cmtPage).then((function(t){200===t.data.code?(a.commentList=a.commentList.concat(t.data.data.list),a.totalPages=t.data.data.totalPage,a.cmtLoading=!1,a.loading=!1,a.isLoading=!1):a.$message.error("数据获取失败")}))},delComment:function(t,e){var a=this;1===this.cmtType&&this.$request.fetchDelStrategyComment({strategyCommentId:e}).then((function(e){200===e.data.code?(a.commentList.splice(t,1),a.$message.success("删除成功")):a.$message.error("删除成功")})),2===this.cmtType&&this.$request.fetchDelStoryComment({storyCommentId:e}).then((function(e){200===e.data.code?(a.commentList.splice(t,1),a.$message.success("删除成功")):a.$message.error("删除成功")})),3===this.cmtType&&this.$request.fetchDelDynamicComment({photoCommentId:e}).then((function(e){200===e.data.code?(a.commentList.splice(t,1),a.$message.success("删除成功")):a.$message.error("删除成功")}))}},watch:{dialogVisible:{handler:function(){this.visible=this.dialogVisible},deep:!0},bcommentName:function(){this.bName=this.bcommentName}}},n=(a("LSS3"),a("KHd+")),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"回复"+t.bName,visible:t.visible,width:"600","destroy-on-close":"","before-close":t.closeCallback},on:{"update:visible":function(e){t.visible=e}}},[t.loading?a("div",{staticClass:"loading"},[a("span",{staticClass:"el-icon-loading"}),t._v("加载中....\n  ")]):a("div",{staticClass:"cmt_infinite-list-wrapper",attrs:{id:"box"}},[a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"box",attrs:{"infinite-scroll-disabled":"disabled"}},[a("ul",{staticClass:"list"},t._l(t.commentList,(function(e,s){return a("li",{key:s,staticClass:"cmt_list-item"},[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:20}},[a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"cmt_nickname",attrs:{span:12}},[t._v(t._s(e.nickname)+" :")]),t._v(" "),a("el-col",{staticClass:"cmt_in-left",attrs:{span:12}},[t._v(t._s(e.createTime))])],1),t._v(" "),e.beNickname!==t.bcommentName?a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"cmt_be-nickname"},[t._v("\n                  回复\n                  "),a("span",[t._v(t._s(e.beNickname))])])],1):t._e(),t._v(" "),a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"cmt_content",attrs:{span:24}},[t._v(t._s(e.content))])],1)],1),t._v(" "),a("el-col",{staticClass:"cmt_in-center",attrs:{span:4}},[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return t.delComment(s,e.id)}}},[t._v("删除")])],1)],1)],1)})),0),t._v(" "),t.cmtLoading?a("div",{staticClass:"cmt_loading cmt_in-center"},[a("span",{staticClass:"el-icon-loading"}),t._v(" 加载中...\n      ")]):t._e(),t._v(" "),t.noMore?a("div",{staticClass:"cmt_no-more cmt_in-center"},[t._v("没有更多了")]):t._e()])])])}),[],!1,null,"5cf5b48e",null);e.a=i.exports},odum:function(t,e,a){}}]);
//# sourceMappingURL=12.3df228c1d469707241f8.js.map