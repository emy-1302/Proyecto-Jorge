$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/arbolesPorProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Agrupar y contar árboles por especie
            const conteo = {};
            data.forEach(arbol => {
                const key = arbol.especie || 'Sin Especie';
                conteo[key] = (conteo[key] || 0) + 1;
            });

            const labels = Object.keys(conteo);
            const values = Object.values(conteo);

            renderChart(labels, [{
                label: 'Cantidad de árboles por especie',
                data: values,
                backgroundColor: '#43a047'
            }]);

            // Mostrar el total de árboles debajo de la gráfica
            $('#mensaje-total-arboles').remove();
            $('#grafico2').after(`<div id="mensaje-total-arboles" style="margin-top:10px;font-weight:bold;color:#2e7d32;">Total de árboles: ${data.length}</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico2').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico2').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});