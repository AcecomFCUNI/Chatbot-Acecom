(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{24:function(e,n,t){},25:function(e,n,t){},26:function(e,n,t){},28:function(e,n,t){},29:function(e,n,t){},31:function(e,n,t){},32:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(1),s=t.n(c),i=t(16),a=t.n(i),o=(t(24),t(7)),l=(t(25),t(26),t(0));t(28),t(29);t(14),t(17),t(9),t(31);t(32);var r=t.p+"static/media/webscript.281e0d80.png",u=t.p+"static/media/user.b2be6b8c.jpg",b=t(11),j=function(e){var n=e.name,t=e.subMenus,s=e.iconClassName,i=(e.onClick,e.to),a=(e.exact,Object(c.useState)(!1)),r=Object(o.a)(a,2);r[0],r[1];return Object(l.jsxs)("li",{onClick:e.onClick,children:[Object(l.jsxs)(b.b,{exact:!0,to:i,className:"menu-item",children:[Object(l.jsx)("div",{className:"menu-icon",children:Object(l.jsx)("i",{class:s})}),Object(l.jsx)("span",{children:n})]}),t&&t.length>0?Object(l.jsx)("ul",{className:"sub-menu",children:t.map((function(e,n){return Object(l.jsx)("li",{children:Object(l.jsx)(b.c,{to:e.to,children:e.name})},n)}))}):null]})},m=[{name:"Dashboard",exact:!0,to:"/",iconClassName:"bi bi-speedometer2"},{name:"Content",exact:!0,to:"/content",iconClassName:"bi bi-speedometer2",subMenus:[{name:"Courses",to:"/content/courses"},{name:"Videos",to:"/content/videos"}]},{name:"Design",to:"/design",iconClassName:"bi bi-vector-pen"},{name:"Content 2",exact:!0,to:"/content-2",iconClassName:"bi bi-speedometer2",subMenus:[{name:"Courses",to:"/content-2/courses"},{name:"Videos",to:"/content-2/videos"}]},{name:"Design 2",to:"/design-2",iconClassName:"bi bi-vector-pen"},{name:"Design 3",to:"/design-3",iconClassName:"bi bi-vector-pen"},{name:"Design 4",to:"/design-4",iconClassName:"bi bi-vector-pen"}],d=function(e){var n=Object(c.useState)(!1),t=Object(o.a)(n,2),s=t[0],i=t[1];Object(c.useEffect)((function(){s&&a(),e.onCollapse(s)}),[s]);var a=function(){document.querySelectorAll(".sub-menu").forEach((function(e){e.classList.remove("active")}))};return Object(c.useEffect)((function(){var e=document.querySelectorAll(".menu-item");e.forEach((function(n){n.addEventListener("click",(function(t){var c=n.nextElementSibling;a(),e.forEach((function(e){return e.classList.remove("active")})),n.classList.toggle("active"),console.log(c),null!==c&&c.classList.toggle("active")}))}))}),[]),Object(l.jsxs)("div",{className:"side-menu ".concat(s?"inactive":""),children:[Object(l.jsxs)("div",{className:"top-section",children:[Object(l.jsx)("div",{className:"logo",children:Object(l.jsx)("img",{src:r,alt:"webscript"})}),Object(l.jsx)("div",{onClick:function(){return i(!s)},className:"toggle-menu-btn",children:s?Object(l.jsx)("i",{class:"bi bi-arrow-right-square-fill"}):Object(l.jsx)("i",{class:"bi bi-arrow-left-square-fill"})})]}),Object(l.jsx)("div",{className:"main-menu",children:Object(l.jsx)("ul",{children:m.map((function(e,n){return Object(l.jsx)(j,{name:e.name,exact:e.exact,to:e.to,subMenus:e.subMenus||[],iconClassName:e.iconClassName,onClick:function(e){s&&i(!1)}},n)}))})}),Object(l.jsxs)("div",{className:"side-menu-footer",children:[Object(l.jsx)("div",{className:"avatar",children:Object(l.jsx)("img",{src:u,alt:"user"})}),Object(l.jsxs)("div",{className:"user-info",children:[Object(l.jsx)("h5",{children:"Rizwan Khan"}),Object(l.jsx)("p",{children:"rizwankhan@gmail.com"})]})]})]})},x=t(2);var h=function(){var e=Object(c.useState)(!1),n=Object(o.a)(e,2),t=n[0],s=n[1];return Object(l.jsx)("div",{className:"__main",children:Object(l.jsxs)(b.a,{children:[Object(l.jsx)(d,{onCollapse:function(e){console.log(e),s(e)}}),Object(l.jsx)("div",{className:"container ".concat(t?"inactive":""),children:m.map((function(e,n){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(x.a,{exact:e.exact,path:e.to,children:Object(l.jsx)("h1",{children:e.name})},e.name),e.subMenus&&e.subMenus.length>0?e.subMenus.map((function(e,n){return Object(l.jsx)(x.a,{path:e.to,children:Object(l.jsx)("h1",{children:e.name})},e.name)})):null]})}))})]})})};a.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(h,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.37d0975a.chunk.js.map