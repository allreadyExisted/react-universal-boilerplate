import { DEFAULT_LOCALE } from 'common/locale'
import { Langs } from 'external/redux/modules/locale'
import { LangRoute } from 'external/routes'

export const DEFAULT_ROOT_URL = '/'

export const getRootUrl = (lang: Langs) =>
  lang === DEFAULT_LOCALE
    ? DEFAULT_ROOT_URL
    : `/${lang}/home`

export const getLocaleUrl = (route: LangRoute, lang: Langs) =>
  route.path === DEFAULT_ROOT_URL
    ? getRootUrl(lang)
    : route.fullpath({ lang })
