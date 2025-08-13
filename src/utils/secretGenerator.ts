// src/utils/secretGenerator.ts

// Character sets for generating secrets
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SPECIAL_CHARS = "!@#$%^&*";
const ALPHANUMERIC = LOWERCASE + UPPERCASE + NUMBERS;
const HEX_CHARS = "0123456789abcdef";
const ALPHANUMERIC_LOWER = LOWERCASE + NUMBERS;
const ALPHANUMERIC_ONLY = LOWERCASE + UPPERCASE + NUMBERS;

/**
 * Generates a random string of specified length using given character set
 * @param length - Length of the string to generate
 * @param charset - Character set to use for generation
 * @returns Random string
 */
function generateRandomString(length: number, charset: string): string {
  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Generates a random readable username (8-12 characters, no special chars)
 * @returns Random username
 */
export function generateUsername(): string {
  const length = Math.floor(Math.random() * 5) + 8; // 8-12 characters
  return generateRandomString(length, ALPHANUMERIC_ONLY);
}

/**
 * Generates a strong password (min 16 chars, upper/lower/numbers/special)
 * @returns Strong password
 */
export function generatePassword(): string {
  const length = 16;
  const allChars = ALPHANUMERIC + SPECIAL_CHARS;

  // Ensure at least one character from each required set
  let password = "";
  password += generateRandomString(1, UPPERCASE);
  password += generateRandomString(1, LOWERCASE);
  password += generateRandomString(1, NUMBERS);
  password += generateRandomString(1, SPECIAL_CHARS);

  // Fill the rest randomly
  password += generateRandomString(length - 4, allChars);

  // Shuffle the password to avoid predictable patterns
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

/**
 * Generates a PostgreSQL username (user_ + 12 random alphanumeric)
 * @returns PostgreSQL username
 */
export function generatePostgresUsername(): string {
  return `user_${generateRandomString(12, ALPHANUMERIC_ONLY)}`;
}

/**
 * Generates a PostgreSQL password (min 16 alphanumeric chars)
 * @returns PostgreSQL password
 */
export function generatePostgresPassword(): string {
  return generateRandomString(16, ALPHANUMERIC_ONLY);
}

/**
 * Generates a PostgreSQL database name (db_ + 12 random lowercase alphanumeric)
 * @returns PostgreSQL database name
 */
export function generatePostgresDbName(): string {
  return `db_${generateRandomString(12, ALPHANUMERIC_LOWER)}`;
}

/**
 * Generates a 32-character hex string
 * @returns 32-character hex string
 */
export function generateJwtSecretHex(): string {
  return generateRandomString(32, HEX_CHARS);
}

/**
 * Generates a 32-character URL-safe base64 string
 * @returns 32-character base64 string
 */
export function generateJwtSecretBase64(): string {
  // Generate 32 random bytes and encode as base64
  const array = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  return btoa(String.fromCharCode(...array));
}

/**
 * Generates a long base64 string (similar to JWT)
 * @returns Base64 encoded string
 */
export function generateAnonKey(): string {
  // Generate a longer base64 string similar to a JWT
  const array = new Uint8Array(48); // 48 bytes = 64 base64 chars
  for (let i = 0; i < 48; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  return btoa(String.fromCharCode(...array));
}

/**
 * Generates a 128-character hex string
 * @returns 128-character hex string
 */
export function generateSecretKeyBase(): string {
  return generateRandomString(128, HEX_CHARS);
}

/**
 * Generates a long base64 string (similar to JWT)
 * @returns Base64 encoded string
 */
export function generateServiceRoleKey(): string {
  // Generate a longer base64 string similar to a JWT
  const array = new Uint8Array(48); // 48 bytes = 64 base64 chars
  for (let i = 0; i < 48; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  return btoa(String.fromCharCode(...array));
}

/**
 * Generates all secrets according to specifications
 * @returns Object containing all generated secrets
 */
export function generateAllSecrets(): Record<string, string> {
  return {
    username: generateUsername(),
    password: generatePassword(),
    "postgres username": generatePostgresUsername(),
    "postgres password": generatePostgresPassword(),
    "postgres db name": generatePostgresDbName(),
    "jwtsecret 32 hex": generateJwtSecretHex(),
    "jwtsecret 32 base64": generateJwtSecretBase64(),
    ANON_KEY: generateAnonKey(),
    SECRET_KEY_BASE: generateSecretKeyBase(),
    SERVICE_ROLE_KEY: generateServiceRoleKey(),
  };
}
