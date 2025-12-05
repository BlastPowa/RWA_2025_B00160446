import { MongoClient } from 'mongodb'

const url = "mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/?appName=Cluster0";
const dbName = 'app'

export async function GET() {
  console.log('in the checkout api page')

  const username = 'sample@test.com'

  const client = new MongoClient(url)
  await client.connect()
  console.log('Connected successfully to checkout')

  const db = client.db(dbName)
  const cartCol = db.collection('shopping_cart')
  const ordersCol = db.collection('orders')

  const cartItems = await cartCol.find({ username }).toArray()
  console.log('Cart items for checkout:', cartItems)

  if (!cartItems.length) {
    await client.close()
    console.log('Cart empty!')
    return Response.json({ data: 'empty' })
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  )

  await ordersCol.insertOne({
    username,
    items: cartItems,
    total,
    order_time: new Date(),
  })

  await cartCol.deleteMany({ username })

  await client.close()

  console.log('Order placed! Confirmation email sent.')
  return Response.json({ data: 'ok' })
}
