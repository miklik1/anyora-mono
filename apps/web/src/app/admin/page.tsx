"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Fetch admin data
    fetch("http://localhost:4000/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => setUserCount(data.length))
      .catch((err) => setError(err.message));
  }, [router]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {userCount !== null ? userCount : "Loading..."}</p>

      <nav>
        <ul>
          <li>
            <a href="/admin/blog">Manage Blog</a>
          </li>
          <li>
            <a href="/admin/users">Manage Users</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
