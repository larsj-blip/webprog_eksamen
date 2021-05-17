let app = Vue.createApp({
    template: /* html */`
        <HeaderC></HeaderC>
        <SidebarC></SidebarC>
        <main>
            <img>Bilde av mor her</img>
            noe tekst, stilisert med boobstrap.
        </main>
    `,
    data: function(){
        return {
        }
    },
    created: {},
    methods: {}
});
app.component("component-name-kebab-if-direct-in-html", vueComponentName);
app.component("SidebarC", sidebarC)
app.component("SidebarElementC", sidebarElementC)
app.component("HeaderC", headerC)
app.component("LoginC", loginC)
app.component("AdminC", adminC)

app.mount("#app"); 