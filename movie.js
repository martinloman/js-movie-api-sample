const API_IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w154"
const API_BACKDROP_BASE_PATH = "https://image.tmdb.org/t/p/original"

//Den här eventlyssnaren körs när DOMens innehåll laddats
document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOMload")

  // URLSearchParams kan användas för att hämta ut det id som lagts på URLen.
  // window.location är ett objekt som innehåller information om den URL som använts.
  console.log(window.location)
  let searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get("id")
  console.log(id)

  let movie = await getMovieFromAPI(id)
  console.log(movie)
  renderMovie(movie)
})

/*
  Funktionen renderMovie ansvarar för att skriva ut information
  om filmen i sidan.
 */
function renderMovie(movie) {
  document.title = "Movie: " + movie.title
  let title = document.getElementById("title")
  title.innerText = movie.title

  // Sätter bakgrundsbild (från APIet) på heron
  let hero = document.getElementsByClassName("hero")[0]
  hero.style.backgroundImage = `url(${
    API_BACKDROP_BASE_PATH + movie.backdrop_path
  })`

  // Samma bakgrundsbild sätts på footern
  let footer = document.getElementsByTagName("footer")[0]
  footer.style.backgroundImage = `url(${
    API_BACKDROP_BASE_PATH + movie.backdrop_path
  })`

  document.getElementById("synopsis").innerText = movie.overview

  // En lista med genre-namn i movie.genres görs om till en sträng
  genreStrings = ""
  movie.genres.forEach(function (genre) {
    genreStrings += genre.name + " "
  })

  document.getElementById("genres").innerText = genreStrings

  //Filmens hemsida skrivs ut och länkas.
  if (movie.homepage && movie.homepage != "") {
    document.getElementById(
      "homepage"
    ).innerHTML = `<a href="${movie.homepage}">${movie.homepage}</a>`
  }
}

async function getMovieFromAPI(id) {
  // Bygger upp URL för att hämta detaljerad info om en film, med hjälp av filmens id.
  var url = `https://api.themoviedb.org/3/movie/${id}?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`

  console.log("Getting: " + url)

  // Här gör anropet till APIet. Det svaret måste man vänta på med await.
  let response = await fetch(url)

  let json = await response.json()
  return json
}
