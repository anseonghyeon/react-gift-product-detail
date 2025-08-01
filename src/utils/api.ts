import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export function IsErrorStatus(error: any, msg: string, navigate: any) {
  if (error.response.status === 401) {
    navigate('/login');
  } else if (error.response.status === 404) {
    navigate('/home');
  } else if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    toast.error(msg, {
      position: 'bottom-center',
      hideProgressBar: true,
      closeOnClick: true,
    });
  } else {
    toast.error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.', {
      position: 'bottom-center',
      hideProgressBar: true,
      closeOnClick: true,
    });
  }

  return true;
}
