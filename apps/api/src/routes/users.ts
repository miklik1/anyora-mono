import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "@repo/db";
import { SignupSchema } from "@repo/validations/user";
import { validate } from "../middleware/validationMiddleware.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// GET: List users
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST: Create user
router.post("/", validate(SignupSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
