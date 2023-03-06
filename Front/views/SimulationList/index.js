var user;

function getJson(cookie) {
  const promise = new Promise((resolve, reject) => {
    let sxmlhttp = new XMLHttpRequest();
    sxmlhttp.onload = function () {
      if (sxmlhttp.status == 200) {
        resolve(sxmlhttp.responseText);
      } else {
        reject();
      }
    };

    sxmlhttp.open("POST", "http://127.0.0.1:8080/Hipotecas/SendUser", true);
    sxmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    sxmlhttp.send("token=" + cookie);
  });
  return promise;
}

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
  
window.onload = async function () {
  const cookie = document.cookie.substring(15, document.cookie.length);
  user = JSON.parse(await getJson(cookie));

  document.getElementById("simulationContainer").innerHTML = "";

  for (let i = 0; i < user.Simulations.length; i++) {
    document.getElementById("simulationContainer").innerHTML += `
        
        <div id="simulation${i}" class="bg-slate-100 w-[40%] py-2 px-6 mb-8 flex flex-row justify-between items-center rounded-lg shadow-xl hover:bg-slate-300 cursor-pointer transition ease-out duration-150">

            <div class="relative w-10 h-full mr-4 mt-4 border-r-2 border-y-slate-900">
                <svg class="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>

            <div>
                <!-- CAPITAL INICIAL -->
                <p class="mb-4 text-sm text-justify tracking-wide mt-4">
                    <svg class="w-6 h-6 inline-block" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Capital de la hipoteca:</strong> <span id="i${i}" class="text-indigo-800">${user.Simulations[i].initial}</span><span> €</span>
                </p>

                <!-- INTERÉS -->
                <p class="mb-4 text-sm  text-justify tracking-wide">
                    <svg class="w-6 h-6 inline-block" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Interés:</strong> <span id="f${i}" class="text-indigo-800">${user.Simulations[i].fee}</span><span> %</span>
                </p>

            </div>
            <div class="pt-4">
                <!-- PLAZO -->
                <p class="mb-4 text-sm  text-justify tracking-wide">
                    <svg class="w-6 h-6 inline-block" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Plazo de amortización:</strong>  <span id="d${i}" class="text-indigo-800">${user.Simulations[i].duration}</span><span> meses</span>
                </p>

                <!-- MODALIDAD -->
                <p class="mb-4 text-sm  text-justify tracking-wide">
                    <svg class="w-6 h-6 inline-block" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <strong>Modalidad de cálculo:</strong> <br> <span class="text-indigo-800">Sistema Francés, cuota constante</span>
                </p>
            </div>
        </div>
        `;
  }
  for (let i = 0; i < user.Simulations.length; i++) {
    document
      .getElementById("simulation" + i)
      .addEventListener("click", function () {
        document.getElementById("selected").innerHTML = i;
        if (document.getElementById("info").classList.contains("hidden")) {
          document.getElementById("info").classList.remove("hidden");
        }
        if (
          document.getElementById("concepts").classList.contains("mt-[30rem]")
        ) {
          document.getElementById("concepts").classList.remove("mt-[30rem]");
        }
        let monto = document.getElementById("i" + i).innerHTML;
        let tasaInteres = document.getElementById("f" + i).innerHTML;
        let plazo = document.getElementById("d" + i).innerHTML;

        document.getElementById("cap").innerHTML = monto + " €";
        document.getElementById("int").innerHTML = tasaInteres + " %";
        document.getElementById("dur").innerHTML = plazo + " meses";

        monto = parseFloat(monto);
        tasaInteres = parseFloat(tasaInteres);
        plazo = parseInt(plazo);

        calcularCuotaMensualTabla(monto, tasaInteres, plazo);
        document.getElementById("show").innerHTML= ""
      });
  }

  document
    .getElementById("showAllTable")
    .addEventListener("click", function () {
      let selected = document.getElementById("selected").innerHTML;
      let monto = document.getElementById("i" + selected).innerHTML;
      let tasaInteres = document.getElementById("f" + selected).innerHTML;
      let plazo = document.getElementById("d" + selected).innerHTML;

      monto = parseFloat(monto);
      tasaInteres = parseFloat(tasaInteres);
      plazo = parseInt(plazo);

      document.getElementById("");

      let start = `<thead>
        <tr class="text-sm border border-l-slate-900 py-1">
            <th class="border">Pago</th>
            <th class="border">C.Pendiente</th>
            <th class="border">C.Amortizado</th>
            <th class="border">Intereses</th>
            <th class="border">Cuota</th>
        </tr>
    </thead>
    <tbody>`;
      let middle = calcularCuotaMensualTabla(monto, tasaInteres, plazo);
      let end = `</tbody>`;
      document.getElementById("show").innerHTML = start + middle + end;
    });
};
