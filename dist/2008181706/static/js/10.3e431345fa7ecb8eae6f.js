(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"RU/L":function(e,t,a){a("Rqdy");var n=a("WEpk").Object;e.exports=function(e,t,a){return n.defineProperty(e,t,a)}},Rqdy:function(e,t,a){var n=a("Y7ZC");n(n.S+n.F*!a("jmDH"),"Object",{defineProperty:a("2faE").f})},SEkw:function(e,t,a){e.exports={default:a("RU/L"),__esModule:!0}},YEIV:function(e,t,a){"use strict";t.__esModule=!0;var n,s=a("SEkw"),l=(n=s)&&n.__esModule?n:{default:n};t.default=function(e,t,a){return t in e?(0,l.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},dEAP:function(e,t,a){},"l/K6":function(e,t,a){"use strict";var n=a("dEAP");a.n(n).a},wYIb:function(e,t,a){"use strict";a.r(t);var n=a("YEIV"),s=a.n(n)()({name:"strategyList",data:function(){return{radio:1,visibleList:[],tableData:[],multipleSelection:[],emptyText:"加载中...",searchPage:{isOfficial:2,userId:"",page:1,pageSize:10,searchText:""},totalCount:0,totalPage:0}},methods:{handleDelete:function(e,t){var a=this;this.$request.fetchDelStrategy({strategyId:[t]}).then((function(t){200===t.data.code?(a.tableData.splice(e,1),a.$message.success("删除成功"),0===a.tableData.length&&(a.searchPage.page--,a.getList(a.searchPage))):a.$message.error("删除失败")}))},filterGames:function(e,t){return t.gameName===e},filterStatus:function(e,t){return t.approvalStatus===e},handleSelectionChange:function(e){var t=[];e.forEach((function(e){t.push(e.id)})),this.multipleSelection=t},handleSizeChange:function(e){this.searchPage.pageSize=e,this.getList(this.searchPage)},handleCurrentChange:function(e){this.searchPage.page=e,this.getList(this.searchPage)},onSubmit:function(){this.getList(this.searchPage)},setStatus:function(e,t){var a=this;this.$request.fetchSetStrategyStatus({approvalResult:parseInt(this.radio),id:[t]}).then((function(t){200===t.data.code?(a.$set(a.tableData[e],"approvalStatus",a.radio+1),a.$set(a.visibleList,e,!1),a.radio=1,a.$message.success("修改成功")):a.$message.error(t.data.msg)}))},setStatusAll:function(e){var t=this;this.$confirm("您勾选的确定全部审核通过吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$request.fetchSetStrategyStatus({approvalResult:e,id:t.multipleSelection}).then((function(e){200===e.data.code?(t.getList(t.searchPage),t.$message({type:"success",message:"操作成功!"})):t.$message.error(e.data.msg)}))})).catch((function(){t.$message({type:"info",message:"已取消操作"})}))},delStatusAll:function(){var e=this;this.$confirm("您勾选的确定全部删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$request.fetchDelStrategy({strategyId:e.multipleSelection}).then((function(t){200===t.data.code?(e.getList(e.searchPage),e.$message({type:"success",message:"批量删除成功!"})):e.$message.error("删除失败")}))})).catch((function(){e.$message({type:"info",message:"已取消操作"})}))},cancelDelete:function(e){this.$set(this.visibleList,e,!1),this.radio=1},getList:function(e){var t=this;this.$request.fetchGetStrategyList(e).then((function(e){200===e.data.code?(t.tableData=e.data.data.list,t.searchPage.page=e.data.data.currPage,t.totalCount=e.data.data.totalCount,t.totalPage=e.data.data.totalPage):t.$message.error("数据获取失败"),t.emptyText="暂无数据"}))}},mounted:function(){this.getList(this.searchPage)},watch:{multipleSelection:function(e){}}},"watch",{"searchPage.searchText":{handler:function(e){0===e.length&&(this.searchPage.page=1,this.getList(this.searchPage))}}}),l=(a("l/K6"),a("KHd+")),r=Object(l.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[[a("el-card",[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:12}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchPage}},[a("el-form-item",{attrs:{label:"攻略查询"}},[a("el-input",{attrs:{placeholder:"请输入攻略标题查询"},model:{value:e.searchPage.searchText,callback:function(t){e.$set(e.searchPage,"searchText",t)},expression:"searchPage.searchText"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1),e._v(" "),e.multipleSelection.length>0?a("el-col",{attrs:{span:12,align:"right"}},[a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"60",expression:"'60'"}],attrs:{type:"success"},on:{click:function(t){return e.setStatusAll(1)}}},[e._v("批量审核通过")]),e._v(" "),a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"60",expression:"'60'"}],attrs:{type:"primary"},on:{click:function(t){return e.setStatusAll(2)}}},[e._v("批量审核不通过")]),e._v(" "),a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"61",expression:"'61'"}],attrs:{type:"danger"},on:{click:e.delStatusAll}},[e._v("批量删除")])],1):e._e()],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"empty-text":e.emptyText},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"ID",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"标题",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"out-dot"},[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"作者",align:"center",width:"150",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gameName",label:"游戏专栏",filters:[{text:"天湖十三浪",value:"天湖十三浪"},{text:"欢乐斗地主",value:"欢乐斗地主"}],"filter-method":e.filterGames,"filter-placement":"bottom-end",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"success","disable-transitions":""}},[e._v(e._s(t.row.gameName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"评论数",width:"100",prop:"cmtCount",sortable:"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"顶/踩数",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{"disable-transitions":""}},[a("i",{staticClass:"fa fa-thumbs-o-up",attrs:{"aria-hidden":"true"}}),e._v("\n            "+e._s(t.row.upCount)+"\n          ")]),e._v(" "),a("el-tag",{attrs:{"disable-transitions":""}},[a("i",{staticClass:"fa fa-hand-o-down",attrs:{"aria-hidden":"true"}}),e._v("\n            "+e._s(t.row.stepCount)+"\n          ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"浏览次数",width:"100",prop:"browseCount",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"发布时间",width:"200",prop:"createTime",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"审核状态",filters:[{text:"审核中",value:1},{text:"审核通过",value:2},{text:"审核未通过",value:3}],"filter-method":e.filterStatus,"filter-placement":"bottom-end",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.approvalStatus?a("el-tag",[e._v("审核中")]):2===t.row.approvalStatus?a("el-tag",{attrs:{type:"success"}},[e._v("审核通过")]):a("el-tag",{attrs:{type:"danger"}},[e._v("审核不通过")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"59",expression:"'59'"}],attrs:{size:"mini"}},[a("el-link",{attrs:{href:e.httpUrl+"/strategy.html?id="+t.row.id,target:"_blank"}},[e._v("查看")])],1),e._v(" "),a("el-popover",{attrs:{placement:"top",width:"150",trigger:"click"},model:{value:e.visibleList[t.$index],callback:function(a){e.$set(e.visibleList,t.$index,a)},expression:"visibleList[scope.$index]"}},[[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-radio-group",{model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[a("el-radio",{attrs:{label:1}},[e._v("通过")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("不通过")])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"mt10",attrs:{justify:"center"}},[a("el-col",{attrs:{span:12}},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.cancelDelete(t.$index)}}},[e._v("取消")])],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.setStatus(t.$index,t.row.id)}}},[e._v("确定")])],1)],1)],e._v(" "),a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"60",expression:"'60'"}],attrs:{slot:"reference",size:"mini"},slot:"reference"},[e._v("状态修改")])],2),e._v(" "),a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"61",expression:"'61'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row.id)}}},[a("i",{staticClass:"el-icon-delete"}),e._v("删除\n          ")])]}}])})],1)],e._v(" "),[a("el-card",[a("el-pagination",{attrs:{"page-size":e.searchPage.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount,"prev-text":"上一页","next-text":"下一页"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]],2)}),[],!1,null,"5bb39142",null);t.default=r.exports}}]);
//# sourceMappingURL=10.3e431345fa7ecb8eae6f.js.map