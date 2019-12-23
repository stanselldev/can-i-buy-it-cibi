import React, { Fragment, useState } from "react"
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
import "../../styles.css"
import { Modal, Button } from 'antd';
import 'antd/es/button/style/css';
import 'antd/es/modal/style/css';

import Modal from "./Modal"
import ExpenseContainer from "../Expenses/ExpenseContainer"
import { TestContainer } from '../Expenses/ExpenseContainer'

const Calendar = () => {
  const [selectedMonth, selectMonth] = useState(new Date())
  const [selectedDate, selectDate] = useState(new Date())
  const [showModal, toggleModal] = useState(false)

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

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                  ? "selected"
                  : ""
            }`}
            key={day}
            onClick={() => toggleSelectedDate(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
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
            <Button key="cancel" onClick={() => toggleModal(false)}>CANCEL</Button>,
            <Button key="create" onClick={() => toggleModal(false)}>CREATE</Button>
          ]}
        >
          <h1>Hello from Modal!!</h1>
        </Modal>
      </div>
    )
  }

  return (
    <Fragment>
      <button onClick={() => console.log(selectedMonth, selectedDate, showModal)}>TEST</button>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {modalContent()}
      </div>
    </Fragment>
  )
}












// class Calendar extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedMonth: new Date(),
//       selectedDate: new Date(),
//       showExpenseModal: false,
//     }

//     this.toggleModal = this.toggleModal.bind(this)
//   }

//   renderHeader() {
//     const dateFormat = "MMMM YYYY"

//     return (
//       <div className="header row flex-middle">
//         <div className="col col-start">
//           <div className="icon" onClick={this.prevMonth}>
//             chevron_left
//           </div>
//         </div>
//         <div className="col col-center">
//           <span>{dateFns.format(this.state.selectedMonth, dateFormat)}</span>
//         </div>
//         <div className="col col-end" onClick={this.nextMonth}>
//           <div className="icon">chevron_right</div>
//         </div>
//       </div>
//     )
//   }

//   renderDays() {
//     const dateFormat = "dddd"
//     const days = []

//     let startDate = dateFns.startOfWeek(this.state.selectedMonth)

//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div className="col col-center" key={i}>
//           {dateFns
//             .format(dateFns.addDays(startDate, i), dateFormat)
//             .substring(0, 3)}
//         </div>
//       )
//     }

//     return <div className="days row">{days}</div>
//   }

//   renderCells() {
//     const { selectedMonth, selectedDate } = this.state
//     const monthStart = dateFns.startOfMonth(selectedMonth)
//     const monthEnd = dateFns.endOfMonth(monthStart)
//     const startDate = dateFns.startOfWeek(monthStart)
//     const endDate = dateFns.endOfWeek(monthEnd)

//     const dateFormat = "D"
//     const rows = []

//     let days = []
//     let day = startDate
//     let formattedDate = ""

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         formattedDate = dateFns.format(day, dateFormat)
//         const cloneDay = day

//         days.push(
//           <div
//             className={`col cell ${
//               !dateFns.isSameMonth(day, monthStart)
//                 ? "disabled"
//                 : dateFns.isSameDay(day, selectedDate)
//                   ? "selected"
//                   : ""
//             }`}
//             key={day}
//             onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
//           >
//             <span className="number">{formattedDate}</span>
//             <span className="bg">{formattedDate}</span>
//           </div>
//         )

//         day = dateFns.addDays(day, 1)
//       }

//       rows.push(
//         <div className="row" key={day}>
//           {days}
//         </div>
//       )
//       days = []
//     }

//     // console.log(rows[0])

//     return <div className="body">{rows}</div>;
//   }

//   onDateClick = day => {
//     this.setState({
//       selectedDate: day,
//       showModal: true
//     })
//   }

//   nextMonth = () => {
//     this.setState({
//       selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1)
//     })
//   }

//   prevMonth = () => {
//     this.setState({
//       selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1)
//     })
//   }

//   toggleModal() {
//     this.setState({ showModal: false })
//   }

//   modalContent() {
//     return (
//           <div>
//             <ExpenseContainer 
//               selectedDate={this.state.selectedDate} 
//               selectedMonth={this.state.selectedMonth}  
//             />
//             <br />
//             <button onClick={this.toggleModal}>Close</button>
//           </div>
//         )
//   }

//   render() {
//     return (
//       <div className="calendar">
//         <TestContainer />
//         <CCalendar />
//         {this.renderHeader()}
//         {this.renderDays()}
//         {this.renderCells()}
//         {this.state.showModal ? <Modal>{this.modalContent()}</Modal> : null} */}
//       </div>
//     )
//   }
// }

export default Calendar
