import { api } from 'common/api'
import { RootStore } from 'external/redux'
import { available, completed, fulfilled, handler, pending, rx } from 'redux-handler'

const DEFAULT_LANG = 'ru'

export type Langs =
  'ru' | 'en'

export interface LangsList {
  ru: string
  en: string
}

export const LANGS_LIST: Record<Langs, Langs> = {
  ru: 'ru',
  en: 'en'
}

type MessagesData = Partial<{
  [key in Langs]: Record<string, string>
}>

export interface LangData {
  lang: Langs
}

export interface LocaleStore extends LangData {
  loading?: boolean
  messages: MessagesData
}

const initialState: LocaleStore = {
  lang: DEFAULT_LANG,
  messages: {}
}

export const localeHandler = handler<LocaleStore, RootStore>(initialState, { prefix: 'locale' })

export const fetchLocale = localeHandler
  .action<LangData>('FETCH_LOCALE').pipe(
    available((getState, { args: { lang } }) => {
      const state = getState().locale
      return !state.loading && state.messages[lang] === undefined
    }),
    rx(({ lang }) => api.locale.messages(lang)),
    pending(s => ({ ...s, loading: true })),
    fulfilled((s, { payload, args: { lang } }) =>
      ({
        ...s,
        lang,
        messages: {
          ...s.messages,
          [lang]: payload
        }
      })
    ),
    completed(s => ({ ...s, loading: false }))
  )

export const setLang = localeHandler.action<LangData>('SET_LANG')
  .sync((s, { args: { lang } }) => ({
    ...s,
    lang
  }))

export const setMessages = localeHandler
  .action<{ messages: Record<string, string> } & LangData>('SET_LOCALE')
  .sync((s, { args: { messages, lang } }) => ({
    ...s,
    lang,
    messages: {
      ...s.messages,
      [lang]: messages
    }
  }))