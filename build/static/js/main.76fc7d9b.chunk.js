(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(44)},42:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(11),u=n.n(s),o=n(3),l=n(12),i=n(13),c=n(14),m=n(16),d=n(15),f=n(17),h=n(2),p=n.n(h),v="https://frozen-escarpment-15428.herokuapp.com/api/persons",E={getAll:function(){return p.a.get(v).then(function(e){return e.data})},create:function(e){return p.a.post(v,e).then(function(e){return e.data})},update:function(e,t){return p.a.put("".concat(v,"/").concat(e),t).then(function(e){return e.data})},deletePerson:function(e){return p.a.delete("".concat(v,"/").concat(e)).then(function(e){return e.data})}},g=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t=n.state.persons.find(function(e){return e.name===n.state.newName});if(void 0===t){var a={name:n.state.newName,number:n.state.newNumber};E.create(a).then(function(e){n.setState({persons:n.state.persons.concat(e),statusMessage:"Lis\xe4ttiin ".concat(e.name)})})}else if(window.confirm("".concat(n.state.newName," on jo luettelossa, korvataanko vanha numero uudella?"))){var r=Object(l.a)({},t,{number:n.state.newNumber});E.update(r.id,r).then(function(e){n.setState({persons:n.state.persons.map(function(t){return t.id!==e.id?t:e}),statusMessage:"P\xe4ivitettiin numero henkil\xf6lle ".concat(r.name)})}).catch(function(e){n.setState({persons:n.state.persons.filter(function(e){return e.id!==r.id})}),delete r.id,E.create(r).then(function(e){n.setState({persons:n.state.persons.concat(e),statusMessage:"Lis\xe4ttiin uudelleen ".concat(e.name)})})})}n.setState({newName:"",newNumber:"",filter:""}),setTimeout(function(){n.setState({statusMessage:null})},5e3)},n.deletePerson=function(e){return function(){var t=n.state.persons.find(function(t){return t.id===e}).name;window.confirm("Poistetaanko ".concat(t,"?"))&&(E.deletePerson(e).then(function(a){n.setState({persons:n.state.persons.filter(function(t){return t.id!==e}),statusMessage:"Poistettiin ".concat(t)})}),setTimeout(function(){n.setState({statusMessage:null})},5e3))}},n.handleChange=function(e){return function(t){console.log(t.target.value),n.setState(Object(o.a)({},e,t.target.value))}},n.state={persons:[],newName:"",newNumber:"",filter:"",statusMessage:null},n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.getAll().then(function(t){return e.setState({persons:t})})}},{key:"render",value:function(){var e=this,t=this.state.persons.filter(function(t){return t.name.toLowerCase().search(e.state.filter.toLowerCase())>-1});return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(C,{message:this.state.statusMessage}),r.a.createElement(w,{state:this.state,handleChange:this.handleChange}),r.a.createElement(b,{state:this.state,handleChange:this.handleChange,addPerson:this.addPerson}),r.a.createElement("h2",null,"Numerot"),r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(t){return r.a.createElement(N,{key:t.id,person:t,deletePerson:e.deletePerson(t.id)})}))))}}]),t}(r.a.Component),w=function(e){var t=e.state,n=e.handleChange;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4:",r.a.createElement("input",{value:t.filter,onChange:n("filter")}))},b=function(e){var t=e.state,n=e.handleChange,a=e.addPerson;return r.a.createElement("div",null,r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"nimi:",r.a.createElement("input",{value:t.newName,onChange:n("newName")})),r.a.createElement("div",null,"numero:",r.a.createElement("input",{value:t.newNumber,onChange:n("newNumber")})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},N=function(e){var t=e.person,n=e.deletePerson;return r.a.createElement("tr",null,r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:n},"poista")))},C=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},P=g;n(42);u.a.render(r.a.createElement(P,null),document.getElementById("root"))}},[[18,2,1]]]);
//# sourceMappingURL=main.76fc7d9b.chunk.js.map