import { createBehavior } from "@designable/core";
import { createFieldSchema } from "../Field";
import { AllSchemas } from "../../schemas";
import { AllLocales } from "../../locales";

export const createArrayBehavior = (name: string) => {
  return createBehavior({
    name,
    extends: ["Field"],
    selector: node => node.props["x-component"] === name,
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(AllSchemas[name])
    },
    designerLocales: AllLocales[name]
  });
};
