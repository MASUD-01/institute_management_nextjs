"use client";

import Table from "@/components/common/Antd/Table";
import Container from "@/components/common/Container/Container";
import CommStatusTag from "@/components/comUtility/Utilities/CommStatusTag";
import CommTableActions from "@/components/comUtility/Utilities/CommTableActions";
import useQueryParams from "@/components/hooks/useQueryParams";
import { showModal } from "@/components/reduxConfig/slice/modalSlice";
import { useAppDispatch } from "@/components/reduxConfig/store";
import { fetchClient } from "@/lib/fetch-client";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { IDepartment } from "../page";

const DepartmentPage = ({ initialData }: { initialData: IDepartment[] }) => {
  console.log(initialData, "----------------------------------");
  const [form] = useForm();
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();

  const onFinish = async (values: any) => {};

  const handleDelete = (id: number) => {};

  return (
    <Container
      options={{
        showButton: true,
        showStatus: true,
        searchKeyName: "name",
        showSearch: true,
        showSearchFilter: true,
      }}
      title={`Department List`}
      // openModal={{
      //   title: 'Create Department',
      //   content: <CreateDepartment loading={false} onFinish={onFinish} />,
      // }}

      statusOption={{
        placeholder: "Select Status",
        options: [
          { label: "Active", value: "true" },
          { label: "InActive", value: "false" },
        ],
      }}
      content={
        <div style={{ marginTop: "12px" }}>
          <Table<IDepartment>
            scroll={{ x: 500 }}
            loading={false}
            bordered
            size="small"
            dataSource={initialData}
            rowKey="id"
            pagination={{
              onChange(current, size) {
                setSearchParams({
                  skip:
                    current === 1
                      ? String(current - 1)
                      : String(
                          current * Number(query.limit) - Number(query.limit)
                        ),
                  limit: String(size),
                });
              },
              showSizeChanger: true,
              defaultPageSize: query.limit ? Number(query.limit) : 100,
              pageSizeOptions: ["50", "100", "200", "300", "400", "500"],
              total: initialData?.length,
              showTotal: (total) => `Total ${total}`,
            }}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Short name",
                dataIndex: "short_name",
                key: "short_name",
              },
              {
                title: "Code",
                dataIndex: "code",
                key: "code",
              },
              {
                title: "Status",
                key: "status",
                align: "center",
                render: (_, record) => (
                  <CommStatusTag
                    status={record?.status ? "Active" : "Inactive"}
                  />
                ),
              },
              {
                title: "Action",
                key: "action",
                align: "center",
                width: 110,
                render: (_, record) => (
                  <CommTableActions
                    showDelete
                    // deleteOnConfirm={() => handleDelete(record.id)}
                    showEdit
                    handleEditChange={() => {
                      if (record) {
                        form?.setFieldsValue({ ...record });
                      }
                      // dispatch(
                      //   showModal({
                      //     title: 'Edit Department',
                      //     content: <EditDepartment record={record} />,
                      //   })
                      // );
                    }}
                  />
                ),
              },
            ]}
          />
        </div>
      }
    />
  );
};

export default DepartmentPage;
