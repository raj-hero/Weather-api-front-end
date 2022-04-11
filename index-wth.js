const api={
    key:"8db430498e469882eccec710692e922d",
    baseurl:"https://api.openweathermap.org/data/2.5/",
}

const searchbox=document.querySelector('.search-bar');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt)
{
    // 13-> Enter or Return Key
    if(evt.keyCode==13)
    {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
function getResults(qry)
{
    fetch(`${api.baseurl}weather?q=${qry}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather)
{
    console.log(weather);
    let city=document.querySelector('.city');
    city.innerText=`${weather.name},${weather.sys.country}`;
    let now=new Date();
    let dateNow=document.querySelector('.date');
    dateNow.innerText=dateBuild(now);
    let tempr=document.querySelector('.temp');
    tempr.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    let weatherElement=document.querySelector('.weather');
    weatherElement.innerText=weather.weather[0].main;
    let hiLow=document.querySelector('.hi-low');
    hiLow.innerText=`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}
function dateBuild(dateDay)
{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[dateDay.getDay()];
  let date = dateDay.getDate();
  let month = months[dateDay.getMonth()];
  let year = dateDay.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}