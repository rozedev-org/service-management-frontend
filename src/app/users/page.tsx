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
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
