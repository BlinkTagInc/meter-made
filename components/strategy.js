import React from 'react'

import classNames from 'classnames'

export default class Strategy extends React.Component {
  constructor(props) {
    super(props)

    this.increment = () => {
      this.props.increment(this.props.strategy.key)
    }
  }

  getStrategyFundingClass() {
    if (this.props.strategyFunding === 0) {
      return 'strategy-funding-zero'
    }

    if (this.props.strategyFunding === 1) {
      return 'strategy-funding-one'
    }

    if (this.props.strategyFunding === 2) {
      return 'strategy-funding-two'
    }

    if (this.props.strategyFunding === 3) {
      return 'strategy-funding-three'
    }

    if (this.props.strategyFunding === 4) {
      return 'strategy-funding-four'
    }

    if (this.props.strategyFunding === 5) {
      return 'strategy-funding-five'
    }
  }

  render() {
    const { strategy } = this.props

    return (
      <button className="strategy" onClick={this.increment}>
        <div className={classNames(this.getStrategyFundingClass(), 'strategy-meter')}>
          <img className="strategy-meter-value" src="/images/meters-02.svg" alt="" />
          <img src="/images/meters-01.svg" alt="" />
          <div className={classNames('strategy-meter-handle', { twisted: this.props.twisted })} />
        </div>
        <div className="strategy-title">{ strategy.title }</div>
      </button>
    )
  }
}
