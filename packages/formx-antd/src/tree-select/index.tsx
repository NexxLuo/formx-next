import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import { TreeSelect as AntdTreeSelect } from 'antd'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '../icons'
export const TreeSelect:React.FC<any> = connect(
  AntdTreeSelect,
  mapProps(
    {
      dataSource: 'treeData',
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
