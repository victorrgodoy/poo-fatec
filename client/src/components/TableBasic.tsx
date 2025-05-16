import { Table } from "antd";
import React from "react";
import type { TableProps } from "antd";

interface TableBasicProps {
  dataSource: any[];
  columns: TableProps<any>["columns"];
  loading?: boolean; // <-- adiciona aqui
}

const TableBasic: React.FC<TableBasicProps> = ({
  dataSource,
  columns,
  loading,
}) => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
        loading={loading}
      />
    </div>
  );
};

export default TableBasic;
