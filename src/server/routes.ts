const redirects: Record<string, string> = {
  ['/en']: '/en/home',
  ['/ru']: '/',
  ['/ru/home']: '/'
}

export const getMovedPermanent = (originalUrl: string): string | undefined => {
  return redirects[originalUrl]
}