import { Res } from 'lib/types';
import axios from 'lib/utils/axios';

export async function uploadImage(formData: any) {
  const res = await axios.post<Res<string>>('image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
}
