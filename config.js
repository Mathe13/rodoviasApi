const port = 3000
module.exports = {
    secret: "*RJ%bRAkr#dK?&f9JEmZXKP@?H68kAv7Hj^&3Hh6nLjM*8db#z",
    port: port,
    base_url: "http://127.0.0.1:" + port,
    // bd: {
    //     connectionLimit: 20,
    //     host: "127.0.0.1",
    //     user: "root",
    //     password: "root",
    //     database: "rodovias"
    // }
    bd: {
        // mysql://nynyxn7w891pahsa:zij7zp7igsbaxtil@edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/c8ng80padace9x3w
        connectionLimit: 10,
        host: "edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/c8ng80padace9x3w",
        user: "nynyxn7w891pahsa",
        password: "zij7zp7igsbaxtil",
        database: "c8ng80padace9x3w",
        port: '3306'
    }

}