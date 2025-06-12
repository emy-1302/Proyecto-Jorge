$(document).ready(function () {
    $.ajax({
        url: 'https:/proyectoe4servicios.onrender.com/api/contarArboles',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.total);
        },
        error: function () {
            $('#grafico2').replaceWith('<div style="color: red; font-weight: bold;">Hubo un error al cargar los datos.</div>');
        }
    });

    function renderChart(total) {
        const ctx = document.getElementById('grafico2').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total de árboles'],
                datasets: [{
                    label: 'Árboles plantados',
                    data: [total],
                    backgroundColor: ['#43a047']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});