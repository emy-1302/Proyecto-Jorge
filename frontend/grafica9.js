$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/equiposProyecto', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Agrupar y contar equipos por tipo
            const conteo = {};
            data.forEach(equipo => {
                const key = equipo.tipoEquipo || 'Sin Tipo';
                conteo[key] = (conteo[key] || 0) + 1;
            });

            const labels = Object.keys(conteo);
            const values = Object.values(conteo);

            renderChart(labels, [{
                label: 'Cantidad de equipos por tipo',
                data: values,
                backgroundColor: '#ffe082'
            }]);

            // Mostrar el total de equipos debajo de la gráfica
            $('#mensaje-equipos').remove();
            $('#grafico9').after(`<div id="mensaje-equipos" style="margin-top:10px;font-weight:bold;color:#ffb300;">Total de equipos: ${data.length}</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico9').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico9').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad de equipos'
                        }
                    }
                }
            }
        });
    }
});