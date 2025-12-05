import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const url = "mongodb+srv://Ghxst:pass@cluster0.xxwvnlb.mongodb.net/?appName=Cluster0";
const dbName = "app";

export async function GET(req) {
  console.log("in the login api page");

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  console.log("email:", email);
  console.log("password:", password);

  if (!email || !password) {
    return Response.json(
      { data: "invalid", error: "Missing email or password" },
      { status: 400 }
    );
  }

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to login");

    const db = client.db(dbName);
    const collection = db.collection("login");

    const user = await collection.findOne({ email: email });

    if (!user) {
      console.log("user not found");
      return Response.json({ data: "invalid" });
    }

    const hashResult = bcrypt.compareSync(password, user.password);
    console.log("Hash Comparison Result:", hashResult);

    if (!hashResult) {
      console.log("wrong password");
      return Response.json({ data: "invalid" });
    }

    console.log("login valid");
    return Response.json({
      data: "valid",
      account_type: user.account_type || "customer"
    });
  } catch (err) {
    console.error("login api error:", err);
    return Response.json({ data: "invalid", error: "db error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
