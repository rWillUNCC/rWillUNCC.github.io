let citySelect = document.getElementById("city-select");
let getWeatherBtn = document.getElementById("get-weather-btn");

let getWeather = async (city) => { //13 - 15 
  try {
    let req = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    let data = await req.json();
    return data;
  } catch (err) { //23
    console.error(err);
  }
};

const showWeather = async (city) => { //14
  let data = await getWeather(city); //16
  

  if (!data) { //24
    alert("Something went wrong, please try again later.");
    return;
  }

  let datam = data.main;
  let undef = ("N/A");//18 - 22
  document.getElementById("weather-icon").src = (data.weather && data.weather[0] && data.weather[0].icon) || undef;
  document.getElementById("main-temperature").textContent = (datam && datam.temp != null) ? datam.temp : undef;
  document.getElementById("feels-like").textContent = (datam && datam.feels_like != null) ? datam.feels_like : undef;
  document.getElementById("humidity").textContent = (datam && datam.humidity != null) ? datam.humidity : undef;
  document.getElementById("wind").textContent = (data.wind && data.wind.speed != null) ? data.wind.speed : undef;
  document.getElementById("wind-gust").textContent = (data.wind && data.wind.gust != null) ? data.wind.gust : undef;
  document.getElementById("weather-main").textContent = (data.weather && data.weather[0] && data.weather[0].main != null) ? data.weather[0].main : undef;
  document.getElementById("location").textContent = (data.name != null) ? data.name : undef;
};

getWeatherBtn.addEventListener("click", () => {
  let city = citySelect.value;
  if (city) {
    showWeather(city);
  }
});