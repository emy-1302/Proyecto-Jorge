$(document).ready(function () {
    $.ajax({
        url: 'https://proyectoe4servicios.onrender.com/api/detallesProyecto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            renderChart(data.labels, data.ciudades, data.estados, data.paises);
        },
        error: function () {
            $('#grafico7').replaceWith('<div style="color: red; font-weight: bold;">Hubo un error al cargar los datos.</div>');
        }
    });

    function renderChart(labels, ciudades, estados, paises) {
        
        const colorMap = {};
        const palette = ['#7986cb', '#ba68c8', '#4dd0e1', '#ffd54f', '#81c784', '#ff8a65', '#a1887f', '#90a4ae', '#f06292', '#9575cd'];
        let colorIdx = 0;
        ciudades.forEach(ciudad => {
            if (!colorMap[ciudad]) {
                colorMap[ciudad] = palette[colorIdx % palette.length];
                colorIdx++;
            }
        });

        const backgroundColors = ciudades.map(ciudad => colorMap[ciudad]);

        const ctx = document.getElementById('grafico7').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Proyectos por ciudad',
                    data: labels.map(() => 1), 
                    backgroundColor: backgroundColors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return labels[context[0].dataIndex];
                            },
                            label: function(context) {
                                const idx = context.dataIndex;
                                return [
                                    `Ciudad: ${ciudades[idx]}`,
                                    `Estado: ${estados[idx]}`,
                                    `País: ${paises[idx]}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 },
                        title: { display: false }
                    },
                    x: {
                        ticks: { color: '#00086d', font: { size: 12 } }
                    }
                }
            }
        });
    }
});