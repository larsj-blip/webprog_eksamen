const adminC = {
template: /*html*/`
    <h2>{{lang.admin[0]}}</h2>
    <div v-if="!appointmentvar">
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
                    <button @click="appointment(user.email)">schedule appointment</button>
                </div>
            </ul>
        </li>
    </ul>
    <button @click="push_changes_auth">{{lang.admin[5]}}</button>
    </div>
    <div v-if="appointmentvar">
        appointment date for {{ calendarinfo[0] }}
        date<input type="date" v-model="calendarinfo[1]" />
        time<input type="time" placeholder="hh:mm" v-model="calendarinfo[2]" />
        <button @click="push_changes_calendar">schedule appointment</button>
    </div>
    
`,
props:['lang'],
data: function(){
    return{
        unauthUsers: [],
        users: [],
        error:false,
        appointmentvar:false,
        calendarinfo:["","",""]
    }
},
methods:{
    push_changes_auth: async function(){
        const allUsers = this.users.concat(this.unauthUsers);
        for(i=0;i<allUsers.length;i++){
            allUsers[i].video_privilege = [allUsers[i].checkedLecture, allUsers[i].checkedConf];
        }
        let response = await fetch("/users", {
            method:"PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(allUsers)
        });
        if (response.status === 200){
            this.users = [];
            this.unauthUsers = [];
            this.fetch_users();
        } else {
            this.error = true;
            this.users = [];
            this.unauthUsers = [];
            this.fetch_users();/* PUSH CHANGES + display changes*/
        }
    },
    push_changes_calendar: async function(){
        const data = this.calendarinfo;
        let response = await fetch("/calendar",{
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        if(response.status===200){
            console.log("hoooray")
        }else{
            console.log("boooo")
        }
    },
    fetch_users: async function(){
        let response = await fetch('/users');
        if(response.status === 200){
            let result = await response.json();
            for(i=0; i<result.length; i++){
                if (result[i].authorized_user === true){
                    result[i].checkedLecture = Boolean(result[i].video_privilege & 1);
                    result[i].checkedConf = Boolean(result[i].video_privilege & 2);
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
    },
    appointment: function(email){
        this.appointmentvar = true
        this.calendarinfo[0] = email
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