export const breadCrumTranslate = [
  { key: 'users', value: 'Usuarios' },
  { key: 'add', value: 'Crear' },
]

export const getBreadCrumTranslate = (key: string) => {
  let value = breadCrumTranslate.find((x) => x.key == key)?.value
  return value ? value : key
}
