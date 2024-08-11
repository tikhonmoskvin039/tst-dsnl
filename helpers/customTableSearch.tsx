import {
  CloseCircleFilled,
  InfoCircleTwoTone,
  SearchOutlined,
} from '@ant-design/icons';
import { TTreatment } from '@models/TTreatment';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Link from 'next/link';
import Highlighter from 'react-highlight-words';

type DataIndex = keyof TTreatment;

export const getColumnSearchProps = (
  dataIndex: DataIndex,
  searchInput: React.RefObject<InputRef>,
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => void,
  handleReset: (clearFilters: () => void) => void,
  searchedColumn: string,
  searchText: string,
): ColumnType<TTreatment> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder="Введите для поиска"
        value={`${selectedKeys[0] || ''}`}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : []);
        }}
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Найти
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Сбросить
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          <CloseCircleFilled />
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (_, text) =>
    searchedColumn === dataIndex ? (
      <Link href={`treatments/${text.id}`}>
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text[dataIndex].toString() : ''}
        />
      </Link>
    ) : (
      <Link href={`treatments/${text.id}`}>
        {text.theme}{' '}
        {text.isWaitingForAnswer === 'Да' && (
          <InfoCircleTwoTone twoToneColor="red" />
        )}
      </Link>
    ),
});
