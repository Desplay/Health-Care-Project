export interface Message {
  message: string;
  status: number;
  payload?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const statusTable = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  404: 'Not Found',
  500: 'Internal Server Error',
};
