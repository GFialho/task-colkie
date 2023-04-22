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

    const { text } = JSON.parse(request.body as string);
    const { id: roomId } = request.pathParameters as any;

    if (!user) return { statusCode: 401 };

    await prismaClient.message.create({
      data: {
        text,
        roomId,
        senderId: user.id,
      },
    });

    return { statusCode: 201 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
