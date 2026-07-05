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
  obj: Record<string, unknown> | null | undefined,
  path: string,
  defaultValue?: T
): T | undefined => {
  if (!obj) return defaultValue;
  
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
 * Fixed version with proper type narrowing
 */
export const getPropertySafe = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  fallback: T[K]
): T[K] => {
  // Check if obj exists and has the key
  if (obj && typeof obj === 'object' && key in obj) {
    return obj[key] as T[K];
  }
  return fallback;
};

/**
 * Alternative: Get property with a more flexible approach
 */
export const getPropertySafeAlt = <T, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  fallback: T[K]
): T[K] => {
  if (obj === null || obj === undefined) {
    return fallback;
  }
  
  // Use Object.prototype.hasOwnProperty for safe checking
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
  
  return fallback;
};

/**
 * Safe accessor for any object property with string key
 */
export const getSafe = <T>(
  obj: Record<string, unknown> | null | undefined,
  key: string,
  fallback: T
): T => {
  if (!obj || !(key in obj)) {
    return fallback;
  }
  return (obj[key] as T) || fallback;
};

/**
 * Type-safe pick function - returns a subset of an object
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Type-safe omit function - returns an object without specified keys
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};

/**
 * Check if a value is not null or undefined (type guard)
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Check if a value is a non-empty string
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && value.trim().length > 0;
};

/**
 * Check if a value is a valid email
 */
export const isValidEmail = (email: unknown): boolean => {
  if (!isString(email)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a value is a valid URL
 */
export const isValidUrl = (url: unknown): boolean => {
  if (!isString(url)) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Type-safe object merger with deep merging
 */
export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      if (
        sourceValue && 
        typeof sourceValue === 'object' && 
        !Array.isArray(sourceValue) &&
        targetValue && 
        typeof targetValue === 'object' && 
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }
  
  return result;
};

/**
 * Create a type-safe array of unique values
 */
export const uniqueArray = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

/**
 * Type-safe array grouping
 */
export const groupBy = <T, K extends string | number | symbol>(
  arr: T[],
  key: keyof T
): Record<K, T[]> => {
  return arr.reduce((acc: Record<K, T[]>, item: T) => {
    const groupKey = item[key] as K;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

/**
 * Type-safe string formatting with placeholders
 * Example: formatString('Hello {name}', { name: 'John' }) => 'Hello John'
 */
export const formatString = (
  template: string,
  values: Record<string, string | number>
): string => {
  return template.replace(/{([^{}]+)}/g, (_, key: string) => {
    return String(values[key] || '');
  });
};

/**
 * Type-safe promise with error handling
 */
export const safePromise = async <T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
};

/**
 * Type-safe delay function
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Type-safe debounce function
 */
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Type-safe throttle function
 */
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};