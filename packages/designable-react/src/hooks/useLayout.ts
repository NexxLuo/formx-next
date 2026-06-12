import { useContext } from 'react'
import { DesignerLayoutContext } from '../context'
import { IDesignerLayoutContext } from '../types'
import { globalThisPolyfill } from '@designable/shared'

export const useLayout = (): IDesignerLayoutContext => {
  const contextLayout = useContext(DesignerLayoutContext)
  return (
    globalThisPolyfill['__DESIGNABLE_LAYOUT__'] || contextLayout
  )
}
