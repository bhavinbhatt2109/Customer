const PROXY_CONFIG = [
  {
    context: [
      "/customer",
    ],
    target: "https://localhost:7120",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
