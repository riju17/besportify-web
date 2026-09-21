export const THEME_STORAGE_KEY = 'besportify-theme';

export function getThemeBootstrapScript() {
  return `
    (function () {
      try {
        var key = ${JSON.stringify(THEME_STORAGE_KEY)};
        var stored = window.localStorage.getItem(key);
        var theme = stored === 'light' || stored === 'dark'
          ? stored
          : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light');
        var root = document.documentElement;
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
      } catch (error) {}
    })();
  `;
}
