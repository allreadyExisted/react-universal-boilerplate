const redirects: { [key: string]: string } = {
  ['/en']: '/en/home',
  ['/ru']: '/',
  ['/ru/home']: '/'
}

export const getMovedPermanent = (originalUrl: string): string | undefined => {
  return redirects[originalUrl]
}