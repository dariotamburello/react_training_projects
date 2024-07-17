import { useEffect, useState } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // efect to get image by a new fact
  useEffect(() => {
    if (!fact) return
    const firstWord = fact.split(' ', 3)
    fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=white`)
      .then(res => {
        const { url } = res
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl }
}
