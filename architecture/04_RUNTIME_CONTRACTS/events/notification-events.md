# Notification Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Notification Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `NotificationSent`
Published when a notification is successfully dispatched to the external provider.
**Payload:**
- `notificationId` (UUID)
- `recipientId` (UUID)
- `channel` (String)
- `timestamp` (ISO-8601)

### `NotificationFailed`
Published when a notification fails to be delivered after all retries.
**Payload:**
- `notificationId` (UUID)
- `recipientId` (UUID)
- `error` (String)
- `timestamp` (ISO-8601)

### `NotificationRead`
Published when a recipient opens an email or reads an in-app notification.
**Payload:**
- `notificationId` (UUID)
- `recipientId` (UUID)
- `timestamp` (ISO-8601)
