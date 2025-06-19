$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/informesEmpleado',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Agrupar y contar informes por empleado
            const conteo = {};
            data.forEach(informe => {
                const key = informe.empleado_idEmpleado || 'Sin Empleado';
                conteo[key] = (conteo[key] || 0) + 1;
            });

            const labels = Object.keys(conteo).map(id => `Empleado ${id}`);
            const values = Object.values(conteo);

            renderChart(labels, [{
                label: 'Informes por empleado',
                data: values,
                backgroundColor: '#80cbc4'
            }]);

            // Mostrar el total de informes debajo de la gráfica
            $('#mensaje-informes-empleado').remove();
            $('#grafico8').after(`<div id="mensaje-informes-empleado" style="margin-top:10px;font-weight:bold;color:#00897b;">Total de informes: ${data.length}</div>`);
        },
        error: function (xhr) {
            let mensaje = 'Hubo un error al cargar los datos.';
            if (xhr.responseJSON && xhr.responseJSON.error) {
                mensaje = `<b>Error:</b> ${xhr.responseJSON.error}<br><b>Detalle:</b> ${xhr.responseJSON.detalle || ''}`;
            }
            $('#grafico8').replaceWith(`<div style="color: red; font-weight: bold;">${mensaje}</div>`);
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico8').getContext('2d');
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
                            text: 'Cantidad de informes'
                        }
                    }
                }
            }
        });
    }
});