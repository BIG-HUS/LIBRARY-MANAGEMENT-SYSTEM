/**
 * Service to generate unique student IDs
 * format: STU-XXX (e.g STU-AEDC )
 */

const generateStudentId = () => {
    const timestamp = Date.now().toString(36).slice(-5).toUpperCase();
    const random = Math.random().toString(36).slice(2,3).toUpperCase();

    return `STU-${timestamp}${random}`;
}

module.exports = {generateStudentId};