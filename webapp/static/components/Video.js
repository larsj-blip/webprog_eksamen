const videoC = {
    template: /*html*/`
        <video width="720" controls>
        <source src="/videos" type="video/mp4">
        </video>
    `,
    data(){
        return{
            'video_url':""
        }
    }
}


/* :src="video_url" */