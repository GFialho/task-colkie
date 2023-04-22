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

    const user = await getUser(request);
    if (!user) return { statusCode: 401 };

    const { name } = JSON.parse(request.body as string);

    const roomAlreadyExists = prismaClient.room.findUnique({ where: { name } });

    if (!!roomAlreadyExists)
      return { statusCode: 409, message: "Room with this name already exists" };

    await prismaClient.room.create({ data: { name } });

    return { statusCode: 201 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
