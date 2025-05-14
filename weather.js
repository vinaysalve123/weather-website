let inp  = document.getElementById("cityName");
let key  = "23b96d8a2502251362643e586d0956f9";
let form = document.getElementById("weatherForm");
let result = document.getElementById("result");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    apply();

    form.reset();
})

async function apply () {
    try{
        result.innerHTML = `<p style="color:blue">LOADING... 🔃</p>`
        let city = inp.value;

        let weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
        let res  = await fetch(weather);
        if(!res.ok){
            alert("city NOT found !");
            throw new Error("No City found 😞");
        }

        let data = await res.json();

        console.log(data);
        let temp = data.main.temp;
        let speed = data.wind.speed;
        let humidity = data.main.humidity;
        let condition = data.weather[0].description;
        result.innerHTML =
        `<h2>${city.toUpperCase()}</h2>
        <p>🌡️ Temperature : ${temp} °C </p>
        <p>💧 Humidity : ${humidity}%</p>
        <p>⛅ Condition : ${condition}</p>
        <p>💨 Wind Speed : ${speed}</p>`;
    }
    catch(error){
        // alert("City Not Found !!");
        result.innerHTML = `<p style="color:red">${error.message}</p>`;
        console.error(error);
    }
}
