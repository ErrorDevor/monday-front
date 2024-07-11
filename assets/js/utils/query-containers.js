export class QueryContainer {
    name;
    containers;
    element;

    constructor(name) {
        this.name = name;
        this.resize = this.resize.bind(this);

        this.init();
        this.resize();
    }

    resize() {
        if (!this.element) return;

        this.containers.forEach(({ el, query }) => {
            if (window.matchMedia(query).matches) {
                if (el.children[0] !== this.element) {
                    el.appendChild(this.element);
                }
            }
        });
    }

    init() {
        const els = Array.from(
            document.querySelectorAll(`[data-container="${this.name}"]`)
        );
        const element = els.find((el) => !el.dataset.containerQuery);

        if (element) {
            this.element = element;
        }

        console.log(els);

        const containers = els.filter((el) => !!el.dataset.containerQuery);

        this.containers = containers.map((el) => ({
            el,
            query: el.dataset.containerQuery,
        }));

        window.addEventListener("resize", this.resize);
    }

    destroy() {
        window.removeEventListener("resize", this.resize);
    }
}
