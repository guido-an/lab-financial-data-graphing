var url = 'http://api.coindesk.com/v1/bpi/historical/close.json'

axios.get(url)
.then(response =>{
    console.log(response.data.bpi)
    // printTheChart(response.data);
    printTheChart(response)

  
})
.catch(err => console.log(err))


function printTheChart(response) {
    var ctx = document.getElementById('myChart');
    
    let bitcoinValue = Object.values(response.data.bpi)
    let bitcoinDate = Object.keys(response.data.bpi)
    


    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bitcoinDate,
            datasets: [{
                label: 'Value of Bitcoins',
                data: bitcoinValue,
                backgroundColor: 
                    'rgba(0, 0, 0, 0.2)'
                ,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}
