(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8872],{72002:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/profile",function(){return n(70588)}])},48043:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(85893),a=n(61990),s=n.n(a),i=n(74931),o=n(67294);function l(e){let t,{name:n="",type:a="",value:l="",placeholder:c="",disabled:d=!1,inputStyles:u="def",onChange:x=()=>{},onBlur:p=()=>{}}=e,[m,h]=(0,o.useState)(!1),[b,f]=(0,o.useState)("");return null===l&&(l=""),"def"===u&&(t=!1===d?s().inputDefault:s().inputDisabled),"line"===u&&(t=!1===d?s().inputDefaultLine:s().inputDisabledLine),(0,o.useEffect)(()=>{f(a)},[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:s().input,children:[(0,r.jsx)("input",{name:n,type:b,value:l,placeholder:c,disabled:!0===d?"disabled":"",className:t,onChange:x,onBlur:p}),(0,r.jsx)("button",{type:"button",className:s().eyeIcon,onClick:()=>{let e=!m;f(e?"text":"password"),h(e)},children:"def"===u&&"password"===a&&!1===d?m?(0,r.jsx)(i.y7o,{}):(0,r.jsx)(i.HR2,{}):null})]})})}},42916:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(85893),a=n(86605),s=n(42179),i=n(747),o=n(83886);let l="#d9d9d9",c=(0,o.Z)({components:{MuiSelect:{styleOverrides:{root:{height:"44px",width:"100%",fontFamily:"Noto Serif JP, serif","& .MuiSelect-select":{padding:"8px 16px"},"& .MuiOutlinedInput-notchedOutline":{border:"".concat("2px"," solid ").concat(l),lineHeight:1,borderRadius:"8px"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:"#bbb29f"},"&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"#bbb29f",boxShadow:"0 0 0 3px ".concat("#efede8")},"& .MuiSelect-icon":{transition:"200ms"}}}},MuiPaper:{styleOverrides:{root:{border:"".concat("2px"," solid ").concat(l),borderRadius:"8px",boxShadow:"none"}}},MuiList:{styleOverrides:{root:{maxHeight:"300px",overflow:"auto"}}},MuiMenuItem:{styleOverrides:{root:{fontFamily:"Noto Serif JP, serif","&.Mui-selected":{backgroundColor:"#efede8"},"&.Mui-selected:hover":{backgroundColor:"#efede8"}}}}}});var d=n(48234);function u(e){let{name:t="",value:n="placeholder",placeholder:o="",options:l=[],onChange:u=()=>{}}=e;if(!Array.isArray(l)){console.error("options不是陣列，請確認",l);return}return(0===l.length||null===n||""===n)&&(n="placeholder"),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(i.Z,{theme:c,children:(0,r.jsxs)(s.Z,{name:t,value:n,onChange:u,IconComponent:d.Z,children:["placeholder"===n&&o?(0,r.jsx)(a.Z,{value:"placeholder",disabled:!0,children:o}):"",l.map((e,t)=>(0,r.jsx)(a.Z,{value:e.value,disabled:e.disabled,children:e.text},t))]})})})}},21399:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(85893),a=n(89262),s=n(98163);let i=(0,a.ZP)(s.Z)(e=>{let{type:t}=e;return{color:"pri"===t?"var(--sec-1)":"sec"===t?"var(--text-grey)":"var(--text-dark)",fontFamily:'"Noto Serif JP", serif',minWidth:"2rem",padding:"2px 8px","&:hover":{color:"pri"===t?"#8C764C":"sec"===t?"#868686":"var(--sec-1)",backgroundColor:"transparent"}}});function o(e){let{btnText:t,type:n="def",href:a="/",onClick:s}=e;return(0,r.jsx)(i,{size:"medium",type:n,href:a,onClick:s,children:t})}},22535:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(85893),a=n(11163),s=n(41664),i=n.n(s),o=n(98216),l=n.n(o),c=n(78773);function d(){let e=(0,a.useRouter)(),t=t=>t.some(t=>e.pathname.startsWith(t));return(0,r.jsx)("ul",{className:l().userTab,children:[{key:"profile",name:"會員資料",link:"/user/profile",paths:["/user/profile","/user/reset-password"]},{key:"reservation",name:"行程預約",link:"/user/reservation/ongoing",paths:["/user/reservation"]},{key:"orders",name:"商品訂單",link:"/user/orders/ongoing",paths:["/user/orders"]},{key:"favorite",name:"我的收藏",link:"/user/favorite",paths:["/user/favorite"]},{key:"coupons",name:"優惠券",link:"/user/coupon/ongoing",paths:["/user/coupon"]}].map((e,n)=>(0,r.jsx)("li",{className:t(e.paths)?l().active:"",children:(0,r.jsxs)(i(),{href:e.link,children:[(0,r.jsx)(c.ycZ,{}),(0,r.jsx)("span",{children:e.name})]})},e.key))})}},96345:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(85893);n(67294);var a=n(5024),s=n.n(a);function i(e){let{userTab:t,userTabSec:n,sectionRight:a}=e;return(0,r.jsx)("section",{className:s().sectionContainer,children:(0,r.jsxs)("div",{className:s().sectionBody,children:[t,(0,r.jsxs)("div",{className:s().sectionRight,children:[n,a]})]})})}},7337:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(85893),a=n(57779),s=n.n(a),i=n(78773);function o(e){let{icon:t=i.DNl,content:n}=e;return(0,r.jsxs)("div",{className:s().iconTextRow,children:[(0,r.jsx)(t,{}),(0,r.jsx)("p",{className:s().contentText,children:n})]})}},83354:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(85893),a=n(56309),s=n.n(a),i=n(89262),o=n(98163),l=n(11828);let c=(0,i.ZP)(o.Z)(e=>{let{bgtype:t}=e;return{gridColumn:"span 2",display:"flex",justifyContent:"space-between",color:"var(--text-dark)",fontSize:"1.125rem",fontFamily:'"Noto Serif JP", serif',backgroundColor:"fill"===t?"#F2F2F2":"white",border:"fill"===t?"none":"2px solid #F2F2F2",padding:"0.875rem 1.25rem",borderRadius:"var(--input-radius)",boxShadow:"none",width:"100%","&:hover":{backgroundColor:"#fafafa",boxShadow:"none"}}});function d(e){let{btnText:t="請選擇收件人資料",iconType:n="arrow",bgtype:a="fill",onClick:i={onClick:i}}=e;return(0,r.jsxs)(c,{bgtype:a,onClick:i,type:"button",children:[(0,r.jsx)("p",{className:s().btnTextStyle,children:t}),"arrow"===n?(0,r.jsx)(l.hjJ,{}):(0,r.jsx)(l.D0w,{})]})}},38187:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(85893),a=n(4131),s=n.n(a),i=n(48043),o=n(81880);function l(e){let{label:t="label",name:n="",type:a="",value:l="",placeholder:c="",disabled:d=!1,errorText:u="",onChange:x=()=>{},onBlur:p=()=>{}}=e;return(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:n,className:s().label,children:t}),(0,r.jsx)(i.Z,{name:n,type:a,value:l,placeholder:c,disabled:d,onChange:x,onBlur:p}),(0,r.jsx)(o.Z,{errorText:u})]})}},81880:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(85893),a=n(2398),s=n.n(a);function i(e){let{errorText:t=""}=e;return(0,r.jsx)("div",{className:s().errorBox,children:(0,r.jsx)("span",{className:s().errorText,children:t})})}},6097:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(85893),a=n(81059),s=n.n(a),i=n(42916),o=n(81880);function l(e){let{label:t="label",name:n="",value:a="",placeholder:l="",options:c=[],errorText:d="",onChange:u=()=>{}}=e;return(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:n,className:s().label,children:t}),(0,r.jsx)(i.Z,{name:n,placeholder:l,value:a,options:c,onChange:u}),(0,r.jsx)(o.Z,{errorText:d})]})}},56534:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(85893),a=n(7630),s=n.n(a),i=n(48043),o=n(35514),l=n(45732);function c(e){let{label:t="",required:n=!1,name:a="",type:c="",value:d="",placeholder:u="",disabled:x=!1,btn:p=!1,btnText:m="",errorText:h="",onChange:b=()=>{},btnOnClick:f=()=>{}}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:s().formItem,children:[(0,r.jsx)("label",{htmlFor:a,className:s().myLabel,children:(0,r.jsx)(l.Z,{badgeContent:n?"*":0,color:"error",variant:"dot",children:t})}),(0,r.jsxs)("div",{className:s().myDiv,children:[(0,r.jsxs)("div",{className:s().row,children:[(0,r.jsx)(i.Z,{name:a,type:c,value:d,placeholder:u,disabled:x,onChange:b}),p?(0,r.jsx)("div",{className:s().button,children:(0,r.jsx)(o.Z,{onClick:f,btnText:m})}):null]}),(0,r.jsx)("div",{className:s().errorText,children:""!==h?(0,r.jsx)("span",{children:h}):""})]})]})})}},78519:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(85893),a=n(1822),s=n.n(a),i=n(84295),o=n(33367),l=n(11163),c=n(34815);function d(e){let{text:t="",href:n,quickInput:a=""}=e,d=(0,l.useRouter)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"jsx-f8c0c1a5f1e34c31 title",children:[n?(0,r.jsx)(o.Z,{onClick:()=>{n&&d.push(n)},children:(0,r.jsx)(i.Wuc,{})}):null,(0,r.jsx)("h5",{className:"jsx-f8c0c1a5f1e34c31",children:t}),""===a?null:(0,r.jsx)(c.Z,{btnText:(0,r.jsx)("span",{style:{color:"#FFF"},className:"jsx-f8c0c1a5f1e34c31",children:"快速輸入"}),onClick:a})]}),(0,r.jsx)(s(),{id:"f8c0c1a5f1e34c31",children:".title.jsx-f8c0c1a5f1e34c31{width:100%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;gap:1rem;padding-bottom:10px;margin-bottom:20px;border-bottom:1px solid#d9d9d9;svg {\r\n            fill: #b99755;\r\n            font-size: 1.25rem;\r\n          }\r\n        }"})]})}},70588:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return eA}});var r=n(85893),a=n(67294),s=n(11163),i=n(16075),o=n(53483),l=n(22535),c=n(96345),d=n(45747),u=n(97928),x=n(7820),p=n(88629),m=n.n(p),h=n(78519),b=n(56534),f=n(7630),_=n.n(f),g=n(41869),j=n(69271),v=n(72984),y=n(3859),C=n(747),Z=n(83886);let k=(0,Z.Z)({components:{MuiRadio:{styleOverrides:{root:{"&:hover":{backgroundColor:"unset"}}}},MuiTypography:{styleOverrides:{root:{fontFamily:"Noto Serif JP"}}},MuiSvgIcon:{styleOverrides:{root:{'&[data-testid="RadioButtonUncheckedIcon"]':{fill:"#BBBBBB"},'&[data-testid="RadioButtonCheckedIcon"]':{fill:"#222222"}}}}}});function w(e){let{radios:t=[],name:n="",checked:s="",disabled:i=!1,onChange:o=()=>{}}=e,[l,c]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(!Array.isArray(t)){console.error("提供的radios不是陣列，請確認 >>",t);return}c(!0)},[]),(0,r.jsx)(r.Fragment,{children:l?(0,r.jsx)(C.Z,{theme:k,children:(0,r.jsx)(g.Z,{height:44,display:"flex",alignItems:"center",children:(0,r.jsx)(j.Z,{row:!0,name:n,children:null==t?void 0:t.map((e,t)=>(0,r.jsx)(v.Z,{value:e.value,control:(0,r.jsx)(y.Z,{}),label:e.label,disabled:i,checked:s===e.value,onChange:o},t))})})}):""})}function T(e){let{label:t="",errorText:n="",radios:a=[],name:s="",checked:i="",disabled:o=!1,onChange:l=()=>{}}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:_().formItem,children:[(0,r.jsx)("label",{className:_().myLabel,htmlFor:s,children:t}),(0,r.jsxs)("div",{className:_().myDiv,children:[(0,r.jsx)(w,{radios:a,name:s,disabled:o,checked:i,onChange:l}),(0,r.jsx)("div",{className:_().errorText,children:""!==n?(0,r.jsx)("span",{children:n}):""})]})]})})}var N=n(42916),S=n(35514);function D(e){let{name:t="",value:n="",placeholder:a="",options:s=[],label:i="",btn:o=!1,btnText:l="",errorText:c="",onChange:d=()=>{},btnOnClick:u=()=>{}}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:_().formItem,children:[(0,r.jsx)("label",{htmlFor:t,className:_().myLabel,children:i}),(0,r.jsxs)("div",{className:_().myDiv,children:[(0,r.jsxs)("div",{className:_().selectBtn,children:[(0,r.jsx)(N.Z,{name:t,placeholder:a,value:n,options:s,onChange:d}),o?(0,r.jsx)("div",{className:_().button,children:(0,r.jsx)(S.Z,{href:null,onClick:u,btnText:l})}):null]}),(0,r.jsx)("div",{className:_().errorText,children:""!==c?(0,r.jsx)("span",{children:c}):""})]})]})})}function F(e){let{options:t=[],value:n="",label:a="",name:s="",errorText:i="",onChange:o=()=>{}}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:_().formItem,children:[(0,r.jsx)("label",{htmlFor:s,className:_().myLabel,children:a}),(0,r.jsxs)("div",{className:_().myDiv,children:[(0,r.jsxs)("div",{className:_().birthday,children:[(0,r.jsx)(N.Z,{options:t.years,value:n.year,name:"year",placeholder:"年",onChange:o}),(0,r.jsx)(N.Z,{options:t.months,value:n.month,name:"month",placeholder:"月",onChange:o}),(0,r.jsx)(N.Z,{options:t.dates,value:n.date,name:"date",placeholder:"日",onChange:o})]}),""!==i?(0,r.jsx)("span",{className:_().errorText,children:i}):""]})]})})}var z=n(82729),B=n(16829),O=n(25675),I=n.n(O),R=n(78773);function M(){let e=(0,z._)(["\n    position: relative;\n    width: 250px;\n    height: 250px;\n    border-radius: 125px;\n    background-color: #222222;\n    border: 1px solid #222222;\n    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);\n  "]);return M=function(){return e},e}function P(){let e=(0,z._)(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    inset: 0;\n    color: white;\n    border-radius: 125px;\n    font-size: 50px;\n    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));\n    opacity: 0;\n    transition: all 0.2s ease-in-out;\n    &:hover {\n      opacity: 1;\n      background-color: rgba(255, 255, 255, 0.2);\n    }\n  "]);return P=function(){return e},e}function E(e){let{avatar:t="",open:n}=e,a=B.Z.button(M()),s=B.Z.div(P());return(0,r.jsxs)(a,{onClick:n,children:[""!==t?(0,r.jsx)(I(),{src:"".concat(d.UW,"/avatar/").concat(t),fill:!0,alt:" ",style:{objectFit:"contain",borderRadius:"100%"}}):null,(0,r.jsx)(s,{children:(0,r.jsx)(R.Qvc,{})})]})}var L=n(1822),A=n.n(L),U=n(32512),W=n(33129),J=n.n(W);n(99903);var H=n(27997),q=n.n(H),G=n(7343),K=n(11202);function Q(e){let{color:t,colorChange:n}=e,[s,i]=(0,a.useState)(null);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(S.Z,{btnText:"背景顏色",href:null,onClick:e=>{i(e.currentTarget)},children:"Open Popover"}),(0,r.jsx)(K.ZP,{open:!!s,anchorEl:s,onClose:()=>{i(null)},anchorOrigin:{vertical:"top",horizontal:"right"},children:(0,r.jsx)(G.xS,{color:t,onChange:n})})]})}function Y(e){let{children:t,uploadBtn:n,getRootProps:a,getInputProps:s,isDragActive:i,isDragReject:o,isDragAccept:l,hasImage:c,backgroundColor:d,handleColorChange:u}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{...a({className:"\n            ".concat(q().dorpZone," \n            ").concat(i?"":q().active,"\n            ").concat(l?q().accept:"","\n            ").concat(o?q().reject:"","\n                ")}),children:[(0,r.jsx)("input",{...s()}),t,l&&(0,r.jsxs)("span",{children:[(0,r.jsx)(R.FJM,{}),"此檔案可以上傳"]}),o&&(0,r.jsxs)("span",{children:[(0,r.jsx)(R.a4m,{}),"檔案需請選擇圖片，且需小於2MB"]}),!i&&(0,r.jsxs)("span",{children:[(0,r.jsx)(R.UZO,{}),"可拖放檔案至此區域，檔案需小於2MB"]}),(0,r.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,r.jsx)(S.Z,{href:null,btnText:c?"更換圖片":"上傳圖片",onClick:n,className:q().btn}),(0,r.jsx)(Q,{color:d,colorChange:u})]})]})})}var $=n(89262),V=n(64864),X=n(49346),ee=n(33367),et=n(9131),en=n(25008),er=n(39626),ea=n(61435);let es=(0,$.ZP)(V.Z)(e=>{let{theme:t}=e;return{"& .MuiDialogContent-root":{padding:t.spacing(2)},"& .MuiDialogActions-root":{padding:t.spacing(1)}}});function ei(e){let{children:t,openDialog:n,closeDialog:a,avatarSubmit:s,resetUploader:i}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(es,{onClose:()=>{a(),i()},"aria-labelledby":"customized-dialog-title",open:n,fullWidth:!0,children:[(0,r.jsx)(X.Z,{sx:{m:0,p:2},id:"customized-dialog-title",children:(0,r.jsx)("p",{children:"編輯頭像"})}),(0,r.jsx)(ee.Z,{"aria-label":"close",onClick:a,sx:{position:"absolute",right:8,top:8,color:e=>e.palette.grey[500]},children:(0,r.jsx)(er.Z,{})}),(0,r.jsxs)("form",{children:[(0,r.jsx)(et.Z,{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"20px"},children:t}),(0,r.jsxs)(en.Z,{children:[(0,r.jsx)(ea.Z,{btnText:"清除",href:null,onClick:i}),(0,r.jsx)(ea.Z,{btnText:"確認上傳",href:null,onClick:s})]})]})]})})}var eo=n(84295),el=n(35465),ec=n(82749),ed=n(92594);let eu=(0,Z.Z)({palette:{primary:{light:"#c7ab77",main:"#B99755",dark:"#81693b",contrastText:"#fff"}}});function ex(e){let{disabled:t=!1,value:n,zoomChange:a}=e;return(0,r.jsx)(C.Z,{theme:eu,children:(0,r.jsx)(g.Z,{sx:{width:300},children:(0,r.jsxs)(el.Z,{spacing:2,direction:"row",sx:{mb:1},alignItems:"center",children:[(0,r.jsx)(ee.Z,{"aria-label":"zoom-out",onClick:()=>a(null,n-.1),children:(0,r.jsx)(ed.gjP,{})}),(0,r.jsx)(ec.ZP,{disabled:t,value:n,step:.01,min:.1,max:2,"aria-label":"Zoom",onChange:a,color:"primary"}),(0,r.jsx)(ee.Z,{"aria-label":"zoom-in",onClick:()=>a(null,n+.1),children:(0,r.jsx)(ed.SJS,{})})]})})})}function ep(e){let{openDialog:t,closeDialog:n}=e,{openSnackbar:s}=(0,u.Ds)(),{auth:o,setAuthRefresh:l,getAuthHeader:c}=(0,i.aC)(),[x,p]=(0,a.useState)(""),[m,h]=(0,a.useState)(null),b=(0,a.useRef)(null),[f,_]=(0,a.useState)("rgb(236, 236, 236,0)"),{open:g,getRootProps:j,getInputProps:v,isDragActive:y,isDragReject:C,isDragAccept:Z}=(0,U.uI)({onDrop:e=>{if(e[0].size>2097152){s("圖片請小於 2MB","error");return}p(URL.createObjectURL(e[0]))},noClick:!0,multiple:!1,accept:{"image/jpeg":[],"image/jpg":[],"image/png":[],"image/gif":[],"image/bmp":[],"image/webp":[],"image/tiff":[],"image/svg":[]}}),[k,w]=(0,a.useState)(.1),T=(e,t)=>{if(t<.1&&(t=.1),t>2&&(t=2),m){let e=t-k;m.zoom(e),w(t)}},N=e=>{let{r:t,g:n,b:r,a}=e.rgb;_("rgba(".concat(t,", ").concat(n,", ").concat(r,", ").concat(a,")"))},S=()=>{m&&m.destroy(),h(null),p(""),b.current=null,w(.1),_("rgb(236, 236, 236,0)")};return(0,a.useEffect)(()=>{x&&b.current&&(m?(w(.1),m.replace(x)):h(new(J())(b.current,{viewMode:1,center:!1,guides:!1,background:!1,dragMode:"move",scalable:!1,cropBoxMovable:!1,cropBoxResizable:!1,zoomOnTouch:!1,zoomOnWheel:!1,ready(){let e=this.cropper.getContainerData(),t={left:(e.width-250)/2,top:(e.height-250)/2,width:250,height:250};this.cropper.setCropBoxData(t),this.cropper.setCanvasData(t)}})))},[x]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(ei,{imgUrl:x,zoomValue:k,handleZoomChange:T,backgroundColor:f,handleColorChange:N,openDialog:t,closeDialog:n,avatarSubmit:()=>{m&&m.getCroppedCanvas({width:250,height:250,fillColor:f}).toBlob(e=>{let t=new FormData;t.append("user_id",o.id),t.append("avatar",e,"cropped-image.png"),fetch("".concat(d.UW,"/users/upload-avatar"),{method:"POST",body:t,headers:{...c()}}).then(e=>e.json()).then(e=>{e.success?(n(),p(""),l(!0),s("新增成功","success")):s("新增失敗，請稍後再試","error")}).catch(e=>{console.error(e),s("新增失敗，請稍後再試","error")}),S()})},resetUploader:S,children:[(0,r.jsx)(Y,{uploadBtn:g,getRootProps:j,getInputProps:v,isDragActive:y,isDragReject:C,isDragAccept:Z,hasImage:!!x,backgroundColor:f,handleColorChange:N,children:(0,r.jsx)("div",{className:A().dynamic([["9f2501147286fa74",[f||"rgb(236, 236, 236,0)",f||"rgb(236, 236, 236,0)"]]])+" cropperContainer",children:x?(0,r.jsx)(I(),{ref:b,src:x,width:250,height:250,alt:"avatar",style:{objectFit:"contain",background:"rgb(236, 236, 236,1)",borderRadius:"50%",margin:"0 auto"}}):(0,r.jsx)(eo.H3h,{style:{fontSize:"5rem"}})})}),(0,r.jsx)(ex,{disabled:!x,value:k,zoomChange:T})]}),(0,r.jsx)(A(),{id:"9f2501147286fa74",dynamic:[f||"rgb(236, 236, 236,0)",f||"rgb(236, 236, 236,0)"],children:".cropperContainer.__jsx-style-dynamic-selector{width:100%;height:400px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:12px;-moz-border-radius:12px;border-radius:12px;background-color:".concat(f||"rgb(236, 236, 236,0)","}.cropperContainer.__jsx-style-dynamic-selector.__jsx-style-dynamic-selector .cropper-view-box{-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;outline:unset;border:2px solid#fff;background-color:").concat(f||"rgb(236, 236, 236,0)","}.cropperContainer.__jsx-style-dynamic-selector.__jsx-style-dynamic-selector .cropper-face{background-color:unset}.cropperContainer.__jsx-style-dynamic-selector.__jsx-style-dynamic-selector .cropper-modal{-webkit-border-radius:12px;-moz-border-radius:12px;border-radius:12px}")})]})}var em=n(95452),eh=n.n(em),eb=n(83822),ef=n.n(eb),e_=n(21399),eg=n(7337),ej=n(54677);let ev=(0,$.ZP)("div")(()=>({display:"flex",flexDirection:"column",alignItems:"start",justifyContent:"space-between",color:"var(--text-dark)",fontSize:"1.125rem",fontFamily:'"Noto Serif JP", serif',backgroundColor:"white",border:"2px solid #F2F2F2",padding:"0.875rem 1.25rem",borderRadius:"var(--input-radius)",boxShadow:"none","&:hover":{backgroundColor:"#fafafa",boxShadow:"none"}}));function ey(e){let{addressId:t="",name:n="無收件人",phone:a="無收件手機",address:s="無收件地址",addressEdit:o,updateData:l}=e,{getAuthHeader:c}=(0,i.aC)(),{openConfirmDialog:p}=(0,x.W)(),{openSnackbar:m}=(0,u.Ds)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(ev,{variant:"contained",children:[(0,r.jsxs)("div",{className:ef().header,children:[(0,r.jsx)("p",{children:n}),(0,r.jsxs)("div",{className:ef().btnStack,children:[(0,r.jsx)(e_.Z,{btnText:"刪除",type:"sec",onClick:()=>{let e=async e=>{let t="".concat(d.UW,"/users/delete_address/").concat(e);try{let e=await fetch(t,{method:"DELETE",headers:{...c(),"Content-type":"application/json"}}),n=await e.json();n.success?(m("已成功刪除地址","success"),l()):console.error("地址刪除失敗",n)}catch(e){console.error("刪除地址時出錯",e)}};p(()=>{e(t)})},href:null}),(0,r.jsx)("div",{className:ef().btnDivider,children:" "}),(0,r.jsx)(e_.Z,{btnText:"編輯",type:"sec",href:null,onClick:()=>o(t)})]})]}),(0,r.jsx)(eg.Z,{content:a,icon:R.DNl}),(0,r.jsx)(eg.Z,{content:s,icon:eo.GUT})]}),(0,r.jsx)(ej.Z,{dialogTitle:"確定要刪除地址嗎？",btnTextRight:"確定刪除",btnTextLeft:"取消"})]})}var eC=n(83354),eZ=n(43036);function ek(e){let{addressFormData:t,addressEdit:n,updateData:a,onClick:s}=e,{auth:o}=(0,i.aC)();return(0,r.jsxs)(r.Fragment,{children:[0===t.length?(0,r.jsx)(eZ.Z,{text:"無收件人資料",backgroundColor:"#f2f2f2",borderRadius:"var(--input-radius)"}):t.map(e=>(0,r.jsx)(ey,{addressId:e.id,name:e.recipient_name,phone:e.mobile_phone,address:e.postal_codes+e.city_name+e.district_name+e.address,user_id:o.id,addressEdit:n,updateData:a},e.id)),(0,r.jsx)(eC.Z,{memberId:o.id,btnText:"新增收件人資料",iconType:"add",bgtype:"outline",onClick:s})]})}var ew=n(14150),eT=n.n(ew),eN=n(38187),eS=n(6097),eD=n(34815);function eF(e){let{addressData:t,setAddressData:n,addressFormErrors:s}=e,{getAuthHeader:o}=(0,i.aC)(),[l,c]=(0,a.useState)(""),[u,x]=(0,a.useState)(""),[p,m]=(0,a.useState)([]),[h,b]=(0,a.useState)([]),f=e=>{var t,r;let{name:a,value:s}=e.target;if("city_id"===a){let e=null===(t=p.find(e=>e.value===s))||void 0===t?void 0:t.text;n(t=>({...t,city_name:e})),x(""),c(s),j(s)}if("district_id"===a){let e=null===(r=h.find(e=>e.value===s))||void 0===r?void 0:r.text;n(t=>({...t,district_name:e})),x(s)}n(e=>({...e,[a]:s}))},_=async()=>{n({recipient_name:"銀耳機",mobile_phone:"0912345678",city_id:1,district_id:5,address:"復興南路一段390號2樓"}),c(1),await j(1),x(5)},g=async()=>{let e="".concat(d.UW,"/users/address_city_options"),t={method:"GET",headers:{...o(),"Content-type":"application/json"}};try{let n=await fetch(e,t),r=await (null==n?void 0:n.json());r.success&&m(r.city)}catch(e){console.error("取得地址選項時出錯",e)}},j=async e=>{let t="".concat(d.UW,"/users/address_district_options/").concat(e),n={method:"GET",headers:{...o(),"Content-type":"application/json"}};try{let e=await fetch(t,n),r=await (null==e?void 0:e.json());r.success&&b(r.district)}catch(e){console.error("取得地址選項時出錯",e)}};return(0,a.useEffect)(()=>{g(),(null==t?void 0:t.city_id)&&j(null==t?void 0:t.city_id),c(null==t?void 0:t.city_id),x(null==t?void 0:t.district_id)},[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("form",{name:"AddressForm",className:eT().formBox,children:[(0,r.jsx)(eN.Z,{label:"姓名",name:"recipient_name",value:t.recipient_name||"",errorText:s.recipient_name||"",onChange:f}),(0,r.jsx)(eN.Z,{label:"手機",name:"mobile_phone",value:t.mobile_phone,errorText:s.mobile_phone||"",onChange:f}),(0,r.jsx)(eS.Z,{name:"city_id",label:"縣市",placeholder:"請選擇",value:l,options:p,onChange:f}),(0,r.jsx)(eS.Z,{name:"district_id",label:"地區",placeholder:"請選擇",value:u,options:h,errorText:s.district_id||"",onChange:f}),(0,r.jsxs)("div",{className:eT().span2,children:[(0,r.jsx)(eN.Z,{label:"地址",name:"address",value:t.address,errorText:s.address||"",onChange:f}),(0,r.jsx)(eD.Z,{btnText:(0,r.jsx)("span",{style:{color:"#FFF"},children:"快速輸入"}),onClick:_})]})]})})}var ez=n(1604);let eB=e=>e.replace(/-/g,""),eO=ez.z.object({recipient_name:ez.z.string({message:"請填寫收件人姓名"}).min(2,{message:"請填寫收件人姓名，長度為 2 ~ 20 個字元"}).max(20,{message:"請填寫收件人姓名，長度為 2 ~ 20 個字元"}),mobile_phone:ez.z.string({message:"請填寫正確電話號碼"}).nullable().transform(e=>eB(e||"")).refine(e=>""===e||/^09\d{2}\d{3}\d{3}$/.test(e),{message:"請填寫正確電話號碼"}),district_id:ez.z.number({message:"請選擇縣市"}).min(1,{message:"請選擇縣市"}),address:ez.z.string({message:"請填寫地址"}).min(2,{message:"請填寫地址"}).max(100,{message:"請正確填寫地址"})}),eI=(0,Z.Z)({components:{MuiDialog:{styleOverrides:{paper:{width:"720px",height:"auto",maxHeight:"640px",borderRadius:"var(--popup-radius)"}}}}});function eR(e){let{addressFormData:t,open:n,onClose:s,updateData:o}=e,{auth:l,getAuthHeader:c}=(0,i.aC)(),{openSnackbar:x}=(0,u.Ds)(),[p,m]=(0,a.useState)(1),[h,b]=(0,a.useState)({}),[f,_]=(0,a.useState)({user_id:"",district_id:"",address:"",recipient_name:"",mobile_phone:""}),g=()=>{_({user_id:"",district_id:"",address:"",recipient_name:"",mobile_phone:""}),m(1)},j=async()=>{let e={user_id:l.id,district_id:h.district_id,address:h.address,recipient_name:h.recipient_name,mobile_phone:h.mobile_phone,type:"0"},t=eO.safeParse(e),n={district_id:"",address:"",recipient_name:"",mobile_phone:""};if(!t.success){var r,a;if(null===(a=t.error)||void 0===a?void 0:null===(r=a.issues)||void 0===r?void 0:r.length){for(let e of t.error.issues)n[e.path[0]]=e.message;_(n)}return}h.id&&(e.id=h.id);let s="".concat(d.UW,"/users/update_address"),i={method:"POST",headers:{...c(),"Content-type":"application/json"},body:JSON.stringify(e)},u=await fetch(s,i),p=await u.json();if(p.success){x("更新成功","success"),g(),o();return}console.error("更新失敗",p)};return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(C.Z,{theme:eI,children:(0,r.jsx)(V.Z,{open:n,onClose:()=>{m(1),s()},children:(0,r.jsxs)("div",{className:eh().modalBody,children:[(0,r.jsx)("div",{className:eh().title,children:"收件人資料"}),(0,r.jsxs)("div",{className:eh().modalContent,children:[1===p&&(0,r.jsx)(ek,{addressFormData:t,addressEdit:e=>{b(t.find(t=>t.id===e)),m(2)},updateData:o,onClick:()=>{b({}),m(2)}}),2===p&&(0,r.jsx)(eF,{addressData:h,setAddressData:b,addressFormErrors:f})]}),2===p&&(0,r.jsxs)("div",{className:eh().btnBar,children:[(0,r.jsx)(ea.Z,{btnText:"返回",onClick:g,href:null,paddingType:"medium"}),(0,r.jsx)(ea.Z,{btnText:"確定",onClick:j,href:null,paddingType:"medium"})]})]})})})})}let eM=e=>e.replace(/-/g,""),eP=ez.z.object({name:ez.z.string().min(2,{message:"請填寫姓名，長度為 2 ~ 20 個字元"}).max(20,{message:"請填寫姓名，長度為 2 ~ 20 個字元"}),nick_name:ez.z.string().min(1,{message:"請填寫暱稱，長度勿超過 50 字元"}).max(50,{message:"請填寫暱稱，長度勿超過 50 字元"}),birthday:ez.z.string().transform(e=>e||"").nullable(),mobile_phone:ez.z.string({message:"請填寫正確電話號碼"}).nullable().transform(e=>eM(e||"")).refine(e=>""===e||/^09\d{2}\d{3}\d{3}$/.test(e),{message:"請填寫正確電話號碼"}),invoice_carrier_id:ez.z.string({required_error:"請填寫正確載具號碼"}).nullable().transform(e=>e||"").refine(e=>""===e||/^\/[A-Z0-9]{7}$/.test(e),{message:"請填寫正確載具號碼"}),tax_id:ez.z.string().nullable().transform(e=>e||"").refine(e=>""===e||/^\d{8}$/.test(e),{message:"請填寫正確統編號碼"})});function eE(){let e=(0,s.useRouter)(),{auth:t,getAuthHeader:n}=(0,i.aC)(),{openSnackbar:o}=(0,u.Ds)(),{openConfirmDialog:l}=(0,x.W)(),[c,p]=(0,a.useState)({}),[f,_]=(0,a.useState)({}),[g,j]=(0,a.useState)([]),[v,y]=(0,a.useState)([]),[C,Z]=(0,a.useState)({year:"",month:"",date:""}),[k,w]=(0,a.useState)({years:[],months:[],dates:[]}),[N,S]=(0,a.useState)({name:"",nick_name:"",gender:"",birthday:"",mobile_phone:"",address:"",invoice_carrier_id:"",tax_id:""}),[z,B]=(0,a.useState)(!1),[O,I]=(0,a.useState)(!1),R=async()=>{try{let e=await fetch(d.PA,{method:"POST",body:JSON.stringify({id:t.id}),headers:{...n(),"Content-type":"application/json"}});(await e.json()).success?(p({...c,totp_enabled:0}),o("兩步驗證已解除","success")):o("解除兩步驗證失敗，請重試","error")}catch(e){o("解除兩步驗證失敗，請重試","error")}},M=e=>{let{name:t,value:n}=e.target;if("address_id"===t){_({[t]:n});return}if("year"===t||"month"===t||"date"===t){let e={...C,[t]:n};Z(e);let{year:r,month:a}=e;if("year"===t||"month"===t){let e=new Date(r,a,0).getDate(),s=C.date>e?"":C.date;Z({...C,[t]:n,date:s}),P(r,a)}return}if("invoice_carrier_id"===t){let e=n.toUpperCase();p({...c,[t]:e});return}p({...c,[t]:n})},P=(e,t)=>{if(0===k.years.length||0===k.months.length){let n=new Date().getFullYear(),r=Array(100).fill().map((e,t)=>({value:n-t,text:"".concat(n-t," 年")})),a=Array(12).fill().map((e,t)=>({value:t+1,text:"".concat(t+1," 月")}));if(e&&t){let n=Array(new Date(e,t,0).getDate()).fill().map((e,t)=>({value:t+1,text:"".concat(t+1," 日")}));w({...k,years:r,months:a,dates:n})}else w({...k,years:r,months:a})}else if(e&&t){let n=Array(new Date(e,t,0).getDate()).fill().map((e,t)=>({value:t+1,text:"".concat(t+1," 日")}));w({...k,dates:n})}},L=async e=>{e.preventDefault();let t={...c},{year:r,month:a,date:s}=C;if(r||a||s){let e="".concat(r,"-").concat(a.toString().padStart(2,"0"),"-").concat(s.toString().padStart(2,"0"));t={...c,birthday:e}}t=f.address_id?{users:t,address:f}:{users:t};let i=eP.safeParse(t.users),l={name:"",nick_name:"",birthday:"",mobile:"",invoice_carrier_id:"",tax_id:""};if(!i.success){var u,x;if(null===(x=i.error)||void 0===x?void 0:null===(u=x.issues)||void 0===u?void 0:u.length){for(let e of i.error.issues)l[e.path[0]]=e.message;S(l)}return}let p="".concat(d.UW,"/users/api"),m={method:"PUT",body:JSON.stringify(t),headers:{...n(),"Content-type":"application/json"}};try{let e=await fetch(p,m),t=await (null==e?void 0:e.json());t.success?(S(l),o("編輯成功！","success")):console.error(t.error)}catch(e){console.error("fetch-Error: ".concat(e))}},A=async()=>{let e="".concat(d.UW,"/users/api"),t={method:"POST",headers:{...n()}};try{let n=await fetch(e,t),r=await (null==n?void 0:n.json());if(r.success){if(r.users&&(p(r.users),P(),r.users.birthday)){let e=new Date(r.users.birthday),t={year:e.getFullYear(),month:e.getMonth()+1,date:e.getDate()};Z(t),P(t.year,t.month)}if(r.address){let e=r.address.map(e=>({value:e.id,type:e.type,text:"".concat(e.postal_codes," ").concat(e.city_name).concat(e.district_name).concat(e.address," - ").concat(e.recipient_name," / ").concat(e.mobile_phone)}));j(e),y(r.address);let t=r.address.find(e=>"1"===e.type);if(t){let e=t.id;_({address_id:e})}}}}catch(e){console.error("fetch-Error: ".concat(e))}};return(0,a.useEffect)(()=>{t.id&&A()},[t]),(0,r.jsx)(r.Fragment,{children:"{}"!==JSON.stringify(c)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("form",{className:m()["user-profile-form"],onSubmit:L,children:[(0,r.jsxs)("div",{className:m().box1,children:[(0,r.jsx)(ep,{openDialog:z,closeDialog:()=>B(!1)}),(0,r.jsx)(E,{avatar:c.avatar,open:()=>B(!0)}),(0,r.jsxs)("div",{className:m().account,children:[(0,r.jsx)(h.Z,{text:"帳號資訊"}),(0,r.jsx)(b.Z,{label:"帳號",name:"account",type:"email",value:c.account,placeholder:"請輸入帳號",disabled:!0}),(0,r.jsx)(b.Z,{label:"密碼",name:"password",type:"password",value:"PasswordPasswordPassword",btn:!0,btnOnClick:()=>e.push("/user/reset-password"),btnText:"修改密碼",disabled:!0}),(0,r.jsx)(b.Z,{label:"兩步驗證",name:"totp_enabled",type:"text",value:1===c.totp_enabled?"已使用驗證":"未使用驗證",btn:!0,btnOnClick:1===c.totp_enabled?()=>l(()=>R()):()=>e.push("/user/profile/set-2fa"),btnText:1===c.totp_enabled?"停用驗證":"新增驗證",disabled:!0})]})]}),(0,r.jsx)("div",{className:m().box2,children:(0,r.jsxs)("div",{children:[(0,r.jsx)(h.Z,{text:"個人資料"}),(0,r.jsx)(b.Z,{label:"姓名",required:!0,name:"name",type:"text",value:c.name,placeholder:"請輸入姓名",disabled:!1,errorText:N.name,onChange:M}),(0,r.jsx)(b.Z,{label:"暱稱",required:!0,name:"nick_name",type:"text",value:c.nick_name,placeholder:"請輸入暱稱",errorText:N.nick_name,onChange:M}),(0,r.jsx)(T,{label:"性別",radios:[{value:"0",label:"男"},{value:"1",label:"女"}],name:"gender",disabled:!1,checked:c.gender,errorText:N.gender,onChange:M}),(0,r.jsx)(F,{options:k,label:"生日",name:"birthday",value:C,errorText:N.birthday,onChange:M})]})}),(0,r.jsx)("div",{className:m().box2,children:(0,r.jsxs)("div",{children:[(0,r.jsx)(h.Z,{text:"聯絡資訊"}),(0,r.jsx)(b.Z,{label:"電話",name:"mobile_phone",type:"text",value:c.mobile_phone,placeholder:"請輸入電話",errorText:N.mobile_phone,onChange:M}),(0,r.jsx)(D,{label:"常用地址",options:g,name:"address_id",value:f.address_id,placeholder:"請選擇常用收件地址",btn:!0,btnText:"編輯地址",btnOnClick:()=>{I(!0)},errorText:N.address_id,onChange:M}),(0,r.jsx)(eR,{addressFormData:v,open:O,updateData:A,onClose:()=>{I(!1)}})]})}),(0,r.jsx)("div",{className:m().box2,children:(0,r.jsxs)("div",{children:[(0,r.jsx)(h.Z,{text:"其他資訊"}),(0,r.jsx)(b.Z,{label:"常用載具",name:"invoice_carrier_id",type:"text",value:c.invoice_carrier_id,placeholder:"請輸入常用載具",errorText:N.invoice_carrier_id,onChange:M}),(0,r.jsx)(b.Z,{label:"常用統編",name:"tax_id",type:"text",value:c.tax_id,placeholder:"請輸入常用統編",errorText:N.tax_id,onChange:M})]})}),(0,r.jsx)("div",{className:m().box2,children:(0,r.jsx)(ea.Z,{btnText:"儲存",type:"submit",href:null,onClick:null,paddingType:"medium"})})]}),(0,r.jsx)(ej.Z,{dialogTitle:"確定要解除兩步驗證嗎"})]}):""})}var eL=n(62325);function eA(){let e=(0,s.useRouter)(),{auth:t,authIsReady:n}=(0,i.aC)(),{loginFormSwitch:d}=(0,eL.NK)();return((0,a.useEffect)(()=>{e.isReady&&!t.id&&n&&(e.push("/"),d("Login"))},[t.id,n]),t.id)?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(o.Z,{title:"會員中心",pageName:"user",background:"light",children:(0,r.jsx)(c.Z,{userTab:(0,r.jsx)(l.Z,{}),sectionRight:(0,r.jsx)(eE,{})})})}):null}},61990:function(e){e.exports={inputDefault:"input01_inputDefault__rC9_w",inputDefaultLine:"input01_inputDefaultLine__A5JCq",inputDisabled:"input01_inputDisabled__lYkq_",inputDisabledLine:"input01_inputDisabledLine__4myS3",input:"input01_input__IyFIT",eyeIcon:"input01_eyeIcon__MsDLy"}},27997:function(e){e.exports={dorpZone:"drop-zone_dorpZone__q0J4k",active:"drop-zone_active___x82K",accept:"drop-zone_accept__SXgwI",reject:"drop-zone_reject__3MciN",btn:"drop-zone_btn__9mhzI"}},88629:function(e){e.exports={"user-profile-form":"user-profile-form_user-profile-form__GmsIE",box1:"user-profile-form_box1__QSIKD",account:"user-profile-form_account__AwdTm",box2:"user-profile-form_box2__6Tb5C"}},7630:function(e){e.exports={formItem:"item_formItem__oTjum",myLabel:"item_myLabel__DgbHY",myDiv:"item_myDiv__B_jus",birthday:"item_birthday__r8QAL",row:"item_row__1KY1G",selectBtn:"item_selectBtn___63Nl",errorText:"item_errorText__lzi0n",button:"item_button__AofiW"}},98216:function(e){e.exports={userTab:"user-tab_userTab__oitHd",active:"user-tab_active__WQZR9"}},5024:function(e){e.exports={sectionContainer:"user-layout_sectionContainer__ZrxdZ",sectionBody:"user-layout_sectionBody__cHqmz",sectionRight:"user-layout_sectionRight__pqtpQ"}},57779:function(e){e.exports={iconTextRow:"address-info-row_iconTextRow__H74kf",contentText:"address-info-row_contentText__ifGKI"}},56309:function(e){e.exports={btnTextStyle:"recipient-button_btnTextStyle__Jvd9n"}},4131:function(e){e.exports={label:"order-input-box_label__GgH94"}},2398:function(e){e.exports={errorBox:"order-input-error_errorBox___OsnD",errorText:"order-input-error_errorText__54eeM"}},81059:function(e){e.exports={label:"order-select-box_label__l_2Vl"}},14150:function(e){e.exports={formBox:"address-form_formBox__5acAp",span2:"address-form_span2__fz2eh"}},95452:function(e){e.exports={modalBody:"modal-layout_modalBody__GoThq",title:"modal-layout_title__yyFnc",modalContent:"modal-layout_modalContent__z4USF",btnBar:"modal-layout_btnBar__uxVUa"}},83822:function(e){e.exports={header:"recipient-button-edit_header__TgNtO",btnStack:"recipient-button-edit_btnStack__tLa_e",btnDivider:"recipient-button-edit_btnDivider__kWL1u"}}},function(e){e.O(0,[5970,4838,9317,4396,6660,509,2961,4321,6130,959,6497,2179,7601,2749,9837,3483,2888,9774,179],function(){return e(e.s=72002)}),_N_E=e.O()}]);