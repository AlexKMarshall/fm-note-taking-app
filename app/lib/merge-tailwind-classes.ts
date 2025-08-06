/**
 * Merges multiple tailwind class strings into a single string.
 * Later classes do not override earlier ones, so be very careful with overrides
 */
export function mergeTailwindClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}
