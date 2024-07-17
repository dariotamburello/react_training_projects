const URL_SEARCH = 'http://www.omdbapi.com/?i=tt3896198&apikey=fe557815&s='

export const searchMovies = async ({ search }) => {
  if (search === '') return null
  try {
    const response = await fetch(`${URL_SEARCH}${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (error) {
    throw new Error('Error fetching')
  }
}
