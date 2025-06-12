$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/equiposProyecto', // Cambia la URL si tu backend usa otra
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.values);
        },
        error: function () {
            // Mostrar mensaje de error si falla la petición
            $('#grafico9').replaceWith('<div style="color:red; font-weight:bold;">Hubo un error al cargar los datos.</div>');
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