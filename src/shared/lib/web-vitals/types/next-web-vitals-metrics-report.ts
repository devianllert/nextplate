import { NextWebVitalsMetric } from 'next/app';

/**
 * Group all vital metrics together, using their own "name" property as key.
 *
 * Meant to help regroup multiple reports together to send them all at once, to reduce API calls.
 *
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 */
export type NextWebVitalsMetricsReport = {
  // Number of times a report has been sent, kinda help to trace how long a same client-side session was
  reportedCount: number;
  // ID of the "report", helps grouping reports with different data but same reportId together when analysing data
  reportId: string;
  metrics: {
    // First contentful paint, triggers on page load
    FCP?: NextWebVitalsMetric;
    // First input delay, trigger on first end-user interaction (click)
    FID?: NextWebVitalsMetric;
    // Largest contentful paint, triggers on first end-user interaction (sometimes doesn't trigger)
    LCP?: NextWebVitalsMetric;
    // Triggers on page load
    'Next.js-hydration'?: NextWebVitalsMetric;
    // Triggers on client-side redirection (<Link>)
    'Next.js-render'?: NextWebVitalsMetric;
    // Triggers on client-side redirection (<Link>)
    'Next.js-route-change-to-render'?: NextWebVitalsMetric;
    // Time to first byte, triggers on page load
    TTFB?: NextWebVitalsMetric;
  };
};
