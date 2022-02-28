import { FormPath } from "@formily/shared";
import { useForm } from "@formily/react";

export const useLinkageUtils = () => {
    const { setFieldState } = useForm();
    const linkage = (key, defaultValue) => (path, value) =>
        setFieldState(path, state => {
            FormPath.setIn(
                state,
                key,
                value !== undefined ? value : defaultValue
            );
        });

    return {
        hide: linkage("visible", false),
        show: linkage("visible", true),
        visible: linkage("visible"),
        enum: linkage("enum", []),
        loading: linkage("loading", true),
        loaded: linkage("loading", false),
        value: linkage("value"),
        disable: linkage("componentProps.disabled", false),
        style: linkage("componentProps.style", {})
    };
};

export const useLinkageUtilsSync = ({ setFieldState }) => {
    const linkage = (key, defaultValue) => (path, value) =>
        setFieldState(path, state => {
            FormPath.setIn(
                state,
                key,
                value !== undefined ? value : defaultValue
            );
        });

    return {
        hide: linkage("visible", false),
        show: linkage("visible", true),
        visible: linkage("visible"),
        enum: linkage("enum", []),
        loading: linkage("loading", true),
        loaded: linkage("loading", false),
        value: linkage("value"),
        disable: linkage("componentProps.disabled", false),
        style: linkage("componentProps.style", {}),
        pagination: linkage("componentProps.pagination", false),
        requestInfo: linkage("componentProps.x-runtime.requestInfo", null)
    };
};
