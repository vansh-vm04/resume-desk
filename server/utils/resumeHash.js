const crypto = require('crypto');

const generateHash = (resumeData) => {
  const stringifiedData = JSON.stringify(resumeData);
  return crypto.createHash('sha256').update(stringifiedData).digest('hex');
};

module.exports = {generateHash};