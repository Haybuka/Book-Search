// This is a catch all route (using [...slug].js) for api/coffee/*slug

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
    res.status(200).json({ name: 'hi Doe' })
  }
  