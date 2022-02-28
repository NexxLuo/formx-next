import React, { useRef, useEffect } from "react";
import { useDrag, useDrop, DndProvider as ReactDndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function getDircetion(elementRect, mouseOffset, divide) {
    let divideCount = divide || 3;

    let avgW = elementRect.width / divideCount;
    let avgH = elementRect.height / divideCount;

    let leftStart = elementRect.x;
    let leftEnd = leftStart + avgW;

    let rightStart = elementRect.x + elementRect.width - avgW;
    let rightEnd = rightStart + avgW;

    let centerStart = leftEnd;
    let centerEnd = rightStart;

    let topStart = elementRect.y;
    let topEnd = elementRect.y + avgH;

    let bottomStart = elementRect.y + elementRect.height - avgH;
    let bottomeEnd = bottomStart + avgH;

    let middleStart = topEnd;
    let middleEnd = bottomStart;

    let dircetion_h = "";
    let dircetion_v = "";

    //水平方向
    if (mouseOffset.x >= leftStart && mouseOffset.x <= leftEnd) {
        dircetion_h = "left";
    }

    if (mouseOffset.x >= centerStart && mouseOffset.x <= centerEnd) {
        dircetion_h = "center";
    }

    if (mouseOffset.x >= rightStart && mouseOffset.x <= rightEnd) {
        dircetion_h = "right";
    }

    //垂直方向
    if (mouseOffset.y >= topStart && mouseOffset.y <= topEnd) {
        dircetion_v = "top";
    }

    if (mouseOffset.y >= middleStart && mouseOffset.y <= middleEnd) {
        dircetion_v = "middle";
    }

    if (mouseOffset.y >= bottomStart && mouseOffset.y <= bottomeEnd) {
        dircetion_v = "bottom";
    }

    return {
        h: dircetion_h,
        v: dircetion_v
    };
}

export const DndProvider = props => {
    return (
        <ReactDndProvider backend={HTML5Backend} context={window}>
            {props.children}
        </ReactDndProvider>
    );
};

export const Draggable = ({
    item = {},
    type,
    onDragDrop,
    onDragEnd,
    children,
    className = ""
}) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: type, ...item },
        end: (data, monitor) => {
            const dropResult = monitor.getDropResult();
            let source = { ...item };

            if (typeof onDragEnd === "function") {
                onDragEnd(source);
            }

            if (data && dropResult) {
                if (typeof onDragDrop === "function") {
                    onDragDrop(source, dropResult);
                }
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <div ref={drag} className={`drag-item ${className}`}>
            {children}
            <div className="drag-item-tool">
                <span></span>
            </div>
        </div>
    );
};

export const Droppable = ({
    item = {},
    type,
    onDragHover,
    children,
    extra = {},
    style = {},
    className
}) => {
    const [{}, drop] = useDrop({
        accept: type,
        drop: (data, monitor) => {
            //阻止drop事件冒泡
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            let target = {
                ...item,
                ...extra,
                dircetion: { h: "center", v: "middle" }
            };
            return target;
        },
        hover(data, monitor) {
            let isOver = monitor.isOver({ shallow: true });
            if (isOver) {
                if (typeof onDragHover === "function") {
                    onDragHover({
                        dom: null,
                        dircetion: {}
                    });
                }
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true })
        })
    });

    return (
        <div ref={drop} className={className} style={{ ...style }}>
            {children}
        </div>
    );
};

export const ItemDroppable = ({
    item = {},
    type,
    onDragHover,
    children,
    extra = {},
    style = {},
    className,
    canDrop
}) => {
    const ref = useRef(null);
    let dragRef = function () {
        return ref.current;
    };

    const [{}, connectDrop] = useDrop({
        accept: type,
        canDrop: item => {
            let bl = true;
            if (typeof canDrop === "function") {
                bl = canDrop(item);
            }
            return bl;
        },
        drop: (data, monitor) => {
            //阻止drop事件冒泡
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            let target = {
                ...item,
                ...extra,
                dircetion: { h: "center", v: "middle" }
            };
            return target;
        },
        hover(item, monitor) {
            let isCanDrop = monitor.canDrop();
            let isOver = monitor.isOver({ shallow: true });
            if (isCanDrop && isOver) {
                if (typeof onDragHover === "function") {
                    onDragHover({
                        dom: dragRef(),
                        dircetion: { h: "center", v: "middle" }
                    });
                }
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true })
        })
    });

    useEffect(() => {
        connectDrop(dragRef());
    });

    return (
        <div ref={ref} style={style} className={className}>
            {children}
        </div>
    );
};

export const DragDrop = ({
    type,
    item = {},
    allowInner = false,
    onDragDrop,
    onDragEnd,
    onDragHover,
    children,
    onClick,
    className = "",
    extra = {},
    style = {},
    canDrop
}) => {
    const ref = useRef(null);

    let dragRef = function () {
        return ref.current;
    };

    let dragItem = { type: type, ...item };

    const [{}, connectDrag, preview] = useDrag({
        item: dragItem,
        end(source, monitor) {
            const dropResult = monitor.getDropResult();

            if (typeof onDragEnd === "function") {
                onDragEnd(source);
            }

            if (source && dropResult) {
                if (typeof onDragDrop === "function") {
                    onDragDrop(source, dropResult);
                }
            }
        }
    });

    const [{}, connectDrop] = useDrop({
        accept: type,
        canDrop: item => {
            let bl = true;
            if (typeof canDrop === "function") {
                bl = canDrop(item);
            }
            return bl;
        },
        drop(data, monitor) {
            //控制事件执行到子级
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }

            const hoverBoundingRect = dragRef()?.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            var dircetion = getDircetion(
                hoverBoundingRect,
                clientOffset,
                allowInner === false ? 2 : 8
            );

            let target = {
                ...extra,
                ...item,
                dircetion
            };

            return target;
        },
        hover(data, monitor) {
            let isOver = monitor.isOver({ shallow: true });
            let isCanDrop = monitor.canDrop();

            if (isCanDrop && isOver) {
                const clientOffset = monitor.getClientOffset();

                let prevOffset = data.prevOffset;
                if (prevOffset) {
                    if (clientOffset.x === prevOffset.x) {
                        return;
                    }
                }

                const hoverBoundingRect = dragRef()?.getBoundingClientRect();

                var dircetion = getDircetion(
                    hoverBoundingRect,
                    clientOffset,
                    allowInner === false ? 2 : 8
                );

                if (typeof onDragHover === "function") {
                    onDragHover({ dom: dragRef(), dircetion });
                }

                data.prevOffset = {
                    y: clientOffset.y,
                    x: clientOffset.x
                };
            }
        },
        collect: monitor => {
            const clientOffset = monitor.getClientOffset();

            let prevOffset = {};

            if (clientOffset) {
                prevOffset.x = clientOffset.x;
                prevOffset.y = clientOffset.y;
            }

            return {
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
                prevOffset: prevOffset
            };
        }
    });

    useEffect(() => {
        connectDrop(dragRef());
        connectDrag(dragRef());
        preview(dragRef(), { captureDraggingState: true });
    });

    return (
        <div
            className={`drag-item ${className}`}
            style={style}
            ref={ref}
            onClick={onClick}
        >
            <div className="drag-item-border"></div>
            {children}
        </div>
    );
};
