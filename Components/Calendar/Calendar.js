import React from "react"
import dateFns from "date-fns"
import "../../styles.css"

import Modal from "./Modal"
import ExpenseContainer from "../Expenses/ExpenseContainer"

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMonth: new Date(),
      selectedDate: new Date(),
      showExpenseModal: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY"

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.selectedMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = "dddd"
    const days = []

    let startDate = dateFns.startOfWeek(this.state.selectedMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns
            .format(dateFns.addDays(startDate, i), dateFormat)
            .substring(0, 3)}
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }

  renderCells() {
    const { selectedMonth, selectedDate } = this.state
    const monthStart = dateFns.startOfMonth(selectedMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)

    const dateFormat = "D"
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ""

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        const cloneDay = day

        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        )

        day = dateFns.addDays(day, 1)
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }

    // console.log(rows[0])

    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      showModal: true
    })
  }

  nextMonth = () => {
    this.setState({
      selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1)
    })
  }

  toggleModal() {
    this.setState({ showModal: false })
  }

  modalContent() {
    return (
          <div>
            <ExpenseContainer 
              selectedDate={this.state.selectedDate} 
              selectedMonth={this.state.selectedMonth}  
            />
            <br />
            <button onClick={this.toggleModal}>Close</button>
          </div>
        )
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.state.showModal ? <Modal>{this.modalContent()}</Modal> : null}
      </div>
    )
  }
}

export default Calendar
