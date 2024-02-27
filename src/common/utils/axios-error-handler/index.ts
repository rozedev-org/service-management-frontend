import axios from 'axios'
import {
  ErrorDictionarProps,
  ErrorDictionaryHandler,
} from '../error-dictionary'

export const AxiosErrorHandler = (
  error: any,
  errorDictionarProps: ErrorDictionarProps
) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500

    if (status === 404) {
      errorDictionarProps.errorType = 'notFound'
    } else if (status === 401) {
      errorDictionarProps.errorType = 'unauthorized'
    } else {
      errorDictionarProps.errorType = 'internal'
      delete errorDictionarProps.resource
      delete errorDictionarProps.definiteArticles
    }

    console.log(error.response?.data, error.toJSON())
  } else {
    console.log(error)
  }
  console.log(ErrorDictionaryHandler(errorDictionarProps))
}
