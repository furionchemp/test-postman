import { test, expect, APIResponse } from '@playwright/test';

test('Получить все платежи', async ({ request }) => {
  
  const agentId = 'acme';
  const pointId = '00001';
  const baseUrl = 'https://api.qiwi.com/partner/payout';
  const token = 'bearer'; 

  const response: APIResponse = await request.get(
    `${baseUrl}/v1/agents/${agentId}/points/${pointId}/payments`,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
  );

  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);

  if (data.length > 0) {
    const payment = data[0];
    expect(payment).toHaveProperty('paymentId');
    expect(payment).toHaveProperty('creationDateTime');
    expect(payment).toHaveProperty('status');
    expect(payment.status).toHaveProperty('value');
    expect(payment).toHaveProperty('recipientDetails');
    expect(payment).toHaveProperty('amount');
    expect(payment.amount).toHaveProperty('value');
    expect(payment.amount).toHaveProperty('currency');
  }
});