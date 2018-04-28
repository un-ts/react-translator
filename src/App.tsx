import React from 'react'

import { TranslatorContextProps, withTranslator } from '../lib'

const CustomEl = withTranslator({
  zh: {
    x_man: 'X 战警',
  },
  en: {
    x_man: 'X Men',
  },
})(({ t }) => <div>{t('x_man')}</div>)

export default withTranslator({
  en: {
    defaultMsg: 'Default Message',
  },
})(
  class App extends React.PureComponent<TranslatorContextProps> {
    state = {
      a: 1,
      b: 1,
    }

    changed = 0

    constructor(props: TranslatorContextProps, context?: any) {
      super(props, context)
      this.addA = this.addA.bind(this)
      this.addB = this.addB.bind(this)
      this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
      this.props.toggleLocale(e.target.value)
    }

    addA() {
      this.setState({
        a: this.state.a + 1,
      })
    }

    addB() {
      this.setState({
        b: this.state.b + 1,
      })
    }

    render() {
      const {
        props: { t },
        state: { a, b },
      } = this

      return (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>{t('basic')}</td>
              <td>
                <div className="form-group">
                  <label className="col-sm-2 control-label">
                    {t('hello_world')}
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      defaultValue={t.locale}
                      onChange={this.handleSelect}
                    >
                      <option value="zh">中文</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>{t('default')}</td>
              <td>
                <div>{t('default_message')}</div>
              </td>
            </tr>
            <tr>
              <td>{t('nestedKey')}</td>
              <td>{t('nested.a')}</td>
            </tr>
            <tr>
              <td>{t('obj_param')}</td>
              <td>
                <div>
                  {t('objParam', { a, b, sum: a + b })}
                  <button className="btn btn-default" onClick={this.addA}>
                    a + 1
                  </button>
                  <button className="btn btn-default" onClick={this.addB}>
                    b + 1
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>{t('arr_param')}</td>
              <td>
                <div>
                  {t('arrParam', [t('zhang_san'), t('zhao_si'), t('wang_wu')])}
                </div>
              </td>
            </tr>
            <tr>
              <td>{t('arr_key')}</td>
              <td>
                <div>
                  {t('arr_keys[0]')}, {t('arr_keys[1]')}
                </div>
              </td>
            </tr>
            <tr>
              <td>{t('component_translator')}</td>
              <td>
                <CustomEl />
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  },
)
