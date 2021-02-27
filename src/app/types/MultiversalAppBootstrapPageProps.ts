/**
 * Additional props that are injected by MultiversalAppBootstrap to all pages
 */
export type MultiversalAppBootstrapPageProps = {
  // When true, means the app is loading a SSG page, with fallback mode enabled, and this page hasn't been built before
  isSSGFallbackInitialBuild: boolean;
};
