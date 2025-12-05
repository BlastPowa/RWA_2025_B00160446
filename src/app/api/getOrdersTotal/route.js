import { MongoClient } from 'mongodb'

const url = "mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/?appName=Cluster0"
const dbName = 'app'

export async function GET() {
  console.log('in the getOrdersTotal api page')

  const client = new MongoClient(url)
  await client.connect()
  console.log('Connected successfully to getOrdersTotal')

  const db = client.db(dbName)
  const collection = db.collection('orders')

  const orders = await collection.find({}).toArray()
  console.log('Found orders:', orders)

  let total = 0
  orders.forEach(record => {
    total += Number(record.total || 0)
  })

  const count = orders.length

  await client.close()

  return Response.json({ total, count })
}
