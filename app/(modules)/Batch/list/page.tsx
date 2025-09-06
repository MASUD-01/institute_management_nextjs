import { fetchClient } from "@/lib/fetch-client";
import React from "react";
import { IDepartment } from "../../department/list/page";

const Batch = async () => {
  const res = await fetchClient<IDepartment>(`/institute/department`, {
    headers: { "Content-Type": "application/json" },
  });

  console.log(res, "----------------batch");
  return <div>Batch</div>;
};

export default Batch;
