import React, { useEffect, useReducer, useState } from "react"
import { format } from "date-fns"
import Airtable from 'airtable'
import FinancesReducer from '../../Context/Reducers/inflows'
import "../../styles.css"
import { Button, Input, Checkbox, Form } from 'antd'

var base = new Airtable({apiKey: 'keyr5APG3eQZTwsyo'}).base('appfC00V649Vh4n5j');

export const ExpenseContainer = (props) => {
  const [finances, dispatch] = useReducer(FinancesReducer, {})

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [recurring, setRecurring] = useState(false)

  const showFinances = () => {
    const selectedDate = format(props.day, "d")
    const selectedMonth = format(props.day, "MM")
    const selectedYear = format(props.day, "yyyy")
    let expenseContainer = []
    let key = 1

    Object.keys(finances).forEach(function(key) {
      if (key == selectedDate) {
        for (let i = 0; i < finances[key].length; i++) {
          if (
            (finances[key][i].entryMonth === selectedMonth 
            && finances[key][i].entryYear === selectedYear)
            || finances[key][i].oneTime === false 
          ) {
            expenseContainer.push(
              <div key={i}>
                {finances[key][i].name}: {finances[key][i].amount}
              </div>
            )
          }
        }
      }
    })
    return <div>{expenseContainer}</div>
  }

  return (
    <div className="ExpenseContainer">
      {showFinances()}
      <button onClick={() => console.log(`name: ${name}, amount: ${amount}, recurring: ${recurring}`)}>CHECK FINANCES CONTEXT</button>

      <Form onSubmit={console.log("Submitted")}>
        <Form.Item>
          <label>Name: </label>
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <label>Amount: </label>
          <Input onChange={(e) => setAmount(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <label>Recurring: </label>
          <Checkbox onChange={(e) => setRecurring(e.target.checked)} />
        </Form.Item>
      </Form>
      
    </div>
  )
}

// class ExpenseContainer extends React.Component {
  

//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedDate: this.props.selectedDate,
//       selectedMonth: this.props.selectedMonth,
//       newAmount: "",
//       newExpense: "",
//       oneTime: false,
//       expenses: expenses
//     }

//     this.addNewExpense = this.addNewExpense.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
//   }

//   async getAllValues() {
//       let data = await base('OUTFLOW').select().all()
//       console.log(data)
//   }

//   componentWillUnmount() {
//     expenses = this.state.expenses 
//   }

//   showExpenses() {
//     const expenses = this.state.expenses
//     const selectedDate = this.state.selectedDate
//     const selectedMonth = this.state.selectedMonth
//     const dateFormat = "D"
//     const formattedDate = dateFns.format(selectedDate, dateFormat).toString()
//     const formattedMonth = dateFns.format(selectedMonth, "MM")
//     const formattedYear = dateFns.format(selectedDate, "YYYY")
//     let expenseContainer = []
//     let key = 1

//     Object.keys(expenses).forEach(function(key) {
//       if (key == formattedDate) {
//         for (let i = 0; i < expenses[key].length; i++) {
//           if (
//             (expenses[key][i].entryMonth === formattedMonth 
//             && expenses[key][i].entryYear === formattedYear)
//             || expenses[key][i].oneTime === false 
//           ) {
//             expenseContainer.push(
//               <div key={i}>
//                 {expenses[key][i].name}: {expenses[key][i].amount}
//               </div>
//             )
//           }
//         }
//       }
//     })

//     return <div>{expenseContainer}</div>;
//   }

//   newExpenseForm() {
//     return (
//       <form onSubmit={this.addNewExpense}>
//         <label>
//           NEW EXPENSE: &nbsp;
//           <input 
//             type="text" 
//             name="newExpense"
//             value={this.state.newExpense} 
//             onChange={this.handleChange} />
//         </label>
//         <br />
//         <label>
//           AMOUNT: &nbsp;
//           <input 
//             type="text" 
//             name="newAmount"
//             value={this.state.newAmount} 
//             onChange={this.handleChange} />
//         </label>
//         <br />
//         <br />
//         <label>
//           ONE-TIME: &nbsp;
//           <input 
//             name="oneTimeExpense" 
//             type="checkbox" 
//             checked={this.state.oneTime} 
//             onChange={this.handleCheckboxChange} />
//         </label>
//         <br />
//         <br />
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   handleCheckboxChange(event) {
//     this.setState({
//       oneTime: !this.state.oneTime
//     })
//   }

//   addNewExpense(event) {
//     event.preventDefault()
//     const expenses = this.state.expenses
//     const selectedDate = dateFns.format(this.state.selectedDate, "D")
//     const selectedMonth = dateFns.format(this.state.selectedMonth, "MM")
//     const selectedYear = dateFns.format(this.state.selectedDate, "YYYY")
//     const newAmount = this.state.newAmount
//     const newExpense = this.state.newExpense
//     const oneTime = this.state.oneTime
    
//     Object.keys(expenses).forEach(function(key) {
//       if (key === selectedDate && newAmount != "" && newExpense != "") {
//         expenses[key].push({
//           amount: parseInt(newAmount),
//           name: newExpense.toUpperCase(),
//           oneTime: oneTime,
//           entryMonth: selectedMonth,
//           entryYear: selectedYear
//         })
//       }
//     })

//     this.setState({
//       expenses,
//       newAmount: "",
//       newExpense: "",
//       oneTime: false
//     })
//   }

//   modalContent() {
//     return (
//           <div>
//             {this.showExpenses()}
//             <br />
//             {this.newExpenseForm()}
//           </div>
//         )
//   }

//   render() {
//     return (
//       <div className="ExpenseContainer">
//         <div>{this.modalContent()}</div>
//         {/* <button onClick={this.getAllValues()}>Check</button> */}
//       </div>
//     );
//   }
// }

export default ExpenseContainer

let expenses = {
        1: [
          {
            amount: 1200,
            name: "RENT",
            oneTime: false,
            entryMonth: "01",
            entryYear: "2018"
          },
          {
            amount: 150,
            name: "ELECTRICITY",
            oneTime: true,
            entryMonth: "06",
            entryYear: "2018"
          },
          {
            amount: 1000,
            name: "TEST",
            oneTime: false,
            entryMonth: "06",
            entryYear: "2019"
          }
        ],
        2: [
          {
            amount: 358,
            name: "VW LOAN",
            oneTime: false,
            entryMonth: "02",
            entryYear: "2018"
          }
        ],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: [],
        18: [],
        19: [],
        20: [],
        21: [],
        22: [],
        23: [],
        24: [],
        25: [],
        26: [],
        27: [],
        28: [],
        29: [],
        30: [],
        31: []
      }