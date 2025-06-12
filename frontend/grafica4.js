$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/capacidadTotalRiego',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(Number(data.capacidad));
        },
        error: function () {
            renderChart(0);
        }
    });

    function renderChart(capacidad) {
        const ctx4 = document.getElementById('grafico4').getContext('2d');
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['Capacidad total de riego'],
                datasets: [{
                    label: 'Capacidad (litros/minuto)',
                    data: [capacidad],
                    backgroundColor: ['rgba(56, 142, 60, 0.6)'],
                    borderColor: '#388e3c',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#00086d'
                        },
                        grid: { color: '#e8eaf6' }
                    },
                    x: {
                        ticks: { color: '#00086d' },
                        grid: { color: '#ede7f6' }
                    }
                }
            }
        });
    }
});