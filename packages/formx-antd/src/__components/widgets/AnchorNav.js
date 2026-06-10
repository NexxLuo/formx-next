import React from "react";
import PropTypes from "prop-types";
import { Anchor, Icon, Tooltip } from "antd";
import { polyfill } from "react-lifecycles-compat";
import classNames from "classnames";
import { ConfigConsumer } from "antd/es/config-provider";

class AnchorLink extends React.Component {
    static defaultProps = {
        href: "#"
    };

    static contextTypes = {
        antAnchor: PropTypes.object
    };

    componentDidMount() {
        this.context.antAnchor.registerLink(this.props.href);
    }

    componentDidUpdate({ href: prevHref }) {
        const { href } = this.props;
        if (prevHref !== href) {
            this.context.antAnchor.unregisterLink(prevHref);
            this.context.antAnchor.registerLink(href);
        }
    }

    componentWillUnmount() {
        this.context.antAnchor.unregisterLink(this.props.href);
    }

    handleClick = e => {
        const { scrollTo, onClick } = this.context.antAnchor;
        const { href, title } = this.props;
        if (onClick) {
            onClick(e, { title, href });
        }
        scrollTo(href);
    };

    renderAnchorLink = ({ getPrefixCls }) => {
        const {
            prefixCls: customizePrefixCls,
            href,
            title,
            children,
            className,
            target
        } = this.props;
        const prefixCls = getPrefixCls("anchor", customizePrefixCls);
        const active = this.context.antAnchor.activeLink === href;
        const wrapperClassName = classNames(className, `${prefixCls}-link`, {
            [`${prefixCls}-link-active`]: active
        });
        const titleClassName = classNames(`${prefixCls}-link-title`, {
            [`${prefixCls}-link-title-active`]: active
        });
        return (
            <div className={wrapperClassName}>
                <a
                    className={titleClassName}
                    title={typeof title === "string" ? title : ""}
                    target={target}
                    onClick={this.handleClick}
                >
                    {children}
                </a>
            </div>
        );
    };

    render() {
        return <ConfigConsumer>{this.renderAnchorLink}</ConfigConsumer>;
    }
}

polyfill(AnchorLink);

class AnchorNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            expanded: true
        };
    }

    init = () => {
        let form = this.props.getForm();
        let isEditor = form.getValuesIn("__DATA__.__isEditor");
        if (isEditor) {
            return;
        }

        let graph = form.getFormGraph();

        let items = [];
        let formId = form.id;
        let options = form.props?.context?.options || {};
        Reflect.ownKeys(graph).forEach(k => {
            if (k.split(".").length === 1) {
                let item = graph[k];
                let componentType = item.component?.[0]?.toLowerCase();
                let isGroup =
                    ["fieldset", "card", "tab", "arraytable"].indexOf(
                        componentType
                    ) > -1;

                let extra = item.component?.[1]?.["x-extra-props"];
                if (extra && extra.isGroup === true) {
                    isGroup = true;
                }
                if (["modal", "grid"].indexOf(componentType) > -1) {
                    isGroup = false;
                }
                let isHidden = false;
                if (options.visible === false) {
                    isHidden = true;
                }
                if (
                    extra &&
                    extra.visibility &&
                    extra.visibility.type === "hidden"
                ) {
                    isHidden = true;
                }
                if (isGroup && !isHidden) {
                    items.push({
                        id: k + "_" + formId,
                        name: k,
                        title: extra.title
                    });
                }
            }
        });

        this.setState({ list: items });
    };

    getContainer = () => {
        let fn = this.props.getContainer;
        let el = null;
        if (typeof fn === "function") {
            el = fn();
        }
        return el || window;
    };

    toggleExpand = () => {
        let form = this.props.getForm();
        let { expanded, list } = this.state;

        list.forEach(d => {
            let field = form.query(d.name).take();
            if (field) {
                let collapsible = field.componentProps.collapsible;
                if (collapsible) {
                    if (expanded) {
                        field.setComponentProps({ activeKey: [] });
                    } else {
                        field.setComponentProps({ activeKey: ["pane"] });
                    }
                }
            }
        });

        this.setState({ expanded: !expanded });
    };

    render() {
        if (this.props.disabled) {
            return null;
        }
        if (this.state.list.length < 2) {
            return null;
        }
        return (
            <div className="formx-anchor">
                <Anchor
                    affix={false}
                    getContainer={this.getContainer}
                    offsetTop={6}
                >
                    {this.state.list.map((d, i) => {
                        return (
                            <AnchorLink
                                className="formx-anchor-link"
                                href={"#" + d.id}
                                key={d.id}
                            >
                                <Tooltip placement="left" title={d.title}>
                                    {i + 1}
                                </Tooltip>
                            </AnchorLink>
                        );
                    })}
                </Anchor>
                <span
                    className="formx-anchor-expand-icon"
                    onClick={this.toggleExpand}
                >
                    <Icon type={this.state.expanded ? "pic-center" : "menu"} />
                </span>
            </div>
        );
    }
}

AnchorNav.defaultProps = {
    disabled: false
};

AnchorNav.propTypes = {
    getContainer: PropTypes.func,
    getForm: PropTypes.func,
    disabled: PropTypes.bool
};

export default AnchorNav;
