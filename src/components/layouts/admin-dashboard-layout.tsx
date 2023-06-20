import { type FC, type ReactNode } from "react";
import { MainLinks } from "../shell/_main-links";
import { User } from "../shell/_user";
import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Navbar,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const AdminDashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="xl"
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section>
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group sx={{ height: "100%" }} px={20} position="apart">
            X
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === "dark" ? (
                <IconSun size="1rem" />
              ) : (
                <IconMoonStars size="1rem" />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default AdminDashboardLayout;
