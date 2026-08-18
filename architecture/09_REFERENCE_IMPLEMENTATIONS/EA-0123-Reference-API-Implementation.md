---
id: EA-0123
title: Reference API Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference API Implementation

## Purpose
Defines the normative standard for implementing RESTful/gRPC APIs across Campus OS. It guarantees consistent behavior regarding pagination, error handling, versioning, and payload structures.

## API Standards

### 1. Versioning
All APIs MUST be versioned in the URI path (e.g., `/api/v1/users`).

### 2. Standardized Responses
All successful responses MUST follow a consistent envelope (optional, but recommended for collections).

```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 120
  }
}
```

### 3. Error Handling (RFC 7807 Problem Details)
All error responses MUST conform to RFC 7807 to ensure consistent error parsing by clients and the API Gateway.

```json
{
  "type": "https://campus-os.io/probs/validation-error",
  "title": "Invalid Request Parameters",
  "status": 400,
  "detail": "The provided email address is already in use within this tenant.",
  "instance": "/api/v1/users",
  "extensions": {
    "traceId": "abc-123-xyz",
    "fieldErrors": [
      {"field": "email", "message": "Duplicate email"}
    ]
  }
}
```

### 4. Idempotency
All `POST`, `PUT`, and `PATCH` requests SHOULD support idempotency keys via the `Idempotency-Key` HTTP header.
