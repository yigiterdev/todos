type ValueOf<T> = T[keyof T];
type ArrayToUnion<T extends readonly any[]> = T[number];

/**
 * Make all properties in T NonNullable
 */
type AllNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
