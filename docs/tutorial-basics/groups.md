---
sidebar_position: 3
---

# Route Groups

The `Group` struct in the Twix package allows you to group routes with a common prefix and shared middleware. This is useful for organizing routes and applying middleware to a specific set of routes.

## Group Methods

### Group

```go
func (r *Router) Group(prefix string) *Group
```

Creates a new routing group with a given prefix.

#### Example

```go
apiGroup := router.Group("/api")
```

### AddRoute

```go
func (g *Group) AddRoute(method, path string, handler http.HandlerFunc)
```

Adds a route handler for a specific method and path within the group.

#### Example

```go
apiGroup.AddRoute("GET", "/users", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("User list"))
})
```

### Get

```go
func (g *Group) Get(path string, handler http.HandlerFunc)
```

Adds a GET route handler within the group.

#### Example

```go
apiGroup.Get("/users", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("User list"))
})
```

### Post

```go
func (g *Group) Post(path string, handler http.HandlerFunc)
```

Adds a POST route handler within the group.

#### Example

```go
apiGroup.Post("/users", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Create user"))
})
```

### Delete

```go
func (g *Group) Delete(path string, handler http.HandlerFunc)
```

Adds a DELETE route handler within the group.

#### Example

```go
apiGroup.Delete("/users/:id", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Delete user"))
})
```

### Patch

```go
func (g *Group) Patch(path string, handler http.HandlerFunc)
```

Adds a PATCH route handler within the group.

#### Example

```go
apiGroup.Patch("/users/:id", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Update user"))
})
```

### Put

```go
func (g *Group) Put(path string, handler http.HandlerFunc)
```

Adds a PUT route handler within the group.

#### Example

```go
apiGroup.Put("/users/:id", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Create or update user"))
})
```

### Use

```go
func (g *Group) Use(middleware func(http.Handler) http.Handler)
```

Adds middleware to the group. Middleware functions are applied to all routes within the group.

#### Example

```go
apiGroup.Use(func(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Perform some action before the request is handled
        next.ServeHTTP(w, r)
    })
})
```

## Full Example

Here's a complete example demonstrating how to use route groups with the Twix router:

```go
package main

import (
    "net/http"
    "github.com/yourusername/twix"
)

func main() {
    router := twix.New()

    // Define a middleware function
    loggingMiddleware := func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            println(r.Method, r.URL.Path)
            next.ServeHTTP(w, r)
        })
    }

    // Create a group with the /api prefix
    apiGroup := router.Group("/api")
    apiGroup.Use(loggingMiddleware)

    apiGroup.Get("/users", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("User list"))
    })

    apiGroup.Post("/users", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Create user"))
    })

    apiGroup.Get("/users/:id", func(w http.ResponseWriter, r *http.Request) {
        userID := twix.URLParam(r, "id")
        w.Write([]byte("User ID: " + userID))
    })

    http.ListenAndServe(":8080", router)
}
```

In this example, the `loggingMiddleware` function logs the HTTP method and URL path of each request. The middleware is applied to all routes within the `apiGroup`. The group has routes for listing users, creating users, and retrieving a user by ID.
