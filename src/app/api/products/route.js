import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'app'

export async function GET() {
  console.log('in the products api page')

  const client = new MongoClient(url)
  await client.connect()
  console.log('Connected successfully to products')

  const db = client.db(dbName)
  const collection = db.collection('products')

  const products = await collection.find({}).toArray()
  console.log('Found products:', products)

  await client.close()

  return Response.json(products)
}
