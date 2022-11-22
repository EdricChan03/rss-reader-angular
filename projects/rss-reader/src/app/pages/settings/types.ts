/** The list of available themes. */
export const themes = [
  'indigo-pink',
  'deeppurple-amber',
  'pink-bluegrey',
  'purple-green'
] as const;

/** The list of available themes as a type. */
export type Theme = typeof themes[number];
