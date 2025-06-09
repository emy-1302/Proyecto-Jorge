$(document).ready(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/contarArboles',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.total);
        },
        error: function () {
            renderChart(0);
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