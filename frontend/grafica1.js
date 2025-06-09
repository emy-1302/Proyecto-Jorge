// Asegúrate de tener incluido jQuery en tu HTML antes de este script

$(document).ready(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/arbolesPorProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, [{
                label: 'Árboles registrados',
                data: data.values,
                backgroundColor: ['#7986cb', '#9fa8da', '#c5cae9', '#d1c4e9', '#b2dfdb', '#b39ddb', '#ffe082', '#ffab91', '#80cbc4', '#a5d6a7'],
                borderColor: '#3f51b5',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#5c6bc0'
            }]);
        },
        error: function () {
            renderChart(
                ['Proyecto A', 'Proyecto B'],
                [{
                    label: 'Árboles registrados',
                    data: [10, 5],
                    backgroundColor: ['#7986cb', '#9fa8da']
                }]
            );
        }
    });

    function renderChart(labels, datasets) {
        const ctx = document.getElementById('grafico1').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
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