const port = 3000
module.exports = {
    secret: "*RJ%bRAkr#dK?&f9JEmZXKP@?H68kAv7Hj^&3Hh6nLjM*8db#z",
    port: port,
    base_url: "http://127.0.0.1:" + port,
    bd: {
        connectionLimit: 20,
        host: "127.0.0.1",
        user: "root",
        password: "root",
        database: "rodovias"
    }
}