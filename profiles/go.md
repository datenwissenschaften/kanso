# Go profile

## Detect

Inspect go.mod, go.sum, go.work, build tags and CI.

## Conventions

Preserve error causes when wrapping. Pass context through cancellable I/O, define small interfaces where consumed, and use table-driven tests.

## Tool candidates

Use gofmt, go vet, Staticcheck, go test, native fuzzing, govulncheck and go build as applicable. Use the race detector on concurrent paths where supported.

## Library candidates

Start with net/http, log/slog and standard serialization. Consider golang.org/x/sync/errgroup for related goroutines with shared cancellation.
