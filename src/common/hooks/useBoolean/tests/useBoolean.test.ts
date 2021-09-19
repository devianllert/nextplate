/**
 * @jest-environment jsdom
*/

import { act, renderHook } from '@testing-library/react-hooks';

import { useBoolean } from '..';

const setUp = (initialValue: boolean) => renderHook(() => useBoolean(initialValue));

describe('useBoolean', (): void => {
  it('should init state to true', (): void => {
    const { result } = setUp(true);

    expect(result.current[0]).toBe(true);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should init state to false', (): void => {
    const { result } = setUp(false);

    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should set state to true', (): void => {
    const { result } = setUp(false);
    const [, toggle] = result.current;

    expect(result.current[0]).toBe(false);

    act((): void => {
      toggle(true);
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set state to false', (): void => {
    const { result } = setUp(true);
    const [, toggle] = result.current;

    expect(result.current[0]).toBe(true);

    act((): void => {
      toggle(false);
    });

    expect(result.current[0]).toBe(false);
  });

  it('should toggle state from true', (): void => {
    const { result } = setUp(true);
    const [, toggle] = result.current;

    act((): void => {
      toggle();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should toggle state from false', (): void => {
    const { result } = setUp(false);
    const [, toggle] = result.current;

    act((): void => {
      toggle();
    });

    expect(result.current[0]).toBe(true);
  });
});
