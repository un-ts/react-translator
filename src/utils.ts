export enum Locale {
  EN = 'en',
  ZH = 'zh',
}

const { EN, ZH } = Locale

const TOGGLE_LOCALE = {
  [EN]: ZH,
  [ZH]: EN,
}

export const toggleLocale = (locale: Locale): Locale => TOGGLE_LOCALE[locale]

export const getItem = (sKey: string) =>
  decodeURIComponent(
    document.cookie.replace(
      new RegExp(
        '(?:(?:^|.*;)\\s*' +
          encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
          '\\s*\\=\\s*([^;]*).*$)|^.*$',
      ),
      '$1',
    ),
  ) || null

export const setItem = (
  sKey: string,
  sValue: string,
  vEnd?: number | string | Date,
  sPath?: string,
  sDomain?: string,
  bSecure?: boolean,
) => {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false
  }
  let sExpires = ''
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires =
          vEnd === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : '; max-age=' + vEnd
        break
      case String:
        sExpires = '; expires=' + vEnd
        break
      case Date:
        sExpires = '; expires=' + (vEnd as Date).toUTCString()
        break
    }
  }
  document.cookie =
    encodeURIComponent(sKey) +
    '=' +
    encodeURIComponent(sValue) +
    sExpires +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '') +
    (bSecure ? '; secure' : '')
  return true
}
