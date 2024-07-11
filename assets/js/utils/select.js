export class Select {
    _active;
    _element;
    _button;
    _content;
    _arrow;
    _isMediaActive;

    props(el, props = {}) {
        let element = typeof el === "string" ? document.querySelector(el) : el;

        if (!element) {
            throw new Error("[Accordeon] Element not found");
        }
    }
}
