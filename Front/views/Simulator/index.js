
var user

function calcularCuotaMensualTabla(monto, tasaInteres, plazoMeses) {
    // Convertir tasa de interés de porcentaje a decimal
    tasaInteres = tasaInteres / 100;
  
    // Calcular cuota mensual
    var cuotaMensual = (monto * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazoMeses));
    
    // Crear tabla HTML
    var tabla = "";
    
    var saldoPendiente = monto;
    var interesesTotal = 0;
    
    for (var i = 1; i <= plazoMeses; i++) {
      // Calcular intereses y amortización
      var intereses = saldoPendiente * tasaInteres;
      var amortizacion = cuotaMensual - intereses;
      
      // Actualizar saldo pendiente y total de intereses
      saldoPendiente -= amortizacion;
      interesesTotal += intereses;
      
      // Agregar fila a la tabla
      tabla += "<tr class='border'><td>" + i + "</td><td>" + saldoPendiente.toFixed(2) + " €</td><td>" + amortizacion.toFixed(2) + " €</td><td>" + intereses.toFixed(2) + " €</td><td>" + cuotaMensual.toFixed(2) + " €</td></tr>";
    }
    
    // Agregar fila con totales
    tabla += "<tr class='border-[2px] border-[solid] border-[black]'><td>Total</td><td></td><td>" + (monto - saldoPendiente).toFixed(2) + " €</td><td>" + interesesTotal.toFixed(2) + " €</td><td>" + (cuotaMensual * plazoMeses).toFixed(2) + " €</td></tr>";
    
    // Cerrar tabla HTML
    tabla += "";

    document.getElementById("td").innerHTML = plazoMeses
    document.getElementById("tp").innerHTML = parseFloat(monto + interesesTotal).toFixed(2)+ " €"
    document.getElementById("co").innerHTML = parseFloat(cuotaMensual).toFixed(2) +" €"
    document.getElementById("ta").innerHTML = parseFloat(monto).toFixed(2) +" €"
    document.getElementById("ti").innerHTML = parseFloat(interesesTotal).toFixed(2) +" €"
    
    // Retornar tabla generada
    return tabla;
  }

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
    if (document.cookie != "") {
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
document.getElementById("simulationBttn").addEventListener("click",function() {

    let monto = document.getElementById("importe").value;
    let tasaInteres = document.getElementById("interes").value;
    let plazo = document.getElementById("plazo").value;

    
    document.getElementById("cap").innerHTML = monto + " €";
    document.getElementById("int").innerHTML = tasaInteres + " %";
    document.getElementById("dur").innerHTML = plazo + " meses";
    
    monto = parseFloat(monto);
    tasaInteres = parseFloat(tasaInteres);
    plazo = parseInt(plazo);

    calcularCuotaMensualTabla(monto, tasaInteres, plazo)
  

    document.getElementById("showAllTable").addEventListener("click",function() {

        monto = parseFloat(monto);
        tasaInteres = parseFloat(tasaInteres);
        plazo = parseInt(plazo);
        let table = calcularCuotaMensualTabla(monto, tasaInteres, plazo)
        document.getElementById("show").innerHTML = table
    })
})
}
