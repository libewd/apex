import { get } from '@apex/http'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string;
// };

export default get((a) => {
  return a.json({ name: 'John Doe' })
})
