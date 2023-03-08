import CryptoJS from "crypto-js"

const alg = "AES/CBC/PKCS5Padding";
const key = "test";
const iv = key.substring(0, 16);

export const decrypt = (_encrypted) => {
    const encrypted = "zbirIlu74Waym+OG4v+Vbje2lvhtS8IBwrejixIDvjzezgPb8CP+Tod+vNGXRF7aRMrJQ48cLW//gRKrz/38wGQZyfFUBcn7OO9xQ5c665H61jeOFbl23Vhe/jEUAOLt";
    const base64 = btoa(key);
    const decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Base64.parse(base64), 
        { 
            mode: CryptoJS.mode.ECB, 
            padding: CryptoJS.pad.Pkcs7 
        }
    );
    console.log("decrypted raw : ", decrypted);
    console.log("decrypted string : ", decrypted.toString(CryptoJS.enc.Utf8));
    // return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
}