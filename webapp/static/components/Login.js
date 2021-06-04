
const loginC = {
    template: /*html*/`
    <div v-if="errorLogin" class="alert alert-danger" role="alert">Wrong username/password</div>
    <div v-if="errorSignup" class="alert alert-danger" role="alert">User with this email already exists</div>
    <div>
        <label class="form-label" for="email">{{ lang.login[0] }}</label>
        <input :class="booterror" v-model="email" type="email" id="email">
        <label class="form-label" for="passwd">{{ lang.login[1]}}</label>
        <input :class="booterror" v-model="password" type="password" id="passwd" @keyup.enter="log_in"/>
        
    </div>
    <div v-if="register_usr">
        <label class="form-label" for="username">{{lang.login[3]}}</label>
        <input :class="booterror" v-model="username" type="text" id="username"/>
        <button class="btn btn-primary" type="submit"@click="register">{{lang.login[4]}}</button>
    </div>
    <button class="col-6-md btn btn-primary" v-if="!register_usr" @click="log_in">{{lang.login[2]}}</button>
    <button class="col-6-md btn btn-primary float-end" v-if="!register_usr" @click="show_register"> {{lang.login[5]}} </button>
    `,
    props:['logout', 'lang'],
    emits:['loggedIn'],
    data: function(){
        return{
            username:"",
            password:"",
            email:"",
            errorLogin:false,
            errorSignup:false,
            register_usr:false,
            authLevel:[false,false],
            booterror:"col-md-4 form-control"
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
            this.errorSignup = false;
            this.errorLogin = true;
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
            } else {
                this.errorLogin = false;
                this.errorSignup = true;                
            }
        },
        show_register: function(){
            this.register_usr = true;
        },
        clear_form: function(){
            this.username = "";
            this.password = "";
            this.email = "";
            console.log
        },
        error_form: function(err){
            if(err){
                this.booterror = "col-md-4 form-control is-invalid";
            }else{
                this.booterror = "col-md-4 form-control"
            }
        }
    },
    watch: {
        logout: function(val){
            this.authLevel = [false,false]
        },
        errorSignup: function(){
            this.error_form(this.errorSignup)
        },
        errorLogin: function(){
            this.error_form(this.errorLogin)
        }
    }
}