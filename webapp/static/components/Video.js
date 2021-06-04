let videoC = {
    template:/*html*/`
        <ul>
          <li v-for="lecture in lectureList"> {{ lecture.path }} <button @click="clik(lecture.path, 'lecture')"> play video</button> </li>
        </ul>
        <ul>
          <li v-for="conference in conferenceList"> {{ conference.path }} </li>
        </ul>        
        <videoCompC v-if="buttclick" :path="vidpath" @exit="this.buttclick = false"/>
    `,
    data(){
        return{
            lectureList:[],
            conferenceList:[],
            error:false,
            vidpath:'',
            buttclick: false
        }
    },
    methods:{
        fetch_vids: async function(){
            let response = await fetch("/videos");
            if(response.status === 200){
                let result = await response.json();
                this.lectureList = result.lectures;
                this.conferenceList = result.conferences;
            }else{
                this.error = true;
            }
        },
        clik: function(file, cat){
            console.log("hellooo")
            let path = ""
            if (cat==="lecture"){
                path = "videos/lectures/"
            }else{
                path = "videos/conferences/"
            }
            this.vidpath = path.concat(file);
            this.buttclick = true;

        }
    },
    mounted(){
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been rendered, from vue website
                this.fetch_vids()
            })
        }}