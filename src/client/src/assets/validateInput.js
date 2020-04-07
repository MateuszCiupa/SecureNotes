const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;
const loginPattern = /[A-Za-z0-9]+$/;
const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const contentPattern = /[A-Za-z0-9\sĄĆĘŁŃÓŚŹŻąćęłńóśźż,.:'";?()]+$/;
const titlePattern = /[A-Za-z0-9\s]+$/;

export const validateName = input => {
    if (input.length < 2 || input.length > 100 || !namePattern.test(input)) return false;
    return true;
};

export const validatePassword = input => {
    if (input.length < 8 || input.length > 1024) return false;
    return true; 
};

export const validateLogin = input => {
    if (input.length < 4 || input.length > 20 || !loginPattern.test(input)) return false;
    return true;
};

export const validateEmail = input => {
    if (input.length < 4 || input.length > 256 || !emailPattern.test(input)) return false;
    return true; 
};

export const passEntropy = pass => {
    if (pass.length === 0) return 0;
    const asciiCodes = new Array(255);
    asciiCodes.fill(0);
    for (let c of pass) asciiCodes[c.charCodeAt(0)]++;
    let entropy = 0;
    for (let i = 0; i < 255; i++) {
        const p = asciiCodes[i] / pass.length;
        if (p !== 0) entropy -= p * Math.log10(p);
    }
    return entropy;
};

export const colorByEntropy = entropy => {
    if (entropy < 0.25) return 'weak';
    if (entropy >= 0.25 && entropy < 0.5) return 'fair';
    if (entropy >= 0.5 && entropy < 0.75) return 'good';
    return 'strong';
};

export const actualPassEntropy = pass => {
    return pass.length * Math.log2(255);
};

export const validateTitle = input => {
    if (input.length < 2 || input.length > 100 || !titlePattern.test(input)) return false;
    return true;
};

export const validateContent = input => {
    if (input.length > 2048 || !contentPattern.test(input)) return false;
    return true;
};
