"use client";

import { useState } from "react";
import { SignupSchema } from "@repo/validations/user";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate user input using CreateUserSchema
    const validationResult = SignupSchema.safeParse({ name, email });
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      setErrorMessages(errors);
      return;
    }

    // Reset errors
    setErrorMessages([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      // Clear inputs
      setName("");
      setEmail("");

      // Refresh the page to fetch updated users
      window.location.reload();
    } catch (err) {
      setErrorMessages([(err as Error).message]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a User</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Create</button>

      {errorMessages.length > 0 && (
        <ul style={{ color: "red" }}>
          {errorMessages.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
