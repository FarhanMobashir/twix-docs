---
sidebar_position: 4
---

# Helper Functions

The `twix` package provides several helper functions to make working with URL parameters and context easier.

## Helper Functions

### URLParam

```go
func URLParam(r *http.Request, param string) string
```

Retrieves a URL parameter value by its key. This function extracts the parameter from the request context.

#### Example

```go
userID := twix.URLParam(r, "id")
w.Write([]byte("User ID: " + userID))
```

## Full Example

Here's a complete example demonstrating how to use these helper functions within the Twix router:

```go
package main

import (
    "net/http"
    "github.com/yourusername/twix"
)

func main() {
    router := twix.New()

    // Define a simple middleware function
    loggingMiddleware := func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            println(r.Method, r.URL.Path)
            next.ServeHTTP(w, r)
        })
    }

    // Apply middleware to the router
    router.Use(loggingMiddleware)

    // Define a route with a URL parameter
    router.Get("/users/:id", func(w http.ResponseWriter, r *http.Request) {
        userID := twix.URLParam(r, "id")
        w.Write([]byte("User ID: " + userID))
    })

    // Start the server
    http.ListenAndServe(":8080", router)
}
```
