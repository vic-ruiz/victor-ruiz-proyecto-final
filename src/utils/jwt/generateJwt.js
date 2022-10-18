import jwt from "jsonwebtoken";
import "dotenv/config";

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export default async function generateToken(user) {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        usarEmail: user.email,
      },
      PRIVATE_KEY,
      {}
    );
    return token;
  } catch (error) {
    console.log(`error al generar jwt: ${error}`);
  }
}
