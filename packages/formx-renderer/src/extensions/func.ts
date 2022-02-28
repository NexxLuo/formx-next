function lowercase(str: string) {
    return str?.toLowerCase();
}

export interface ItemProps {
    name: string;
    value?: Function;
    title: string;
}

export interface RegistryProps {
    items: {
        [key: string]: ItemProps;
    };
}

const registry: RegistryProps = {
    items: {}
};

export const getItems = () => {
    return Object.keys(registry.items).map(k => {
        return registry.items[k];
    });
};

export function setItem(o?: ItemProps, reset: boolean = false) {
    if (o && o.name) {
        let name = lowercase(o.name);

        if (reset !== true && registry.items[name]) {
            console.warn(
                "Function name duplicate. Please change the name:" + name
            );
            return false;
        }

        registry.items[name] = {
            name: name,
            value: o.value,
            title: o.title
        };
        return true;
    }
    return false;
}

export function setItems(items?: Array<ItemProps>, reset: boolean = false) {
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            setItem(item, reset);
        }
    }
}

export function setItemValue(o: { string: any }) {
    if (o) {
        for (const k in o) {
            if (Object.prototype.hasOwnProperty.call(o, k)) {
                let name = lowercase(k);
                let d = registry.items[name];
                if (d) {
                    d.value = o[k];
                }
            }
        }
    }
}
