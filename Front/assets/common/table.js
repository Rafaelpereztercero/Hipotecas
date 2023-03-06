export function calcularCuotaMensualTabla(monto, tasaInteres, plazo) {
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