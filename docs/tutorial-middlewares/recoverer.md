---
sidebar_position: 8
---

# Recovery Middleware

The `RecoveryMiddleware` function in the `middlewares` package provides a way to recover from panics in your Twix router. This middleware ensures that if a panic occurs during request handling, it will be logged and a generic `500 Internal Server Error` response will be sent to the client.

## RecoveryMiddleware

The `RecoveryMiddleware` function creates a middleware handler that recovers from panics and logs the error.

```go
func RecoveryMiddleware(next http.Handler) http.Handler
```

### Example

```go
package main

import (
    "net/http"
    "github.com/yourusername/twix"
    "github.com/yourusername/twix/middlewares"
)

func main() {
    router := twix.New()

    // Apply recovery middleware to the router
    router.Use(middlewares.RecoveryMiddleware)

    router.Get("/", func(w http.ResponseWriter, r *http.Request) {
        // Example of a panic to test recovery middleware
        panic("Something went wrong!")
    })

    http.ListenAndServe(":8080", router)
}
```

In this example, the `RecoveryMiddleware` is applied to the Twix router. If any route handler panics, the middleware will recover from the panic, log the error, and return a `500 Internal Server Error` response.

## How It Works

The `RecoveryMiddleware` works as follows:

1. **Deferred Function**: It uses a deferred function to catch any panics that occur during request handling.
2. **Recover from Panic**: If a panic occurs, the middleware logs the error message.
3. **Respond with Error**: It sends a `500 Internal Server Error` response to the client.

### Usage

You can apply the `RecoveryMiddleware` to your Twix router by calling the `Use` method with the middleware function:

```go
router.Use(middlewares.RecoveryMiddleware)
```

This will ensure that any panics in your request handlers are properly recovered and handled, preventing your server from crashing.
