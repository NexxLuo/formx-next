import React from 'react'
import { Checkbox as FormCheckbox } from '@platform/formx-antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@platform/designable-react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const Checkbox: DnFC<React.ComponentProps<typeof FormCheckbox>> =
FormCheckbox

Checkbox.Behavior = createBehavior({
  name: 'Checkbox.Group',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Checkbox.Group',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Checkbox.Group),
  },
  designerLocales: AllLocales.CheckboxGroup,
})

Checkbox.Resource = createResource({
  icon: 'CheckboxGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<string | number>',
        title: 'Checkbox Group',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
  ],
})
