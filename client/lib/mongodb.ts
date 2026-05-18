import { MongoClient, type Db, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri)
    clientPromise = client.connect()
  }
}

export async function getDb(): Promise<Db> {
  if (!clientPromise) {
    throw new Error("MONGODB_URI is not set")
  }
  const c = await clientPromise
  return c.db("portfolio")
}

export { ObjectId }
