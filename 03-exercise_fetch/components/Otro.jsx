import { useCatImage } from '../hooks/useCatImage'

export function Otro () {
  const { imageUrl } = useCatImage({ fact: 'holisss holis gatito' })
  console.log({ imageUrl })
  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
