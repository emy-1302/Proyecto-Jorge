$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/informesProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.values);
        },
        error: function () {
            $('#grafico8').replaceWith('<div style="color: red; font-weight: bold;">Hubo un error al cargar los datos.</div>');
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