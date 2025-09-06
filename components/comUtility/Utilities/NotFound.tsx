"use client";

import Iconify from "@/config/iconifyConfig";
import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

type ErrorResponse = {
  status?: ResultStatusType;
  statusText?: string;
  data?: string;
};

type NotFoundProps = {
  error?: ErrorResponse;
};

const NotFound: React.FC<NotFoundProps> = ({ error }) => {
  const router = useRouter();

  const errorDetails = useMemo(() => {
    const { data, status, statusText } = error || {};
    return {
      status: status || "404",
      title: statusText || "An error occurred",
      subTitle: data || "Unable to load the requested page",
    };
  }, [error]);

  const handleGoBack = React.useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Result
        status={errorDetails.status}
        title={errorDetails.title}
        subTitle={errorDetails.subTitle}
        extra={
          <Button
            icon={<Iconify icon="pajamas:go-back" />}
            size="small"
            shape="round"
            onClick={handleGoBack}
            type="link"
            danger
          >
            GO BACK
          </Button>
        }
      />
    </div>
  );
};

export default React.memo(NotFound);
