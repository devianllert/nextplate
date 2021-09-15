// XXX Use v1 for uniqueness - See https://www.sohamkamani.com/blog/2016/10/05/uuid1-vs-uuid4/
import { v1 as uuid } from 'uuid';
import { NextWebVitalsMetrics } from './types/NextWebVitalsMetrics';
import { NextWebVitalsMetricsReport } from './types/NextWebVitalsMetricsReport';

/**
 * Global variable meant to keep all metrics together, until there are enough to send them in batch as a single report
 */
const globalWebVitalsMetric: NextWebVitalsMetricsReport = {
  reportId: uuid(),
  metrics: {},
  reportedCount: 0,
};

/**
 * Will be called once for every metric that has to be reported.
 *
 * There are, at minimum, 3 metrics being received (Next.js-hydration, FCP and TTFB)
 * Then, 2 other metrics can be received optionally (FID, LCP)
 *
 * @param metrics
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting Initial release notes
 */
export function reportWebVitals(metrics: NextWebVitalsMetrics): void {
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
    console.debug(metrics);
  }

  const { name } = metrics;
  const count = globalWebVitalsMetric.reportedCount;
  globalWebVitalsMetric.metrics[name] = metrics;
  const keysLength = Object.keys(globalWebVitalsMetric.metrics).length;

  // Temporise analytics API calls by waiting for at least 5 metrics to be received before sending the first report
  // (because 3 metrics will be received upon initial page load, and then 2 more upon first click)
  // Then, send report every 2 metrics (because each client-side redirection will generate 2 metrics)
  if ((count === 0 && keysLength === 5) || (count > 0 && keysLength === 2)) {
    // send report to analytics service
    // sendWebVitals(globalWebVitalsMetric);

    // Reset and prepare next metrics to be reported
    globalWebVitalsMetric.metrics = {};
    globalWebVitalsMetric.reportedCount += 1;
  }
}
