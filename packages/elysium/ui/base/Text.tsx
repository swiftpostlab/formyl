// Renamed alias from MUI

import type {
  TypographyProps,
  TypographyClassKey,
  TypographyClasses,
  TypographyOwnProps,
  TypographyPropsColorOverrides,
  TypographyPropsVariantOverrides,
  TypographyTypeMap,
} from '@mui/material/Typography';
import { typographyClasses } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

export type TextProps = TypographyProps;
export type TextClassKey = TypographyClassKey;
export type TextClasses = TypographyClasses;
export type TextOwnProps = TypographyOwnProps;
export type TextPropsColorOverrides = TypographyPropsColorOverrides;
export type TextPropsVariantOverrides = TypographyPropsVariantOverrides;
export type TextTypeMap = TypographyTypeMap;
export const textClasses = typographyClasses;

const Text = Typography;
export default Text;
