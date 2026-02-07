import type { SxProps, Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

export { SxProps, SystemStyleObject, Theme };
export type SxArray<TTheme extends Theme = Theme> = ReadonlyArray<
  SystemStyleObject<TTheme> | ((theme: TTheme) => SystemStyleObject<TTheme>)
>;

export type InferSlotsFromSlotProps<TSlotProps extends object> = {
  [key in keyof TSlotProps]: React.FC<Exclude<TSlotProps[key], undefined>>;
};
