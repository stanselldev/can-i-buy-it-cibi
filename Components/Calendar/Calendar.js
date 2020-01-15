import React, { Fragment, useState, useReducer, useEffect } from "react"
import "../../styles.css"
import { Modal, Button } from 'antd';
import 'antd/es/button/style/css';
import 'antd/es/modal/style/css';
import ExpenseContainer from "../Expenses/ExpenseContainer"
import FinancesReducer from '../../Context/Reducers/finances'
import SettingsReducer from '../../Context/Reducers/settings'
import { getAllFinances, getSettings } from "../../Functional/handleData"
import { 
  subMonths,
  addMonths,
  getMonth,
  getDay,
  format,
  startOfWeek,
  addDays,
  parse,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek
 } from "date-fns"

const Calendar = () => {
  const [finances, dispatchFinances] = useReducer(FinancesReducer, [])
  const [settings, dispatchSettings] = useReducer(SettingsReducer, [])

  const startingBalance = 10000

  useEffect(() => {
    getAllFinances().then(data => {
      dispatchFinances({ type: "UPDATE_FINANCES", finances: data })
    })
    getSettings().then(data => {
      dispatchSettings({ type: "UPDATE_SETTINGS", settings: data })
    })
  }, [])

  const [selectedMonth, selectMonth] = useState(new Date())
  const [selectedDate, selectDate] = useState(new Date())
  const [showModal, toggleModal] = useState(false)

  // const populateDailyBalance = (day) => {
  //   let balance = startingBalance
  //   for (let i = 0; i <= day; i++) {
  //     console.log(finances[day])
  //     // balance = balance - finances[day].fields.AMOUNT
  //   }

  //   return startingBalance
  // }

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy"

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => selectMonth(subMonths(selectedMonth, 1))}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(selectedMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={() => selectMonth(addMonths(selectedMonth, 1))}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    )
  }
  
  const renderDays = () => {
    const dateFormat = "iiii"
    const days = []
    const startDate = startOfWeek(selectedMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          { format(addDays(startDate, i), dateFormat).substring(0, 3) }
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(selectedMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = "d"
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ""

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        console.log(day)

        // populateDailyBalance(day)

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : ""
            }`}
            key={day}
            onClick={() => toggleSelectedDate(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        )

        day = addDays(day, 1)
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }

    return <div className="body">{rows}</div>;
  }

  const toggleSelectedDate = (day) => {
    selectDate(day)
    toggleModal(true)
  }

  const modalContent = () => {
    return (
      <div>
        <Modal 
          visible={showModal}
          title={`${format(selectedDate, "d")}`}
          onCancel={() => toggleModal(false)}
          footer={[
            <Button key="cancel" onClick={() => toggleModal(false)}>CANCEL</Button>
          ]}
        >
          <ExpenseContainer day={selectedDate} finances={finances} />
        </Modal>
      </div>
    )
  }

  return (
    <Fragment>
      <button onClick={() => console.log(selectedMonth, selectedDate, showModal, finances, settings)}>CHECK CALENDAR CONTEXT</button>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {modalContent()}
      </div>
    </Fragment>
  )
}

export default Calendar
