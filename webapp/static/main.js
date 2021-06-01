const routes = [
    { path: '/', component: homeC},
    { path: '/home', component: homeC },
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
        <div class="container-md">
        <div id="sidebar" class="col-md-4"> 
        <sidebarC></sidebarC>
        </div>
        <div id="main" class="col-md-8">
            må ha bilde av mor. <br>
            noe tekst, stilisert med boobstrap.
            <router-view></router-view>
        </div>


    `
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