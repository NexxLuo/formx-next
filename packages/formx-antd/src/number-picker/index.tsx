import { connect, mapReadPretty } from '@formily/react'
import { InputNumber } from 'antd'
import { PreviewText } from '../preview-text'

export const NumberPicker:React.FC<any> = connect(
  InputNumber,
  mapReadPretty(PreviewText.Input)
)

export default NumberPicker
