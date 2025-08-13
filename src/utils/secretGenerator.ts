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
 * Generates cryptographically secure random bytes
 * @param length - Number of bytes to generate
 * @returns Uint8Array of random bytes
 */
function generateRandomBytes(length: number): Uint8Array {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return array;
}

/**
 * Generates a random string of specified length using given character set
 * Uses cryptographically secure random number generation
 * @param length - Length of the string to generate
 * @param charset - Character set to use for generation
 * @returns Random string
 */
function generateRandomString(length: number, charset: string): string {
  let result = "";
  const charsetLength = charset.length;
  
  // Use cryptographically secure random bytes
  const randomBytes = generateRandomBytes(length);

  for (let i = 0; i < length; i++) {
    // Use modulo to map byte values to charset indices
    const randomIndex = randomBytes[i] % charsetLength;
    result += charset[randomIndex];
  }

  return result;
}

/**
 * Generates a random readable username (8-12 characters, no special chars)
 * @returns Random username
 */
export function generateUsername(): string {
  // Use cryptographically secure random for length selection
  const randomByte = generateRandomBytes(1)[0];
  const length = (randomByte % 5) + 8; // 8-12 characters
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

  // Shuffle the password using cryptographically secure random
  const passwordArray = password.split("");
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const randomByte = generateRandomBytes(1)[0];
    const j = randomByte % (i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }
  
  return passwordArray.join("");
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
  const array = generateRandomBytes(32);
  return btoa(String.fromCharCode(...array));
}

/**
 * Generates a long base64 string (similar to JWT)
 * @returns Base64 encoded string
 */
export function generateAnonKey(): string {
  // Generate a longer base64 string similar to a JWT
  const array = generateRandomBytes(48); // 48 bytes = 64 base64 chars
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
  const array = generateRandomBytes(48); // 48 bytes = 64 base64 chars
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
