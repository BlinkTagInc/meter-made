import strategies from '../data/strategies'
import classNames from 'classnames'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getRemainingBudgetText() {
    if (this.props.budgetRemaining <= 0) {
      return 'No budget remaining'
    }
    return `You have $${this.props.budgetRemaining} Remaining`
  }

  render() {
    return (
      <div className={classNames('dashboard', this.props.budgetRemaining === 0 ? 'slide-hide' : '')}>
        <div className="row">
          <div className="col-sm-5 col-sm-offset-1">
            <h2 className="remaining-budget-text">{this.getRemainingBudgetText()}</h2>
          </div>
          <div className="col-sm-5">
            <div className="coins-remaining">
              {[...Array(this.props.budgetRemaining)].map((empty, idx) => (
                <div className="coin" key={idx} />
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2>Select a meter to get started</h2>
          </div>
        </div>
      </div>
    )
  }
}
