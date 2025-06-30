import jwt, { JwtPayload } from "jsonwebtoken";

export const generateAccessToken = (userId: String) => {
    const accessTokenExpiry = (process.env.ACCESS_TOKEN_EXPIRY ?? "15m") as jwt.SignOptions["expiresIn"];
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: accessTokenExpiry,
    });
};

export const generateRefreshToken = (userId: String) => {
    const refreshTokenExpiry = (process.env.REFRESH_TOKEN_EXPIRY ?? "7d") as jwt.SignOptions["expiresIn"];

    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: refreshTokenExpiry,
    });
};

interface TokenPayload {
    id: string;
    iat?: number;
    exp?: number;
}

export const decodeAccessToken: (token: string) => TokenPayload = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload;
};
export const decodeRefreshToken: (token: string) => TokenPayload = (token) =>{
    return  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;
}