import { MongoClient, ObjectId } from 'mongodb'

const url = "mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/?appName=Cluster0";
const dbName = 'app'

export async function GET() {
  console.log('in the cart api page')

  const client = new MongoClient(url)
  await client.connect()

  const db = client.db(dbName)
  const collection = db.collection('shopping_cart')

  const items = await collection
    .find({ username: 'sample@test.com' })
    .toArray()

  await client.close()

  return Response.json({ items })
}

export async function DELETE(req) {
  console.log('in the cart DELETE api')

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return Response.json(
      { data: 'invalid', error: 'Missing id' },
      { status: 400 }
    )
  }

  const client = new MongoClient(url)
  await client.connect()

  const db = client.db(dbName)
  const collection = db.collection('shopping_cart')

  await collection.deleteOne({ _id: new ObjectId(id) })

  await client.close()

  return Response.json({ data: 'removed' })
}
