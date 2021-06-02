const routes = [
    { path: '/', component: homeC},
    { path: '/Calendar', component: calendarC },
    { path: '/Admin', component: adminC },
    { path: '/Login', component: loginC }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  });


let app = Vue.createApp({
    template: /*html*/`
        <main class="container">
            <div class="row">
            <div id="sidebar" class="col-sm-2"> 
            <sidebarC @loggedOut="loggedOut" :auth_level="auth_level"></sidebarC>
            </div>
            <div id="main" class="col-sm-10">
            <router-view @loggedIn="authLevel" :logout="auth_level[0]"/>
            </div>
            
        </main>
    `,
    data:function(){return{
        'auth_level':[false,false]
    }},
    methods:{
        authLevel: function(level){
            this.auth_level = level
        },
        loggedOut: function(){
            this.auth_level = [false,false]

        }
    }
});

app.component("SidebarC", sidebarC)
/*app.component("SidebarElementC", sidebarElementC)
app.component("HeaderC", headerC)*/
app.component("LoginC", loginC)
app.component("HomeC", homeC)
app.component("AdminC", adminC)
app.component("CalendarC", calendarC)
app.use(router)
app.mount("#app");  