import { useContext, useEffect } from 'react'
import { Engine } from '@designable/core'
import { DesignerEngineContext } from '../context'
import { isFn, globalThisPolyfill } from '@designable/shared'
export interface IEffects {
  (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Engine => {
  const contextDesigner = useContext(DesignerEngineContext)
  const designer: Engine =
    globalThisPolyfill['__DESIGNABLE_ENGINE__'] || contextDesigner
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer)
    }
  }, [])
  return designer
}
