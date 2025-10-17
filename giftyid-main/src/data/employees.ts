export interface Employee {
  id: string;
  email: string;
  name: string;
  defaultPassword: string;
}

export const employees: Employee[] = [
  {
    id: 'dptson1',
    email: 'dptson1@giftytech.com',
    name: 'Đoàn Phạm Thanh Sơn',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'nmhung',
    email: 'nmhung@giftytech.com',
    name: 'Nguyễn Mạnh Hùng',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'nxdinh',
    email: 'nxdinh@giftytech.com',
    name: 'Nguyễn Xuân Định',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'mttbinh',
    email: 'mttbinh@giftytech.com',
    name: 'Mai Thị Thanh Bình',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'ddvan',
    email: 'ddvan@giftytech.com',
    name: 'Đặng Đình Văn',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'nmhung1',
    email: 'nmhung1@giftytech.com',
    name: 'Nguyễn Mạnh Hùng',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'ntduong',
    email: 'ntduong@giftytech.com',
    name: 'Nguyễn Thùy Dương',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'vhlinh1',
    email: 'vhlinh1@giftytech.com',
    name: 'Vũ Hải Linh',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'dmlinh1',
    email: 'dmlinh1@giftytech.com',
    name: 'Đỗ Mai Linh',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'tvhuy1',
    email: 'tvhuy1@giftytech.com',
    name: 'Trương Văn Huy',
    defaultPassword: 'Giftytech@2025'
  },
  {
    id: 'pmthien1',
    email: 'pmthien1@giftytech.com',
    name: 'Phạm Minh Thiện',
    defaultPassword: 'Giftytech@2025'
  },
];

export const getEmployeeByIdOrEmail = (identifier: string): Employee | undefined => {
  return employees.find(emp => emp.id === identifier || emp.email === identifier);
};

export const isValidEmployee = (identifier: string): boolean => {
  return employees.some(emp => emp.id === identifier || emp.email === identifier);
}; 