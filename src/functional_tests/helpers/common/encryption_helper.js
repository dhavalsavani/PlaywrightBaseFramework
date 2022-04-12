const fs = require('fs');
const crypt = require('crypto');

const ENCRYPTION_ALGORITHM = 'AES-256-CBC';

module.exports = {
  /**
   * Creates sha256 hash key of the given password
   * @param password
   * @returns {Buffer}
   */
  getCipherkey(password) {
    return crypt.createHash('sha256').update(password).digest();
  },

  /**
   * Creates random bytes for iv for given length.<br>
   * If length not provided then creates random bytes of length 16 bytes.
   * @param length
   * @returns {Buffer}
   */
  getInitVector(length = 16) {
    return crypt.randomBytes(length);
  },

  /**
   * Encrypts given raw text using given password
   * @param {string} text 
   * @param {string} password 
   * @returns encrypted text
   */
  encryptText(text, password) {
    const initVector = this.getInitVector();
    const key = this.getCipherkey(password);
    const cipher = crypt.createCipheriv(ENCRYPTION_ALGORITHM, key, initVector);
    let cipherText = cipher.update(text, 'utf-8', 'hex');
    cipherText = `${cipherText}${cipher.final('hex')}`;
    return `${initVector.toString('hex')}.${cipherText}`;
  },

  /**
   * Encrypts given file
   * @param password - used as encryption key
   * @param filePath
   */
  encryptFile(password, filePath) {
    const encryptedText = this.encryptText(fs.readFileSync(filePath).toString(), password);
    fs.writeFileSync(filePath, encryptedText);
  },

  /**
   * Encrypts multiple files inside given directory
   * @param password - used as encryption key
   * @param directory
   */
  encryptFiles(password, directory) {
    fs.readdirSync(directory).forEach((file) => {
      this.encryptFile(password, `${directory}/${file}`);
    });
  },

  /**
   * Decrypts given encrypted text into raw text using given password
   * @param {string} text 
   * @param {string} password 
   * @returns decrypted text
   */
  decryptText(text, password) {
    let [initVector, value] = text.split('.');
    initVector = Buffer.from(initVector, 'hex');
    value = Buffer.from(value, 'hex');
    const key = this.getCipherkey(password);
    const decipher = crypt.createDecipheriv(ENCRYPTION_ALGORITHM, key, initVector);
    let decryptedContent = decipher.update(value);
    decryptedContent = `${decryptedContent}${decipher.final()}`;
    return decryptedContent;
  },

  /**
   * Decrypts given file.
   * @param password - used as decryption key
   * @param filePath
   */
  decryptFile(password, filePath) {
    const fileContent = fs.readFileSync(filePath).toString();
    if (fileContent.toString().includes('exports')) {
      console.log('File is already decrypted');
      return true;
    }

    const decryptedFileContent = this.decryptText(fileContent, password);
    fs.writeFileSync(filePath, decryptedFileContent);
    return true;
  },

  /**
   * Decrypts multiple files inside given directory.
   * @param password - used as decryption key
   * @param directory
   */
  decryptFiles(password, directory) {
    fs.readdirSync(directory).forEach((file) => {
      this.decryptFile(password, `${directory}/${file}`);
    });
  },
};
