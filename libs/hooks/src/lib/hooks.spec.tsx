import { renderHook } from '@testing-library/react';
import { useDebounce } from './hooks';

describe('Hooks', () => {
  describe('useDebounce', () => {
    it('should return the initial value', () => {
      const { result } = renderHook(() => useDebounce('test', 500));
      expect(result.current).toBe('test');
    });
  });
});
