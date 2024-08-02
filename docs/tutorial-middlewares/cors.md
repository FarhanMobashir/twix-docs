---
sidebar_position: 5
---

# CORS Middleware

The `CorsMiddleware` function in the `middlewares` package provides Cross-Origin Resource Sharing (CORS) functionality for your Twix router. This middleware allows you to control how your server handles cross-origin requests.

## CorsConfig

The `CorsConfig` struct holds the configuration for the CORS middleware.

```go
type CorsConfig struct {
    AllowedOrigins   []string
    AllowedMethods   []string
    AllowedHeaders   []string
    AllowCredentials bool
}
```

- `AllowedOrigins`: A list of origins that are allowed to access the resource.
- `AllowedMethods`: A list of HTTP methods that are allowed for cross-origin requests.
- `AllowedHeaders`: A list of headers that are allowed in the actual request.
- `AllowCredentials`: A boolean indicating whether or not credentials are allowed in cross-origin requests.

## CorsMiddleware

The `CorsMiddleware` function creates a middleware handler that applies the specified CORS configuration.

```go
func CorsMiddleware(config CorsConfig) func(http.Handler) http.Handler
```

### Example

```go
package main

import (
    "net/http"
    "github.com/farhanmobashir/twix"
    "github.com/farhanmobashir/twix/middlewares"
)

func main() {
    router := twix.New()

    // Define CORS configuration
    corsConfig := middlewares.CorsConfig{
        AllowedOrigins:   []string{"http://example.com", "http://another-example.com"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    }

    // Apply CORS middleware to the router
    router.Use(middlewares.CorsMiddleware(corsConfig))

    router.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    http.ListenAndServe(":8080", router)
}
```

In this example, the `CorsMiddleware` function is configured to allow requests from `http://example.com` and `http://another-example.com`, permit `GET`, `POST`, `PUT`, and `DELETE` methods, and allow `Content-Type` and `Authorization` headers. It also enables credentials for cross-origin requests.

## CORS Preflight Requests

The middleware automatically handles CORS preflight requests by responding with a `204 No Content` status if the request method is `OPTIONS`. This allows browsers to verify CORS policies before making actual requests.

### Handling Preflight Requests

If the incoming request method is `OPTIONS`, the middleware responds with `204 No Content` status and returns without calling the next handler.

```go
if r.Method == http.MethodOptions {
    w.WriteHeader(http.StatusNoContent)
    return
}
```
