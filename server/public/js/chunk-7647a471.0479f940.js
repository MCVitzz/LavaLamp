(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7647a471"],{"0a37":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("CreateProjectComponent",{on:{redraw:function(t){return e.$emit("redraw")}}})},c=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h1",[n("Logo",{staticClass:"logo"}),e._v(" Create new Project ")],1),n("p",[e._v(" Project Name "),n("Textbox",{ref:"txt",attrs:{placeholder:"Enter Project Name..."},on:{keyUp:e.keyUp},model:{value:e.projectName,callback:function(t){e.projectName=t},expression:"projectName"}})],1),n("Button",{staticClass:"button",attrs:{value:"Next"},on:{clicked:e.btnLoginClick}})],1)},a=[],u=(n("96cf"),n("1da1")),s=n("fe4b"),i=n("5283"),l=n("40e9"),p=n("e8a8"),f={name:"CreateProjectComponent",components:{Button:i["a"],Textbox:s["a"],Logo:l["a"]},data:function(){return{projectName:""}},methods:{keyUp:function(e){13==e.keyCode&&this.createProject(this.projectName)},btnLoginClick:function(){this.createProject(this.projectName)},createProject:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["a"].addProject({name:t});case 2:this.$toasted.global.success({message:"😎 Created project!"}),this.$emit("redraw"),this.$router.push("/dashboard");case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},mounted:function(){this.$refs.txt.focus()}},h=f,m=(n("0ecc"),n("2877")),d=Object(m["a"])(h,r,a,!1,null,"3512307a",null),v=d.exports,j={components:{CreateProjectComponent:v}},b=j,k=Object(m["a"])(b,o,c,!1,null,null,null);t["default"]=k.exports},"0ecc":function(e,t,n){"use strict";n("1626")},1626:function(e,t,n){},"44c5":function(e,t,n){},5283:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{on:{click:e.clicked}},[e._v(e._s(e.value))])},c=[],r={name:"Button",props:["value"],methods:{clicked:function(){this.$emit("clicked")}}},a=r,u=(n("acc6"),n("2877")),s=Object(u["a"])(a,o,c,!1,null,"75e11502",null);t["a"]=s.exports},a171:function(e,t,n){},acc6:function(e,t,n){"use strict";n("a171")},f11e:function(e,t,n){"use strict";n("44c5")},fe4b:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{ref:"input",attrs:{placeholder:e.placeholder,type:e.password?"password":"text"},domProps:{value:e.value},on:{focus:e.onFocus,blur:e.onBlur,keyup:e.onKeyUp,change:e.onChange,input:e.onInput}})},c=[],r={name:"Textbox",props:["value","placeholder","password"],methods:{focus:function(){this.$nextTick((function(){this.$refs.input.focus()}))},onFocus:function(e){this.$emit("focus",e)},onBlur:function(e){this.$emit("blur",e)},onKeyUp:function(e){this.$emit("keyUp",e)},getValue:function(){return this.$refs.input.value},onChange:function(e){this.$emit("changed",e)},onInput:function(e){this.$emit("input",e.target.value)},empty:function(){this.$refs.input.value=""}}},a=r,u=(n("f11e"),n("2877")),s=Object(u["a"])(a,o,c,!1,null,"65d390c0",null);t["a"]=s.exports}}]);
//# sourceMappingURL=chunk-7647a471.0479f940.js.map