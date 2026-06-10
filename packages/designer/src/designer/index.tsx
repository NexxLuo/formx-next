import "antd/dist/antd.less";
import React, { useMemo, useEffect } from "react";
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from "@platform/designable-react";
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode
} from "@designable/core";
import { PreviewWidget, SchemaEditorWidget, PropertyForm } from "./widgets";
import { saveSchema, loadInitialSchema } from "./service";
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Radio,
  Checkbox,
  NumberPicker,
  DatePicker,
  Switch,
  Text,
  Card,
  ArrayTable,
  FormTab,
  ObjectContainer,
  Button,
  Modal
} from "../components";
import "./style.less";
import { getRegistryComponents } from "../components/register";
import {setNpmCDNRegistry} from "@platform/designable-settings-form"

setNpmCDNRegistry("npm")

GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: {
      Inputs: "输入控件",
      Layouts: "布局组件",
      Arrays: "自增组件",
      Displays: "展示组件"
    }
  },
  "en-US": {
    sources: {
      Inputs: "Inputs",
      Layouts: "Layouts",
      Arrays: "Arrays",
      Displays: "Displays"
    }
  }
});

const FormDesigner = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S]
            ],
            handler(ctx) {
              saveSchema(ctx.engine);
            }
          })
        ],
        rootComponentName: "Form"
      }),
    []
  );

  let registeredComponents = getRegistryComponents();
  let registeredComponentsArr = Reflect.ownKeys(registeredComponents).map(k => {
    return registeredComponents[k];
  });

  useEffect(() => {
    loadInitialSchema(engine);
  }, []);

  return (
    <Designer engine={engine}>
      <StudioPanel>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[
                Input,
                NumberPicker,
                Select,
                TreeSelect,
                Checkbox,
                Radio,
                DatePicker,
                Switch
              ]}
            />
            <ResourceWidget
              title="sources.Layouts"
              sources={[Card, FormTab, Modal]}
            />
            <ResourceWidget title="sources.Arrays" sources={[ArrayTable]} />
            <ResourceWidget
              title="sources.Displays"
              sources={[Text, Button, ...registeredComponentsArr]}
            />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={["DESIGNABLE", "JSONTREE", "PREVIEW"]} />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Radio,
                      Checkbox,
                      NumberPicker,
                      DatePicker,
                      Switch,
                      Text,
                      Card,
                      ArrayTable,
                      Button,
                      FormTab,
                      Modal,
                      ObjectContainer,
                      ...registeredComponents
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {tree => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <PropertyForm
            onChange={({ path, name }) => {
              console.log("onChange:", path, name);
            }}
            onChangeFormProperty={({ path, name }) => {
              console.log("onChangeFormProperty:", path, name);
            }}
          />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};

export default FormDesigner;
