# Appendix A: Secret Specification Table

| Label | Specification |
| --- | --- |
| `username` | Random, readable string, 8-12 characters, no special characters. |
| `password` | Minimum 16 characters, includes uppercase, lowercase, numbers, and special characters (`!@#$%^&*`). |
| `postgres username` | `user_` followed by 12 random alphanumeric characters. |
| `postgres password`| Minimum 16 characters, includes only alphanumeric characters. |
| `postgres db name` | `db_` followed by 12 random lowercase alphanumeric characters. |
| `jwtsecret 32 hex` | A 32-character random hex string (0-9, a-f). |
| `jwtsecret 32 base64`| A 32-character random, URL-safe base64 string. |
| `ANON_KEY` | A long, base64 string, similar in format to a JWT. |
| `SECRET_KEY_BASE` | A 128-character random hex string. |
| `SERVICE_ROLE_KEY`| A long, base64 string, similar in format to a JWT. |