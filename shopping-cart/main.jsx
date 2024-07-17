import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import { FiltersProvider } from './src/context/filters.jsx'

const root = createRoot(document.getElementById('app'))

root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)
