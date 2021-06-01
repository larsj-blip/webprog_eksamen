const loginC = {
    template: /*html*/`
    <form action="/session">
        <label for="username">username</label>
        <input type="text", id="username", name="username">
        <label for="passwd">password</label>
        <input type="password", id="passwd", name="passwd">
        <button>submit</button>
    </form>
    `,
    methods: {
        log_in: async function() {
            let username = document.getElementById(username).value;
            let passwd = document.getElementById(password).value;
            
            let response = await fetch("/user", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({username:username, passwd:passwd})
            });
        
            if (response.status != 200){
                /* feilmelding, enten feil i backend eller feil med bruker */
                return
            }
        
            let user = await response.json();
            /* logikk for å vise brukernavn, kanskje i vue? */
        }
    }
}