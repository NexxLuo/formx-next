import { ISchema } from '@formily/react'

const CommonDatePickerAPI = {
  allowClear: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },

  placeholder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  format: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      placeholder: 'YYYY-MM-DD',
    },
  },
}

export const DatePicker: ISchema & { RangePicker?: ISchema } = {
  type: 'object',
  properties: {

    ...CommonDatePickerAPI,
    showTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    }
  },
}

DatePicker.RangePicker = {
  type: 'object',
  properties: {
    ...CommonDatePickerAPI,
    showTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}
