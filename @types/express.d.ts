declare namespace Express {
  export interface Request {
    user: import('../src/User/UserEntity').CustomJwtPayload;
  }
}
