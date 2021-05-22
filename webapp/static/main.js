
const videoC = {template: 'videos'};
const routes = [
    { path: '/Calendar', component: calendarC },
    { path: '/Videos', component: videoC },];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  });


let app = Vue.createApp({
    template: /* html */`

        <main>
            må ha bilde av mor. <br>
            noe tekst, stilisert med boobstrap.
        </main>
        <sidebarC></sidebarC>
        <router-view></router-view>
    `
/*     data: function(){
        return {
        }
    } */
});

app.component("SidebarC", sidebarC)
/*app.component("SidebarElementC", sidebarElementC)
app.component("HeaderC", headerC)
app.component("LoginC", loginC)
app.component("AdminC", adminC) */
app.component("CalendarC")
app.use(router)
app.mount("#app");  