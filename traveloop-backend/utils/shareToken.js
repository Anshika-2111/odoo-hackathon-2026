// Helper to generate a random token for public sharing
const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
module.exports = { generateToken };

