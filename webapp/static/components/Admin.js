const adminC = {
template: /*html*/`
    <h2>{{lang.admin[0]}}</h2>
    <ul>
        <li v-for="user in unauthUsers">{{user.username}} {{user.email}} {{lang.admin[1]}} <input type="checkbox" v-model="user.authorized_user"> </li>
    </ul>
    <h2>{{lang.admin[2]}}</h2>
    <ul>
        <li v-for="user in users">{{user.username}} {{user.email}} 
            <ul>
                <div>
                    <li> <input type="checkbox" name="auth_lect" v-model="user.checkedLecture">{{lang.admin[3]}}</li>
                    <li> <input type="checkbox" name="auth_conf" v-model="user.checkedConf">{{lang.admin[4]}}</li>
                </div>
            </ul>
        </li>
    </ul>
    <button @click="push_changes">{{lang.admin[5]}}</button>
`,
props:['lang'],
data: function(){
    return{
        unauthUsers: [],
        users: [],
        error:false
    }
},
methods:{
    push_changes: async function(){
        const allUsers = this.users.concat(this.unauthUsers);
        let response = await fetch("/users", {
            method:"PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(allUsers)
        });
        if (response.status === 200){
        /* this.users = [];
        this.unauthUsers = [];
        this.fetch_users() */
        } else {
            this.error = true;
            this.users = [];
            this.unauthUsers = [];
            this.fetch_users();/* PUSH CHANGES + display changes*/
        }
    },
    fetch_users: async function(){
        let response = await fetch('/users');
        if(response.status === 200){
            let result = await response.json();
            for(i=0; i<result.length; i++){
                if (result[i].authorized_user === true){
                    this.users.push(result[i]);
                }else{
                    this.unauthUsers.push(result[i]);
                }
            }
        }else {
            this.error = true;
            this.users = [];
            this.unauthUsers = [];
        }
    }
},
mounted(){
    this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered, from vue website
            this.fetch_users()
        })
    }
}