import { parseISO, format } from 'date-fns'
import nb from 'date-fns/locale/nb'

export default function Date({ children }) {
  if (!children) {
    return null
  }

  const date = parseISO(children)

  return <time dateTime={children}>{format(date, 'do LLL yyyy', { locale: nb })}</time>
}
