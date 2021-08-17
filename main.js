const api = {
  key: "fe8b4f476c303e20589645390adf85c7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      if (!weather.ok) {
        let alert = document.querySelector(".alertnotfound");
        alert.innerHTML = `<div class="alert alert-warning" role="alert">
                              Message ! City Not Found 
                              </div>`;

        setTimeout(() => {
          alert.innerHTML = "";
        }, 4000);
      } else {
        let maindisplay = document.getElementById("maindisplay");
        maindisplay.style.visibility = "visible";

        let initialmsg = document.getElementById("initialmsg");
        initialmsg.style.display = "none";
        return weather.json();
      }
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(" .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(" .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(" .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(" .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
