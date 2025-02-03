import Cookies from 'js-cookie';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';

export const createCatThunk = createAsyncThunk(
  'cats/create',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}${apiRoutes.cat_create}`,
        name,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get(TOKEN)}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('Unknown error');
    }
  }
);
