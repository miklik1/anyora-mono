"use client"; // Add this to the top of the file

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users
    if (!localStorage.getItem("token")) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
