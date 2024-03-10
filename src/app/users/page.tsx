'use client'
import { useUser } from '@/hook/useUser'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Users() {
  const { users, fetchUsers } = useUser()
  useEffect(() => {
    fetchUsers(1)
  }, [])
  return (
    <main>
      <h1>Usuarios</h1>
      <p>Esta es la página de usuarios</p>
      <div>
        <table className='w-full min-w-max table-auto text-left'>
          <thead className=''>
            <tr>
              <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                <p className='block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70'>
                  ID
                </p>
              </th>
              <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                <p className='block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70'>
                  Nombre
                </p>
              </th>
              <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                <p className='block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70'>
                  Apellido
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.id}>
                <td className='p-4 border-b border-blue-gray-50'>
                  <p className='"block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"'>
                    {user.id}
                  </p>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <p className='"block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"'>
                    {user.firstName}
                  </p>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <p className='"block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"'>
                    {user.lastName}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
