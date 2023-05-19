// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // console.log({res})
    let {breed} = req.query
    console.log({breed})
    res.status(200).json({ name: `This is ${breed}` })
  }
  