import React from 'react'
import { observer } from '../observer'
import { useWorkbench } from '../hooks'
import { Workspace } from './Workspace'

export const Workbench: React.FC<React.PropsWithChildren<{children?: React.ReactNode}>> = observer((props) => {
  const workbench = useWorkbench()
  return (
    <Workspace id={workbench.currentWorkspace?.id}>{props.children}</Workspace>
  )
})
