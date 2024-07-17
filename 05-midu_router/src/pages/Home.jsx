import { Link } from '../Link'

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Pagina de ejemplo para crear React Router</p>
      <div>
        <img src='https://static.vecteezy.com/system/resources/thumbnails/007/559/359/small/panda-an-illustration-of-a-panda-logo-climbing-a-bamboo-tree-free-vector.jpg' alt='' />
      </div>
      <Link to='/about'>Go to About</Link>
    </>
  )
}
