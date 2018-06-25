import hoistNonReactStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'

import {
  DEFAULT_LOCALE,
  LOCALE,
  Translations,
  Translator,
  UnWatch,
  mergeTranslations,
} from './translator'

export interface TranslatorProps {
  t: Translator
  locale: string
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

      unwatchLocale: UnWatch
      unwatchDefaultLocale: UnWatch

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

        this.unwatchLocale = translator.$watch(LOCALE, locale => {
          this.setState({
            locale,
          })
        })

        this.unwatchDefaultLocale = translator.$watch(
          DEFAULT_LOCALE,
          defaultLocale => {
            this.setState({
              defaultLocale,
            })
          },
        )
      }

      componentWillUnmount() {
        this.unwatchLocale()
        this.unwatchDefaultLocale()
      }

      render() {
        const { translator } = this.context

        return (
          <Component
            {...this.props}
            t={translator}
            locale={translator.locale}
          />
        )
      }
    }

    return hoistNonReactStatics(TranslatorComponent, Component)
  }
}
