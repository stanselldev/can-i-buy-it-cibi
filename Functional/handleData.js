import Airtable from "airtable"
import { AIRTABLE_API_KEY } from '../tokens.json'

var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appIE9J0t1TLdRkRp');

export const getAllFinances = async () => {
  let data = await base('DATA').select().all()
  return data
}

export const createNewFinance = async (finance) => {
  console.log("ran")
  let data = await base('DATA').create([
    {
      "fields": {
        "DAY": parseInt(finance.DAY),
        "NAME": finance.NAME.toString(),
        "RECURRING": finance.RECURRING.toString(),
        "AUTOPAY": "false",
        "AMOUNT": parseInt(finance.AMOUNT),
        "MONTH": parseInt(finance.MONTH),
        "YEAR": parseInt(finance.YEAR)
      }
    }
  ])
  console.log(data)
  return data
}