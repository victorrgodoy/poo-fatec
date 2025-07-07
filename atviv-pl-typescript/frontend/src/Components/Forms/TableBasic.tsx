import { Table, type TableColumnsType } from "antd";

interface TableBasicProps<RecordType extends object> {
  dataSource: RecordType[];
  columns: TableColumnsType<RecordType>;
}

const TableBasic = <RecordType extends object>({ 
  dataSource, 
  columns 
}: TableBasicProps<RecordType>) => {
  return (
    <div>
      <Table<RecordType>
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default TableBasic;