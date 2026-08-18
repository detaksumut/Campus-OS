---
id: EA-0065
title: Scheduler
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Scheduler Execution Architecture

## Purpose
Defines the mechanism for executing deferred, recurring, and asynchronous background jobs independently of the main request-response lifecycle.

## Supported Job Types
1. **Immediate Job**: Queued for execution as soon as a worker thread is available (Fire-and-forget).
2. **Delayed Job**: Scheduled to execute exactly once after a specified delay (e.g., in 5 minutes).
3. **Recurring / Cron Job**: Executes repeatedly based on a defined schedule or Cron expression.
4. **Event-Triggered Job**: A job specifically initiated in response to an Event Bus message.
5. **Manual Trigger**: A job execution forced via an admin API or dashboard.

## Job Execution Policies
- **Retry Policy**: Failed jobs MUST be retried based on configured backoff strategies (Linear, Exponential).
- **Timeout**: Every job MUST have a defined execution timeout. If exceeded, the job is forcibly cancelled and marked as failed.
- **Cancellation**: Jobs MUST support cancellation tokens to allow graceful termination during Runtime shutdown or manual intervention.
- **Priority**: The scheduler MUST support priority queues (e.g., High, Normal, Low) to ensure critical tasks process first during high load.
- **Concurrency Limit**: Runtimes MUST define maximum concurrency limits to prevent background jobs from starving the CPU/Memory of the main API threads.

## Persistence
Schedules and job states (Pending, Processing, Succeeded, Failed) MUST be persisted to survive Runtime restarts. In-memory scheduling is forbidden for business-critical operations.

## Reference Implementation Examples (Informative)
- **.NET**: Hangfire, Quartz.NET, Coravel.
- **Java**: Quartz, Spring Batch.
- **Node.js**: BullMQ, Agenda.
- **Go**: Asynq, gocron.
