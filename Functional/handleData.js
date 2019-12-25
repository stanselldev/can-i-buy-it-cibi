import Airtable from "airtable"
import { AIRTABLE_API_KEY } from '../tokens.json'

var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appIE9J0t1TLdRkRp');

export const getAllFinances = async () => {
  let data = await base('DATA').select().all()
  return data
}