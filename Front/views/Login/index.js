

import { crear } from "../../assets/common/cookies.js";
// LOGIN FUNCTION
function login() {
    const user = document.getElementById("usernameInput").value
    const password = document.getElementById("password").value
  
    var sxmlhttp;
    sxmlhttp = new XMLHttpRequest();

    sxmlhttp.onreadystatechange = function () {
        if (sxmlhttp.readyState == 4 && sxmlhttp.status == 200) {
            if (sxmlhttp.responseText == "Username or password not matching"){
                alert("Username or password not matching")
            }
            else {
                const token = JSON.parse(sxmlhttp.responseText)
                crear(token.token[0].token)
                alert ("Login success")
            }
            
            
        }
    }

   
   
    sxmlhttp.open("POST", "http://127.0.0.1:8080/Hipotecas/Login", true);
    sxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    sxmlhttp.send("password="+password+"&&username="+user);
}
window.onload = function() {
    
    document.getElementById("send").addEventListener("click",function() {
        login()
    })
}