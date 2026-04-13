/**
 * Service to generate unique staff ID
 * Format: STA-XXXX (e.g STA-234R4)
 */

const generateStaffId = () =>{
    const timestamp = Date.now().toString(36).substr(-5).toUpperCase();
    const random = Math.random().toString(36).substr(2,3).toUpperCase();

    return `STA-${timestamp}${random}`;
}
module.exports = generateStaffId;