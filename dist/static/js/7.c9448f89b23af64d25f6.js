webpackJsonp([7],{"0UkD":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cardshadow kehujiekuanTable"},[a("div",[a("el-form",{staticClass:"search-form-inline",attrs:{inline:!0,model:e.searchform}},[a("el-form-item",{attrs:{label:"客户姓名"}},[a("el-input",{staticClass:"nameinput",attrs:{size:"small"},model:{value:e.searchform.name,callback:function(t){e.$set(e.searchform,"name",t)},expression:"searchform.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{staticClass:"phoneinput",attrs:{size:"small"},model:{value:e.searchform.phone,callback:function(t){e.$set(e.searchform,"phone",t)},expression:"searchform.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证号"}},[a("el-input",{staticClass:"idnumberinput",attrs:{size:"small"},model:{value:e.searchform.idnumber,callback:function(t){e.$set(e.searchform,"idnumber",t)},expression:"searchform.idnumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"申请日期"}},[a("el-date-picker",{staticClass:"datepicker",attrs:{size:"small",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.value6,callback:function(t){e.value6=t},expression:"value6"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.onSubmit}},[e._v("查询")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.onSubmit}},[e._v("重置")])],1)],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",height:"250","tooltip-effect":"dark","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{fixed:"",type:"index",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"",label:"操作",width:"135"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-check",circle:""},on:{click:function(a){e.handleEdit(t.$index,t.row)}}}),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-delete",circle:""},on:{click:function(a){e.handleDelete(t.$index,t.row)}}}),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-message",circle:""},on:{click:function(a){e.handleDelete(t.$index,t.row)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"客户姓名",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phonenumber",label:"手机号码",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"credit",label:"信用标签",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"idnumber",label:"身份证号",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"applytime",label:"申请时间",width:"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"borrowamount",label:"借款金额",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"lendamount",label:"放款金额",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"payamount",label:"还款金额",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"borrowtime",label:"借款周期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"interestrate",label:"利率",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"paytime",label:"应还款时间",width:"120"}})],1),e._v(" "),a("el-pagination",{staticClass:"Paging",attrs:{layout:"prev, pager, next",align:"right",total:1e3}})],1)},staticRenderFns:[]};var n=a("VU/8")({name:"kehujiekuanTable",data:function(){return{searchform:{number:"",date:"",name:""},value6:"",tableData:[{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"},{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"},{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"},{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"},{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"},{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"},{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"}],currentRow:null}}},r,!1,function(e){a("2dvq")},"data-v-027a206b",null).exports,l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cardshadow kehujiekuanTabs"},[a("el-tabs",{attrs:{type:"card"}},[a("el-tab-pane",{attrs:{label:"订单申请信息"}},[a("div",[a("el-form",{staticClass:"form-inline",attrs:{inline:!0,model:e.searchform}},[a("el-form-item",{attrs:{label:"姓名"}},[a("span",[e._v(e._s(e.orderdata.name))])]),e._v(" "),a("el-form-item",{attrs:{label:"手机号码"}},[a("span",[e._v(e._s(e.orderdata.phonenumber))])]),e._v(" "),a("el-form-item",{attrs:{label:"信用标签"}},[a("span",[e._v(e._s(e.orderdata.credit))])]),e._v(" "),a("el-form-item",{attrs:{label:"身份证号"}},[a("span",[e._v(e._s(e.orderdata.idnumber))])]),e._v(" "),a("el-form-item",{attrs:{label:"申请时间"}},[a("span",[e._v(e._s(e.orderdata.applytime))])]),e._v(" "),a("el-form-item",{attrs:{label:"借款金额"}},[a("span",[e._v(e._s(e.orderdata.borrowamount))])]),e._v(" "),a("el-form-item",{attrs:{label:"放款金额"}},[a("span",[e._v(e._s(e.orderdata.lendamount))])]),e._v(" "),a("el-form-item",{attrs:{label:"应还款金额"}},[a("span",[e._v(e._s(e.orderdata.payamount))])]),e._v(" "),a("el-form-item",{attrs:{label:"借款周期"}},[a("span",[e._v(e._s(e.orderdata.borrowtime))])]),e._v(" "),a("el-form-item",{attrs:{label:"利率"}},[a("span",[e._v(e._s(e.orderdata.interestrate))])]),e._v(" "),a("el-form-item",{attrs:{label:"应还款时间"}},[a("span",[e._v(e._s(e.orderdata.paytime))])])],1)],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"客户基本信息"}},[e._v("客户基本信息")]),e._v(" "),a("el-tab-pane",{attrs:{label:"客户关系联系信息"}},[e._v("客户关系联系信息")]),e._v(" "),a("el-tab-pane",{attrs:{label:"工作认证信息"}},[e._v("工作认证信息")]),e._v(" "),a("el-tab-pane",{attrs:{label:"银行卡绑定信息"}},[e._v("银行卡绑定信息")]),e._v(" "),a("el-tab-pane",{attrs:{label:"客户手机通讯录"}},[e._v("客户手机通讯录")]),e._v(" "),a("el-tab-pane",{attrs:{label:"客户通话记录"}},[e._v("客户通话记录")]),e._v(" "),a("el-tab-pane",{attrs:{label:"借款记录"}},[e._v("借款记录")])],1)],1)},staticRenderFns:[]};var i={name:"kehujiekuanshengpi",components:{KehujiekuanTabs:a("VU/8")({name:"kehujiekuanTabs",data:function(){return{orderdata:{name:"张三",phonenumber:"15888888888",credit:"D级",idnumber:"321281198808088888",applytime:"2019-01-15 11:30:43",borrowamount:"10",lendamount:"8.5",payamount:"10.07",borrowtime:"7",interestrate:"0.001",paytime:"2019-01-21"}}}},l,!1,function(e){a("fTtS")},"data-v-5939f1b8",null).exports,KehujiekuanTable:n}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("kehujiekuan-table"),this._v(" "),t("kehujiekuan-tabs",{staticClass:"tabs"})],1)},staticRenderFns:[]};var m=a("VU/8")(i,o,!1,function(e){a("G+g6")},"data-v-3d0d0e64",null);t.default=m.exports},"2dvq":function(e,t){},"G+g6":function(e,t){},fTtS:function(e,t){}});
//# sourceMappingURL=7.c9448f89b23af64d25f6.js.map