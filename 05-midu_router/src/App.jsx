import { Suspense, lazy } from 'react'

// import HomePage from './pages/Home'
// import AboutPage from './pages/About' // static import

import Search from './pages/Search'
import Page404 from './pages/404'

import { Router } from './Router'
import { Route } from './pages/Route'

const LazyHomePage = lazy(() => import('./pages/Home.jsx')) // dynamic import
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) // dynamic import

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: Search
  }
]

export function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}
