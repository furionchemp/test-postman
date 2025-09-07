import { test, expect, APIResponse } from '@playwright/test';

test('Запрос баланса по точке оплаты', async ({ request }) => {
  const agentId = 'acme';
  const pointId = '00001';
  const baseUrl = 'https://api.qiwi.com/partner/payout';
  const token = 'ВАШ_ТОКЕН_ЗДЕСЬ';

  const url = `${baseUrl}/v1/agents/${agentId}/points/${pointId}/balance`;

  const response: APIResponse = await request.get(url, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  expect(response.ok()).toBeTruthy();

  const result = await response.json();
  expect(result).toHaveProperty('balance');
  expect(result.balance).toHaveProperty('value');
  expect(result.balance).toHaveProperty('currency');
  expect(result).toHaveProperty('overdraft');
  expect(result.overdraft).toHaveProperty('value');
  expect(result.overdraft).toHaveProperty('currency');
  expect(result).toHaveProperty('available');
  expect(result.available).toHaveProperty('value');
  expect(result.available).toHaveProperty('currency');
});