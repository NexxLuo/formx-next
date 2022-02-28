function lowercase(str) {
    if (str && typeof str.toLowerCase === "function") {
        return str.toLowerCase();
    }
    return str;
}

export default class FormFunction {
    constructor() {
        this.items = {};

        this.call = function () {
            let res = undefined;
            let args = Array.prototype.slice.call(arguments);
            let name = args[0];
            let arr = [];
            let i = 1;
            while (i < args.length) {
                arr.push(args[i]);
                i++;
            }

            if (name) {
                let fn = this.getItemValue(name);
                if (typeof fn === "function") {
                    res = fn.apply(null, arr);
                } else {
                    console.error("Function not found. Please check:" + name);
                }
            }
            return res;
        }.bind(this);
    }

    setItem = (o, reset = false) => {
        if (o && o.name) {
            let name = o.name;

            if (reset !== true && this.items[name]) {
                console.warn(
                    "Function name duplicate. Please change the name:" + name
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
