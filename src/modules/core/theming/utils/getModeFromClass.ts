export const getModeFromClass = (): string | undefined => {
  let mode: string | undefined;

  if (typeof document !== 'undefined') {
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith('theme-ui-')) {
        mode = className.replace('theme-ui-', '');
      }
    });
  }

  return mode;
};
