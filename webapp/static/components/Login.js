
const loginC = {
    template: /*html*/`
    <div>
        <label for="email">{{ lang.login[0] }}</label>
        <input v-model="email" type="email" id="email">
        <label for="passwd">{{ lang.login[1]}}</label>
        <input v-model="password" type="password" id="passwd" @keyup.enter="log_in"/>
        <button v-if="!register_usr" @click="log_in">{{lang.login[2]}}</button>
    </div>
    <div v-if="register_usr">
        <label for="username">{{lang.login[3]}}</label>
        <input v-model="username" type="text" id="username"/>
        <button @click="register">{{lang.login[4]}}</button>
    </div>
    <button v-if="!register_usr" @click="show_register">{{lang.login[5]}}</button>
    `,
    props:['logout', 'lang'],
    emits:['loggedIn'],
    data: function(){
        return{
            username:"",
            password:"",
            email:"",
            error:false,
            register_usr:false,
            authLevel:[false,false]
            
        }
    },
    methods: {
        log_in: async function() {
            let response = await fetch("/session", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({passwd:this.password, email:this.email})
            });
        
            if (response.status === 200){
                let result = await response.json()
                this.authLevel = [true, result.is_admin]
                this.$emit("loggedIn", this.authLevel)
                this.$router.push("/");
                console.log("success");
                return;
            };
            this.error = true;
        },
        register: async function(){
            let response = await fetch("/users", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({username:this.username, passwd:this.password, email:this.email})
            });
            if (response.status === 200){
                let result = await response.text();
                /* this.$router.push("/"); */
                console.log("success");
                this.register_usr = false;
                this.clear_form();
                return;
            };
            this.error = true;
        },
        show_register: function(){
            this.register_usr = true;
        },
        clear_form: function(){
            this.username = "";
            this.password = "";
            this.email = "";
            console.log
        }
    },
    watch: {
        logout: function(val){
            this.authLevel = [false,false]
        }
    }
}