export const createAnchors = () => {
    const anchors = document.querySelectorAll("[data-href]");

    anchors.forEach((el) => {
        const href = el.dataset.href;
        const origin = window.location.origin;

        el.className += ` after:tracking-wide after:cursor-pointer after:font-Satoshi after:block after:bg-[#D4E2FC] after:fixed after:bottom-0 after:left-0 after:pt-1 after:pl-1 after:pr-2 after: after:text-[11px] after:content-[attr(data-href)] after:hidden md:after:block md:after:hidden after:rounded-tr-md`;
        el.dataset.href = origin.replace(/^http(s)?:\/\//, '') + href;

        el.addEventListener("click", (ev) => {
            const target = ev.target;

            if (!target.closest("button") && href) {
                location.href = href;
            }
        });

        el.addEventListener("mouseenter", () => {
            el.classList.remove("md:after:hidden");
        });

        el.addEventListener("mouseleave", () => {
            el.classList.add("md:after:hidden");
        });
    });
};
