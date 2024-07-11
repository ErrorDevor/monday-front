export const resizer = (breakproint, matched) => {
    const breakpoint = window.matchMedia(breakproint);

    matched?.(breakpoint.matches);

    const event = (ev) => {
        matched?.(ev.matches);
    };

    breakpoint.addEventListener("change", event);

    return {
        destroy: () => breakpoint.removeEventListener("change", event),
    };
};
