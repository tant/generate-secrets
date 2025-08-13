// src/utils/__tests__/secretGenerator.test.ts
import {
  generateAllSecrets,
  generateAnonKey,
  generateJwtSecretBase64,
  generateJwtSecretHex,
  generatePassword,
  generatePostgresDbName,
  generatePostgresPassword,
  generatePostgresUsername,
  generateSecretKeyBase,
  generateServiceRoleKey,
  generateUsername,
} from "../secretGenerator";

// Mock the crypto API for testing
const mockRandomValues = (array: Uint8Array) => {
  // Fill with predictable values for testing
  for (let i = 0; i < array.length; i++) {
    array[i] = i % 256;
  }
  return array;
};

beforeEach(() => {
  // Mock crypto.getRandomValues
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: mockRandomValues,
    },
  });
});

describe("Secret Generator Functions", () => {
  test("generateUsername should create a readable string between 8-12 characters", () => {
    const username = generateUsername();
    expect(username.length).toBeGreaterThanOrEqual(8);
    expect(username.length).toBeLessThanOrEqual(12);
    // Should only contain alphanumeric characters
    expect(username).toMatch(/^[a-zA-Z0-9]+$/);
  });

  test("generatePassword should create a 16-character string with required character types", () => {
    const password = generatePassword();
    expect(password.length).toBe(16);

    // Should contain at least one uppercase letter
    expect(password).toMatch(/[A-Z]/);
    // Should contain at least one lowercase letter
    expect(password).toMatch(/[a-z]/);
    // Should contain at least one number
    expect(password).toMatch(/[0-9]/);
    // Should contain at least one special character
    expect(password).toMatch(/[!@#$%^&*]/);
    // Should only contain allowed characters
    expect(password).toMatch(/^[a-zA-Z0-9!@#$%^&*]+$/);
  });

  test("generatePostgresUsername should create user_ prefix with 12 alphanumeric characters", () => {
    const username = generatePostgresUsername();
    expect(username.length).toBe(17); // 'user_' (5) + 12 chars
    expect(username.startsWith("user_")).toBe(true);
    // Should only contain alphanumeric characters after prefix
    expect(username.substring(5)).toMatch(/^[a-zA-Z0-9]+$/);
  });

  test("generatePostgresPassword should create 16 alphanumeric characters", () => {
    const password = generatePostgresPassword();
    expect(password.length).toBe(16);
    // Should only contain alphanumeric characters
    expect(password).toMatch(/^[a-zA-Z0-9]+$/);
  });

  test("generatePostgresDbName should create db_ prefix with 12 lowercase alphanumeric characters", () => {
    const dbName = generatePostgresDbName();
    expect(dbName.length).toBe(15); // 'db_' (3) + 12 chars
    expect(dbName.startsWith("db_")).toBe(true);
    // Should only contain lowercase alphanumeric characters after prefix
    expect(dbName.substring(3)).toMatch(/^[a-z0-9]+$/);
  });

  test("generateJwtSecretHex should create 32-character hex string", () => {
    const secret = generateJwtSecretHex();
    expect(secret.length).toBe(32);
    // Should only contain hex characters
    expect(secret).toMatch(/^[0-9a-f]+$/);
  });

  test("generateJwtSecretBase64 should create 32-character base64 string", () => {
    const secret = generateJwtSecretBase64();
    // Base64 encoding of 32 bytes should be 44 characters (32 * 4/3, rounded up to multiple of 4)
    expect(secret.length).toBe(44);
    // Should be valid base64
    expect(() => atob(secret)).not.toThrow();
  });

  test("generateAnonKey should create a long base64 string", () => {
    const key = generateAnonKey();
    // Should be a long base64 string
    expect(key.length).toBeGreaterThan(32);
    // Should be valid base64
    expect(() => atob(key)).not.toThrow();
  });

  test("generateSecretKeyBase should create 128-character hex string", () => {
    const key = generateSecretKeyBase();
    expect(key.length).toBe(128);
    // Should only contain hex characters
    expect(key).toMatch(/^[0-9a-f]+$/);
  });

  test("generateServiceRoleKey should create a long base64 string", () => {
    const key = generateServiceRoleKey();
    // Should be a long base64 string
    expect(key.length).toBeGreaterThan(32);
    // Should be valid base64
    expect(() => atob(key)).not.toThrow();
  });

  test("generateAllSecrets should return all required secrets", () => {
    const secrets = generateAllSecrets();

    // Should have all required keys
    expect(Object.keys(secrets)).toEqual([
      "username",
      "password",
      "postgres username",
      "postgres password",
      "postgres db name",
      "jwtsecret 32 hex",
      "jwtsecret 32 base64",
      "ANON_KEY",
      "SECRET_KEY_BASE",
      "SERVICE_ROLE_KEY",
    ]);

    // All values should be non-empty strings
    Object.values(secrets).forEach((value) => {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
  });

  test("should use crypto.getRandomValues for randomness", () => {
    // Spy on crypto.getRandomValues
    const spy = vi.spyOn(globalThis.crypto, 'getRandomValues');
    
    // Generate a secret
    generateUsername();
    
    // Check that crypto.getRandomValues was called
    expect(spy).toHaveBeenCalled();
    
    spy.mockRestore();
  });
});
