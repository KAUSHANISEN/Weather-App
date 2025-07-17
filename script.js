
document.addEventListener("DOMContentLoaded", () => {
  let query= "kolkata";
  let api_key= "0be67a627f200d99b3c2c148edb4951d";
   let store ;
   let forecast;
   let weathercontainer = document.querySelector(".main-container");
   let subcontainer =  document.querySelector(".sub-container");
   let forecastdiv = document.querySelector(".week-forecast");
   


   const result = document.querySelector(".city");
   const newresult = document.querySelector(".search-btn");
  

   


result.addEventListener("input",(e) => {
  query= e.target.value;
});

 

result.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    newresult.click(); // or directly call fetchMonthlyWeather(query);
  }
});




   


async function fetchMonthlyWeather(query) {
 try{ 
  
    const url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api_key}&units=metric`
  )
   const url2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${api_key}&units=metric`
  )
    const result = await url.json(); 
   const result2 = await url2.json();
    console.log("Full API response:", result, "forecast", result2);

    store = result?.weather[0]?.main 
     console.log( result?.weather[0]?.main )
     console.log("Current weather condition:", store);

      const temperature = result?.main?.temp;
      document.querySelector(".temp").textContent = `${temperature}°ᶜ`;

      const location = result?.name;
      document.querySelector(".location").textContent = `${location}`;

      const feelslike = result?.main?.feels_like;
      document.querySelector(".feels-like").textContent = ` Feels like- ${feelslike}°C`;

      const description = result?.weather[0]?.description;
      document.querySelector(".description-div").textContent = `"${description}"`;

      const humidity = result?.main?.humidity;
      document.querySelector(".humidity-value").textContent = `${humidity}`;

      const pressure = result?.main?.pressure;
      document.querySelector(".pressure-value").textContent = `${pressure}`;

      const sealevel = result?.main?.sea_level;
      document.querySelector(".sea-level-value").textContent = `${sealevel}`;

       const windspeed = result?.wind?.speed;
      document.querySelector(".wind-speed-value").textContent = `${windspeed}`;

     
    let bg ="";
    switch ( result?.weather[0]?.main.toLowerCase()){
        case "clear":
           weathercontainer.style.backgroundImage= "url('./media/Sunny.jpg')";
           subcontainer.style.backgroundImage= "url('./media/Sunny.jpg')";
            break;
        case "rain":
          weathercontainer.style.backgroundImage= "url('./media/Rainy.jpg')";
           subcontainer.style.backgroundImage= "url('./media/Rainy.jpg')";
            break;
        case "fog":
          weathercontainer.style.backgroundImage= "url('./media/Foggy.jpg')"; 
           subcontainer.style.backgroundImage= "url('./media/Foggy.jpg')"; 
            break;
        case "clouds":
          weathercontainer.style.backgroundImage= "url('./media/cloudyy.jpg')";
          subcontainer.style.backgroundImage= "url('./media/cloudyy.jpg')";
          
            break;  
        case "tornado":
          weathercontainer.style.backgroundImage= "url('./media/Stormy.jpg')";  
          subcontainer.style.backgroundImage= "url('./media/Stormy.jpg')";
            break; 
         case "thunderstorm":
          weathercontainer.style.backgroundImage= "url('./media/Lightning.jpg')";  
          subcontainer.style.backgroundImage= "url('./media/Lightning.jpg')";
            break;
            case "snow":
          weathercontainer.style.backgroundImage= "url('./media/Snowy.jpg')";  
          subcontainer.style.backgroundImage= "url('./media/Snowy.jpg')"; 
            break;     
    } // You’ll get monthly data here

      forecast = result2?.list;
      
      forecast.map((data)=>{
            const date = data.dt_txt.slice(0,10)
            const hour = data.dt_txt.slice(11,19)
            console.log(date, hour)
            
            const childforecastdiv = document.createElement("div");

            childforecastdiv.className = "child-forecast"
            childforecastdiv.innerHTML = ` 
            <div class="sub-child">
             <div class="day">${date}</div>
             <div class="time">${hour}</div>
              <div class="icon"> </div>

              <div class="temp2"> ${data.main.temp}°C </div>
             </div>`
            forecastdiv.appendChild(childforecastdiv)
      }) 



  } catch (error) {
    console.error('Error fetching weather:', error);

  }
}

 
fetchMonthlyWeather(query);



newresult.addEventListener("click", () => {
    if(!query){
        alert("please enter a city!");
        return;
    }
    console.log("clicked here")
    fetchMonthlyWeather(query)
   
  })

  

});


