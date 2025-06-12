$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/materialesActividad', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // data debe tener la forma { labels: [...], datasets: [{label, data, backgroundColor}, ...] }
            renderChart(data.labels, data.datasets);
        },
        error: function () {
            // Mostrar mensaje de error si falla la petición
            $('#grafico10').replaceWith('<div style="color:red; font-weight:bold;">Hubo un error al cargar los datos.</div>');
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