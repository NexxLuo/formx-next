export default class FormEnvs {
    constructor() {
        this.items = {};
    }

    setItem = (o, reset = false) => {
        if (o && o.name) {
            let name = o.name;

            if (reset !== true && this.items[name]) {
                console.warn(
                    "Env name duplicate. Please change the name:" + name
                );
                return false;
            }

            this.items[name] = {
                name: name,
                value: o.value,
                title: o.title
            };
            return true;
        }
        return false;
    };

    setItems = (items, reset) => {
        if (items instanceof Array) {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                this.setItem(item, reset);
            }
        }
    };

    getItems = () => {
        let items = this.items;
        return Object.keys(items).map(k => {
            let { value, ...other } = items[k];
            return other;
        });
    };

    getItemValue = k => {
        let items = this.items;
        let v = items[k]?.value;
        if (typeof v === "function") {
            return v(k);
        }
        return v;
    };

    setItemValue = (k, v) => {
        let items = this.items;
        let d = items[k];
        if (d) {
            d.value = v;
        }
    };

    setItemsValue = o => {
        if (typeof o === "object" && o) {
            for (const k in o) {
                if (Object.prototype.hasOwnProperty.call(o, k)) {
                    this.setItemValue(k, o[k]);
                }
            }
        }
    };
}
