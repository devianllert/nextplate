/**
 * Web vitals provided to _app.reportWebVitals by Core Web Vitals plugin developed by Google Chrome team.
 *
 * It's the core runtime of what Google LightHouse is build atop.
 *
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 */
export type NextWebVitalsMetrics = {
  /**
   * Unique identifier for the metric in the context of the current page load
   */
  id: string;
  /**
   * Type of metric (web-vital or custom)
   */
  label: string;
  /**
   * Metric name
   */
  name: string;
  /**
   * First recorded timestamp of the performance entry in milliseconds (if applicable)
   */
  startTime: number;
  /**
   * Value, or duration in milliseconds, of the performance entry
   */
  value: number;
};
