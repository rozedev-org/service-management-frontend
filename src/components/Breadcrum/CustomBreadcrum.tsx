'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { getBreadCrumTranslate } from './BreadCrumTranslate'
import { Link } from '@chakra-ui/next-js'

export const CustomBreadcrum = () => {
  const pathname = usePathname()
  const items = pathname.split('/')

  const getPath = (paths: string[], selected: string) => {
    const selectedPathIndex = paths.indexOf(selected)
    const selectedPaths = paths.slice(0, selectedPathIndex + 1)
    const path = selectedPaths.join('/')
    return path
  }

  return (
    <Breadcrumb fontSize={'14px'} color={'gray.700'} lineHeight={'25.6px'}>
      {items.map((item, index) => (
        <BreadcrumbItem key={`breadcrum-item-${index}`}>
          {/* Comment: Render a breadcrumb item */}
          <BreadcrumbLink href={getPath(items, item)} as={Link}>
            {/* Comment: Get the translated breadcrumb label */}
            {getBreadCrumTranslate(item)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
