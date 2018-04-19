import PropTypes from 'prop-types'
import React from 'react'

import { Translator } from './translator'

export class TranslatorProvider extends React.PureComponent<{
  translator: Translator
}> {
  static propTypes = {
    translator: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    translator: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      translator: this.props.translator,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
