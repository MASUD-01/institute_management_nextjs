import { Avatar, Button, Card, Typography } from "antd";
import Link from "next/link";
import React from "react";

interface Props {
  collapsed: boolean;
}

const BottomSection: React.FC<Props> = ({ collapsed }) => {
  const handleLogout = () => {
    // dispatch(clearAuth());
    // localStorage.clear();
    // dispatch(api.util.resetApiState());
    // localStorage.clear();
    // navigate('/auth/login');
  };
  return (
    <div
      style={{
        padding: "5px 5px 0px 5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Card
        size="small"
        bordered={false}
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 33, 71, 1), rgba(46, 84, 139, 0.8))",
          backdropFilter: "blur(15px)",

          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: collapsed ? "column" : "row",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #ffffff",
            }}
          >
            <Avatar src={""} size={collapsed ? 40 : 50} />
          </div>

          {!collapsed && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text
                strong
                style={{
                  color: "#ffffff",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {/* {data?.data?.name} */}
              </Typography.Text>
              <Typography.Text
                style={{
                  color: "#cccccc",
                  fontSize: "12px",
                  lineHeight: "1.2",
                }}
              >
                Admin
              </Typography.Text>
            </div>
          )}
        </div>
      </Card>
      <div style={{ background: "white", padding: "12px 0px" }}>
        {collapsed
          ? undefined
          : [
              <Link href={"/settings"}>
                <Button
                  type="text"
                  //   icon={<Iconify icon='tabler:settings' />}
                  style={{
                    fontWeight: "bold",
                    padding: "22px",
                  }}
                >
                  Profile
                </Button>
              </Link>,
              <Button
                type="text"
                danger
                // icon={<Iconify icon='ant-design:logout-outlined' />}
                style={{
                  color: "#ff4d4f",
                  fontWeight: "bold",
                  padding: "22px",
                }}
                onClick={() => handleLogout()}
              >
                Log out
              </Button>,
            ]}
      </div>
    </div>
  );
};

export default BottomSection;
