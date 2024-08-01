---
sidebar_position: 1
---

# Twix Router Introduction

Let's discover **Twix Router** for building HTTP services in Go.

## Getting Started

Get started by **creating a new project**.

Or **try the Twix Router** with the basic usage example below.

### What you'll need

- [Go](https://golang.org/dl/) version 1.16 or above

## Installation

Install the Twix Router package using `go get`:

```bash
go get github.com/farhanmobashir/twix
```

## Usage

Here's a basic example of how to use the `twix` router:

```go
package main

import (
    "net/http"
    "github.com/farhanmobashir/twix"
)

func main() {
    router := twix.New()

    router.Get("/hello", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    http.ListenAndServe(":8080", router)
}
```

### Steps

1. **Create a new Go project**:

   ```bash
   mkdir my-twix-app
   cd my-twix-app
   go mod init my-twix-app
   ```

2. **Install Twix Router**:

   ```bash
   go get github.com/farhanmobashir/twix
   ```

3. **Create a main.go file**:

   ```go
   package main

   import (
       "net/http"
       "github.com/farhanmobashir/twix"
   )

   func main() {
       router := twix.New()

       router.Get("/hello", func(w http.ResponseWriter, r *http.Request) {
           w.Write([]byte("Hello, World!"))
       })

       http.ListenAndServe(":8080", router)
   }
   ```

4. **Run your application**:
   ```bash
   go run main.go
   ```

Open your browser and navigate to `http://localhost:8080/hello` to see your `Hello, World!` message.

Feel free to edit `main.go` and add more routes as needed. The server **reloads automatically** when you make changes and restart it.

That's it! You now have a basic HTTP server running with Twix Router.
