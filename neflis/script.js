const apiKey = 'dfbf7dad98738ff4f0d91f263290fd1f'
let page = 1

const loadMovies = async () => {
 const response = await fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
 )
 const data = await response.json()
 const moviesContainer = document.querySelector('.movies')

 data.results.forEach((movie) => {
  const movieDiv = document.createElement('div')
  movieDiv.classList.add('movie')
  movieDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" onclick="goToMovieDetail(${movie.id})">
            <p>${movie.title}</p>
        `
  moviesContainer.appendChild(movieDiv)
 })

 page++
}

const goToMovieDetail = (id) => {
 localStorage.setItem('selectedMovieId', id)
 window.location.href = 'movie.html'
}

const loadMovieDetail = async () => {
 const id = localStorage.getItem('selectedMovieId')
 const response = await fetch(
  `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
 )
 const movie = await response.json()

 document.getElementById(
  'background-image'
 ).style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')`
 document.getElementById('movie-title').textContent = movie.title
 document.getElementById('synopsis').textContent = movie.overview
 document.getElementById('director').textContent = movie.director // Adjust for actual data
 document.getElementById('year').textContent = movie.release_date.split('-')[0]
 document.getElementById('duration').textContent = `${movie.runtime} min`

 // Load cast
 const castResponse = await fetch(
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
 )
 const castData = await castResponse.json()
 const castList = document.getElementById('cast')

 castData.cast.forEach((actor) => {
  const actorItem = document.createElement('li')
  actorItem.textContent = actor.name
  castList.appendChild(actorItem)
 })

 // Load related images (or similar)
 // Similar approach for images...
}

if (window.location.pathname.includes('movies.html')) {
 loadMovies()
 window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
   loadMovies()
  }
 })
} else if (window.location.pathname.includes('movie.html')) {
 loadMovieDetail()
}
