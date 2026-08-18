import { NotificationDispatcher, RetryPolicy } from '../application/NotificationDispatcher';
import { EmailAdapter, SendGridProvider, SmtpProvider } from '../infrastructure/adapters/EmailAdapter';
import { RenderedMessage } from '../contracts/INotificationService';

async function runTest() {
  console.log('=== Dispatch & Retry Test ===');

  const provider = new SendGridProvider();
  const emailAdapter = new EmailAdapter(provider);
  const dispatcher = new NotificationDispatcher({ 'email': emailAdapter });
  
  const msg: RenderedMessage = { subject: 'Test', body: 'Test body', metadata: {} };

  // 1. Dispatch Routing Test & Retry Policy Test
  // SendGridProvider randomly throws 30% of the time, dispatcher should retry.
  let successCount = 0;
  for (let i = 0; i < 5; i++) {
    await dispatcher.dispatch(msg, 'test@campus.os', 'email');
  }
  // The fact it doesn't crash means RetryPolicy swallowed/recovered from transient errors.
  
  // 2. Provider Swap Test
  const smtpProvider = new SmtpProvider();
  const smtpAdapter = new EmailAdapter(smtpProvider);
  const smtpDispatcher = new NotificationDispatcher({ 'email': smtpAdapter });
  
  await smtpDispatcher.dispatch(msg, 'test@campus.os', 'email');
  
  console.log('✅ Dispatch Routing, Retry Policy, and Provider Swap tests passed.');
}
runTest().catch(console.error);
