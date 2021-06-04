const navbarC = {
    template: /*html*/`
        <!-- linker til div. sider i applikasjonen, dropdown til videoer? -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span class="navbar-toggler-icon"></span> <!-- låner alt fra bootstrap nettsiden-->
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/"> {{ lang.navbar[0] }} </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="auth_level[0]" to="/Calendar"> {{ lang.navbar[1] }} </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-if="auth_level[1]" to="/Admin"> {{ lang.navbar[2] }} </router-link>
              </li>  
              <li class="nav-item">
                <router-link class="nav-link" v-if="auth_level[0]" to="/Video">{{ lang.navbar[5]  }}</router-link>
              </li> 
            </ul>
              <div class="d-flex">    
                <router-link  class="nav-link" v-if="!auth_level[0]" to="/Login"> {{ lang.navbar[3] }}</router-link>
                <a href="" class="nav-link" v-else="auth_level[0]" @click="logout"> {{ lang.navbar[4] }}</a>
                <button type="button" class="btn btn-outline-dark" @click="chLang">{{ listLang[selectLang] }}</button>
              </div>   
            </div>
        </div>
        </nav>
    `,
    props:['auth_level', 'lang'],
    emits:['loggedOut', 'languageChanged'],
    data(){
        return{
            listLang:["en", "no"],
            selectLang:0
        }
    },
    methods: {
        logout: async function(){
            let response = await fetch("/session", {
                method:"DELETE"
            });
            if (response.status===200){
                this.$emit("loggedOut");
                this.$router.push("/");
            }
            reply = await response.text();
        },
        chLang: function(){
            if (this.selectLang === 0){
                this.selectLang = 1;
            }else{
                this.selectLang = 0;
            }
            this.$emit('languageChanged', this.listLang[this.selectLang])
        }
    }
};