export interface Document {
  rg: string;
  cpf: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface Address {
  address_id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  number: string;
}

export interface ClientRegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  birth_date: string;
  document: Document;
  contact: Contact;
  address: Address;
}


export interface ClientInfoResponse {
  address: Address;
  client_id: string;
  contact: Contact;
  created_at: string;
  birth_date: string;
  document: Document;
  name: string;
  surname: string;
  uid: string;
  updated_at: string | null;
}

export interface ClientRegisterResponse {
  client_id: string;
  name: string;
  surname: string;
  birth_date: string;
  document: Document;
  contact: Contact;
  address: Address;
  created_at: string;
  last_login: string;
  uid: string;
}

export interface ClientLoginRequest {
  email: string;
  password: string;
}

export interface ClientResponse {
  client_id: string;
  name: string;
  surname: string;
  birth_date: string;
  document: Document;
  contact: Contact;
  address: Address;
  created_at: string;
  last_login: string;
  uid: string;
}
