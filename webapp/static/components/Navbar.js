const navbarC = {
    template: /*html*/`
        <!-- linker til div. sider i applikasjonen, dropdown til videoer? -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span class="navbar-toggler-icon"></span> <!-- navbar ikon funker ikke, låner alt fra bootstrap nettsiden-->
            </button>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/"> {{lang.navbar[0]}} </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="auth_level[0]" to="/Calendar"> {{lang.navbar[1]}} </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="auth_level[1]" to="/Admin"> {{lang.navbar[2]}} </router-link>
              </li>  
              <li class="nav-item">    
                <router-link  class="nav-link" v-if="!auth_level[0]" to="/Login"> <button>{{lang.navbar[3]}}</button></router-link>
                <button class="nav-link" v-else="auth_level[0]" @click="logout"> {{lang.navbar[4]}}</button>
              </li>  
              <li class="nav-item">
                <router-link class="nav-link"to="/Video">video</router-link>
              </li>  
            </ul>
        </div>
        </nav>
    `,
    props:['auth_level', 'lang'],
    emits:['loggedOut'],
    methods: {
        logout: async function(){
            let response = await fetch("/session", {
                method:"DELETE"
            });
            if (response.status===200){
                this.$emit("loggedOut")
                this.$router.push("/")
            }
            reply = await response.text()
        }
    }
};