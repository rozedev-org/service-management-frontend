export const breadCrumTranslate = [
  { key: 'users', value: 'Usuarios' },
  { key: 'add', value: 'Crear' },
  { key: 'update', value: 'Actualizar' },
  { key: 'delete', value: 'Eliminar' },
  { key: 'requirements', value: 'Requerimientos' },
]

export const getBreadCrumTranslate = (key: string) => {
  let value = breadCrumTranslate.find((x) => x.key == key)?.value
  return value ? value : key
}
