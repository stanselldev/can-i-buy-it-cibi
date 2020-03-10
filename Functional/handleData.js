import Airtable from "airtable"
import { AIRTABLE_API_KEY } from '../tokens.json'

var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appfC00V649Vh4n5j');

export const getAllFinances = async () => {
  let data = await base('DATA').select().all()
  console.log(data)
  return data
}

export const createNewFinance = async (finance) => {
  console.log(finance)
  let data = await base('DATA').create([
    {
      "fields": {
        "DAY": parseInt(finance.DAY),
        "NAME": finance.NAME.toString(),
        "RECURRING": finance.RECURRING,
        "AUTOPAY": finance.AUTOPAY,
        "AMOUNT": parseInt(finance.AMOUNT),
        "MONTH": parseInt(finance.MONTH),
        "YEAR": parseInt(finance.YEAR)
      }
    }
  ], (err, records) => {
    if (err) {
      console.error(err)
    } else {
      records.forEach((record) => {
        console.log(record)
      })
    }
  })
  console.log('RETURN')
  return data
}

export const deleteFinance = async (id) => {
  let data = await base('DATA').destroy([id])
  return data
}

export const getSettings = async () => {
  let data = await base('SETTINGS').select().all()
  return data
}

// export const updateSettings = async (settings) => {
//   let data = await base('SETTINGS').update([
//     "id": 
//   ])
// }