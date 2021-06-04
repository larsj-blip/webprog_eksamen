const calendarC = {
    props: ['lang'],
    template: /*html*/`
        <div v-if="success" class="alert alert-success" role="alert">{{lang.calendar[0]}}</div>
        <div v-if="error" class="alert alert-danger" role="alert">{{lang.calendar[1]}}</div>
        <h2>{{lang.calendar[3]}}</h2>
        <table class="table"> 
        <thead>
          <tr>
            <th scope="col">{{lang.calendar[4]}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td  v-for="event in events">{{ event.date }}</td>
          </tr>
        </tbody>
        </table>
        <button class="btn btn-primary" @click="requestAppointment">{{lang.calendar[5]}}</button>
        `,
    data: function(){
        return{
            error:false,
            success:false,
            events:[]
        }
    },
    methods:{
        requestAppointment: async function(){
            this.error = false
            this.success = false
            let response = await fetch("/calendar", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            if(response.status === 200){
                this.error = false
                this.success = true
                console.log("yessir")
            }else{
                this.error = true
            }
        },getEvents: async function(){
            let response = await fetch("/calendar")
            if(response.status === 200){
                result = await response.json()
                this.events = result.events
            }else{
                this.error = true
            }
        }

    },
    mounted(){
        this.getEvents()
    }
}