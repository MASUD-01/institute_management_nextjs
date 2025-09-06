"use client";

import useBreakpoint from "@/components/hooks/useBreakpoint";
import Iconify from "@/config/iconifyConfig";
import { Card, Tabs, TabsProps, Typography } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Profile from "./_component/Profile";
import ChangePassword from "@/components/login/ChangePassword";
import Themes from "./_component/Themes";

const Settings: React.FC = () => {
  const { xl } = useBreakpoint();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab: string | null = searchParams.get("tab");

  const onChange: TabsProps["onChange"] = (key) => {
    // preserve current path, replace query param
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", key);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Card
      bordered={false}
      title={<Typography.Text>Account Settings</Typography.Text>}
    >
      <Tabs
        type="line"
        activeKey={activeTab || "profile-settings"}
        onChange={onChange}
        tabPosition={xl ? "left" : "top"}
        items={[
          {
            key: "profile-settings",
            label: "Profile Settings",
            icon: <Iconify icon="ion:person-circle-outline" />,
            children: <Profile />,
          },
          {
            key: "change-password",
            label: "Change Password",
            icon: <Iconify icon="ion:key-outline" />,
            children: <ChangePassword />,
          },
          {
            key: "themes",
            label: "Themes",
            icon: <Iconify icon="ion:color-palette-outline" />,
            children: <Themes />,
          },
        ]}
      />
    </Card>
  );
};

export default Settings;
