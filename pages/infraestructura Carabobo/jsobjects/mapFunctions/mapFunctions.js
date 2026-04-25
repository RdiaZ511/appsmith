export default {
    refreshMap: () => {
        mapData.run();
        // Esperar un momento y refrescar el mapa
        setTimeout(() => {
            Mapa.refreshMap();
        }, 500);
    }
}