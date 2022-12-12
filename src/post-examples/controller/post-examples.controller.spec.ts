import { Test, TestingModule } from '@nestjs/testing';
import { PostExamplesController } from './post-examples.controller';

describe('PostExamplesController', () => {
  let controller: PostExamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostExamplesController],
    }).compile();

    controller = module.get<PostExamplesController>(PostExamplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
