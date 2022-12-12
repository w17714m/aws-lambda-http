import { MiddleModifyRequestMiddleware } from './middle-modify-request.middleware';

describe('MiddleModifyRequestMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddleModifyRequestMiddleware()).toBeDefined();
  });
});
