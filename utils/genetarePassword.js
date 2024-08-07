import crypto from 'node:crypto'

const generateSalt = () => {
    const salt = crypto.randomBytes(32).toString('hex')
    return salt;
}

const hashPass = (plainPassword, salt) => {
    const hashedSalt = crypto.hash('sha256', salt)
    const password = crypto.createHash('sha256').update(plainPassword).update(hashedSalt).digest('hex')
    return hashedSalt + "$" + password;
}

const compare = (userPass, salt, enteredPass) => {
    const hashedEnteredPass = hashPass(enteredPass, salt);
    if (hashedEnteredPass == userPass) {
        return true;
    } else {
        return false;
    }
}

export { generateSalt, hashPass, compare }