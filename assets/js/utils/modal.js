const defaultFN = () => {}

export class Modal {
    _active;
    _name;

    _root;
    _buttons = [];
    _closeElement;

    _isBlocking = false;
    _inited = false;

    _display = "block";

    options = {
        isCloseOutside: false,
        onInit: defaultFN,
        onDestroy: defaultFN,
        onOpen: defaultFN,
        onClose: defaultFN,
    };

    constructor(name, props = {}) {
        this._active = props.initialState || false;
        this._name = name;

        const rootEl = document.querySelector(`[data-modal="${name}"]`);
        const buttonEls = Array.from(
            document.querySelectorAll(`[data-modal-button="${name}"]`)
        );
        const closeEl = document.querySelector(`[data-modal-close="${name}"]`);

        this.options = {
            isCloseOutside: props.closeOnClickOutside || false,
            onClose: props.onClose || defaultFN,
            onOpen: props.onOpen || defaultFN,
            onDestroy: props.onDestroy || defaultFN,
            onInit: props.onInit || defaultFN,
        };

        if (!rootEl) {
            console.error(`[Modal] Modal "${name}" not found`);
        } else if (!buttonEls) {
            console.error(`[Modal] Button "${name}" not found`);
        } else {
            this.toggle = this.toggle.bind(this);
            this.open = this.open.bind(this);
            this.close = this.close.bind(this);
            this._onClickOutside = this._onClickOutside.bind(this);
            this._activate = this._activate.bind(this);
            this._deactivate = this._deactivate.bind(this);

            this._display = rootEl.dataset.block || "block";

            this._root = rootEl;
            this._buttons = buttonEls;
            this._closeElement = closeEl;
            this._init();
        }
    }

    _init() {
        if (!this._inited) {
            if (this.options.onInit(this.event) || false) {
                gsap.set(this.elements.root, { display: "none" });
            }
            this._inited = true;
        }

        this.elements.buttons.forEach((button) =>
            button.addEventListener("click", this.toggle)
        );

        if (this.elements.closeElement) {
            this.elements.closeElement.addEventListener("click", this.close);
        }

        if (this.options.isCloseOutside) {
            document.addEventListener("mousedown", this._onClickOutside);
        }

        this._update();
    }

    _destroy() {
        this._inited = false;
        gsap.set(this.elements.root, { display: "" });

        this.elements.buttons.forEach((button) =>
            button.removeEventListener("click", this.toggle)
        );

        if (this.elements.closeElement) {
            this.elements.closeElement.removeEventListener("click", this.close);
        }

        if (this.options.isCloseOutside) {
            document.removeEventListener("mousedown", this._onClickOutside);
        }
    }

    _update(isPrevented) {
        if (!isPrevented) {
            this._activate();

            if (this._active) {
                gsap.timeline()
                    .set(this.elements.root, { display: this._display })
                    .set(document.body, { overflow: "hidden" })
                    .to(this.elements.root, {
                        opacity: 1,
                        duration: 0.5,
                        onComplete: this._deactivate,
                    });
            } else {
                gsap.timeline()
                    .to(this.elements.root, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: this._deactivate,
                    })
                    .set(document.body, { overflow: "" })
                    .set(this.elements.root, { display: "none" });
            }
        }
    }

    _deactivate() {
        this._isBlocking = false;
    }

    _activate() {
        this._isBlocking = true;
    }

    _onClickOutside(ev) {
        if (!ev.composedPath().includes(this.elements.root)) {
            this.close();
        }
    }

    open() {
        if (!this.active && !this.isBlocking) {
            this._active = true;
            this._update(this.options.onOpen(this.event) === false);
        }
    }

    close() {
        if (this.active && !this.isBlocking) {
            this._active = false;
            this._update(this.options.onClose(this.event) === false);
        }
    }

    toggle() {
        if (this._active) {
            this.close();
        } else {
            this.open();
        }
    }

    get name() {
        return this._name;
    }

    get active() {
        return this._active;
    }

    get elements() {
        return {
            root: this._root,
            buttons: this._buttons,
            closeElement: this._closeElement,
        };
    }

    get isBlocking() {
        return this._isBlocking;
    }

    get instance() {
        return {
            isBlocking: this.isBlocking,
            activate: () => this._activate(),
            deactivate: () => this._deactivate(),
        };
    }

    get event() {
        return {
            root: this._root,
            buttons: this._buttons,
            closeElement: this._closeElement,
            instance: this.instance,
        };
    }
}
