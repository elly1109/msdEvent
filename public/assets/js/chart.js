var getUrl = window.location;
var address = window.location.href;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
if((baseUrl=='http://localhost/')||(baseUrl=='https://localhost/')){
    baseUrl+= 'events/public/';
}

$(document).ready(function() {

	// Bar Chart
	
	Morris.Bar({
		element: 'bar-charts',
		data: [
			{ y: '2006', a: 100, b: 90 },
			{ y: '2007', a: 75,  b: 65 },
			{ y: '2008', a: 50,  b: 40 },
			{ y: '2009', a: 75,  b: 65 },
			{ y: '2010', a: 50,  b: 40 },
			{ y: '2011', a: 75,  b: 65 },
			{ y: '2012', a: 100, b: 90 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Total Income', 'Total Outcome'],
		lineColors: ['#00c5fb','#0253cc'],
		lineWidth: '3px',
		barColors: ['#00c5fb','#0253cc'],
		resize: true,
		redraw: true
	});
	
	// Line Chart
	
	Morris.Line({
		element: 'line-charts',
		data: [
			{ y: '2006', a: 50, b: 90 },
			{ y: '2007', a: 75,  b: 65 },
			{ y: '2008', a: 50,  b: 40 },
			{ y: '2009', a: 75,  b: 65 },
			{ y: '2010', a: 50,  b: 40 },
			{ y: '2011', a: 75,  b: 65 },
			{ y: '2012', a: 100, b: 50 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Total Sales', 'Total Revenue'],
		lineColors: ['#00c5fb','#0253cc'],
		lineWidth: '3px',
		resize: true,
		redraw: true
	});
		
});




// api url
const api_url = baseUrl+ 'api/get-suppliers-nations.json';
 
// Defining async function
async function getapi(url) {
   
    // Storing response
    const response = await fetch(url);
   
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    // if (response) {
    //     hideloader();
    // }
    // show(data);
}


getapi(api_url);

//pie
  var ctxP = document.getElementById("pieChart").getContext('2d');
  var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [{
        data: [300, 50, 100, 40, 120],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
      }]
    },
    options: {
      responsive: true
    }
  });