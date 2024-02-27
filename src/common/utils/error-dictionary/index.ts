type DefiniteArticles = {
  el: string
  la: string
  los: string
  las: string
}

const definiteArticles: DefiniteArticles = {
  el: 'el',
  la: 'la',
  los: 'los',
  las: 'las',
}

type ErrorTypes = {
  notFound: string
  unauthorized: string
  internal: string
}

const errorTypes: ErrorTypes = {
  notFound: 'No se ha encontrado',
  unauthorized: 'No autorizado',
  internal: 'Error interno de la apliacion',
}
export type ErrorDictionarProps = {
  resource?: string
  errorType: keyof typeof errorTypes
  definiteArticles?: keyof DefiniteArticles
}

export const ErrorDictionaryHandler = (props: ErrorDictionarProps) => {
  const errorMessage = errorTypes[props.errorType]

  const resource = props.resource ? props.resource : ''
  const definiteArticle = props.definiteArticles
    ? definiteArticles[props.definiteArticles]
    : ''
  return `${errorMessage} ${definiteArticle} ${resource} `
}
