const videoCompC = {
    template: /*html*/`
        <button @click="exit"> exit </button>
        {{ path }}
        <video width="720" controls :src="path">
        Video doesn't exist/server error, or you do not have permission to access resource.
        </video>
    `,
    props:['path'],
    methods: {
        exit: function(){
            this.$emit("exit")
        }
    }
}


/* :src="video_url" ,
    props:['path'],
    data(){
        return{
            'videopath':""
        }
    },
    methods: {
        getVideo: async function(){
             let response = await fetch(this.path);
             
        }
    } 
    
            <source :src="path", type="video/mp4">

    */