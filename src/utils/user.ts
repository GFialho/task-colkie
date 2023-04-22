import { APIGatewayProxyEvent } from "aws-lambda";
import { generateClient } from "../database/client";

export const getUser = async (request: APIGatewayProxyEvent) => {
  const token = request.headers?.Authorization;
  if (!token) return null;

  const prismaClient = await generateClient();

  const user = await prismaClient.user.findUnique({ where: { token } });

  return user;
};
