$(document).ready(function () {
    $.ajax({
        url: 'https:/proyectoe4servicios.onrender.com/api/alturaPromedio',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(Number(data.altura));
        },
        error: function () {
            $('#grafico3').replaceWith('<div style="color: red; font-weight: bold;">Hubo un error al cargar los datos.</div>');
        }
    });

    function renderChart(altura) {
        const ctx3 = document.getElementById('grafico3').getContext('2d');
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Altura promedio'],
                datasets: [{
                    label: 'Altura promedio (m)',
                    data: [altura],
                    backgroundColor: ['#3f51b5']
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
                            color: '#00086d',
                            callback: value => value + ' m'
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