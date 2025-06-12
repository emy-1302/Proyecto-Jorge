$(document).ready(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/informesEmpleado', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.values);
        },
        error: function () {
            // Datos de ejemplo si falla la petición
            renderChart(
                ["Ana", "Luis", "María", "Carlos"],
                [12, 9, 15, 7]
            );
        }
    });

    function renderChart(labels, valores) {
        const ctx5 = document.getElementById('grafico5').getContext('2d');
        new Chart(ctx5, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Informes realizados',
                    data: valores,
                    backgroundColor: '#7986cb',
                    borderColor: '#3f51b5',
                    borderWidth: 1,
                    borderRadius: 8,
                    hoverBackgroundColor: '#5c6bc0'
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#00086d',
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#3f51b5',
                        titleColor: '#fff',
                        bodyColor: '#fff'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { color: '#00086d' },
                        grid: { color: '#e8eaf6' }
                    },
                    y: {
                        ticks: { color: '#00086d' },
                        grid: { display: false }
                    }
                }
            }
        });
    }
});