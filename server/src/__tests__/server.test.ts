import { Server } from 'http';
import request from 'supertest';
import { start } from '../server';

// We need to mock the schema file, since Jest does not use Parcel and therefore
// tries to load it as a regular JS module
jest.mock('../schema.graphql');
// Mock resolvers to match the mocked schema
jest.mock('../api');

describe('Server', () => {
  let server: Server;
  beforeEach(() => {
    server = start(process.env.PORT || 4000);
  });

  afterEach(() => {
    server.close();
  });

  it('responds to HTTP requests', async () => {
    const response = await request(server).get('/');
    expect(response).not.toBeNull();
  });
});
