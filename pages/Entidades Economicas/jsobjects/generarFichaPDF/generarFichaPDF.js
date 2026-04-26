export default {
  async imprimir() {
    // DIAGNÓSTICO: ver qué tiene el form completo
 console.log("formData completo:", JSON.stringify(update_form.formData));
console.log("store municipio:", appsmith.store.fichaPDF);
    
    // Ver cada campo individualmente
    console.log("nombre:", update_form.formData.nombre);
    console.log("direccion:", update_form.formData.direccion);
    console.log("municipio_parroquia_2:", update_form.formData.municipio_parroquia_2);

    // Mostrar en pantalla para confirmar
    showAlert(JSON.stringify(update_form.formData), 'info');
  }
}	
		
		
		const codigoSeleccionado = update_form.formData.municipio_parroquia_2;

// Buscar el objeto completo en los datos del query
const seleccionado = Parroquias_Municipios.data.find(
  row => row.codigo === codigoSeleccionado  // ajusta "codigo" al nombre real de tu columna
);
		
    // 1. Tomar datos del formulario de Appsmith
    const datos = {
      nombre: update_form.formData.entidad,
      rif: update_form.formData.identificacion,
      // parroquia_municipio: Parroquias_Municipios.data,
      codigo_ubicacion: update_form.formData.municipio_parroquia_2,
      direccion: update_form.formData.direccion,
			fecha_inicio: update_form.formData.fecha_inicio,
			ubicacion: update_form.formData.ubicacion,
			sector: update_form.formData.sector,
      telefono: update_form.formData.telefono,
			municipio:seleccionado?.municipio,
  		parroquia:seleccionado?.parroquia,
  		codigoCompleto:codigoSeleccionado,
      correo: update_form.formData.facebook_entidad,
      web: update_form.formData.web_entidad,
      instagram: update_form.formData.instagram_entidad,
      capitalHumano: update_form.formData.capital_humano,
      capacidadInstalada: update_form.formData.operativa,
      capacidadOperativa: update_form.formData.capacidad_produccion,
      productos: update_form.formData.productos,
      participacionMercado: update_form.formData.participacion_mercado,
    };

    // 2. Inyectar HTML con los datos en un iframe oculto y disparar print()
   const htmlContent = this.buildHTML(datos);

    // Guardar el HTML en el store de Appsmith
    await storeValue('fichaPDF', htmlContent);

    // Abrir modal que contiene el iframe
    showModal('Modal_Ficha');
  },

  buildHTML(d) {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 11px; color: #000; }
  .ficha { width: 210mm; margin: auto; padding: 10mm; }
  
  /* CABECERA */
  .cabecera { display: flex; justify-content: space-between; align-items: center;
    border: 2px solid #cc0000; padding: 8px; margin-bottom: 4px; }
  .cabecera img { height: 50px; }
  .cabecera .titulo-secretaria { font-size: 9px; font-weight: bold;
    color: #cc0000; text-align: right; line-height: 1.3; }
  
  /* TÍTULO FICHA */
  .titulo-ficha { background: #fff; border: 1px solid #cc0000;
    text-align: center; font-weight: bold; font-size: 13px;
    padding: 5px; margin-bottom: 0; }
  
  /* SECCIÓN HEADER */
  .seccion-header { background: #cc0000; color: white;
    text-align: center; font-weight: bold; padding: 4px; font-size: 11px; }
  
  /* TABLA PRINCIPAL */
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #aaa; padding: 5px 7px; vertical-align: top; }
  .label { font-weight: bold; background: #f5f5f5; width: 30%; }
  .label-red { font-weight: bold; background: #cc0000; color: white;
    text-align: center; }
  
  /* FILA DE TIPO/TAMAÑO */
  .tipo-row td { text-align: center; }
  .tipo-row .selected { font-weight: bold; background: #cc0000;
    color: white; padding: 3px 10px; border-radius: 3px; }
  
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .ficha { padding: 5mm; }
  }
</style>
</head>
<body>
<div class="ficha">

  <!-- CABECERA -->
  <div class="cabecera">
    <div style="font-size:10px; color:#cc0000; font-weight:bold;">CARABOBO<br><em>Te quiero</em></div>
    <div style="font-weight:bold; font-size:12px;">FICHA RESUMEN EMPRESA</div>
    <div class="titulo-secretaria">SECRETARIA PARA EL TURISMO<br>Y EL DESARROLLO ECONÓMICO<br>INTEGRAL DEL ESTADO CARABOBO</div>
  </div>

  <!-- SECCIÓN 1 -->
  <div class="seccion-header">SECCIÓN 1: IDENTIFICACIÓN DE LA EMPRESA</div>
  <table>
    <tr>
      <td class="label">Nombre de Empresa:</td>
      <td colspan="3"><strong>${d.nombre}</strong></td>
    </tr>
    <tr>
      <td class="label-red">RIF</td>
      <td class="label-red">Sector</td>
      <td class="label-red">Fundación</td>
    </tr>
    <tr>
      <td>${d.rif}</td>
      <td>${d.codigo_ubicacion}</td>
      <td>${d.fecha_inicio}</td>
    </tr>
    <tr>
      <td class="label">Direccion:</td>
      <td colspan="2">${d.direccion}</td>
    </tr>
    <tr>
      <td class="label">Tipo de Empresa:</td>
      <td colspan="2">
        <span class="selected">Pública</span> &nbsp; Privada &nbsp; Mixta &nbsp; Otras
      </td>
    </tr>
    <tr>
      <td colspan="3" class="seccion-header">TAMAÑO DE LA EMPRESA</td>
    </tr>
    <tr class="tipo-row">
      <td><span class="selected">GRANDE X</span></td>
      <td>MEDIANA</td>
      <td>PEQUEÑA</td>
      <td>COMERCIAL</td>
    </tr>
    <tr>
      <td class="label">Municipio:</td><td>${d.municipio}</td>
      <td class="label">Parroquia:</td><td>${d.parroquia}</td>
    </tr>
    <tr>
      <td class="label">Dirección GPS:</td>
      <td colspan="3">${d.ubicacion}</td>
    </tr>
    <tr>
      <td class="label-red">Teléfono</td>
      <td colspan="3" class="label-red">Correo Electrónico</td>
    </tr>
    <tr>
      <td>${d.telefono}</td>
      <td colspan="3">${d.correo}</td>
    </tr>
    <tr>
      <td class="label">Instagram:</td><td>${d.instagram}</td>
      <td class="label">Web:</td><td>${d.web}</td>
    </tr>
    <tr>
      <td class="label">Capital Humano:</td>
      <td colspan="3">${d.capitalHumano}</td>
    </tr>

    <!-- SECCIÓN 2 -->
    <tr><td colspan="4" class="seccion-header">SECCIÓN 2: DATOS OPERATIVOS</td></tr>
    <tr>
      <td class="label-red">Capacidad Instalada</td>
      <td class="label-red">Capacidad Operativa</td>
      <td class="label-red" colspan="2">Productos</td>
    </tr>
    <tr>
      <td>${d.capacidadInstalada}</td>
      <td>${d.capacidadOperativa}</td>
      <td colspan="2">${d.productos}</td>
    </tr>
    <tr>
      <td class="label">Participación en Mercado:</td>
      <td colspan="3">${d.participacionMercado}</td>
    </tr>
  </table>

</div>
</body>
</html>`;
  }
}