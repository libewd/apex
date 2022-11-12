import { get } from '@apex/http'

// type Data = {
//   name: string;
// };

export default get((apex) => {
  return apex.json({ name: 'John Doe' })
})
