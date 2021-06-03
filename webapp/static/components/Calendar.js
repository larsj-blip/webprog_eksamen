const calendarC = {
    props: ['lang'],
    template: /*html*/`
        <button @click="requestAppointment">request appointment</button>
        `,
    data: function(){
        return{
            'error':false,
            'success':false
        }
    },
    methods:{
        requestAppointment: async function(){
            let response = await fetch("/calendar", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            if(response.status === 200){
                this.error = false
                this.success = true
            }else{
                this.error = true
            }
        }
    }
}