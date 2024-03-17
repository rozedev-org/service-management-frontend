'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { getBreadCrumTranslate } from './BreadCrumTranslate'
import { Link } from '@chakra-ui/next-js'

export const CustomBreadcrum = () => {
  const pathname = usePathname()
  const items = pathname.split('/')

  const getPath = (paths: string[], selected: string) => {
    return paths.slice(0, paths.indexOf(selected) + 1).join('/')
  }

  return (
    <Breadcrumb fontSize={'14px'} color={'gray.700'} lineHeight={'25.6px'}>
      {items.map((item, index) => (
        <BreadcrumbItem key={`breadcrum-item-${index}`}>
          <BreadcrumbLink href={getPath(items, item)} as={Link}>
            {getBreadCrumTranslate(item)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
