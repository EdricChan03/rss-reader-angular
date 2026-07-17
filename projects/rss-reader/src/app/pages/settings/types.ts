export enum ThemeEnum {
  RoseRed = 'rose-red',
  AzureBlue = 'azure-blue',
  MagentaViolet = 'magenta-violet',
  CyanOrange = 'cyan-orange'
};

/** The list of available themes. */
export const themes = [
  ThemeEnum.RoseRed,
  ThemeEnum.AzureBlue,
  ThemeEnum.MagentaViolet,
  ThemeEnum.CyanOrange
];

/** The list of available themes as a type. */
export type Theme = typeof themes[number];

/** The default theme the app will use if no user-specified theme is set. */
export const defaultTheme = ThemeEnum.RoseRed;
