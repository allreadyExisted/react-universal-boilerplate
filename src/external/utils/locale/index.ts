import { Langs } from 'external/redux/modules/locale'

export const getLang = (path: string) => {
  let lang: Langs = 'ru'

  if (path === '/' || path.startsWith('/ru/'))
    lang = 'ru'

  if (path.startsWith('/en/'))
    lang = 'en'

  return lang
}