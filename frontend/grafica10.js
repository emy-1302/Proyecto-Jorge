$(document).ready(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/materialesActividad', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // data debe tener la forma { labels: [...], datasets: [{label, data, backgroundColor}, ...] }
            renderChart(data.labels, data.datasets);
        },
        error: function () {
            // Datos de ejemplo si falla la petición
            renderChart(
                ['Actividad 1', 'Actividad 2', 'Actividad 3'],
                [
                    { label: 'Cemento', data: [12, 8, 10], backgroundColor: '#7986cb' },
                    { label: 'Arena', data: [6, 10, 4], backgroundColor: '#9fa8da' },
                    { label: 'Tubos', data: [5, 6, 7], backgroundColor: '#c5cae9' }
                ]
            );
        }
    });

    function renderChart(labels, datasets) {
        const ctx10 = document.getElementById('grafico10').getContext('2d');
        new Chart(ctx10, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
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
                        grid: { color: '#ede7f6' }
                    }
                }
            }
        });
    }
});