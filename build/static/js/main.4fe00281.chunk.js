(this.webpackJsonprendering_collection=this.webpackJsonprendering_collection||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),a=t(3),u=t(1),i=t(0),o=function(e){var n=e.newFilter,t=e.handleFilterChange,c=e.description;return Object(i.jsxs)("form",{children:[c,Object(i.jsx)("input",{onChange:t,value:n})]})},s=function(e){var n=e.addPerson,t=e.newName,c=e.newNumber,r=e.handleNameChange,a=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:r})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:c,onChange:a})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{className:"bg-sky-600",type:"submit",children:"add"})})]})},d=function(e){var n=e.person,t=e.setRemoveID;return Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:[n.name," ",n.number]}),Object(i.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},j=function(e){var n=e.personfiltered,t=e.setRemoveID;return n.map((function(e){return Object(i.jsx)(d,{person:e,setRemoveID:t},e.name)}))},l=t(4),b=t.n(l),f="/api/persons",h=function(){return b.a.get(f).then((function(e){return e.data}))},m=function(e){return b.a.post(f,e).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return b.a.delete("".concat(f,"/").concat(e)).then(e)},v=(t(40),function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),d=Object(a.a)(r,2),l=d[0],b=d[1],f=Object(u.useState)(""),v=Object(a.a)(f,2),x=v[0],g=v[1],w=Object(u.useState)(""),C=Object(a.a)(w,2),N=C[0],k=C[1],S=Object(u.useState)(0),D=Object(a.a)(S,2),I=D[0],y=D[1];Object(u.useEffect)((function(){0!==I&&p(I).then((function(e){c(t.filter((function(e){return e.id!==I})))}))}),[I]),Object(u.useEffect)((function(){h().then((function(e){c(e)}))}),[]);var F=t.map((function(e){return e.name})),P=t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(o,{newFilter:N,handleFilterChange:function(e){k(e.target.value)}}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(s,{addPerson:function(e){if(e.preventDefault(),F.includes(l))if(window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===l})).id;O(n,{name:l,number:x}).then((function(e){c(t.map((function(t){return t.id!==n?t:e}))),b(""),g("")}))}else console.log("Pressed Cancel");else m({name:l,number:x}).then((function(e){c(t.concat(e)),b(""),g("")}))},newName:l,newNumber:x,handleNumberChange:function(e){g(e.target.value)},handleNameChange:function(e){b(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(j,{personfiltered:P,setRemoveID:y})]})});r.a.render(Object(i.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.4fe00281.chunk.js.map