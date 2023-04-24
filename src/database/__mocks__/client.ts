const mock = {
  room: {
    update: jest.fn().mockReturnValue(true),
    findUnique: jest.fn().mockReturnThis(),
    create: jest.fn().mockReturnThis(),
  },
  user: {
    findUnique: jest.fn().mockReturnThis(),
    create: jest.fn().mockReturnThis(),
  },
  message: {
    findMany: jest.fn().mockReturnThis(),
    create: jest.fn().mockReturnThis(),
  },
};

export const generateClient = () => mock;
