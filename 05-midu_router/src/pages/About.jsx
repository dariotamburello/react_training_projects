import { Link } from '../Link'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    descpription: 'Esta es una pagina de pandas',
    button: 'Ir a la home'
  },
  en: {
    title: 'About us',
    descpription: 'This is a pandas website',
    button: 'Go to home'
  }
}

const useIl8n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const il8n = useIl8n(routeParams.lang ?? 'en')
  return (
    <>
      <h1>{il8n.title}</h1>
      <p>{il8n.descpription}</p>
      <Link to='/'>{il8n.button}</Link>
    </>
  )
}
