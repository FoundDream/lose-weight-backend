# Controller Rules

- Controllers must not access `req` or `res` deeply outside parameters
- Always define controller function as: `(req: Request, res: Response) => Promise<void>`
- Handle try/catch and error properly in each function
- Do not import `express` in controller files other than types

**Example (userController.ts):**

```ts
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // logic here
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
```
