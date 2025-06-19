$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/arbolesPorProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Extraer especies y alturas
            const labels = data.map(arbol => arbol.especie);
            const values = data.map(arbol => Number(arbol.altura));
            // Calcular promedio
            const promedio = values.reduce((a, b) => a + b, 0) / values.length;

            renderChart(labels, [{
                label: 'Altura de cada árbol (m)',
                data: values,
                backgroundColor: '#3f51b5'
            }]);

            // Mostrar el promedio debajo de la gráfica
            $('#mensaje-promedio').remove();
            $('#grafico3').after(`<div id="mensaje-promedio" style="margin-top:10px;font-weight:bold;color:#3f51b5;">Altura promedio: ${promedio.toFixed(2)} m</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico3').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico3').getContext('2d');
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
                            text: 'Altura (m)'
                        }
                    }
                }
            }
        });
    }
});
