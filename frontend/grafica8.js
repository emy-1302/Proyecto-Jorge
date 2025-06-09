$(document).ready(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/informesProyecto', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.values);
        },
        error: function () {
            // Datos de ejemplo si falla la petición
            renderChart(
                ['Proyecto A', 'Proyecto B', 'Proyecto C', 'Proyecto D'],
                [12, 8, 15, 10]
            );
        }
    });

    function renderChart(labels, valores) {
        const ctx8 = document.getElementById('grafico8').getContext('2d');
        new Chart(ctx8, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Informes generados',
                    data: valores,
                    borderColor: '#3f51b5',
                    backgroundColor: 'rgba(63, 81, 181, 0.1)',
                    tension: 0.3,
                    pointBackgroundColor: '#3f51b5',
                    pointBorderColor: '#00086d',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#00086d',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#00086d' },
                        grid: { color: '#e3e4fa' }
                    },
                    x: {
                        ticks: { color: '#00086d' },
                        grid: { color: '#e1e2f9' }
                    }
                }
            }
        });
    }
});