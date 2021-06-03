const routes = [
    { path: '/', component: homeC},
    { path: '/Calendar', component: calendarC },
    { path: '/Admin', component: adminC },
    { path: '/Video', component: videoC },
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
            <navbarC @loggedOut="loggedOut" :auth_level="auth_level" :lang="lang"></navbarC>
            </div>
            <div id="main" >
            <router-view class="col-sm-10" @loggedIn="authLevel" :logout="auth_level[0]" :lang="lang"/>
            </div>
            
        </main>
    `,
    data:function(){return{
        'auth_level':[false,false],
        'lang':[]
    }},
    methods:{
        authLevel: function(level){
            this.auth_level = level;
        },
        loggedOut: function(){
            this.auth_level = [false,false];
        },
        setLanguage: function(langInput){
            console.log(language[langInput]);
            this.lang = language[langInput];
        }
    },
    created(){
        this.setLanguage("en");
    }
});

app.component("NavbarC", navbarC)
/*app.component("navbarElementC", navbarElementC)
app.component("HeaderC", headerC)*/
app.component("VideoC", videoC)
app.component("LoginC", loginC)
app.component("HomeC", homeC)
app.component("AdminC", adminC)
app.component("CalendarC", calendarC)
app.use(router)
app.mount("#app");  