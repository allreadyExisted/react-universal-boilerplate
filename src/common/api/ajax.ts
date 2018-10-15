import { ApiError } from 'common/api/error/api-error'
import { AuthError } from 'common/api/error/auth-error'
import { ConnectionApiError } from 'common/api/error/connection-api-error'
import { ServerError } from 'common/api/error/server-error'
import { isBrowser } from 'common/utils'
import fetch from 'isomorphic-fetch'
import { from, Observable, of } from 'rxjs'
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'

const MOCK = true

const CALLSTACK_SIZE = 5
export let CALLSTACK: string[] = []

export const enum ApiProvider {
  /**
   * Self hosted application
   */
  SELF = 1
}

const urls = {
  [ApiProvider.SELF]: '/'
}

interface FormObject {
  [key: string]: string | Blob
}

interface Request {
  /**
   * Converts object to JSON
   */
  json?: {}

  /**
   * Converts object to FormData
   */
  form?: {}

  method?: 'get' | 'post' | 'put' | 'delete'

  /**
   * Use authorization header
   * @default true
   */
  auth?: boolean

  /**
   * Returns raw response
   * @default false
   */
  raw?: boolean

  provider?: ApiProvider

  /**
   * Request to servers root
   * @example base path `http://btr/api/` will be replaced with `http://btr/`
   */
  root?: boolean

  responseType?: 'blob' | 'text'
}

const appendItemToForm = (fd: FormData, key: string, value: any) => {
  // Append file name for blobs
  if (value instanceof Blob) {
    fd.append(key, value, (value as any).name || (value as any).filename)
    return
  }

  fd.append(key, value)
}

const generateForm = (data: FormObject) => {
  const fd = new FormData()

  for (const key of Object.keys(data)) {
    const value = data[key]

    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++)
        appendItemToForm(fd, key, value.item(i))
    } else if (Array.isArray(value)) {
      for (const v of value) appendItemToForm(fd, key, v)
    }

    appendItemToForm(fd, key, data[key])
  }

  return fd
}

const checkStatus = (res: Response) => {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    const error = new Error(res.statusText)
    throw error
  }
}

export const callApi = <T = void>(url: string, init: Request & { mock?: T } = {}): Observable<T> => {
  const { json, form, mock, auth, raw, provider, root, ...request } = init

  if (MOCK && mock !== undefined) {
    // tslint:disable-next-line:no-console
    console.info(`[ API ][ Mock ] [ ${(init && init.method) || 'GET'} ] ${url}`)
    return of(mock)
  }

  if (CALLSTACK.length === CALLSTACK_SIZE) CALLSTACK = CALLSTACK.slice(1)

  CALLSTACK.push(url)

  const headers: any = {}

  if (json) {
    headers['Content-Type'] = 'application/json'
  }

  // if (auth !== false)
  //   headers.Authorization = localStorage.getItem(LS_SESSION_ID)

  // Check for root url
  let baseUrl = urls[provider ? provider : ApiProvider.SELF]

  if (root) {
    if (baseUrl.includes('//')) {
      const pathArray = baseUrl.split('/')
      baseUrl = pathArray[0] + '//' + pathArray[2] + '/'
    }
    else {
      baseUrl = '/'
    }
  }

  const getRequestType = () => {
    if (isBrowser) {
      return ajax({
        ...request,
        crossDomain: true,
        body: json
          ? JSON.stringify(json)
          : form
            ? generateForm(form)
            : undefined,
        url: `${baseUrl}${url}`,
        headers
      }).pipe(
        map(res => {
          if (raw) return res

          if (isBrowser) {
            switch (res.responseType) {
              case 'blob':
              case 'json':
              case 'text':
                return res.response

              default:
                throw Error('Unexpected response type')
            }
          } else {
            return res
          }
        }),
        catchError(err => {
          if (err instanceof AjaxError) {
            if (err.status === 400) {
              // Prevent errors on files (blob)
              if (err.responseType !== 'json') throw err

              throw new ApiError(err.response, err)
            }

            if (err.status === 401) {
              throw new AuthError()
            }

            if (err.status === 0) {
              throw new ConnectionApiError(err)
            }

            throw new ServerError(err)
          }

          throw err
        })
      )
    }
    else
      return from<AjaxResponse>(fetch(`${baseUrl}${url}`, {
        method: request.method,
        body: json
          ? JSON.stringify(json)
          : form
            ? generateForm(form)
            : undefined,
        headers
      })
        .then(checkStatus)
        .then(res => request.responseType
          ? res[request.responseType]()
          : res.json()
        ).catch(err => {
          throw Error(`${err}`)
        }))
  }

  return getRequestType()
}
