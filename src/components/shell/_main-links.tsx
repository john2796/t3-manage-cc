import Link from "next/link";
import React from "react";

const links = [
  {
    label: "Landing Page",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Manage Course",
    href: "/dashboard/courses",
  },
];

export function MainLinks() {
  return (
    <>
      {links.map((link) => (
        <Link href={link.href}>{link.label}</Link>
      ))}
    </>
  );
}
