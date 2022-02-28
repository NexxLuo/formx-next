import React from "react";
import { Icon } from "antd";

export type AntdIconProps = {};
export const QuestionCircleOutlined = props => (
  <Icon {...props} type="question-circle" />
);
export const CloseCircleOutlined = props => (
  <Icon {...props} type="close-circle" />
);
export const CheckCircleOutlined = props => (
  <Icon {...props} type="check-circle" />
);
export const ExclamationCircleOutlined = props => (
  <Icon {...props} type="exclamation-circle" />
);

export const LoadingOutlined = props => <Icon {...props} type="loading" />;
export const DeleteOutlined = props => <Icon {...props} type="delete" />;
export const DownOutlined = props => <Icon {...props} type="down" />;
export const UpOutlined = props => <Icon {...props} type="up" />;
export const PlusOutlined = props => <Icon {...props} type="plus" />;
PlusOutlined.type = "plus";
export const MenuOutlined = props => <Icon {...props} type="menu" />;
export const EditOutlined = props => <Icon {...props} type="edit" />;
export const CloseOutlined = props => <Icon {...props} type="close" />;
export const MessageOutlined = props => <Icon {...props} type="message" />;
export const CheckOutlined = props => <Icon {...props} type="check" />;
export const InboxOutlined = props => <Icon {...props} type="check" />;
export const UploadOutlined = props => <Icon {...props} type="check" />;
