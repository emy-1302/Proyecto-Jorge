$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/capacidadTotalRiego',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Extraer tipos de sistema y capacidades
            const labels = data.map(riego => riego.tipoSistema);
            const values = data.map(riego => Number(riego.capacidad));
            // Calcular capacidad total
            const total = values.reduce((a, b) => a + b, 0);

            renderChart(labels, [{
                label: 'Capacidad de cada sistema (L/min)',
                data: values,
                backgroundColor: '#388e3c'
            }]);

            // Mostrar el total debajo de la gráfica
            $('#mensaje-capacidad').remove();
            $('#grafico4').after(`<div id="mensaje-capacidad" style="margin-top:10px;font-weight:bold;color:#388e3c;">Capacidad total: ${total.toLocaleString()} L/min</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico4').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico4').getContext('2d');
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
                            text: 'Capacidad (L/min)'
                        }
                    }
                }
            }
        });
    }
});