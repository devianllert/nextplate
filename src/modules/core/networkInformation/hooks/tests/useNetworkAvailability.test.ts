/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNetworkAvailability } from '../useNetworkAvailability';

describe('useNetworkAvailability', () => {
  it('should change network availability', () => {
    const { result } = renderHook(() => useNetworkAvailability());
    expect(result.current).toBe(true);

    act(() => {
      fireEvent(window, new Event('offline'));
    });

    expect(result.current).toBe(false);
  });
})
