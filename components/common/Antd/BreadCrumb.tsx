"use client";

import React from "react";
import { Breadcrumb, Card, Space, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Iconify from "@/config/iconifyConfig";

const { Text } = Typography;

const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const BreadCrumb: React.FC = () => {
  const pathname = usePathname() || "/";
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    {
      title: (
        <Link href="/">
          <Space>
            <Iconify icon="ant-design:home-outlined" />
            <span>Dashboard</span>
          </Space>
        </Link>
      ),
    },
    ...pathSegments.map((segment, index) => {
      const isLastSegment = index === pathSegments.length - 1;
      const href = "/" + pathSegments.slice(0, index + 1).join("/");

      return {
        title: isLastSegment ? (
          <Text strong>{capitalize(segment)}</Text>
        ) : (
          <Link href={href}>{capitalize(segment)}</Link>
        ),
      };
    }),
  ];

  return (
    <Card size="small">
      <Breadcrumb separator="❯" items={breadcrumbItems} />
    </Card>
  );
};

export default BreadCrumb;
