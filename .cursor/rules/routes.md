# Routing Rules

- Use one route file per domain model (e.g., user.ts, weight.ts)
- Don't mix controller logic into route files
- Use RESTful patterns:
  - GET `/api/weight` → fetch weights
  - POST `/api/weight` → add new
  - PUT `/api/weight/:id` → update
  - DELETE `/api/weight/:id` → delete

**Avoid:**

- Avoid RPC-style routes like `/api/doSomething`
- Avoid nesting deeply: max depth = `/api/module/:id/action`
