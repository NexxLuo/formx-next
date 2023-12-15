import FormRender, { FormContext } from "./render/index";
import * as registry from "./core/registry";
import { FormPath } from "@formily/shared";
import Decimal from "decimal.js";

export { FormRender, FormPath, registry, FormContext, Decimal };
export * from "@formily/react";
export default FormRender;
