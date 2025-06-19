$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/detallesProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Calcular días activos de cada proyecto
            const labels = data.map(proy => proy.nombre);
            const hoy = new Date();
            const values = data.map(proy => {
                const inicio = new Date(proy.fechaInicio);
                return ((hoy - inicio) / (1000 * 60 * 60 * 24)).toFixed(2); // días
            });

            // Calcular promedio de días activos
            const promedio = values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / values.length;

            renderChart(labels, [{
                label: 'Días activos por proyecto',
                data: values,
                backgroundColor: '#b39ddb'
            }]);

            // Mostrar el promedio debajo de la gráfica
            $('#mensaje-promedio-proyecto').remove();
            $('#grafico7').after(`<div id="mensaje-promedio-proyecto" style="margin-top:10px;font-weight:bold;color:#5c6bc0;">Promedio de días activos: ${promedio.toFixed(2)} días</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico7').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico7').getContext('2d');
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
                            text: 'Días activos'
                        }
                    }
                }
            }
        });
    }
});