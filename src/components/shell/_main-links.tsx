import Link from "next/link";
import React from "react";

const links = [
  {
    icon: 
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
        <Link key={link.label} href={link.href}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
