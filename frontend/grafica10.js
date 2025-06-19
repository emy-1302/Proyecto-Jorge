$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/materialesActividad', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Extraer descripciones y cantidades
            const labels = data.map(mat => mat.descripcion + ' (' + mat.unidadMedida + ')');
            const values = data.map(mat => Number(mat.cantidad));
            // Calcular el total de materiales (suma de cantidades)
            const total = values.reduce((a, b) => a + b, 0);

            renderChart(labels, [{
                label: 'Cantidad de cada material',
                data: values,
                backgroundColor: '#ffab91'
            }]);

            // Mostrar el total debajo de la gráfica
            $('#mensaje-materiales').remove();
            $('#grafico10').after(`<div id="mensaje-materiales" style="margin-top:10px;font-weight:bold;color:#d84315;">Total de materiales: ${total}</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico10').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico10').getContext('2d');
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
                            text: 'Cantidad'
                        }
                    }
                }
            }
        });
    }
});