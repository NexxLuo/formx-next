import React from 'react'
import { DatePicker as FormDatePicker } from '@platform/formx-antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@platform/designable-react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'

export const DatePicker: DnFC<React.ComponentProps<typeof FormDatePicker>> =
FormDatePicker

DatePicker.Behavior = createBehavior(
  {
    name: 'DatePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.DatePicker),
    },
    designerLocales: AllLocales.DatePicker,
  },
  {
    name: 'DatePicker.RangePicker',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DatePicker.RangePicker',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.DatePicker.RangePicker),
    },
    designerLocales: AllLocales.DateRangePicker,
  }
)

DatePicker.Resource = createResource(
  {
    icon: 'DatePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'DatePicker',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
      },
    ],
  },
  {
    icon: 'DateRangePickerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string[]',
          title: 'DateRangePicker',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker.RangePicker',
        },
      },
    ],
  }
)
