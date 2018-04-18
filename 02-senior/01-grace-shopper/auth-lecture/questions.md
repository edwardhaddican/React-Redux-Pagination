- JWT (JSON Web Tokens) vs. server-side sessions

  - Server-side sessions: space in memory on our server, where we're storing information about folks that visit us
  - We identify visitors with a key, that we store on the cookie
  - When a visitor makes a request, our session middleware checks the cookie for this key, and then looks up the session information in the session store based on that key

  - JWT: stateless alternative to server-side sessions
  - We sign a JWT for a visitor and send this back with our HTTP response
  - Client stores this JWT, and they send this back to us with each request
    - places the JWT is stored: in memory, ex. localStorage
  - It's important that the JWT is communicated over HTTPS

- Gatekeeping middleware

- Cart implementation (pros/cons)

  - Sessions (recommend)
    req.session.cart
  - HTML5 localStorage
  - JWT

- If the user logs out and we're using sessions, should they still see their cart?
  - It's not required
  - Feel free to implement this if you want/are interested
