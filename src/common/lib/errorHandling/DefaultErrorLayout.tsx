import * as React from 'react';
import { GenericObject } from '../data/types/GenericObject';
import ErrorDebug from './ErrorDebug';

export interface DefaultErrorLayoutProps {
  error: Error;
  context?: GenericObject;
}

/**
 * Default error layout, used by DefaultLayout to display errors instead of the page's content, when an error is caught
 *
 * Displays a report dialog modal allowing end-users to provide a manual feedback about what happened.
 * You may want to customise this component to display different error messages to the end users, based on statusCode or other information.
 *
 * @param props
 */
const DefaultErrorLayout = (props: DefaultErrorLayoutProps): JSX.Element => {
  const { error, context } = props;

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <div
        style={{
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <h1>Service currently unavailable</h1>
        <pre>Error 500.</pre>
      </div>

      <div>
        <p>Try to refresh the page. Please contact our support below if the issue persists.</p>
        <button type="button">Contact support</button>
      </div>

      {process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && <ErrorDebug error={error} context={context} />}
    </div>
  );
};

export default DefaultErrorLayout;
