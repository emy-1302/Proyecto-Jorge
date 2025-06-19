$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/actividadesEmpleado', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Calcular duración de cada actividad en días
            const labels = data.map(act => act.descripcion);
            const values = data.map(act => {
                const inicio = new Date(act.fechaInicio);
                const fin = new Date(act.fechaFin);
                return ((fin - inicio) / (1000 * 60 * 60 * 24)).toFixed(2); // días
            });

            // Calcular promedio de duración
            const promedio = values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / values.length;

            renderChart(labels, [{
                label: 'Duración de cada actividad (días)',
                data: values,
                backgroundColor: '#ffab91'
            }]);

            // Mostrar el promedio debajo de la gráfica
            $('#mensaje-promedio-actividad').remove();
            $('#grafico6').after(`<div id="mensaje-promedio-actividad" style="margin-top:10px;font-weight:bold;color:#d84315;">Duración promedio: ${promedio.toFixed(2)} días</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico6').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico6').getContext('2d');
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
                            text: 'Duración (días)'
                        }
                    }
                }
            }
        });
    }
});