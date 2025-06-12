$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/actividadesEmpleado', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.values);
        },
        error: function () {
            $('#grafico6').replaceWith('<div style="color: red; font-weight: bold;">Hubo un error al cargar los datos.</div>');
        }
    });

    function renderChart(labels, valores) {
        const ctx6 = document.getElementById('grafico6').getContext('2d');
        new Chart(ctx6, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Actividades realizadas',
                    data: valores,
                    borderColor: '#3f51b5',
                    backgroundColor: 'rgba(63, 81, 181, 0.3)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#7986cb',
                    borderWidth: 3
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
                    },
                    tooltip: {
                        backgroundColor: '#3f51b5',
                        titleColor: '#fff',
                        bodyColor: '#fff'
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