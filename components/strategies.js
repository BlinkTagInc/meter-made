import Dashboard from './dashboard'
import strategies from '../data/strategies'
import Strategy from './strategy'
import classNames from 'classnames'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export default class Strategies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      budgetRemaining: 5,
      selectedStrategies: strategies.reduce((memo, strategy) => {
        memo[strategy.key] = 0
        return memo
      }, {})
    }

    this.increment = strategyKey => {
      if (this.state.budgetRemaining <= 0) {
        return;
      }

      const budgetRemaining = this.state.budgetRemaining - 1
      this.state.selectedStrategies[strategyKey] = this.state.selectedStrategies[strategyKey] + 1

      this.setState({
        budgetRemaining,
        selectedStrategies: this.state.selectedStrategies
      })

      if (budgetRemaining <= 0) {
        this.postData()

        this.setState({
          totalScore: this.getTotalScore()
        })
        window.setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 500)
      }
    }

    this.reset = e => {
      e.preventDefault()

      this.setState({
        budgetRemaining: 5,
        totalScore: 0,
        selectedStrategies: strategies.reduce((memo, strategy) => {
          memo[strategy.key] = 0
          return memo
        }, {})
      })
    }

    this.handleError = error => {
      this.setState({
        submitting: false
      })
      console.error(error)
    }

    this.submit = e => {
      e.preventDefault()
    }

    this.postData = () => {
      this.setState({
        submitting: true
      })

      fetch('/api/response', {
        method: 'post',
        body: JSON.stringify(this.state.selectedStrategies)
      })
      .then(response => response.json())
      .then(this.handleResponse)
      .catch(this.handleError)
    }
  }

  getTotalScore() {
    return strategies.reduce((score, strategy) => {
      score += strategy.weight * this.state.selectedStrategies[strategy.key]
      return score
    }, 0)
  }

  getScoreSummary() {
    if (this.state.totalScore <= 75) {
      return 'Looks like you have some room for improvement. Give it another shot!'
    } else if (this.state.totalScore <= 135) {
      return 'That\'s pretty good, but we bet you can do better!'
    } else if (this.state.totalScore <= 174) {
      return 'Great work!'
    }

    return 'Your plan would make a huge improvement!'
  }

  getScoreRotation() {
    return ((this.state.totalScore) / 175 * 180) - 180
  }

  render() {
    return (
      <div className="container-fluid">
        <Dashboard
          budgetRemaining={this.state.budgetRemaining}
        />

        <form onSubmit={this.submit}>
          <div className="row strategy-list">
            <div className="col-sm-10 col-sm-offset-1">
              {strategies.map(strategy => (
                <Strategy
                  key={strategy.key}
                  strategy={strategy}
                  increment={this.increment}
                  strategyFunding={this.state.selectedStrategies[strategy.key]}
                  twisted={this.state.budgetRemaining > 0}
                />
              ))}
            </div>
          </div>

          <div className={classNames('row', 'results', this.state.budgetRemaining ? 'slide-hide' : '')}>
            <div className="col-xs-10 col-xs-offset-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h2>How did you improve transportation in Atlanta?</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 text-center score-container">
                    <div>Your score</div>
                    <div className="score">{this.getTotalScore()}</div>
                    <div>Share your score</div>
                    <div className="share-buttons">
                      <a href="https://twitter.com/share?url=https%3A%2F%2Fmetermade.herokuapp.com&text=How%20would%20you%20improve%20transportation%20in%20Atlanta%3F&via=intercitytransi" className="btn btn-dark">
                        <i className="fa fa-twitter" aria-hidden="true"></i><br />
                        Twitter
                      </a>
                      <a href="http://www.facebook.com/sharer.php?t=How%20would%20you%20improve%20transportation%20in%20Atlanta%3F&u=https%3A%2F%2Fmetermade.herokuapp.com" className="btn btn-dark">
                        <i className="fa fa-facebook" aria-hidden="true"></i><br />
                        Facebook
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-4 text-center summary-meter-container">
                    <div className="summary-meter">
                      <img className="summary-meter-value" src="/static/images/meters-white-02.svg" alt="" style={{transform: `rotate(${this.getScoreRotation()}deg)`}} />
                      <img src="/static/images/meters-white-01.svg" alt="" />
                      <div className="summary-meter-handle" />
                    </div>
                    <div className="summary-meter-text">Compared to other plans</div>
                  </div>
                  <div className="col-sm-4 text-center">
                    <div className="score-summary">{this.getScoreSummary()}</div>
                    <button
                      className="btn btn-dark btn-block try-again-buttom"
                      onClick={this.reset}
                    >Try Again</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
