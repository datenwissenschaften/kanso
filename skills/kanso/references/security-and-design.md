# Security and safety by design

Identify trust boundaries, sensitive data, side effects, and failure modes before implementing risk-sensitive changes. Select controls in proportion to the actual risks.

| Risk                                                     | Controls                                                                                                                         |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Untrusted input, files, network responses or tool output | Validate schemas and size at boundaries. Use safe parsers, serializers, and parameterized APIs.                                  |
| Unauthorized access                                      | Enforce authorization server-side. Use least privilege, deny by default, and explicit capability grants.                         |
| Authentication and cryptography                          | Use established libraries and platform mechanisms.                                                                               |
| Secrets and sensitive data                               | Inject credentials through a secret manager or environment. Redact logs, diagnostics, and tests. Scan for accidental disclosure. |
| Data loss                                                | Use transactions or atomic writes. Test backup and recovery where warranted.                                                     |
| Irreversible or external effects                         | Obtain authorization, scope permissions, and use dry runs, audit trails, or idempotency where applicable.                        |
| Resource exhaustion                                      | Apply timeouts, quotas, cancellation and bounded retries for safe operations.                                                    |
| Concurrency                                              | Define ownership and synchronization. Test invariants during retries and partial failures.                                       |

Fail fast on invalid inputs and required configuration. Catch only expected failures and preserve diagnostic context. Use safe permission and resource limits. Test boundary failures and denied paths. Before sharing source or diagnostic data with a third-party scanner, verify authorization. Report unresolved findings and blocked verification.
