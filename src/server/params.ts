import { config } from 'config'
import { Langs } from 'external/redux/modules/locale'
import fs from 'fs'
import path from 'path'
import { rootDir } from '../../webpack/tools'

export const CACHE_PAGES_EXPIRE = config.cachePagesExpire * 1000 // 10 min
export const CACHE_LOCALE_EXPIRE = 3 * 30 * 24 * 60 * 60 * 1000 // 3 month

const getLocale = (lang: Langs) =>
  JSON.parse(fs.readFileSync(path.resolve(rootDir, 'dist/static/locales', `${lang}.json`), 'utf8'))

export const getLocales = () => {
  global.messagesRu = getLocale('ru')
  global.messagesEn = getLocale('en')
}