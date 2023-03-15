import Chart from 'chart.js/auto'

(async function() {
  const data = [
    { time: 0, velocity: 10 },
    { time: 1, velocity: 20 },
    { time: 2, velocity: 15 },
    { time: 3, velocity: 25 },
    { time: 4, velocity: 22 },
    { time: 5, velocity: 30 },
    { time: 6, velocity: 28 },
  ];

  new Chart(
    document.getElementById('velocity'),
    {
      type: 'line',
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      },
      data: {
        labels: data.map(row => row.time),
        datasets: [
          {
            label: 'Velocity',
            data: data.map(row => row.velocity),
            borderColor: "red",
            tension: 0.3
          }
        ]
      }
    }
  );
})();
