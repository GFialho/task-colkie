import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { generateClient } from "../database/client";

export async function handler(
  request: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<any> {
  try {
    const prismaClient = await generateClient();
    const { id: roomId } = request.pathParameters as any;

    const latestMessages = await prismaClient.message.findMany({
      where: { roomId },
      take: 30,
      orderBy: { createdAt: "desc" },
      include: { sender: true },
    });

    return { statusCode: 200, data: latestMessages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
