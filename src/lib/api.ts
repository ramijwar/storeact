export async function register(payload: { name: string; email: string; password: string }) {
  return request<{ token?: string; user?: { id: number; name: string; email: string; role?: string }; message?: string }>('/auth/register', {
    method: 'POST', body: JSON.stringify(payload),
  });
}
