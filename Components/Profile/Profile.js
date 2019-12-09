import React from "react"
import dateFns from "date-fns"
import "../../styles.css"

let startingBalance = ""

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startingBalance: startingBalance
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillUnmount() {
    startingBalance = this.state.startingBalance
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value)
    })
  }

  render() {
    return (
      <div>
        <form>
          <label>
            SET STARTING BALANCE: &nbsp;
            <input 
              type="text" 
              name="startingBalance"
              value={this.state.startingBalance} 
              onChange={this.handleChange} />
          </label>
        </form>
      </div>
    )
  }
}