let videoC = {
    template:/*html*/`
        <videoCompC></videoCompC>
    `,
    data(){
        return{
            lectureList:[],
            conferenceList:[],
            error:false
        }
    },
    methods:{
        fetch_vids: async function(){
            let response = await fetch("/videos");
            if(response.status === 200){
                let result = await response.json()
                this.lectureList = result.lectures;
                this.conferenceList = result.conferences;
            }else{
                this.error = true
            }
        }
    },
    mounted(){
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered, from vue website
                this.fetch_vids()
            })
        }}