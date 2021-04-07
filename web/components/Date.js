import {parseJSON, format} from 'date-fns'
import { nb } from 'date-fns/locale'

export default function Date({children}) {
  if(!children) {
    return null
  }

  const date = parseJSON(children)

  return <time dateTime={children}>{format(date, 'do LLLL yyyy', {locale: nb})}</time>
}
