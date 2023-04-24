import { handler } from "../../src/functions/createRoom";
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { generateClient } from "../../src/database/client";

jest.mock("../../src/database/client");

describe("Create a Room", () => {
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

  it("Should create a room", async () => {
    const inputEvent = {
      headers: { Authorization: "token-123" },
      body: JSON.stringify({ name: "mocked-room" }),
    } as unknown as APIGatewayProxyEvent;

    const createdRoomMock = { id: "room-id-123", name: "mocked-room" };

    (prismaClient as any).room.findUnique.mockReturnValueOnce(null);
    (prismaClient as any).room.create.mockReturnValueOnce(createdRoomMock);

    const result = await handler(inputEvent, context);
    console.log({ result });

    expect(result.statusCode).toEqual(201);
    expect(JSON.parse(result.body)).toStrictEqual({ data: createdRoomMock });
  });

  it("Should return Unauthorized", async () => {
    const inputEvent = {
      headers: { Authorization: null },
      pathParameters: { id: "room-id-123" },
    } as unknown as APIGatewayProxyEvent;

    (prismaClient as any).user.findUnique.mockReturnValueOnce(null);

    const result = await handler(inputEvent, context);

    expect(result.statusCode).toEqual(401);
  });
});
