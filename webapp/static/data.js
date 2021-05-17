async function login(){
    let username = document.getElementById(username).value;
    let passwd = document.getElementById(password).value;
    
    let response = await fetch("/login", {
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