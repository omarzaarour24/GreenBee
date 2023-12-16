export interface ITestData {
    id?: number;
    created_at?: string;
    data: string;
    name: string;
  }

  
export interface Company {
  id: number   /* primary key */;
  name: string;
  email?: string;
  phone_number: number;
  address?: string;
}

export interface Customer {
  id: number   /* primary key */;
  name: string;
  email?: string;
  phone_number: number;
  address?: string;
  company_id?: number   /* foreign key to company.id */;
  company?: Company;
}

export interface Converter {
  id: number   /* primary key */;
  status?: string;
  customer_id?: number   /* foreign key to customer.id */;
  customer?: Customer;
}

export interface Ticket {
  id: number   /* primary key */;
  customer?: string;
  status?: string;
  note?: string;
  date?: string;
  address?: string;
  converter_id?: number   /* foreign key to converter.id */;
  converter?: Converter;
}

