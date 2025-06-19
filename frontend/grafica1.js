$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/arbolesPorProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Agrupar y contar árboles por proyecto
            const conteo = {};
            data.forEach(arbol => {
                const key = arbol.proyecto_idProyecto || 'Sin Proyecto';
                conteo[key] = (conteo[key] || 0) + 1;
            });

            // Convertir a arrays para la gráfica
            const labels = Object.keys(conteo).map(id => `Proyecto ${id}`);
            const values = Object.values(conteo);

            renderChart(labels, [{
                label: 'Árboles por proyecto',
                data: values,
                backgroundColor: [
                    '#7986cb', '#9fa8da', '#c5cae9', '#d1c4e9', '#b2dfdb',
                    '#b39ddb', '#ffe082', '#ffab91', '#80cbc4', '#a5d6a7'
                ],
                borderColor: '#3f51b5',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#5c6bc0'
            }]);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico1').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico1').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#00086d',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad de árboles'
                        }
                    }
                }
            }
        });
    }
});