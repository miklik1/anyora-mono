import { Router } from "express";
import { prisma } from "@repo/db";
import { UserSchema } from "@repo/validations/user";
import { validate } from "../middleware/validationMiddleware.js";
import { CreateUserSchema } from "@repo/validations/createUser";

const router = Router();

// GET: List users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST: Create user
router.post("/", validate(CreateUserSchema), async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
      data: { name, email },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
