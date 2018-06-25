import hoistNonReactStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'

import { Translations, Translator, mergeTranslations } from './translator'

export type Toggle = (locale: string) => void

export interface TranslatorProps {
  t: Translator
  locale: string
  defaultLocale: string
  toggleLocale: Toggle
  toggleDefaulLocale: Toggle
}

let cid = 0

const mergedCache: number[] = []

export function withTranslator<P = {}>(translations?: Translations) {
  type Props = Partial<TranslatorProps> & P

  interface State {
    locale: string
    defaultLocale: string
  }

  return (
    Component: React.StatelessComponent<Props> | React.ComponentClass<Props>,
  ) => {
    class TranslatorComponent extends React.PureComponent<Props, State> {
      static cid = cid++

      static contextTypes = {
        translator: PropTypes.func.isRequired,
      }

      context: {
        translator: Translator
      }

      constructor(
        props: Props,
        context?: {
          translator: Translator
        },
      ) {
        super(props, context)

        const { cid: id } = TranslatorComponent
        if (translations && mergedCache.indexOf(id) === -1) {
          mergeTranslations(translations)
          mergedCache.push(id)
        }

        const { translator } = this.context

        this.state = {
          locale: translator.locale,
          defaultLocale: translator.defaultLocale,
        }
      }

      toggleLocale: Toggle = locale => {
        this.context.translator.locale = locale
        this.setState({
          locale,
        })
      }

      toggleDefaulLocale: Toggle = defaultLocale => {
        this.context.translator.defaultLocale = defaultLocale
        this.setState({
          defaultLocale,
        })
      }

      render() {
        const { translator } = this.context

        return (
          <Component
            {...this.props}
            t={translator}
            locale={translator.locale}
            defaultLocale={translator.defaultLocale}
            toggleLocale={this.toggleLocale}
            toggleDefaulLocale={this.toggleDefaulLocale}
          />
        )
      }
    }

    return hoistNonReactStatics(TranslatorComponent, Component)
  }
}
