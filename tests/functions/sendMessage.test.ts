import { handler } from "../../src/functions/sendMessage";
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { generateClient } from "../../src/database/client";

jest.mock("../../src/database/client");

describe("Send a Message", () => {
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

  it("Should send a message to a room", async () => {
    const inputEvent = {
      headers: { Authorization: "token-123" },
      pathParameters: { id: "room-id-123" },
      body: JSON.stringify({ text: "mocked-message" }),
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(inputEvent, context);

    expect(result.statusCode).toEqual(201);
  });

  it("Should return Unauthorized", async () => {
    const inputEvent = {
      headers: { Authorization: null },
      pathParameters: { id: "room-id-123" },
      body: JSON.stringify({ text: "mocked-message" }),
    } as unknown as APIGatewayProxyEvent;

    (prismaClient as any).user.findUnique.mockReturnValueOnce(null);

    const result = await handler(inputEvent, context);

    expect(result.statusCode).toEqual(401);
  });
});
