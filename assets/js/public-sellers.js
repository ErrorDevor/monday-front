
import { HorizontalScroll } from './utils/horizontal-scroll.js';

document.querySelectorAll("[data-hs=\"\"]").forEach(
    (el) => new HorizontalScroll(el)
)