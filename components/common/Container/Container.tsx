"use client";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import {
  ModalTypes,
  showModal,
} from "@/components/reduxConfig/slice/modalSlice";
import {
  DrawerTypes,
  showDrawer,
} from "@/components/reduxConfig/slice/drawerSlice";
import { useAppDispatch, useAppSelector } from "@/components/reduxConfig/store";
import { ThemeState } from "@/components/reduxConfig/slice/themeSlice";
import useBreakpoint from "@/components/hooks/useBreakpoint";
import BreadCrumb from "../Antd/BreadCrumb";
import { hexToRgba, rangePresets } from "../helper/helper";
import Iconify from "@/config/iconifyConfig";

const { Text } = Typography;
const { RangePicker } = DatePicker;

interface Props {
  showBackbtn?: boolean;
  showTitleWithIcon?: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
  buttonLabel?: string;
  openModal?: ModalTypes;
  openDrawer?: DrawerTypes;
  buttonLink?: string;
  options?: {
    showButton?: boolean;
    showSearch?: boolean;
    placeholder?: string;
    showDateRange?: boolean;
    searchKeyName?: string;
    showStatus?: boolean;
    showStatus1?: boolean;
    showSearchFilter?: boolean;
  };
  additionalContent?: React.ReactNode[];
  additionalButton?: React.ReactNode;
  filterData?: {
    [key: string]: string | number | boolean;
  };

  handleSearchFun?: (value: string) => void;
  statusOption?: {
    placeholder?: string;
    options?: { value: string; label: string }[];
    queryName?: string;
    defaultValue?: string;
  };
  statusOption1?: {
    defaultValue?: string;
    placeholder?: string;
    queryName?: string;
    options?: { value: string; label: string }[];
  };
  form?: FormInstance<any>;
}

const Container: React.FC<Props> = ({
  title,
  content,
  openModal,
  openDrawer,
  buttonLabel = "Create",
  options = {},
  buttonLink,
  handleSearchFun,
  statusOption,
  statusOption1,
  showBackbtn,
  showTitleWithIcon,
}) => {
  const { colorPrimary, mode } = useAppSelector(ThemeState);
  const isLight: boolean = mode === "light";
  const { lg } = useBreakpoint();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // create a copy of current params
  const setSearchParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        params.set(key, newParams[key]!?.trim());
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeOptions = {
    showButton: options.showButton,
    showSearch: options.showSearch,
    searchKeyName: options.searchKeyName,
    placeholder: options.placeholder ?? "Search",
    showDateRange: options.showDateRange,
    showStatus: options.showStatus,
    showStatus1: options.showStatus1,
    showSearchFilter: options.showSearchFilter,
  };

  // search handler with debounce
  const handleSearch = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleSearchFun?.(value);
        if (value) {
          setSearchParams({
            [activeOptions?.searchKeyName || "filter"]: value,
          });
        } else {
          setSearchParams({
            [activeOptions?.searchKeyName || "filter"]: undefined,
          });
        }
      }, 500),
    [handleSearchFun, activeOptions]
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Card size="small">
        <BreadCrumb />
        {activeOptions?.showSearchFilter && (
          <Row
            style={{
              background: isLight ? "rgb(249 250 251)" : "",
              border: !isLight ? "1px solid #353232" : "none",
              padding: "10px 5px",
              marginTop: "20px",
            }}
            gutter={[10, 10]}
            justify="space-between"
          >
            <Col
              xs={24}
              lg={6}
              xl={6}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ display: "flex", gap: "5px" }}>
                <Icon
                  icon="uil:filter"
                  color={colorPrimary}
                  fontSize={20}
                  style={{
                    background: hexToRgba(colorPrimary, 0.2),
                    padding: "2px",
                  }}
                />
                <Text strong> Filter & Search Controls</Text>
              </span>
            </Col>

            <Col xs={24} lg={18} xl={18} xxl={15}>
              <Row justify="end" gutter={[5, 5]}>
                {activeOptions.showSearch && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <Input
                      allowClear
                      defaultValue={
                        searchParams.get(
                          activeOptions.searchKeyName || "filter"
                        ) || undefined
                      }
                      maxLength={50}
                      prefix={<SearchOutlined />}
                      placeholder={activeOptions.placeholder}
                      onChange={handleSearch}
                    />
                  </Col>
                )}

                {activeOptions.showStatus && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <Select
                      defaultValue={
                        searchParams.get(statusOption?.queryName || "status") ||
                        statusOption?.defaultValue
                      }
                      style={{ width: "100%" }}
                      allowClear
                      options={statusOption?.options}
                      placeholder={statusOption?.placeholder || "Select"}
                      onChange={(e) => {
                        console.log(e);
                        setSearchParams({
                          [statusOption?.queryName || "status"]:
                            e?.trim() || undefined,
                        });
                      }}
                    />
                  </Col>
                )}

                {activeOptions.showStatus1 && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <Select
                      defaultValue={
                        searchParams.get(statusOption1?.queryName || "") ||
                        statusOption1?.defaultValue
                      }
                      style={{ width: "100%" }}
                      allowClear
                      options={statusOption1?.options}
                      placeholder={statusOption1?.placeholder || "Select"}
                      onChange={(e) => {
                        setSearchParams({
                          [statusOption1?.queryName || "status"]:
                            e?.trim() || undefined,
                        });
                      }}
                    />
                  </Col>
                )}

                {activeOptions.showDateRange && (
                  <Col xs={24} sm={24} md={8} xl={6}>
                    <RangePicker
                      style={{ width: "100%" }}
                      presets={rangePresets}
                      defaultValue={
                        searchParams.get("start_date") &&
                        searchParams.get("end_date")
                          ? [
                              dayjs(searchParams.get("start_date")),
                              dayjs(searchParams.get("end_date")),
                            ]
                          : undefined
                      }
                      onChange={(e, dateRange) => {
                        if (e) {
                          setSearchParams({
                            start_date: dateRange[0],
                            end_date: dateRange[1],
                          });
                        } else {
                          setSearchParams({
                            start_date: undefined,
                            end_date: undefined,
                          });
                        }
                      }}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </Card>

      <Card size="small">
        <Row justify="space-between" align="middle">
          {showBackbtn && (
            <Col>
              <Icon
                icon="fxemoji:backwithleftwardsarrow"
                width="30"
                height="25"
                style={{ cursor: "pointer" }}
                onClick={() => router.back()}
              />
            </Col>
          )}

          <Col>
            <Typography.Text
              strong
              style={{
                fontSize: lg ? "1.5rem" : "1rem",
                margin: 0,
              }}
            >
              <Space align="center" style={{ lineHeight: 0 }}>
                {showTitleWithIcon && (
                  <Icon icon={showTitleWithIcon} width="28" height="25" />
                )}
                {title}
              </Space>
              {showBackbtn && (
                <Divider
                  style={{ margin: 0, padding: 0 }}
                  orientationMargin={0}
                />
              )}
            </Typography.Text>
          </Col>

          <Col>
            {activeOptions.showButton && (
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  return buttonLink
                    ? router.push(buttonLink)
                    : dispatch(
                        openModal
                          ? showModal({ ...openModal })
                          : showDrawer(openDrawer)
                      );
                }}
                type="primary"
                icon={<Iconify icon="mdi:add-bold" />}
              >
                {buttonLabel}
              </Button>
            )}
          </Col>
        </Row>

        <div style={{ marginTop: "12px" }}>{content}</div>
      </Card>
    </Space>
  );
};

export default Container;
