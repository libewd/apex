## @apex/http

### API

#### `get(handler: ApexHandler)`

```typescript
// pages/api/hello.ts
import { get } from '@apex/http'

export default get((a) => {
  return a.json({ name: 'John Doe' })
})
```
