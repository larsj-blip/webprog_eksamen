const calendarC = {
    props: ['lang'],
    template: /*html*/`
        <div v-if="success" class="alert alert-success" role="alert">appointment requested!</div>
        <div v-if="error" class="alert alert-danger" role="alert">There was an error trying to load/push to server!</div>
        <h2>appointments</h2>
        <table class="table"> 
        <thead>
          <tr>
            <th scope="col">Dato</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td  v-for="event in events">{{ event.date }}</td>
          </tr>
        </tbody>
        </table>
        <button @click="requestAppointment">request appointment</button>
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