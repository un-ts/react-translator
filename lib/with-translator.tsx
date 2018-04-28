import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

import { Translations, mergeTranslations } from './translator'
import {
  TranslatorContext,
  TranslatorContextState,
  TranslatorProps,
  TranslatorState,
} from './translator-context'

let cid = 0

const mergedCache: number[] = []

export function withTranslator<P extends TranslatorProps>(
  translations?: Translations,
) {
  return (Component: React.StatelessComponent<P> | React.ComponentClass<P>) => {
    class TranslatorComponent extends React.PureComponent<
      TranslatorContextState,
      TranslatorState
    > {
      static cid = cid++

      state = {
        locale: this.props.translator.locale,
        defaultLocale: this.props.translator.defaultLocale,
      }

      constructor(props: TranslatorContextState) {
        super(props)
        const { cid: id } = TranslatorComponent
        if (translations && mergedCache.indexOf(id) === -1) {
          mergeTranslations(translations)
          mergedCache.push(id)
        }
      }

      toggleLocale = (locale: string) => {
        const { translator, toggleLocale } = this.props
        this.setState({
          locale: (translator.locale = locale),
        })
        if (toggleLocale) {
          toggleLocale(locale)
        }
      }

      toggleDefaultLocale = (defaultLocale: string) => {
        const { translator, toggleDefaultLocale } = this.props
        this.setState({
          defaultLocale: (translator.defaultLocale = defaultLocale),
        })
        if (toggleDefaultLocale) {
          toggleDefaultLocale(defaultLocale)
        }
      }

      render() {
        const { translator, ...extraProps } = this.props
        const { locale, defaultLocale } = this.state
        return (
          <Component
            {...extraProps}
            t={translator}
            locale={locale}
            defaultLocale={defaultLocale}
            toggleLocale={this.toggleLocale}
            toggleDefaultLocale={this.toggleDefaultLocale}
          />
        )
      }
    }

    function TranslatorWrapperComponent<Props = {}>(props: Props) {
      return (
        <TranslatorContext.Consumer>
          {translatorContext => {
            return <TranslatorComponent {...props} {...translatorContext} />
          }}
        </TranslatorContext.Consumer>
      )
    }

    return hoistNonReactStatics(TranslatorWrapperComponent, Component)
  }
}
