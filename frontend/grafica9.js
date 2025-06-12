$(document).ready(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/equiposProyecto', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.values);
        },
        error: function () {
            // Datos de ejemplo si falla la petición
            renderChart(
                ['Proyecto A', 'Proyecto B', 'Proyecto C', 'Proyecto D'],
                [5, 3, 4, 2]
            );
        }
    });

    function renderChart(labels, valores) {
        const ctx9 = document.getElementById('grafico9').getContext('2d');
        new Chart(ctx9, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Equipos asignados',
                    data: valores,
                    backgroundColor: ['#7986cb', '#9fa8da', '#c5cae9', '#d1c4e9'],
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
                        labels: {
                            color: '#00086d',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { color: '#00086d' },
                        grid: { color: '#e3e4fa' }
                    },
                    y: {
                        ticks: { color: '#00086d' },
                        grid: { color: '#ede7f6' }
                    }
                }
            }
        });
    }
});