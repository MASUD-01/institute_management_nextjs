"use client";

import { Button, Typography } from "antd";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import "./CommNodataFound.css";

const { Text, Title } = Typography;

const CommNodataFound = () => {
  const router = useRouter();

  return (
    <div className="comm-nodata-card">
      <div className="comm-nodata-content">
        {/* Animated Icon */}
        <Icon icon="mdi:database-off-outline" className="comm-nodata-icon" />

        {/* Title */}
        <Title level={3} className="comm-nodata-title">
          No Data Found
        </Title>

        {/* Description */}
        <Text className="comm-nodata-text">
          We couldn’t find any records to display here. Try adjusting your
          filters or come back later.
        </Text>

        {/* Back Button */}
        <Button
          type="primary"
          icon={<Icon icon="mdi:arrow-left" />}
          className="comm-nodata-button"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default CommNodataFound;
