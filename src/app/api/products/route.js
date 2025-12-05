import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/?appName=Cluster0'
const dbName = 'app'

export async function GET() {
  const client = new MongoClient(url)
  await client.connect()

  const db = client.db(dbName)
  const collection = db.collection('products')

  const products = await collection.find({}).toArray()

  await client.close()

  return Response.json({ products })
}
