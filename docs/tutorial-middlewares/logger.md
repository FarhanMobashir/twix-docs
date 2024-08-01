---
sidebar_position: 6
---

# Logging Middleware

The `LoggingMiddleware` function in the `middlewares` package provides logging functionality with colored output for your Twix router. This middleware logs the HTTP method, URL path, status code, and duration of each request.

## LoggingMiddleware

The `LoggingMiddleware` function creates a middleware handler that logs request details with colored output.

```go
func LoggingMiddleware(next http.Handler) http.Handler
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

    // Apply logging middleware to the router
    router.Use(middlewares.LoggingMiddleware)

    router.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    http.ListenAndServe(":8080", router)
}
```

In this example, the `LoggingMiddleware` function is applied to the Twix router to log details about each incoming request.

## Colored Output

The `LoggingMiddleware` uses the `color` package to print colored output to the console.

- **Info color**: Black text on a white background.
- **Error color**: Red text on a white background.

### Example Output

```plaintext
GET / with status 200 in 123.456µs
```

### Usage

You can apply the `LoggingMiddleware` to your Twix router by calling the `Use` method with the middleware function:

```go
router.Use(middlewares.LoggingMiddleware)
```

This will log the details of each request, including the method, URL path, status code, and duration.
