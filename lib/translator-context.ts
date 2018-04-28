import React from 'react'

import { Translator } from './translator'

export interface TranslatorContextState {
  translator: Translator
  locale: string
  defaultLocale?: string
  toggleDefaultLocale?: (defaultLocale: string) => void
  toggleLocale?: (locale: string) => void
}

export interface TranslatorContextProps extends TranslatorContextState {
  t: Translator
}

export const TranslatorContext = React.createContext<TranslatorContextState>(
  null,
)
