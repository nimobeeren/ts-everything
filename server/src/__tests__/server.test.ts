import { Server } from 'http';
import request from 'supertest';
import { start } from '../server';

jest.mock('../schema.graphql');
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

  // TODO: test some GraphQL requests
});
