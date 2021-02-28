import size from 'lodash.size';

/**
 * Delete all existing cookies in the browser
 *
 * @see https://stackoverflow.com/a/179514/2391795
 */
// eslint-disable-next-line import/prefer-default-export
export const deleteAllCookies = (): void => {
  const cookies = document.cookie.split(';');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  for (let i = 0; i < size(cookies); i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
