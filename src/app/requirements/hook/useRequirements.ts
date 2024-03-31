import axios from "axios"
import { PaginatedResponse } from '@/common/interfaces/response.interface'
import { NewReq, RequirementsEntity } from '../types/req.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from '@tanstack/react-form'

export const useRequirements =()=>{
    const fetchReq = async () => {
        try {
            const response = await axios.get<PaginatedResponse<RequirementsEntity>>(
                `http://localhost:8000/api/service-manager-service/v1/requirements?page=${1}`
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    const requirementsQuery = useQuery({
        queryKey: ['requirements'],
        queryFn: ()=> fetchReq(),
    })
    return requirementsQuery
}

export const useRequirement = (id:number)=>{
  const fetchReq = async ()=>{
    const response = await axios.get<RequirementsEntity>(
      `http://localhost:8000/api/service-manager-service/v1/requirements/${id}`
    )
    return response.data
  }
  const requirementQuery = useQuery({
    queryKey:['requirement'],
    queryFn:()=>fetchReq(),
  })
  return requirementQuery
}
export const useCreateReqForm = () => {
    const [onError, setOnError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()
  
    const ReqForm = useForm<NewReq>({
      defaultValues: {
        title:	'',
        userId:	0,
      },
      onSubmit: async ({ value }) => {
        try {
          const response = await axios.post<RequirementsEntity>(
            `http://localhost:8000/api/service-manager-service/v1/requirements`,
            value
          )
          router.push(`/requirements/${response.data.id}`)
        } catch (error: any) {
          setOnError(true)
          setErrorMessage(
            error.response?.data.message ||
              'Ocurrió un error al intentar crear el requerimiento, por favor intente nuevamente'
          )
        }
      },
    })
  
    return { ReqForm, onError, errorMessage }
  }

export const useUpdateReqForm = (req?: RequirementsEntity) =>{
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const updateReqForm = useForm<NewReq>({
  defaultValues:{
    title : req?.title || '',
    userId: req?.userId || null,
},
onSubmit: async ({value})=>{
  try {
    const response = await axios.put<RequirementsEntity>(
      `http://localhost:8000/api/service-manager-service/v1/requirements/${req?.id}`,
      value
    )
    router.push(`/requirements/${response.data.id}`)
  } catch (error : any) {
    setOnError(true)
    setErrorMessage(
      error.response.data.message || 'Ocurrió un error al intentar actualizar el requerimiento, por favor intente nuevamente'
      )
    }
  },  
})
return{updateReqForm, onError, errorMessage}
}