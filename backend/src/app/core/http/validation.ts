import { Response } from "express";

export const getUserIdOrThrow = (res: Response) => {
  const userId = res.locals.userId;

  if (!userId) {
    throw new Error('User does not have access to this resource');
  }

  return userId;
}