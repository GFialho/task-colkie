import { handler } from "../../src/functions/getLatestMessages";
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { generateClient } from "../../src/database/client";

jest.mock("../../src/database/client");

describe("Get Latest Messages", () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    jest.clearAllMocks();
    jest.resetModules();
  });

  const context = {
    getRemainingTimeInMillis: () => 10000,
  } as unknown as APIGatewayEventRequestContext;

  const prismaClient = generateClient();

  it("Should get latest messages", async () => {
    const inputEvent = {
      pathParameters: { id: "room-id-123" },
    } as unknown as APIGatewayProxyEvent;

    const messagesMock = [
      {
        sender: {
          username: "mocked-username",
          createdAt: "mocked-createdAt",
        },
        id: "clgv0ywnf0003klmynj63efog",
        text: "message2",
        roomId: "clgv0w2un0000klhnlkdkueb6",
        senderId: "clgv0rqe70000kl19khrclzio",
        createdAt: "2023-04-24T16:00:43.468Z",
      },
    ];

    (prismaClient as any).message.findMany.mockReturnValueOnce(messagesMock);

    const result = await handler(inputEvent, context);

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toStrictEqual({ data: messagesMock });
  });
});
