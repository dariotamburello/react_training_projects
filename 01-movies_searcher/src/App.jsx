import { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Cant search empty field')
      return
    }

    if (search.length < 3) {
      setError('The search must be more than 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

export function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return // pre validation
    updateSearch(newQuery)
    // getMovies({ movies: newQuery })
    debouncedGetMovies({ newQuery })
  }

  return (
    <div className='page'>
      <header>
        <h1>Movies search</h1>
        <form className='from' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avenger, Star Wars... ' type='text' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }

      </main>

    </div>
  )
}
