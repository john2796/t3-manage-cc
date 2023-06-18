import Link from "next/link";
import React from "react";

const links = [
  {
    label: "Dashboard",
    href: "/",
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
