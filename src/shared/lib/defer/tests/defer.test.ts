import { createDefer } from '../defer';

describe('defer', () => {
  it('returns promise that is resolved by command', async () => {
    const def = createDefer<number>();

    setTimeout(() => def.resolve(7), 1);
    await expect(def.promise).resolves.toEqual(7);
  });

  it('returns promise that is rejected by command', async () => {
    const def = createDefer<number>();

    setTimeout(() => def.reject(7), 1);
    await expect(def.promise).rejects.toEqual(7);
  });

  it('does not leave unhandled rejection, if not awaited', async () => {
    const rejected = jest.fn();
    process.on('unhandledRejection', rejected);

    const def = createDefer();
    def.reject();

    await new Promise((r) => {
      setTimeout(r);
    });

    expect(rejected).toBeCalledTimes(0);
  });
})