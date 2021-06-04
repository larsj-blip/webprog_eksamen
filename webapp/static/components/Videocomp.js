const videoCompC = {
    template: /*html*/`
        <button @click="exit"> exit </button>
        <video width="720" controls :src="path">
        Video doesn't exist/server error, or you do not have permission to access resource.
        </video>
    `,
    props:['path'],
    methods: {
        exit: function(){
            console.log(this.path)
            this.$emit("exit")
        }
    }
}
