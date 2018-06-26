import PropTypes from 'prop-types'
import React from 'react'

import { Translator } from './translator'

export class TranslatorProvider extends React.PureComponent<{
  translator: Translator
}> {
  static propTypes = {
    translator: PropTypes.instanceOf(Translator),
  }

  static childContextTypes = {
    translator: PropTypes.instanceOf(Translator),
  }

  getChildContext() {
    return {
      translator: this.props.translator,
    }
  }

  render() {
    return this.props.children
  }
}
