import { Table } from "antd";
import React from "react";

const TableBasic = ({ dataSource, columns }) => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default TableBasic;
