# Prisma Rules

- Always import PrismaClient from `@prisma/client`
- Create and export a shared instance from `src/config/prisma.ts`
- Do not create multiple PrismaClient instances

**Example (config/prisma.ts):**

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
```

Models must be defined in prisma/schema.prisma

Migrations are managed via CLI: npx prisma migrate dev --name xyz

Use .env for DATABASE_URL and never hardcode paths

```ts
const user = await prisma.user.findUnique({ where: { id } });
```
