wwd = null
wWind = null

function setGlobalWWD(value){
  wwd = value;
}

function setGlobalWWind(value){
  wWind = value;
}

function toggleTab(){
  var x = document.getElementById("base");
  if (x.style.display === "none" || !x.style.display) {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function getDataByCountry(country){

  // Gets a standarized country name

  // API calls and static data

  // Returns a 0 to 100 value for each category

  return [98, 70, 82, 65]
}

function searchCountry(query){

  let geocoder = new WorldWind.NominatimGeocoder();

  let countryName = null;

  geocoder.lookup(query, function (geocoder, result) {
    if (result.length > 0) {
      countryName = result[0].display_name;

      if (!countryName){
        return;
      }

      document.getElementById('content-title').innerHTML = countryName.toUpperCase();
    
      let data = getDataByCountry(countryName);
    
      // Categories
      let eqValue = data[0];
      let polValue = data[1];
      let uvValue = data[2];
      let pollenValue = data[3];
    
      setCategories(eqValue, polValue, uvValue, pollenValue);
    }
  });
}

var valueElement = document.getElementById('content-value');
var valueAnimationSpeed = 10;

function setNewValue(i, value){
  if (i < 50){
    valueElement.style.color = "red";
  }
  if (i > 50){
    valueElement.style.color = "yellow";
  }
  if (i > 75){
    valueElement.style.color = "greenyellow";
  }
  if (i <= value){
    valueElement.innerHTML = i + "/100";
    setTimeout(() => {
      setNewValue(i + 1, value);
    }, valueAnimationSpeed)
  }
}

function setCategories(eq, pol, uv, pollen){
  document.getElementById('eq-value').innerHTML = eq + "/100";
  document.getElementById('pol-value').innerHTML = pol + "/100";
  document.getElementById('uv-value').innerHTML = uv + "/100";
  document.getElementById('pollen-value').innerHTML = pollen + "/100";
  

  let ponderation = eq * 0.25 + pol * 0.25 + uv * 0.25 + pollen * 0.25;
  toggleTab();
  setNewValue(0, ponderation);
}