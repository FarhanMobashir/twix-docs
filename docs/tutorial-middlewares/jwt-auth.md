---
sidebar_position: 9
---

# JWT Authentication Middleware

The `JWTAuth` function in the `middlewares` package provides JSON Web Token (JWT) authentication for your Twix router. This middleware allows you to authenticate requests using JWTs either from the request headers or cookies.

## JWTConfig

The `JWTConfig` struct holds the configuration for the JWT authentication middleware.

```go
type JWTConfig struct {
    SecretKey   []byte
    TokenSource TokenSource
    CookieName  string
}
```

- `SecretKey`: The key used to sign and verify JWTs.
- `TokenSource`: Specifies where the token should be extracted from (either headers or cookies). Possible values are `Header` and `Cookie`.
- `CookieName`: The name of the cookie that holds the JWT if `TokenSource` is set to `Cookie`.

## TokenSource

`TokenSource` is an enumeration that defines where the JWT should be extracted from.

```go
type TokenSource string

const (
    Header TokenSource = "header"
    Cookie TokenSource = "cookie"
)
```

## JWTAuth

The `JWTAuth` function creates a middleware handler that performs JWT authentication based on the provided configuration.

```go
func JWTAuth(config JWTConfig) func(http.Handler) http.Handler
```

### Example

```go
package main

import (
    "net/http"
    "github.com/yourusername/twix"
    "github.com/yourusername/twix/middlewares"
    "github.com/golang-jwt/jwt/v5"
)

func main() {
    router := twix.New()

    // Define JWT configuration
    jwtConfig := middlewares.JWTConfig{
        SecretKey:   []byte("your-secret-key"),
        TokenSource: middlewares.Header,
    }

    // Apply JWT authentication middleware to the router
    router.Use(middlewares.JWTAuth(jwtConfig))

    router.Get("/", func(w http.ResponseWriter, r *http.Request) {
        // Access token claims from the context
        ctx := r.Context().Value(twix.TwixContextKey).(*twix.Context)
        claims := ctx.TokenClaims.(*jwt.MapClaims)

        // Use token claims
        userId := claims["user_id"]
        w.Write([]byte("User ID: " + userId.(string)))
    })

    http.ListenAndServe(":8080", router)
}
```

In this example, the `JWTAuth` middleware is applied to the Twix router, and the token is expected to be provided in the `Authorization` header. If the token is valid, its claims are stored in the request context and can be accessed in route handlers.

## How It Works

The `JWTAuth` middleware works as follows:

1. **Extract Token**: It extracts the JWT from the request header or cookie based on the `TokenSource` configuration.
2. **Parse Token**: It parses and validates the JWT using the provided `SecretKey`.
3. **Handle Errors**: It returns an appropriate error response if the token is missing, invalid, or if any error occurs.
4. **Store Claims**: It stores the JWT claims in the request context for use in route handlers.
5. **Pass Context**: It passes the updated context with the token claims to the next handler.

### Usage

You can apply the `JWTAuth` middleware to your Twix router by calling the `Use` method with the middleware function:

```go
router.Use(middlewares.JWTAuth(jwtConfig))
```

This will ensure that JWT authentication is enforced for the routes in your application, and valid token claims are available in the request context.
