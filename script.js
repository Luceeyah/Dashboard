const categoryContainer = document.querySelector("#category-container")
let categoryData = [];
let chartData = null;
const colors = ["#26355D", "#AF47D2", "#FF8F00", "#FFDB00"]
const getCategory =async () => {
    try {
        let response = await fetch("http://localhost:3000/categories");
        let data = await response.json()
    //    console.log(JSON.stringify(response, null, 3))
       categoryData=data
       categoryUi()
    console.log(data)
    } catch (error) {
        console.log("Category not available", error)
    }
} 
const getData =async () => {
    try {
        let response = await fetch("http://localhost:3000/chart")
        let data = await response.json()
        chartData=data
        // console.log(JSON.stringify(data, null, 3))
        
        if (chartData !==null){
            showBarChart()
            showAreaChart()
        }
    } catch (error) {
        console.log("chart not available", error)
    }
}

const categoryUi = () => {
    categoryData?.forEach((category, index) => {
    // console.log(colors(index))
    const template= `<div class="card" style="background-color: ${colors[index]};">
    <div class="inner-card">
    
       <p>${category?.category.toUpperCase()}</p>
         <div class ="icon icon-shape background-green text-primary">
             <span class="material-icons-outlined">${category?.icon}</span>
        </div>

     </div>
     <span class="text-primary">${category?.count}</span>
 </div>`
    
    categoryContainer.insertAdjacentHTML(
        "beforeend",template
       
    )
    });
}



  //LINE/AREA CHART
  
const showBarChart=() =>{
    let series1=chartData?.series1
    let months=chartData?.months
    var barChartOptions = {
            series:series1,
            chart: {
            type: 'bar',
            height: 350,
            tollbar: {
                show: false
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 5,
              horizontal: false,
              columnWidth: '80%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: months
          }
          };
        
          var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
          barChart.render();
}

const showAreaChart=() => {
    let series2=chartData?.series2
    let months2=chartData?.months2
    console.log(months2)
    var areaChartoptions = {
        series: series2,
            chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            curve: 'smooth'
          },
          fill: {
            type:'solid',
            opacity: [0.35, 1],
          },
          labels: months2,
          markers: {
            size: 0
          },
          yaxis: [
            {
              title: {
                text: 'Series A',
              },
            },
            {
              opposite: true,
              title: {
                text: 'Series B',
              },
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if(typeof y !== "undefined") {
                  return  y.toFixed(0) + " points";
                }
                return y;
              }
            }
          }
          };
          var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartoptions);
  areaChart.render();
}
  
const getAllData=() =>{
    getData()
    getCategory()
   
};
window.addEventListener('load',  getAllData);
