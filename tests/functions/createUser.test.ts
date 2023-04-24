import { handler } from "../../src/functions/createUser";
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { generateClient } from "../../src/database/client";

jest.mock("../../src/database/client");

describe("Create an User", () => {
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

  it("Should create an user", async () => {
    const inputEvent = {
      body: JSON.stringify({ username: "mocked-username" }),
    } as unknown as APIGatewayProxyEvent;

    const createdUserMock = { username: "mocked-username" };

    (prismaClient as any).user.findUnique.mockReturnValueOnce(null);
    (prismaClient as any).user.create.mockReturnValueOnce(createdUserMock);

    const result = await handler(inputEvent, context);

    expect(result.statusCode).toEqual(201);
    expect(JSON.parse(result.body)).toStrictEqual({ data: createdUserMock });
  });

  it("Should return Conflict", async () => {
    const inputEvent = {
      body: JSON.stringify({ username: "mocked-username" }),
    } as unknown as APIGatewayProxyEvent;

    (prismaClient as any).user.findUnique.mockReturnValueOnce(true);

    const result = await handler(inputEvent, context);

    expect(result.statusCode).toEqual(409);
  });
});
