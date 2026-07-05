/**
 * Type guard to check if a value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Type guard to check if a value is a number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Type guard to check if a value is an object
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Type guard to check if a value is an array
 */
export const isArray = <T = unknown>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

/**
 * Safely access nested object properties with type safety
 */
export const getNestedValue = <T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined => {
  const keys: string[] = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return defaultValue;
    }
  }
  
  return result as T;
};

/**
 * Ensure a value is an array or return empty array
 */
export const ensureArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};

/**
 * Type-safe object property access
 */
export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

/**
 * Type-safe object property access with fallback
 */
export const getPropertySafe = <T, K extends keyof T>(
  obj: T | undefined | null,
  key: K,
  fallback: T[K]
): T[K] => {
  return obj && key in obj ? obj[key] : fallback;
};