$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/informesEmpleado',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Agrupar y contar informes por proyecto
            const conteo = {};
            data.forEach(informe => {
                const key = informe.proyecto_idProyecto || 'Sin Proyecto';
                conteo[key] = (conteo[key] || 0) + 1;
            });

            const labels = Object.keys(conteo).map(id => `Proyecto ${id}`);
            const values = Object.values(conteo);

            renderChart(labels, [{
                label: 'Informes por proyecto',
                data: values,
                backgroundColor: '#7986cb',
                borderColor: '#3f51b5',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#5c6bc0'
            }]);

            // Mostrar el total de informes debajo de la gráfica
            $('#mensaje-informes').remove();
            $('#grafico5').after(`<div id="mensaje-informes" style="margin-top:10px;font-weight:bold;color:#3f51b5;">Total de informes: ${data.length}</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico5').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico5').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                indexAxis: 'y',
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
                            text: 'Cantidad de informes'
                        }
                    }
                }
            }
        });
    }
});