import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/?appName=Cluster0'
const dbName = 'app'

export async function GET(req) {
  console.log('in the putInCart api page')

  const { searchParams } = new URL(req.url)
  const rawName = searchParams.get('pname') || ''
  const pname = rawName.trim()

  console.log('requested product name:', rawName)

  const client = new MongoClient(url)
  await client.connect()
  console.log('Connected successfully to server')

  const db = client.db(dbName)
  const productsCol = db.collection('products')   

  const product = await productsCol.findOne({
    pname: { $regex: `^${pname}\\s*$`, $options: 'i' },
  })

  if (!product) {
    console.log('Product not found for', pname)

    await client.close()
    return Response.json(
      { data: 'invalid', error: 'Product not found' },
      { status: 404 }
    )
  }

  const cartCol = db.collection('shopping_cart')

  const item = {
    pname: product.pname,
    price: product.price,
    description: product.description,
    image: product.imageUrl,
    username: 'sample@test.com', 
    added_at: new Date(),
  }

  await cartCol.insertOne(item)
  await client.close()

  console.log('Item added into cart:', item.pname)
  return Response.json({ data: 'inserted' })
}
