---
sidebar_position: 2
---

# Router

The `Router` struct in the Twix package is the core component that holds route definitions and middleware. It is responsible for handling HTTP requests, matching them to the defined routes, and applying any middleware functions.

## Router Methods

### New

```go
func New() *Router
```

Creates a new instance of `Router`.

#### Example

```go
router := twix.New()
```

### AddRoute

```go
func (r *Router) AddRoute(method, path string, handler http.HandlerFunc)
```

Adds a route handler for a specific method and path.

#### Example

```go
router.AddRoute("GET", "/hello", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Hello, World!"))
})
```

### Get

```go
func (r *Router) Get(path string, handler http.HandlerFunc)
```

Adds a GET route handler.

#### Example

```go
router.Get("/hello", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Hello, World!"))
})
```

### Post

```go
func (r *Router) Post(path string, handler http.HandlerFunc)
```

Adds a POST route handler.

#### Example

```go
router.Post("/submit", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Form submitted!"))
})
```

### Delete

```go
func (r *Router) Delete(path string, handler http.HandlerFunc)
```

Adds a DELETE route handler.

#### Example

```go
router.Delete("/resource", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Resource deleted!"))
})
```

### Patch

```go
func (r *Router) Patch(path string, handler http.HandlerFunc)
```

Adds a PATCH route handler.

#### Example

```go
router.Patch("/resource", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Resource updated!"))
})
```

### Put

```go
func (r *Router) Put(path string, handler http.HandlerFunc)
```

Adds a PUT route handler.

#### Example

```go
router.Put("/resource", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Resource created or updated!"))
})
```

### Use

```go
func (r *Router) Use(middleware func(http.Handler) http.Handler)
```

Adds middleware to the router. Middleware functions are applied to all routes handled by the router.

#### Example

```go
router.Use(func(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Perform some action before the request is handled
        next.ServeHTTP(w, r)
    })
})
```

### ServeHTTP

```go
func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request)
```

Processes HTTP requests. This method is responsible for matching incoming requests to the defined routes and applying middleware.

### Example

```go
http.ListenAndServe(":8080", router)
```

This method should be passed to `http.ListenAndServe` to start the HTTP server with the Twix router handling requests.
