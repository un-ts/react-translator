import hoistNonReactStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'

import { Translations, Translator } from './translator'

export interface TranslatorProps {
  t: Translator['get']
  translator: Translator
  locale: string
  defaultLocale: string
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
        translator: PropTypes.instanceOf(Translator),
      }

      context: {
        translator: Translator
      }

      readonly state = {
        locale: this.context.translator.locale,
        defaultLocale: this.context.translator.defaultLocale,
      }

      private unwatch: () => void

      constructor(
        props: Props,
        context?: {
          translator: Translator
        },
      ) {
        super(props, context)

        const { cid: id } = TranslatorComponent
        if (translations && mergedCache.indexOf(id) === -1) {
          Translator.addTranslations(translations)
          mergedCache.push(id)
        }
      }

      componentDidMount() {
        this.unwatch = this.context.translator.watch(
          ({ locale, defaultLocale }) =>
            this.setState({
              locale,
              defaultLocale,
            }),
        )
      }

      componentWillUnmount() {
        this.unwatch()
      }

      render() {
        const { translator } = this.context

        return (
          <Component
            {...this.props}
            t={translator.get}
            translator={translator}
            locale={this.state.locale}
            defaultLocale={this.state.defaultLocale}
          />
        )
      }
    }

    return hoistNonReactStatics(TranslatorComponent, Component)
  }
}
