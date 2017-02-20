console.log('wat')
console.log($)
//import $ from 'jquery';

var forEach = function(arr, cb){
for(var i = 0 ; i < arr.length; i++){
  {cb(arr[i], i, arr)}
}
}


function createArrivalHtmlTable(flightsArrayData){
  var htmlTable =  `
    <table class="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Arrival Time</th>
        <th>Origin</th>
        <th>Airline</th>
      </tr>
    </thead>
    <tbody>`



  forEach(flightsArrayData, function(arrivalElement, index, theArray){
        let arrivalDate = arrivalElement.date
        //console.log(arrivalDate)
        let arrivalTime = arrivalElement.plannedArrival
        //console.log(arrivalTime)
        let arrivalOrigin = arrivalElement.from
        //console.log(arrivalOrigin)
        let arrivalAirLine = arrivalElement.airline
        //console.log(arrivalAirLine)

        var flightList = `

                <tr>
                <td>${arrivalDate}</td>
                <td>${arrivalTime}</td>
                <td>${arrivalOrigin}</td>
                <td>${arrivalAirLine}</td>
                </tr>
        `


        htmlTable += flightList
    })
    htmlTable +=  `
              </tbody>
             </table>
    `

    return htmlTable
  }
  function createDepartureHtmlTable(flightsArrayData){
    var htmlTableTwo =  `
      <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Departure Time</th>
          <th>Destination</th>
          <th>Airline</th>
        </tr>
      </thead>
      <tbody>`

    forEach(flightsArrayData, function(departureElement, index, theArray){
        console.log(departureElement.to)
        let departureDate = departureElement.date
        //console.log(departureDate)
        let departureTime = departureElement.plannedArrival
        //console.log(departureTime)
        let departureOrigin = departureElement.to
        //console.log(departureOrigin)
        let departureAirLine = departureElement.airline
        //console.log(departureAirLine)

        var flightList = `

                <tr>
                <td>${departureDate}</td>
                <td>${departureTime}</td>
                <td>${departureOrigin}</td>
                <td>${departureAirLine}</td>
                </tr>
        `


        htmlTableTwo += flightList
    })

    htmlTableTwo +=  `
              </tbody>
             </table>
    `

    return htmlTableTwo

}

function createCarpoolHtmlTable(carpoolArrayData){
      var htmlTable =  `
        <table class="table">
        <thead>
          <tr>
            <th>Time of Departure</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>`

      forEach(carpoolArrayData, function(carpoolElement, index, theArray){

        var carpoolTime = carpoolElement.time
        var carpoolFrom = carpoolElement.from
        var carpoolTo = carpoolElement.to

        var carpoolList = `
        <tr>
        <td>${carpoolTime}</td>
        <td>${carpoolFrom}</td>
        <td>${carpoolTo}</td>
        </tr>
        `
        htmlTable += carpoolList

      })
      htmlTable +=  `
                </tbody>
               </table>
      `

      return htmlTable
}

function createConcertHtmlTable(concertArrayData){
  //console.log(concertArrayData)
  var htmlTable = `
    <div class="container">
      <div class="col-sm-6">

    `

    forEach(concertArrayData, function(concertElement, index, theArray){

      var concertPhoto = concertElement.imageSource
      var concertName = concertElement.name
      var concertVenue = concertElement.eventHallName
      var eventDateTime = concertElement.dateOfShow

      var concertList = `
      <div class="thumbnail">
      <img src="${concertPhoto}" alt="...">
        <div class="caption">
        <h5>${concertName}</h5>
      <ul>
        <li> Venue: ${concertVenue}</li>
      </ul>
      <h6>${eventDateTime}</h6>
        </div>
        </div>
      `
      htmlTable += concertList
    })
    htmlTable += `

       </div>
     </div>
    `
    return htmlTable
}


let appContainer = document.querySelector(".page-content")
console.log(appContainer)



function controllerRouter(){
   let currentRoute = window.location.hash.slice(1)
   //console.log(window.location.hash, "#concerts")
   //console.log(currentRoute, "concerts")

   if(currentRoute === ''){
      appContainer.innerHTML =`
      <div>
				<table class="table">
						<h2 class="table_header">The Basic Facts</h2>
								<tr><td>Native Name</td><td>Ísland</td></tr>
								<tr><td>Demonym</td><td>Icelander</td></tr>
								<tr><td>Area(m2)</td><td>103000</td></tr>
								<tr><td>Calling Code</td><td>352</td></tr>
						</table>
				</div>`
   }
   if(currentRoute === "concerts"){
     appContainer.innerHTML = '<div class="container concerts"></div>'
     $.getJSON('http://apis.is/concerts').then(function(serverRes){

      //console.log('in concerts')
      //console.log(serverRes)
      var concertContainer = document.querySelector('.concerts')
      var concertArr = serverRes.results
      console.log(concertArr)
      var htmlString = `
        <h2>Concerts</h2>
        ${createConcertHtmlTable(concertArr)}
        `

        concertContainer.innerHTML = htmlString
    })
  }
   if(currentRoute === "carpools"){
     appContainer.innerHTML = '<div class="container carpools"></div>'
     $.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
      //console.log('in carpools')
      //console.log(serverRes)
      var carpoolContainer = document.querySelector('.carpools')
      var carpoolArr = serverRes.results
      var htmlString = `
        <h2>Carpools</h2>
        ${createCarpoolHtmlTable(carpoolArr)}

        `

        carpoolContainer.innerHTML = htmlString
    })

  }
   if(currentRoute === "flights"){
    appContainer.innerHTML = '<div class="container arrivals"></div><hr/><div class="container departures"></div>'

     $.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(serverRes){
      //console.log('in flights')
      //console.log(serverRes)
      var arrivalsContainer = document.querySelector('.arrivals')
      var arrivalArr = serverRes.results
      var htmlString = `
        <h2>Arrivals</h2>
        ${createArrivalHtmlTable(arrivalArr)}

        `
      arrivalsContainer.innerHTML = htmlString
    })

    $.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){
      //console.log(serverRes)
      var departuresContainer = document.querySelector('.departures')
      let departureArr = serverRes.results
      console.log(departureArr)
      var htmlString = `
        <h2>Departures</h2>
        ${createDepartureHtmlTable(departureArr)}

      `

      departuresContainer.innerHTML = htmlString
    })
  }


}

controllerRouter();
window.addEventListener('hashchange', controllerRouter)
