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

    const { id: roomId } = request.pathParameters as any;

    await prismaClient.room.update({
      where: { id: roomId },
      data: {
        users: { connect: { id: user.id } },
      },
    });

    return { statusCode: 201 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
