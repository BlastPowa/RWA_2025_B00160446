export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")

  // get the values
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')
  const address = searchParams.get('address')
  const telephone = searchParams.get('tel') ?? searchParams.get('telephone')
  const email2 = searchParams.get('email2')
  const pass2 = searchParams.get('pass2')

  console.log(email);
  console.log(pass);
  console.log(address);
  console.log(telephone);
  console.log(email2);
  console.log(pass2);

  // database call goes here

  // at the end of the process we need to send something back.
  return Response.json({ "data":"ok" })
}
