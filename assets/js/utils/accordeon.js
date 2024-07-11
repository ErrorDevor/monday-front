const defaultFn = () => {};

export class Accordeon {
    _active;
    _element;
    _button;
    _content;
    _arrow;
    _isMediaActive;
    _isSmooth;
    _selectors = {
        element: '[data-accordeon=""]',
        button: '[data-accordeon="button"]',
        content: '[data-accordeon="content"]',
        arrow: '[data-accordeon="arrow"]',
    };

    _options = {
        adaptive: true,
        closeOnClickOutside: false,
        onOpen: defaultFn,
        onClose: defaultFn,
        onInit: defaultFn,
        onDestroy: defaultFn,
    };

    _mm;

    constructor(el, props = {}) {
        let element = typeof el === "string" ? document.querySelector(el) : el;

        Object.assign(this._selectors, props.selectors || {});

        if (!element) {
            throw new Error("[Accordeon] Element not found");
        }

        this._element = element;
        this._button = element.querySelector(this._selectors.button);
        this._content = element.querySelector(this._selectors.content);
        this._arrow = element.querySelector(this._selectors.arrow);

        if (!this._button || !this._content) {
            throw new Error("[Accordeon] Button or Content not found");
        }

        this._active = props.initState || false;

        this._options = {
            adaptive: element.dataset.accordeonAdaptive === "true",
            closeOnClickOutside: props.closeOnClickOutside || false,
            onOpen: props.onOpen || defaultFn,
            onClose: props.onClose || defaultFn,
            onInit: props.onInit || defaultFn,
            onDestroy: props.onDestroy || defaultFn,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
        this._onClickOutside = this._onClickOutside.bind(this);
        this._onResize = this._onResize.bind(this);

        this._isSmooth =
            (element.dataset.accordeonSmooth === "false"
                ? false
                : props.smooth) || false;

        let mm = window.matchMedia(
            this._element.dataset.accordeonMedia || "(min-width: 1px)"
        );

        mm.addEventListener("change", this._onResize);

        this._mm = mm;

        if (mm.matches) {
            this._isMediaActive = true;
            this.init();
        }
    }

    init() {
        this._button.addEventListener("click", this.toggle);

        if (this.options.closeOnClickOutside) {
            document.addEventListener("click", this._onClickOutside);
        }

        Object.assign(this._content.style, {
            overflow: this.options.adaptive ? "hidden" : "",
            transition: this._isSmooth ? "height .2s ease" : "",
        });

        this.options.onInit(this.event);

        this._update();
    }

    open() {
        this._active = true;
        this._update();
        this.options.onOpen(this.event);
    }

    close() {
        this._active = false;
        this._update();
        this.options.onClose(this.event);
    }

    toggle() {
        let active = !this._active;
        this._active = active;
        this._update();

        if (active) {
            this.options.onOpen(this.event);
        } else {
            this.options.onClose(this.event);
        }
    }

    _onResize(ev) {
        if (ev.matches) {
            if (!this._isMediaActive) {
                this._isMediaActive = true;
                this.init();
            }
        } else {
            this._isMediaActive = false;
            this.destroy();
        }
    }

    _onClickOutside(ev) {
        if (!ev.composedPath().includes(this._element)) {
            this.close();
        }
    }

    _update() {
        if (this.options.adaptive) {
            this._content.style.height = `${
                this._active ? this._content.scrollHeight : 0
            }px`;
        } else {
            if (this._active) {
                this._content.classList.remove("hidden");
            } else {
                this._content.classList.add("hidden");
            }
        }

        if (this._arrow) {
            if (this._active) {
                this._arrow.classList.add("accordeon-active");
            } else {
                this._arrow.classList.remove("accordeon-active");
            }
        }

        if (this._active) {
            this._element.classList.add("accordeon-active");
        } else {
            this._element.classList.remove("accordeon-active");
        }
    }

    destroy() {
        this._button.removeEventListener("click", this.toggle);

        if (this.options.closeOnClickOutside) {
            document.removeEventListener("click", this._onClickOutside);
        }

        this._active = false;
        this._content.classList.remove("hidden");
        this._element.classList.remove("accordeon-active");
        this._content.removeAttribute("style");
        this._arrow.removeAttribute("style");

        this.options.onDestroy(this.event);
    }

    kill() {
        this.destroy();
        this._mm.removeEventListener("change", this._onResize);
    }

    get options() {
        return this._options;
    }

    get event() {
        return {
            state: this._active,
            element: this._element,
            button: this._button,
            content: this._content,
            arrow: this._arrow,
        };
    }
}
