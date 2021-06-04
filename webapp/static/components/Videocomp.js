const videoCompC = {
    template: /*html*/`
        <video width="720" controls>
        <source :src="path" type="video/mp4">
        Video doesn't exist/server error, or you do not have permission to access resource.
        </video>
    `,
    props:['path']
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
    } */