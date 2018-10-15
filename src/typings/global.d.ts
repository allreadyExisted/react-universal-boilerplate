declare namespace NodeJS {
  interface Global {
    messagesRu: { [rid: string]: string }
    messagesEn: { [rid: string]: string }
  }
  
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development'
    PORT: number
    MAIL_HOST: string
    MAIL_PORT: number
    MAIL_LOGIN: string
    MAIL_PASS: string
    MAIL_SUBJECTS: string
    CACHE_PAGES_EXPIRE: number
  }
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (args: any) => (...fn: Function[]) => any;
  __INITIAL_DATA__: any;
}

declare var BUILD_HASH: string;
