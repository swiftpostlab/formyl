import type { SxProps, Theme, SxArray } from '../../ui/types';

export const isSxArray = <TTheme extends Theme = Theme>(
  sx: SxProps<TTheme> | undefined,
): sx is SxArray<TTheme> => {
  return Array.isArray(sx);
};

/**
 * You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
 * https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
 */
export const spreadSx = <TTheme extends Theme = Theme>(
  sx: SxProps<TTheme> | undefined,
): SxArray<TTheme> => {
  if (sx == null) {
    return [];
  }

  if (isSxArray(sx)) {
    return sx;
  }

  return [sx] as SxArray<TTheme>;
};
