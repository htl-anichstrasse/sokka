function animateCSS(node: HTMLElement, animation: string, prefix = 'animate__'): Promise<void> {
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd() {
            node.classList.remove(`${prefix}animated`, animationName);
            resolve();
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
}

export { animateCSS };
