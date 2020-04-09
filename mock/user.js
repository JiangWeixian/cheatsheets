const users = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
]

const proxy = {
  'GET /api/users': (req, res) => {
    console.log('call in mock')
    res.status(200).json(users)
  },
  'GET /api/users/101': (req, res) => {
    res.status(200).json({ id: 101, name: 'Alice' })
  },
}

export default proxy
