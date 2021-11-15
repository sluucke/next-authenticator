import config from '../../config.json';
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(403).json({
      message: "Token is missing"
    })
  }
  const [, token] = authToken.split(' ')

  try {
    verify(token, config.JWT_TOKEN)

    return next()
  } catch (err) {
    return res.status(401).json({
      message: 'Token invalid'
    })
  }
}