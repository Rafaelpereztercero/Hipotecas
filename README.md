

o Un documento con capturas de pantalla de la configuración del
servidor tomcado y el despliegue de la aplicación (en el
README).

o Una WAR con el código fuente de la aplicación. Debe ser
compilable con un Tomcat 10.1

El archivo .war se encuentra dentro de la carpeta "WAR"

o Un script SQL con la creación de la base de datos (tablas, etc), un
usuario con el que conecta la aplicación a la base de datos.

El archivo de carga se encuentra dentro de la carpeta "SQL"

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

function calcularCuotaMensualTabla(monto, tasaInteres, plazo) {
        // Calcular la tasa de interés mensual
        var tasaInteresMensual = tasaInteres / 12;
      
        // Calcular la cuota mensual utilizando la fórmula de la cuota constante
        var cuotaMensual = monto * (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, plazo)) / (Math.pow(1 + tasaInteresMensual, plazo) - 1);
      
        // Inicializar variables para los detalles de amortización
        var capitalPendiente = monto;
        var amortizacion = 0;
        var interes = 0;
        var capitalPendientePosterior = 0;
      
        // Crear una tabla para los detalles de amortización
        var tablaAmortizacion = "<table><tr><th>Mes</th><th>Capital pendiente anterior</th><th>Cuota a pagar</th><th>Parte de la cuota que es amortización</th><th>Parte de la cuota que es interés</th><th>Capital pendiente posterior</th></tr>";
      
        // Calcular los detalles de amortización para cada mes
        for (var mes = 1; mes <= plazo; mes++) {
          // Calcular el interés del mes
          interes = capitalPendiente * tasaInteresMensual;
      
          // Calcular la amortización del mes
          amortizacion = cuotaMensual - interes;
      
          // Calcular el capital pendiente posterior del mes
          capitalPendientePosterior = capitalPendiente - amortizacion;
      
          // Agregar los detalles de amortización a la tabla
          tablaAmortizacion += "<tr><td>" + mes + "</td><td>" + capitalPendiente.toFixed(2) + "</td><td>" + cuotaMensual.toFixed(2) + "</td><td>" + amortizacion.toFixed(2) + "</td><td>" + interes.toFixed(2) + "</td><td>" + capitalPendientePosterior.toFixed(2) + "</td></tr>";
      
          // Actualizar el capital pendiente para el próximo mes
          capitalPendiente = capitalPendientePosterior;
        }
      
        // Cerrar la tabla
        tablaAmortizacion += "</table>";
      
        // Devolver la tabla de amortización
        return tablaAmortizacion
      }