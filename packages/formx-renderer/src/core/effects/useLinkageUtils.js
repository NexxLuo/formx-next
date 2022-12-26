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
            let nextValue = value !== undefined ? value : defaultValue;
            //联动设置值时，如果目标字段为隐藏值，则将值设置到caches中，以便显示出字段时拿到正确值
            if (key === "value" && state.selfDisplay === "none") {
                if (typeof state.caches === "object" && state.caches) {
                    state.caches.value = nextValue;
                } else {
                    state.caches = {
                        value: nextValue
                    }
                }
            } else {
                FormPath.setIn(
                    state,
                    key,
                    nextValue
                );
            }
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
