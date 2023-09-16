import AES from "crypto-js/aes";
var CryptoJS = require("crypto-js");

export default function encryptText(text: string) {
  const encryptText = AES.encrypt(text, process.env.NEXTAUTH_SECRET || "");
  return encryptText.toString();
}

export function decryptText(encryptedText: string) {
  const bytes = AES.decrypt(encryptedText, process.env.NEXTAUTH_SECRET || "");
  return bytes.toString(CryptoJS.enc.Utf8);
}
