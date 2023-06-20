import { type FC, type ReactNode } from "react";
import { MainLinks } from "../shell/_main-links";
import { User } from "../shell/_user";

const AdminDashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <MainLinks />
      <User />

      {children}
    </div>
  );
};

export default AdminDashboardLayout;
