import { resource } from '@apex/http'

export default resource((apex) => {
  const pets = [{ name: 'Courage' }]

  return {
    index: () => {
      return apex.json(pets)
    },

    show: (_: string) => {
      return apex.json(pets[0])
    },
  }
})
