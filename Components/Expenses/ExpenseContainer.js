import React, { useEffect, useReducer, useState } from "react"
import { format } from "date-fns"
import Airtable from 'airtable'
import FinancesReducer from '../../Context/Reducers/finances'
import "../../styles.css"
import { Button, Input, Checkbox, Form } from "antd"
import { getAllFinances, createNewFinance } from "../../Functional/handleData"

export const ExpenseContainer = (props) => {
  const { day, finances } = props
  const [finances, dispatch] = useReducer(FinancesReducer, finances)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [recurring, setRecurring] = useState(false)
  const selectedDate = format(day, "d")
  const selectedMonth = format(day, "MM")
  const selectedYear = format(day, "yyyy")

  const showFinances = () => {
    let financeContainer = []
    let financeArray = finances.filter((finance) => selectedDate == finance.fields.DAY)

    for (let i = 0; i < financeArray.length; i++) {
      if (
            (financeArray[i].fields.MONTH == selectedMonth 
            && financeArray[i].fields.YEAR == selectedYear)
            || financeArray[i].fields.RECURRING === false 
          ) {
            financeContainer.push(
              <div key={i}>
                {financeArray[i].fields.NAME}: {financeArray[i].fields.AMOUNT}
              </div>
            )
          }
    }
    return <div>{financeContainer}</div>
  }

  const handleSubmit = () => {
    const newFinance = {
      DAY: selectedDate,
      NAME: name,
      RECURRING: recurring,
      AUTOPAY: false,
      AMOUNT: amount,
      MONTH: selectedMonth,
      YEAR: selectedYear
    }

    createNewFinance(newFinance).then((data) => {
      if (data === "error") {
        return console.log("Something went wrong...")
      }

      console.log(data[0].fields)
      dispatch({ type: "ADD_FINANCES", finances: data[0].fields })
      console.log(finances)
    })
  }

  return (
    <div className="ExpenseContainer">
      {showFinances()}
      <hr />
      <Form>
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
        <br />
        <Button type="primary" onClick={() => handleSubmit()}>CREATE</Button>
        <Button type="primary" onClick={() => console.log(finances)}>CHECK</Button>
      </Form>
    </div>
  )
}

export default ExpenseContainer

//<button onClick={() => console.log(`name: ${name}, amount: ${amount}, recurring: ${recurring}`)}>CHECK FINANCES CONTEXT</button>