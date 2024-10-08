import { useMutation } from '@tanstack/react-query';

import { httpClient } from '../lib/http.client';

export default function useMutateRemoveDocument(id: string) {
  return useMutation({
    mutationKey: ['request-' + id],
    mutationFn: async () =>
      httpClient({
        method: 'DELETE',
        path: `/requests/${id}`,
      }),
  });
}
