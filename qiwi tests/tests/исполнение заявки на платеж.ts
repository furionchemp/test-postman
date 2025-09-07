import { test, expect, APIResponse } from '@playwright/test';

test('Исполнение заявки на платеж', async ({ request }) => {
  const agentId = 'acme';
  const pointId = '00001';
  const paymentId = 'c0d85b0b-a528-9c66-4a15-cb7a12eda9d6';
  const baseUrl = 'https://api.qiwi.com/partner/payout';
  const token = 'bearer';

  const url = `${baseUrl}/v1/agents/${agentId}/points/${pointId}/payments/${paymentId}/execute`;

  const response: APIResponse = await request.post(url, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  expect(response.ok()).toBeTruthy();

  const result = await response.json();
  expect(result).toHaveProperty('paymentId');
  expect(result).toHaveProperty('creationDateTime');
  expect(result).toHaveProperty('status');
  expect(result.status).toHaveProperty('value');
  expect(result).toHaveProperty('recipientDetails');
  expect(result).toHaveProperty('amount');
  expect(result.amount).toHaveProperty('value');
  expect(result.amount).toHaveProperty('currency');
  expect(result).toHaveProperty('billingDetails');
  expect(result.billingDetails).toHaveProperty('transactionId');
});