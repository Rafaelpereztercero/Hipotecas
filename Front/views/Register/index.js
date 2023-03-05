import { crear } from "../../assets/common/cookies.js";

// REGISTER FUNCTION
function register(){
    const user = document.getElementById("usernameInput").value
    const password = document.getElementById("password").value
    var sxmlhttp;
    sxmlhttp=new XMLHttpRequest();

    sxmlhttp.onreadystatechange = function() {
        if (sxmlhttp.readyState==4 && sxmlhttp.status==200) {
            const token = JSON.parse(sxmlhttp.responseText)
            crear(token.token[0].token)
            alert ("Login success")
        }
    }

    sxmlhttp.open("POST","http://127.0.0.1:8080/Hipotecas/Register",true);
    sxmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    sxmlhttp.send("password="+"passs"+"&&username="+"user");
    
} 

window.onload = function() {
    document.getElementById("send").addEventListener("click",function() {
       register()
    })
}