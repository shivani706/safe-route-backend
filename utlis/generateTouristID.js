const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

function generateTouristID() {
    const id = uuidv4();

    const hash = crypto
        .createHash("sha256")
        .update(id)
        .digest("hex");

    return { id, hash };
}

module.exports = generateTouristID;