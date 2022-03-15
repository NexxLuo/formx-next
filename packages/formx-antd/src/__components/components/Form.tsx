import React from "react";
import { Form as FormType, IFormFeedback } from "@formily/core";
import { useForm, FormProvider, JSXComponent } from "@formily/react";
import { FormLayout, IFormLayoutProps } from "../../form-layout";
import { PreviewText } from "../../preview-text";
import { ConfigProvider } from "antd";
import AnchorNav from "../widgets/AnchorNav";
import { isResponsiveSizeSmall } from "../shared/utils";

export interface FormProps extends IFormLayoutProps {
  form?: FormType;
  component?: JSXComponent;
  onAutoSubmit?: (values: any) => any;
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void;
  previewTextPlaceholder?: React.ReactNode;
}

type FormContentPropsType = {
  form: FormType;
};

class FormContent extends React.Component<FormContentPropsType> {
  containerRef = null;
  navRef = null;
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.navRef = React.createRef();
  }
  getContainer = () => {
    return this.containerRef.current;
  };

  getForm = () => {
    return this.props.form;
  };

  isNavDisabled = () => {
    let navDisabled = false;
    if (isResponsiveSizeSmall()) {
      navDisabled = true;
    }
  };

  render() {
    let navDisabled = this.isNavDisabled();

    return (
      <ConfigProvider getPopupContainer={this.getContainer}>
        <div className="formx-wrapper formx-container" ref={this.containerRef}>
          {this.props.children}

          <AnchorNav
            disabled={navDisabled}
            ref={this.navRef}
            getContainer={this.getContainer}
            getForm={this.getForm}
          ></AnchorNav>
        </div>
      </ConfigProvider>
    );
  }
}

export const Form: React.FC<FormProps> = ({
  previewTextPlaceholder,
  ...props
}) => {
  let form = useForm();
  return (
    <PreviewText.Placeholder value={previewTextPlaceholder}>
      <FormLayout {...props}>
        <FormContent form={form}>{props.children}</FormContent>
      </FormLayout>
    </PreviewText.Placeholder>
  );
};

Form.defaultProps = {
  component: "form"
};

export default Form;
