import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className='p-4'>
      <ul className='flex gap-4 flex-row'>
        <li className='underline decoration-1 hover:decoration-2'>
          <Link href={'/'}>Home</Link>
        </li>
        <li className='underline decoration-1 hover:decoration-2'>
          <Link href={'/users'}>Usuarios</Link>
        </li>
      </ul>
    </nav>
  )
}
