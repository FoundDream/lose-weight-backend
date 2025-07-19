# General Backend Rules

- Use TypeScript in all backend files (`.ts`)
- Use `async/await` consistently for async code
- Always include proper types for function parameters and return values
- Use `dotenv` for all config like `DATABASE_URL`, `JWT_SECRET`
- Use `src/` as the root source folder

**Folder layout:**

src/
├── routes/
├── controllers/
├── middlewares/
├── models/
├── utils/
└── config/

**Good pattern:**

- Database access only in `controllers/` or `services/`
- Business logic must not leak into `routes/`
