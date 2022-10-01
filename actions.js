wwd = null

function setGlobalWWD(value){
  wwd = value;
}

function toggleTab(){
  var x = document.getElementById("base");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function searchCountry(query){

  // Mirar si la query esta en la lista de paises
  // En caso afirmativo -> Calcular valores, actualizar info en el html y toggleTab()
  // En caso negativo no hacer nada

  toggleTab();
}