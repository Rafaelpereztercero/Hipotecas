

o Un documento con capturas de pantalla de la configuración del
servidor tomcado y el despliegue de la aplicación (en el
README).

o Una WAR con el código fuente de la aplicación. Debe ser
compilable con un Tomcat 10.1

## **El archivo .war se encuentra dentro de la carpeta "WAR"**

o Un script SQL con la creación de la base de datos (tablas, etc), un
usuario con el que conecta la aplicación a la base de datos.

## **El archivo de carga se encuentra dentro de la carpeta "SQL"**

BONUS (2P)

• El servidor tomcat está configurado con SSL.



¿Cómo se calcula la cuota mensual?

P: Importe del préstamo hipotecario.
i: Tipo de interés anual/12. Se divide entre doce porque pagamos la cuota de la
hipoteca mensualmente.
n: Número de meses durante los cuales se paga el préstamo hipotecario
Puedes ayudarte del excel adjunto para entender cómo realizar los cálculos y el
cuadro de amortización.

Para calcular la cuota mensual, hemos empleado la siguiente funcion:

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

    // Retornar tabla generada
    return tabla;
  }