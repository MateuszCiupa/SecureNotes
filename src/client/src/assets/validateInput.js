const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;
const loginPattern = /[A-Za-z0-9]+$/;

export const validateName = input => {
    if (input.length < 2 || input.length > 100 || !namePattern.test(input)) return false;
    return true;
};

export const validatePassword = input => {
    if (input.length < 8 || input.length > 1024 || passEntropy(input) < 0.75) return false;
    return true; 
};

export const validateLogin = input => {
    if (input.length < 4 || input.length > 20 || !loginPattern.test(input)) return false;
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

export const validateTitle = input => {

};

export const validateContent = input => {

};
