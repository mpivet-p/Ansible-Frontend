const User = require("../model/user");
const bcrypt = require("bcryptjs");

const { DEFAULT_ADMIN_PASS } = process.env;

async function createUserIfEmpty() {
    const nbr = await User.countDocuments();
    if (nbr === 0) {
        console.warn("No user in database. Creating default user (clusteradmin) with default password");
        encryptedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASS, 10);
        const user = await User.create({
        email: "clusteradmin",
        kind: "admin",
        password: encryptedPassword,
        });
    }
}

module.exports = createUserIfEmpty;