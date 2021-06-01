
const loginC = {
    template: /*html*/`
    <form>
        <label for="username">username</label>
        <input v-model="username" type="text" id="username" name="username"/>
        <label for="passwd">password</label>
        <input v-model="password" type="password" id="passwd" name="passwd"/>
        <label for="email">email</label>
        <input v-model="email" type="email" id="email" name="email">
        <button @:click="log_in">submit</button>
    </form>
    `,
    data: function(){
        return{
            username:"",
            password:"",
            email:"",
            error:false,
        }
    },
    methods: {
        log_in: async function() {
            let response = await fetch("/session", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({username:this.username, passwd:this.password, email:this.email})
            });
        
            if (response.status === 200){
                this.$router.push("/");
                return
            };
            this.error = true
        }
    }
}