export const createElement = (props) => {
    const element = document.createElement(props.tag);

    if(props.innerHTML) {
        element.innerHTML = props.innerHTML;
    }

    if(props.children) {
        element.append(...props.children);
    }

    if(props.className) {
        element.className = props.className
    }

    if(props.clickEvent) {
        element.addEventListener("click", props.clickEvent);
    }

    if(props.moveEvent) {
        element.addEventListener("mousemove", props.moveEvent);
    }

    if(props.enterEvent) {
        element.addEventListener("mouseenter", props.enterEvent);
    }

    if(props.leaveEvent) {
        element.addEventListener("mouseleave", props.leaveEvent);
    }

    return element;
}