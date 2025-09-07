import { test, expect, APIResponse } from '@playwright/test';

test('Создание заявки на платёж', async ({ request }) => {
  const agentId = 'acme';
  const pointId = '00001';
  const paymentId = 'c0d85b0b-a528-9c66-4a15-cb7a12eda9d6'; 
  const baseUrl = 'https://api.qiwi.com/partner/payout';
  const token = 'bearer'; 

  const body = {
    recipientDetails: {
      providerCode: "MTS",
      fields: {
        account: "79123456789"
      }
    },
    amount: {
      value: "200.00",
      currency: "RUB"
    },
    customer: {
      account: "#12345",
      email: "usermail@mail.mail",
      phone: "9123456789"
    },
    source: {
      paymentType: "WITH_EXTRA_CHARGE",
      paymentToolType: "CASH",
      paymentTerminalType: "ATM_CASH_IN",
      paymentDate: "2018-11-27T14:02:35.589+03:00",
      extraCharge: {
        value: "200.00",
        currency: "RUB"
      }
    },
    callbackUrl: "https://domain/path",
    IdentificationType: "NONE"
  };

  const url = `${baseUrl}/v1/agents/${agentId}/points/${pointId}/payments/${paymentId}`;

  const response: APIResponse = await request.put(url, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: body
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
  expect(result).toHaveProperty('callbackUrl');
});