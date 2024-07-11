export class HorizontalScroll {
    element;
    prevButton;
    nextButton;
    container;
    wrapper;
    items = [];

    transform = 0;

    constructor(element) {
        this.element = element;

        this.prevButton = element.querySelector('[data-hs="prev"]');
        this.nextButton = element.querySelector('[data-hs="next"]');
        this.container = element.querySelector('[data-hs="container"]');
        this.wrapper = element.querySelector('[data-hs="wrapper"]');

        this.items = Array.from(
            this.wrapper.querySelectorAll('[data-hs="item"]')
        );

        this.resize = this.resize.bind(this);
        this.toPrev = this.toPrev.bind(this);
        this.toNext = this.toNext.bind(this);

        this.init();
    }

    resize() {
        if (this.container.offsetWidth >= this.wrapper.scrollWidth) {
            this.prevButton.style.display = this.nextButton.style.display =
                "none";
            this.transform = 0;
        } else {
            this.prevButton.style.display = this.nextButton.style.display = "";
            this.wrapper.style.transition = "transform 200ms ease";
        }
    }

    toPrev() {
        this.transform = Math.max(0, this.transform - this.wrapperVisibleWidth);
        this.update();
    }

    toNext() {
        this.transform = Math.min(
            this.maxTransform,
            this.transform + this.wrapperVisibleWidth
        );

        this.update();
    }

    init() {
        this.resize();

        window.addEventListener("resize", this.resize);
        this.prevButton.addEventListener("click", this.toPrev);
        this.nextButton.addEventListener("click", this.toNext);
    }

    update() {
        this.wrapper.style.transform = `translateX(-${this.transform}px)`;
    }

    destroy() {
        window.removeEventListener("resize", this.resize);
        this.prevButton.removeEventListener("click", this.toPrev);
        this.nextButton.removeEventListener("click", this.toNext);
    }

    get wrapperVisibleWidth() {
        return this.container.offsetWidth;
    }

    get maxTransform() {
        return this.wrapper.scrollWidth - this.container.offsetWidth;
    }
}
