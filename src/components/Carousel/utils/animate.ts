const duration = 300;

const animate = (
  element: HTMLElement,
  from: number,
  to: number,
  callback?: () => void
) => {
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = from + (to - from) * progress;
    element.scrollLeft = value;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (callback) callback();
    }
  };

  requestAnimationFrame(step);
};

export default animate;
