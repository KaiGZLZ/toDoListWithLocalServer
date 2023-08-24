import env from "react-dotenv";

export const apiUrl = env.API_URL ?? 'http://localhost:4000/';
export const passphrase = env.PASSPHRASE ?? 'secret-word';