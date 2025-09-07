import { test, expect, APIResponse } from '@playwright/test';

test('Получение всех платежей — негативный кейс (ошибка авторизации)', async ({ request }) => {
  // Используем невалидный токен
  const agentId = 'acme';
  const pointId = '00001';
  const baseUrl = 'https://api.qiwi.com/partner/payout';
  const invalidToken = 'Bearer INVALID_TOKEN';

  const response: APIResponse = await request.get(
    `${baseUrl}/v1/agents/${agentId}/points/${pointId}/payments`,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': invalidToken,
      }
    }
  );

  expect(response.status()).toBe(401);

  // Проверяем структуру тела ошибки CommonError
  const error = await response.json();
  expect(error).toHaveProperty('serviceName');
  expect(error).toHaveProperty('errorCode');
  expect(error).toHaveProperty('userMessage');
  expect(error).toHaveProperty('description');
  expect(error).toHaveProperty('traceId');
  expect(error).toHaveProperty('dateTime');
});