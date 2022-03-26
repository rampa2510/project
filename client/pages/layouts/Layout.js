import { memo, useState } from "react";
import { useRouter } from "next/router";
import DashboadShell from "../components/DashboadShell";

export default memo(function Layout({ children }) {
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const pageWithoutSideBar = ["/"];

  if (pageWithoutSideBar.includes(router.pathname)) return <>{children}</>;

  return (
    <>
      <DashboadShell
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        drawerWidth={240}
      >
        {children}
      </DashboadShell>
    </>
  );
});
