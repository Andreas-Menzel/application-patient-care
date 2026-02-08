import { initQueryClient } from '@ts-rest/vue-query';
import { apiContract } from 'shared';

export const api = initQueryClient(apiContract, {
  baseUrl: '',
});
