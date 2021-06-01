const adminC = {
template: /*html*/`
    <h2>unauthorized users</h2>
    <ul>
        <li v-for="user in unauthUsers">{{user.username}} {{user.email}} authorize user <input type="checkbox" v-model="user.auth"> </li>
    </ul>
    <h2>Authorized users</h2>
    <ul>
        <li v-for="user in users">{{user.username}} {{user.email}} >
            <ul>
                <form>
                    <li> <input type="checkbox" name="auth_lect" v-model="user.checkedLecture">lecture privileges</li>
                    <li> <input type="checkbox" name="auth_conf" v-model="user.checkedConf">conference privileges</li>
                </form>
            </ul>
        </li>
    </ul>
    <button @:click="push_changes">push changes</button>
`,
data: function(){
    return{
        unauthUsers: [{username:"lars", email:"lars"}],
        users: [{username:"lars", email:"lars", checkedConf:true, checkedLecture:false},{username:"lars2", email:"lars2",  checkedConf:true, checkedLecture:true}],
    }
},methods:{
    push_changes: async function(){
        /* PUSH CHANGES */
    },
    authorize_user: async function(username){
        /*  */
    }
},
watch:{
    fetch_users: async function(){
        let response = await fetch('/users');
        if(response.status === 200){
            let result = response.json();
            for(i=0; i<result.length; i++){
                if (result[i].authorized === true){
                    let usr = result[i];
                    usr["auth"] = false
                    unauthUsers.push(usr)
                }else{
                    Users.push(result[i])
                }
            }
        }
    }
}
}