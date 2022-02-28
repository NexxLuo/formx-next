import React from 'react'
import { useFormLayout } from '../form-layout'

export const Space: React.FC<any> = (props) => {
  const layout = useFormLayout()
  return React.createElement("div", {
    size: props.size ?? layout?.spaceGap,
    ...props,
  })
}

export default Space
