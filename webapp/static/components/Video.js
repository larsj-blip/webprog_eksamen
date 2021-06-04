const videoC = {
    template:/*html*/`
        <div v-if="!buttclick">
        <ul>
          <li v-for="lecture in lectureList"> {{ lecture.path }} <button @click="clik(lecture.path, 'lectures')"> play video</button> </li>
        </ul>
        <ul>
          <li v-for="conference in conferenceList"> {{ conference.path }} 
          <button @click="clik(conference.path, 'conferences')"> play video</button> </li>
        </ul> 
        </div>
        <video-comp-c v-if="buttclick" :path="vidpath" @exit="this.buttclick = false"/>
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
            console.log("hellooo");
            let path = "videos/" + cat;
            this.vidpath = path + "/" + file;
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