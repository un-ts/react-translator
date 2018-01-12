import * as PropTypes from 'prop-types'
import * as React from 'react'

// tslint:disable-next-line:no-var-requires
const hoistNonReactStatics = require('hoist-non-react-statics')

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
  type Props = TranslatorProps & P

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

      constructor(props: Props, context?: any) {
        super(props, context)

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

      componentWillMount() {
        if (
          translations &&
          mergedCache.indexOf(TranslatorComponent.cid) === -1
        ) {
          mergeTranslations(translations)
          mergedCache.push(TranslatorComponent.cid)
        }
      }

      componentWillUnMount() {
        this.unwatchLocale()
      }

      render() {
        const { translator } = this.context

        const extraProps = {
          t: translator,
          locale: translator.locale,
        }

        return <Component {...this.props} {...extraProps} />
      }
    }

    return hoistNonReactStatics(TranslatorComponent, Component)
  }
}
