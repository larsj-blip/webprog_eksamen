const sidebarC = {
    template: /*html*/`
        <!-- linker til div. sider i applikasjonen, dropdown til videoer? -->
        <router-link to="/"> Home </router-link>
        <router-link v-if="auth_level[0]" to="/Calendar"> Calendar </router-link>
        <router-link v-if="auth_level[1]" to="/Admin"> Admin </router-link>
        <router-link v-if="!auth_level[0]" to="/Login"> <button>logg inn </button></router-link>
        <button v-else="auth_level[0]" @click="logout"> logg ut </button>
    `,
    props:['auth_level'],
    emits:['loggedOut'],
    methods: {
        logout: async function(){
            let response = await fetch("/session", {
                method:"DELETE"
            });
            if (response.status===200){
                this.$emit("loggedOut")
            }
            reply = await response.text()
        }
    }
};