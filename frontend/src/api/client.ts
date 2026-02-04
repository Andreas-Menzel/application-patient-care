import { initQueryClient } from '@ts-rest/vue-query';
import { patientContract } from 'shared';

export const api = initQueryClient(patientContract, {
  baseUrl: 'http://localhost:3000', // TODO: update to use production url
});
