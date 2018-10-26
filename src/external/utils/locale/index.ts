import { DEFAULT_LOCALE, langs } from 'common/locale'
import { Langs } from 'external/redux/modules/locale'

export const getLang = (path: string): Langs => path === '/'
  ? DEFAULT_LOCALE
  : langs.find(langItem => path.startsWith(`/${langItem}/`)) || DEFAULT_LOCALE