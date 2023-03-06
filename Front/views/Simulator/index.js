
var user

function getJson(cookie) {

    const promise = new Promise((resolve, reject) => {

        let sxmlhttp = new XMLHttpRequest()
        sxmlhttp.onload = function () {
            if (sxmlhttp.status == 200) {

                resolve(sxmlhttp.responseText)
                
            }
            else {
                reject()
            }

        }

        sxmlhttp.open("POST", "http://127.0.0.1:8080/Hipotecas/SendUser", true)
        sxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        sxmlhttp.send("token=" + cookie)
    })
    return promise
}

    


window.onload =  async function() {
    
    const cookie = document.cookie.substring(15,document.cookie.length)
    user =  JSON.parse(await getJson(cookie))
    document.getElementById("simulationBttn").addEventListener("click",function() {
        let importe = document.getElementById("importe").value
        let interes = document.getElementById("interes").value
        let plazo =  document.getElementById("plazo").value

        var sxmlhttp;
        sxmlhttp=new XMLHttpRequest();
    
        sxmlhttp.onreadystatechange = function() {
            if (sxmlhttp.readyState==4 && sxmlhttp.status==200) {
        
                alert ("Simulation created")
            }
        }
    
        sxmlhttp.open("POST","http://127.0.0.1:8080/Hipotecas/CreateSimulation",true);
        sxmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        sxmlhttp.send("userId="+user.id+"&&creationDate="+"00"+"&&initial="+importe+"&&duration="+plazo+"&&fee="+interes);

    })
}
