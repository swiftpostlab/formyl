const spacing = (factor: number) => `${0.5 * factor}rem`;

const breakpoints = {
  values: {
    xs: 340,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;

export const staticThemeOptions = {
  spacing,
  breakpoints,
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
} as const;
