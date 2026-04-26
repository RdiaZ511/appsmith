export default {
  imprimirDesdeModal() {
    // Appsmith SÍ permite esto desde eventos de botón con executeScript
    const html = appsmith.store.fichaPDF;
    download(html, 'ficha.html', 'text/html');
  }
}
