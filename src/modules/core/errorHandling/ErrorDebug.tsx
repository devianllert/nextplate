import { GenericObject } from '../data/types/GenericObject';

export interface ErrorDebugProps {
  error?: Error;
  context?: GenericObject;
}

/**
 * Displays a given error on screen
 *
 * Used by DefaultErrorLayout to display error debug info.
 *
 * @param props
 */
const ErrorDebug = (props: ErrorDebugProps): JSX.Element => {
  const { error, context }: ErrorDebugProps = props || {};
  const { message, stack } = error || {};

  let stringifiedContext: string | null;
  try {
    stringifiedContext = JSON.stringify(context, null, 2);
  } catch (e) {
    stringifiedContext = null;
  }

  return (
    <div
      style={{
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <hr />

      <i>
        The below &quot;debug info&quot; are only displayed on non-production stages.
        <br />
        Note that debug information about the error are also available on the server/browser console.
      </i>

      <hr />

      <pre
        style={{
          fontFamily: 'monospace',
          color: '#666',
          background: '#f4f4f4',
          pageBreakInside: 'avoid',
          fontSize: '15px',
          lineHeight: 1.6,
          overflow: 'auto',
          padding: '1em 1.5em',
          display: 'block',
          wordWrap: 'break-word',
        }}
      >
        <b>Error message</b>:
        <br />
        <code>{message}</code>
        <hr />
        {context && (
          <>
            <b>Error additional context</b>:<br />
            <code>{stringifiedContext}</code>
            <hr />
          </>
        )}
        <b>Stack trace</b>:<br />
        <code>{stack}</code>
      </pre>
    </div>
  );
};

export default ErrorDebug;
