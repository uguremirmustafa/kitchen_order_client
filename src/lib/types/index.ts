export interface Res<T = unknown> {
  message: string;
  data: T;
}

export interface User {
  id: number;
  firstName: null | string;
  lastName: null | string;
  email: string;
}
