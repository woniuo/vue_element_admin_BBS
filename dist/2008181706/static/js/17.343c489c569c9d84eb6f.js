(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"0T9/":function(e,t,a){},"5s63":function(e,t,a){"use strict";var i=a("hoNk");a.n(i).a},hoNk:function(e,t,a){},kOZB:function(e,t,a){"use strict";a.r(t);var i=a("GguQ"),s=a.n(i),r={name:"news",props:{nid:Number},data:function(){return{editor:null,progressFlag:!1,progressPercent:0,emptyText:"加载中...",loading:!1,type:!0,disabled:!1,ruleForm:{title:"",remark:"",cover:"",content:"",id:""},rules:{title:[{required:!0,message:"请输入发布标题",trigger:"blur"},{max:30,message:"标题长度不能超过30个字符串",trigger:"blur"}],radio:[{required:!0,message:""}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(a){if(!a)return console.log("error submit!!"),!1;t.$request.fetchAddNews(t.ruleForm).then((function(a){200===a.data.code?(t.resetForm(e),t.$message.success("修改成功"),t.$emit("colseCallBack")):t.$message.error("修改失败")}))}))},resetForm:function(e){this.$refs[e].resetFields(),this.ruleForm.cover="",this.editor.txt.clear()},handleAvatarSuccess:function(e,t){var a=this;this.ruleForm.cover=e.msg,this.progressPercent=100,setTimeout((function(){a.progressFlag=!1}),1e3)},beforeAvatarUpload:function(e){this.progressFlag=!1;var t=e.size/1024/1024<20;return-1==["image/jpg","image/png","image/gif","image/jpeg"].indexOf(e.type)?(this.$message.error("上传图片只能是jpg|jpeg|png|gif格式!"),!1):t?void 0:(this.$message.error("上传图片大小不能超过 20MB!"),!1)},uploadFileProcess:function(e,t,a){var i=this;a.forEach((function(e){100===e.percentage||(i.progressFlag=!0,i.progressPercent=Math.abs(e.percentage.toFixed(0)))}))},getNews:function(e,t){var a=this;this.loading=!0,this.type=e,this.$request.fetchGetNewsData({id:t}).then((function(t){if(200===t.data.code){var i=t.data.data,s=i.title,r=i.remark,l=i.cover,n=i.id,o=i.content;a.ruleForm={title:s,remark:r,cover:l,id:n,content:o},a.editor.txt.html(o),e?(a.editor.$textElem.attr("contenteditable",!1),a.disabled=!0):(a.editor.$textElem.attr("contenteditable",!0),a.disabled=!1)}else a.$message.error("数据加载失败");a.emptyText="暂无数据",a.loading=!1}))}},mounted:function(){var e=this,t=(this.$route.query.articleId,new s.a(this.$refs.editor));this.editor=t,t.customConfig.uploadImgServer=this.apiUrl+"/upload/editorUpload",t.customConfig.uploadFileName="file",t.customConfig.onchange=function(t){e.ruleForm.content=t},t.create(),this.editor.$textContainerElem.css("height","500px !important")}},l=(a("5s63"),a("KHd+")),n={name:"newsList",components:{vNews:Object(l.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"hide-relative"},[e.loading?a("div",{staticClass:"hide-loading loading"},[a("span",{staticClass:"el-icon-loading"}),e._v("玩命加载中....\n    ")]):e._e(),e._v(" "),a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{disabled:e.disabled},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),e.type?e._e():a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{align:"center"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保 存")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重 置")])],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"简介",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",maxlength:"200","show-word-limit":"",disabled:e.disabled},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"缩略图",prop:"thumbnail"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.apiUrl+"/upload/uploadFile","show-file-list":!1,"on-success":e.handleAvatarSuccess,"on-progress":e.uploadFileProcess,"before-upload":e.beforeAvatarUpload,disabled:e.disabled}},[e.ruleForm.cover?a("img",{staticClass:"avatar",attrs:{src:e.ruleForm.cover}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),a("span",{staticClass:"up-desc"},[e._v("说明: 上传图片大小不能超过20M")]),e._v(" "),e.progressFlag?a("div",{staticClass:"progress-box"},[a("el-progress",{attrs:{percentage:e.progressPercent}})],1):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"主体内容",prop:"content"}},[a("div",{ref:"editor"})])],1)],1)],1)}),[],!1,null,"4c93aa94",null).exports},data:function(){return{radio:1,visibleList:[],tableData:[],multipleSelection:[],emptyText:"加载中...",searchPage:{page:1,pageSize:10,title:""},totalCount:0,totalPage:0,dialogVisible:!1,tabTitle:""}},methods:{handleClose:function(e){this.$confirm("确认关闭？").then((function(t){e()})).catch((function(e){}))},closeCallBack:function(){this.dialogVisible=!1,this.getList(this.searchPage)},lookNews:function(e){var t=this;this.tabTitle="查看新闻",this.dialogVisible=!0,setTimeout((function(){t.$refs.newsShow.getNews(!0,e)}),0)},editNews:function(e){var t=this;this.tabTitle="编辑新闻",this.dialogVisible=!0,setTimeout((function(){t.$refs.newsShow.getNews(!1,e)}),0)},handleDelete:function(e,t){var a=this;this.$request.fetchDelNews({id:t}).then((function(t){200===t.data.code?(a.tableData.splice(e,1),a.$message.success("删除成功"),0===a.tableData.length&&(a.searchPage.page--,a.getList(a.searchPage))):a.$message.error("删除失败")}))},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.searchPage.pageSize=e,this.getList(this.searchPage)},handleCurrentChange:function(e){this.searchPage.page=e,this.getList(this.searchPage)},onSubmit:function(){this.getList(this.searchPage)},delStatusAll:function(){var e=this;this.$confirm("您勾选的确定全部删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"批量删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消操作"})}))},cancelDelete:function(e){this.$set(this.visibleList,e,!1),this.radio=1},getList:function(e){var t=this;this.$request.fetchGetNewsList(e).then((function(e){200===e.data.code?(t.tableData=e.data.data.list,t.searchPage.page=e.data.data.currPage,t.totalCount=e.data.data.totalCount,t.totalPage=e.data.data.totalPage):t.$message.error("数据获取失败"),t.emptyText="暂无数据"}))}},mounted:function(){this.getList(this.searchPage)},watch:{"searchPage.title":{handler:function(e){0===e.length&&(this.searchPage.page=1,this.getList(this.searchPage))}}}},o=(a("oLFF"),Object(l.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[[a("el-card",[a("el-row",{attrs:{span:24}},[a("el-col",{attrs:{span:12}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchPage}},[a("el-form-item",{attrs:{label:"新闻查询"}},[a("el-input",{attrs:{placeholder:"请输入新闻标题查询"},model:{value:e.searchPage.title,callback:function(t){e.$set(e.searchPage,"title",t)},expression:"searchPage.title"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1)],1)],1),e._v(" "),e.multipleSelection.length>0?a("el-col",{attrs:{span:12,align:"right"}},[a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"79",expression:"'79'"}],attrs:{type:"danger"},on:{click:e.delStatusAll}},[e._v("批量删除")])],1):e._e()],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"empty-text":e.emptyText},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"ID",width:"150",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"标题",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"out-dot"},[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"发布人",align:"center",width:"200",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{label:"浏览次数",width:"200",prop:"cmtCount",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"发布时间",width:"250",prop:"createTime",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"350"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"77",expression:"'77'"}],attrs:{size:"mini"},on:{click:function(a){return e.lookNews(t.row.id)}}},[e._v("查看")]),e._v(" "),a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"78",expression:"'78'"}],attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editNews(t.row.id)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"79",expression:"'79'"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row.id)}}},[a("i",{staticClass:"el-icon-delete"}),e._v("删除\n          ")])]}}])})],1)],e._v(" "),[a("el-card",[a("el-pagination",{attrs:{"page-size":e.searchPage.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount,"prev-text":"上一页","next-text":"下一页"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],e._v(" "),[a("el-dialog",{attrs:{title:e.tabTitle,visible:e.dialogVisible,width:"75%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("v-news",{ref:"newsShow",on:{colseCallBack:e.closeCallBack}})],1)]],2)}),[],!1,null,"3549d473",null));t.default=o.exports},oLFF:function(e,t,a){"use strict";var i=a("0T9/");a.n(i).a}}]);
//# sourceMappingURL=17.343c489c569c9d84eb6f.js.map