import { Group, ThemeIcon, UnstyledButton, Text } from "@mantine/core";
import { IconDashboard, IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const links = [
  {
    icon: <IconDashboard size="1rem" />,
    color: "red",
    label: "Dashboard",
    href: "/",
  },
  {
    icon: <IconPencil size="1rem" />,
    color: "blue",
    label: "Manage Course",
    href: "/dashboard/courses",
  },
];

export function MainLinks() {
  return (
    <>
      {links.map((link) => (
        <UnstyledButton
          component={Link}
          href={link.href}
          key={link.href}
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon color={link.color} variant="light">
              {link.icon}
            </ThemeIcon>
            <Text size="sm">{link.label}</Text>
          </Group>
        </UnstyledButton>
      ))}
    </>
  );
}
