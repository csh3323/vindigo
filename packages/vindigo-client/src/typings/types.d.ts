/**
 * An instance that may be present or missing
 */
export type Optional<T> = T | undefined | null;

/**
 * Translation keys are looked up within the language registry
 */
export type TranslationKey = string;