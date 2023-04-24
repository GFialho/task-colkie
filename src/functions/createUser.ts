import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { generateClient } from "../database/client";
import { getUser } from "../utils/user";

export async function handler(
  request: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<any> {
  try {
    const prismaClient = await generateClient();

    const { username } = JSON.parse(request.body as string);

    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { username },
    });

    console.log({ userAlreadyExists });

    if (!!userAlreadyExists)
      return {
        statusCode: 409,
        message: "User with this username already exists",
      };

    const createdUser = await prismaClient.user.create({ data: { username } });

    return { statusCode: 201, body: JSON.stringify({ data: createdUser }) };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
