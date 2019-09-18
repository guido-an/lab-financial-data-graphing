window.onload = async function() {
  axios
    .get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => {
      printChart(Object.keys(res.data.bpi), Object.values(res.data.bpi));
    })
    .catch(err => {
      console.log(err);
    });

  document.getElementById('start-date').onchange = function() {
    updateChart();
  };
  document.getElementById('end-date').onchange = function() {
    updateChart();
  };
  document.getElementById('currency').onchange = function() {
    updateChart();
  };

  //  async function updateChart(){
  //   startDate = document.getElementById("start-date").value
  //   endDate = document.getElementById("end-date").value
  //   currency = document.getElementById("currency").value
  //    try {
  //      const res = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
  //      printChart(Object.keys(res.data.bpi), Object.values(res.data.bpi))
  //    }catch(error){
  //      console.log(error)
  //    }
  //  }

  function updateChart() {
    startDate = document.getElementById('start-date').value;
    endDate = document.getElementById('end-date').value;
    currency = document.getElementById('currency').value;
    axios
      .get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
      )
      .then(res => {
        printChart(Object.keys(res.data.bpi), Object.values(res.data.bpi));
        let arrayPrices = Object.values(res.data.bpi);
        let minPrice = Math.min(...arrayPrices);
        let maxPrice = Math.max(...arrayPrices);

        if (currency == 'EUR') {
          document.getElementById('min-value').innerHTML = minPrice + ' €';
          document.getElementById('max-value').innerHTML = maxPrice + ' €';
        } else {
          document.getElementById('min-value').innerHTML = minPrice + ' $';
          document.getElementById('max-value').innerHTML = maxPrice + ' $';
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function printChart(labels, data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# Bitcoin',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
};
