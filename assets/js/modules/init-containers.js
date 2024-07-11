import { QueryContainer } from "../utils/query-containers.js";

export const initContainers = () => {
    document.querySelectorAll("[data-container]").forEach((item) => {
        let name = item.dataset.container;
        if (name) {
            new QueryContainer(name);
        }
    });
};
