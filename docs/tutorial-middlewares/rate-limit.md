---
sidebar_position: 7
---

# Rate Limit Middleware

The `RateLimit` function in the `middlewares` package provides rate limiting functionality for your Twix router. This middleware helps control the number of requests a client can make to your server within a specified time window.

## RateLimitConfig

The `RateLimitConfig` struct holds the configuration for the rate limit middleware.

```go
type RateLimitConfig struct {
    RequestLimit int
    WindowSize   time.Duration
}
```

- `RequestLimit`: The maximum number of requests allowed within the `WindowSize`.
- `WindowSize`: The duration within which the `RequestLimit` applies.

## RateLimit

The `RateLimit` function creates a middleware handler that enforces rate limiting based on the specified configuration.

```go
func RateLimit(config RateLimitConfig) func(http.Handler) http.Handler
```

### Example

```go
package main

import (
    "net/http"
    "time"
    "github.com/farhanmobashir/twix"
    "github.com/farhanmobashir/twix/middlewares"
)

func main() {
    router := twix.New()

    // Define rate limit configuration
    rateLimitConfig := middlewares.RateLimitConfig{
        RequestLimit: 100,
        WindowSize:   1 * time.Minute,
    }

    // Apply rate limit middleware to the router
    router.Use(middlewares.RateLimit(rateLimitConfig))

    router.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    http.ListenAndServe(":8080", router)
}
```

In this example, the `RateLimit` middleware is configured to allow up to 100 requests per minute per IP address. Requests exceeding this limit will receive a `429 Too Many Requests` response.

## Rate Limiting Behavior

The rate limiting middleware works as follows:

1. **Extract IP Address**: It extracts the client's IP address from the request.
2. **Check Rate Limit Data**: It checks if the IP address has existing rate limit data.
3. **Update or Set Data**:
   - If the data is within the specified `WindowSize` and the request count exceeds the limit, it responds with `429 Too Many Requests`.
   - If the data is within the `WindowSize` but the request count is below the limit, it increments the count.
   - If the `WindowSize` has passed, it resets the count and updates the timestamp.
4. **Store Data**: It stores the updated rate limit data for the IP address.

### Usage

You can apply the `RateLimit` middleware to your Twix router by calling the `Use` method with the rate limit configuration:

```go
router.Use(middlewares.RateLimit(rateLimitConfig))
```

This will enforce the rate limit rules for incoming requests based on the client's IP address.

---
