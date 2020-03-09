// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var organizaciones=[];
var organizacionesSinDuplicados=[]
var meses=[];
fetch("../../datos/csvjson.json").then((data)=>{
 return data.json();
}).then((res)=>{
  for(var i=0;i<res.length;i++){
    console.log("this.organizaciones.length "+this.organizaciones.length);
    // if(this.organizaciones.length>0){
    //   for(var j=0;j<this.organizaciones.length;j++){
    //     
    //   }
    // }
    // if(this.organizaciones.length>0){
    //   for(var j=0;j<this.organizaciones.length;j++){
    //     this.organizaciones.push(res[i].ORGANIZACIÓN);
    //   }
    // }
    this.organizaciones.push(res[i].ORGANIZACIÓN);
    if(res.length-i==1){
      console.log("ultima");
      organizacionesSinDuplicados= this.organizaciones.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
       console.log("organizaciones2 "+JSON.stringify(organizacionesSinDuplicados));
      console.log("organizaciones2 LENGTH "+organizacionesSinDuplicados.length);
      meses=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.pintar(organizacionesSinDuplicados,meses)
      // this.organizacionesSinDuplicados=this.organizaciones.unique();
      // console.log("organizacionesSinDuplicados "+JSON.stringify(organizacionesSinDuplicados));
      // console.log("organizacionesSinDuplicados LENGTH "+organizacionesSinDuplicados.length);
    }
    
  }
 
});
function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function sacarMedia(){
  
}
function pintar(organizaciones,meses2){
// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: [organizaciones[0],organizaciones[1],organizaciones[2],organizaciones[3],organizaciones[4],organizaciones[5],organizaciones[6],organizaciones[7]],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
      // data: [0, 10000, 5000, 15000, 10000],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: meses2.length,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
           
            return meses2[index];
            //return '$' + number_format(value);
          }
        },

        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

}
