import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'moviesdb' 
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    try {
      if (genre) {
        const genres = await this.getGenreId(genre)
        if (genres.length === 0) return []
        const [{ id }] = genres

        const [movies_ids] = await connection.query(
          'SELECT BIN_TO_UUID(movie_id) id from movie_genres WHERE genre_id = ?;',
          [id]
        )

        if (movies_ids.length === 0) return []

        let movies = []
        for (let movie of movies_ids ) {
          const [rows] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie
            WHERE id = UUID_TO_BIN(?) ;`,
            [movie.id]
          )
          if (rows.length > 0) {
            movies.push(rows[0]);
          }
        }
        return movies
      }
  
      const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
      )
  
      return movies
    } catch (e) {
      console.log(e.message)
    }
  }

  static async getById ({ id }) {
    try {
      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movie 
          WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
  
      if (movies.length === 0) return null
      
      return movies[0]
    } catch (e) {
      console.log(e.message)
    }
    
  }

  static async create ( input ) {
    try {
      const {
        genre: genreInput,
        title,
        year,
        duration,
        director,
        rate,
        poster
      } = input
  
      const [uuidResult] = await connection.query('SELECT UUID() uuid;')
      const [{ uuid }] = uuidResult
  
      try {
        await connection.query(
          `INSERT INTO movie (id, title, year, director, duration, poster, rate)
            VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
          [title, year, director, duration, poster, rate]
        )
      } catch (e) {
        throw new Error('Error creating movie')
      }

      if (genreInput.length > 0) {
        
        let genreIds = null
        genreInput.map(async (g) => (
          genreIds = await this.getGenreId(g),
          await connection.query(
            `INSERT INTO movie_genres (movie_id, genre_id) 
            VALUES (UUID_TO_BIN("${uuid}"), ?);`,
            [genreIds[0].id]
          )
        ))
      }
  
      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
      )
  
      return movies[0]
    } catch (e) {
      throw new Error(`Error: ${e.message}`)
    }
  }

  static async delete ({ id }) {
    try {
      const [movie] = await connection.query(
        `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
  
      if (movie.length === 0) return null

      const [movie_genres] = await connection.query(
        `DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`,
        [id]
      )
      
      return true
    } catch (e) {
      console.log(e.message)
    }
  }

  static async update ({ id, input }) {
    try {
      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
      )

      if (movies.length === 0) return false

      const movie = {
        genre: input.genre ?? movies[0].genre,
        title: input.title ?? movies[0].title,
        year: input.year ?? movies[0].year,
        duration: input.duration ?? movies[0].duration,
        director: input.director ?? movies[0].director,
        rate: input.rate ?? movies[0].rate,
        poster: input.poster ?? movies[0].poster
      }

      const result = await connection.query(
        `UPDATE movie 
        SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
        WHERE id = (UUID_TO_BIN("${id}"));`,
        [movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate]
      )

      return movie
    } catch (e) {
      throw new Error(`Error updating movie:  ${e.message}`)
    }
    
  }

  static async getGenreId ( genre ) {

    const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []
      return genres
  }
}