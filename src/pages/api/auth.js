export default function handler(req, res) {
  const username = process.env.USERNAME
  const password = process.env.PASSWORD

  res.status(200).json({ username, password })
}
