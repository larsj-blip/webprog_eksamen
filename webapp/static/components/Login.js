
const loginC = {
    template: /*html*/`
    <div>
        <label for="email">email</label>
        <input v-model="email" type="email" id="email">
        <label for="passwd">password</label>
        <input v-model="password" type="password" id="passwd"/>
        <button v-if="!register_usr" @click="log_in">submit</button>
    </div>
    <div v-if="register_usr">
        <label for="username">full name</label>
        <input v-model="username" type="text" id="username"/>
        <button @click="register">register</button>
    </div>
    <button v-if="!register_usr" @click="show_register">Don't have a user? Click here to register!</button>
    `,
    props:['logout'],
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