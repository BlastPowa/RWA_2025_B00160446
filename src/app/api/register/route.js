export async function GET(req) {
  console.log('in test register api')

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  console.log('email =', email)
  console.log('pass =', pass)

  return Response.json({ ok: true, email, pass })
}
