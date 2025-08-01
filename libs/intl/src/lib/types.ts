// Helper type for nested key paths
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// Translation key type
export type TranslationKey = string;

// Translation function type
export type TranslationFunction = (
  key: TranslationKey,
  fallback?: string
) => string | string[] | any;
