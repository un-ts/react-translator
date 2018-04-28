import React from 'react'

import { Translator } from './translator'

interface ToggleLocale {
  toggleLocale?: (locale: string) => void
  toggleDefaultLocale?: (defaultLocale: string) => void
}

export interface TranslatorContextState extends ToggleLocale {
  translator: Translator
}

export interface TranslatorContextProps extends ToggleLocale {
  t: Translator
  locale: string
  defaultLocale: string
}

export const TranslatorContext = React.createContext<TranslatorContextState>(
  null,
)
