webpackJsonp([1],{427:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i}),n.d(t,"c",function(){return s});var o,a;!function(e){e.EN="en",e.ZH="zh"}(a||(a={}));var l=a,c=l.EN,u=l.ZH,i=(o={},r(o,c,u),r(o,u,c),function(e){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}),s=function(e,t,n,r,o,a){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var l="";if(n)switch(n.constructor){case Number:l=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:l="; expires="+n;break;case Date:l="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+l+(o?"; domain="+o:"")+(r?"; path="+r:"")+(a?"; secure":""),!0}},504:function(e,t,n){"use strict";var r=n(505);n.d(t,"a",function(){return r.b}),n.d(t,"c",function(){return r.c});var o=n(660);n.d(t,"b",function(){return o.a});var a=n(664);n.d(t,"d",function(){return a.a})},505:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(!r||!1!==r.configurable){var o=function(t){return t||(t={},Object.defineProperty(e,"_watchers",{value:t}),t)}(e._watchers);o[t]||(o[t]=[]),e.$watch||Object.defineProperty(e,"$watch",{value:function(e,t){var n=o[e];if(n)return n.push(t),function(){var e=n.indexOf(t);e<0||n.splice(e,1)}}});var a=r&&r.get,l=r&&r.set;Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){return a?a.call(e):n},set:function(r){var c=a?a.call(e):n;r===c||r!==r&&c!==c||(l?l.call(e,r):n=r,o[t].forEach(function(e){e(r,c)}))}})}}n.d(t,"b",function(){return c}),n.d(t,"a",function(){return u}),n.d(t,"d",function(){return s}),n.d(t,"c",function(){return f});var a,l,c="locale",u="defaultLocale",i=function(e,t){t=t.replace(/\[(\d+)\]/g,".$1");var n=e;return t.split(".").some(function(e){if(!n||"object"!==r(n))return!0;n=n[e]}),"object"===r(n)?n&&n.toString():n},s=function(e){l&&l(a,e)},f=function(e){"string"==typeof e&&(e={locale:e});var t=e,n=t.locale,r=t.translations,s=t.defaultLocale,f=t.merge;r?a||(a=r):a||(a={}),f&&(l||(l=f));var p=function e(t,n,r){var o=e.locale,l=a[o],c=i(l,t);if(void 0===c){var u=e.defaultLocale;if(u&&u!==o){var s=a[u];c=i(s,t)}}return c=c&&c.replace(/{([^{}]+)}/g,function(e,t){return i(n,t.trim())}),null==c?t:c};return o(p,c,n),o(p,u,s),p}},507:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(428),o=n(89),a=(n.n(o),n(650)),l=(n.n(a),n(504)),c=n(427),u=n(666),i=n(667),s=o.Fragment,f=Object(l.c)({defaultLocale:"en",locale:Object(c.b)("locale")||"zh",translations:i.a,merge:r.a}),p=function(){return Object(a.render)(o.createElement(s,null,o.createElement(l.b,{translator:f},o.createElement(u.a,null))),document.getElementById("app"))};p()},660:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function c(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.d(t,"a",function(){return f});var i=n(506),s=(n.n(i),n(89)),f=(n.n(s),function(e){function t(){return o(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"getChildContext",value:function(){return{translator:this.props.translator}}},{key:"render",value:function(){return s.Children.only(this.props.children)}}]),t}(s.PureComponent));f.childContextTypes={translator:i.func.isRequired}},664:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function c(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return function(t){var n=function(n){function r(e,t){var n;o(this,r),n=c(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e,t));var a=n.context.translator;return n.state={locale:a.locale,defaultLocale:a.defaultLocale},n.unwatchLocale=a.$watch(p.b,function(e){n.setState({locale:e})}),n.unwatchDefaultLocale=a.$watch(p.a,function(e){n.setState({defaultLocale:e})}),n}return u(r,n),l(r,[{key:"componentWillMount",value:function(){var t=r.cid;e&&-1===m.indexOf(t)&&(Object(p.d)(e),m.push(t))}},{key:"componentWillUnmount",value:function(){this.unwatchLocale(),this.unwatchDefaultLocale()}},{key:"render",value:function(){var e=this.context.translator;return f.createElement(t,Object.assign({},this.props,{t:e,locale:e.locale}))}}]),r}(f.PureComponent);return n.cid=d++,n.contextTypes={translator:s.func.isRequired},b(n,t)}}t.a=i;var s=n(506),f=(n.n(s),n(89)),p=(n.n(f),n(505)),b=n(665),d=0,m=[]},666:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function c(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var s=n(89),f=(n.n(s),n(504)),p=n(427),b=Object(f.d)({zh:{x_man:"X 战警"},en:{x_man:"X Men"}})(function(e){var t=e.t;return s.createElement("div",null,t("x_man"))});t.a=Object(f.d)({en:{defaultMsg:"Default Message"}})(function(e){function t(e,n){var r;return o(this,t),r=c(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n)),r.state={a:1,b:1},r.changed=0,r.addA=r.addA.bind(i(r)),r.addB=r.addB.bind(i(r)),r.handleSelect=r.handleSelect.bind(i(r)),r}return u(t,e),l(t,[{key:"handleSelect",value:function(e){this.props.t.locale=e.target.value}},{key:"addA",value:function(){this.setState({a:this.state.a+1})}},{key:"addB",value:function(){this.setState({b:this.state.b+1})}},{key:"componentDidMount",value:function(){var e=this;this.props.t.$watch(f.a,function(t,n){console.log("prev:",n),console.log("curr:",t),Object(p.c)("locale",t),++e.changed%3==0&&alert("you have changed locale "+e.changed+" times!")})}},{key:"render",value:function(){var e=this.props.t,t=this.state,n=t.a,r=t.b;return s.createElement("table",{className:"table table-bordered"},s.createElement("tbody",null,s.createElement("tr",null,s.createElement("td",null,e("basic")),s.createElement("td",null,s.createElement("div",{className:"form-group"},s.createElement("label",{className:"col-sm-2 control-label"},e("hello_world")),s.createElement("div",{className:"col-sm-10"},s.createElement("select",{className:"form-control",defaultValue:e.locale,onChange:this.handleSelect},s.createElement("option",{value:"zh"},"中文"),s.createElement("option",{value:"en"},"English")))))),s.createElement("tr",null,s.createElement("td",null,e("default")),s.createElement("td",null,s.createElement("div",null,e("default_message")))),s.createElement("tr",null,s.createElement("td",null,e("nestedKey")),s.createElement("td",null,e("nested.a"))),s.createElement("tr",null,s.createElement("td",null,e("obj_param")),s.createElement("td",null,s.createElement("div",null,e("objParam",{a:n,b:r,sum:n+r}),s.createElement("button",{className:"btn btn-default",onClick:this.addA},"a + 1"),s.createElement("button",{className:"btn btn-default",onClick:this.addB},"b + 1")))),s.createElement("tr",null,s.createElement("td",null,e("arr_param")),s.createElement("td",null,s.createElement("div",null,e("arrParam",[e("zhang_san"),e("zhao_si"),e("wang_wu")])))),s.createElement("tr",null,s.createElement("td",null,e("arr_key")),s.createElement("td",null,s.createElement("div",null,e("arr_keys[0]"),", ",e("arr_keys[1]")))),s.createElement("tr",null,s.createElement("td",null,e("component_translator")),s.createElement("td",null,s.createElement(b,null)))))}}]),t}(s.PureComponent))},667:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return i});var o,a=(n(428),n(427)),l=n(668),c=a.a.EN,u=a.a.ZH,i=(o={},r(o,c,[]),r(o,u,[]),l.keys().reduce(function(e,t){var n=l(t),r=t.match(/([\w-]*[\w]+)\.i18n\.json$/)[1],o=e[r]||(e[r]={});return Object.assign(o,n),e},{}))},668:function(e,t,n){function r(e){return n(o(e))}function o(e){var t=a[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var a={"./core.en.i18n.json":669,"./core.zh.i18n.json":670};r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id=668},669:function(e,t){e.exports={basic:"Basic",default:"Default",nestedKey:"Nested",obj_param:"Object Param",arr_param:"Array Param",arr_key:"Array Key",component_translator:"Component Translator",hello_world:"Hello World",default_message:"Default Message",nested:{a:"Nested A",b:"Nested B"},objParam:"{ a } plus { b } equals {sum }",arrParam:"I have three brothers, their names are {0}, {1} and {2}",zhang_san:"Peter",zhao_si:"Tom",wang_wu:"John",arr_keys:["Key1","Key2"]}},670:function(e,t){e.exports={basic:"基础",default:"缺省",nestedKey:"嵌套",obj_param:"对象参数",arr_param:"数组参数",arr_key:"数组键",component_translator:"组件翻译",hello_world:"你好世界",nested:{a:"嵌套 A",b:"嵌套 B"},objParam:"{ a } 与 { b } 的和是 { sum }",arrParam:"我有三个兄弟，他们叫{0}，{1}和{2}",zhang_san:"张三",zhao_si:"赵四",wang_wu:"王五"}}},[507]);