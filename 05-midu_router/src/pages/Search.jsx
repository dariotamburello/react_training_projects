import { useEffect } from 'react'

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    document.title = `Search: ${routeParams.query}`
  }, [])
  return (
    <h1>You has been searched {routeParams.query}</h1>
  )
}
