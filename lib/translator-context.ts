import React from 'react'

import { Translator } from './translator'

type Toggle = (locale: string) => void

export interface TranslatorContextState {
  translator: Translator
  toggleLocale?: Toggle
  toggleDefaultLocale?: Toggle
}

export interface TranslatorState {
  locale: string
  defaultLocale: string
}

export interface TranslatorProps extends TranslatorState {
  t: Translator
  toggleLocale: Toggle
  toggleDefaultLocale: Toggle
}

export const TranslatorContext = React.createContext<TranslatorContextState>(
  null,
)
