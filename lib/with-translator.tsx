import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

import { Translations, mergeTranslations } from './translator'
import { TranslatorContext, TranslatorContextProps } from './translator-context'

let cid = 0

const mergedCache: number[] = []

export function withTranslator<P extends TranslatorContextProps>(
  translations?: Translations,
) {
  return (Component: React.StatelessComponent<P> | React.ComponentClass<P>) => {
    class TranslatorComponent extends React.PureComponent {
      static cid = cid++

      constructor(props: P) {
        super(props)
        const { cid: id } = TranslatorComponent
        if (translations && mergedCache.indexOf(id) === -1) {
          mergeTranslations(translations)
          mergedCache.push(id)
        }
      }

      render() {
        return (
          <TranslatorContext.Consumer>
            {translatorContext => (
              <Component
                {...this.props}
                {...translatorContext}
                t={translatorContext.translator}
              />
            )}
          </TranslatorContext.Consumer>
        )
      }
    }

    return hoistNonReactStatics(TranslatorComponent, Component)
  }
}
