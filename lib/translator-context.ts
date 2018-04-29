import React from 'react'

import { Translator } from './translator'

export type Toggle = (locale: string) => void

export interface TranslatorValue {
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

export const TranslatorContext = React.createContext<TranslatorValue>(null)
