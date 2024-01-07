import { rm } from 'fs/promises';
import { join } from 'path';

beforeEach(async () => {
  try {
    await rm(join('test.sqlite'));
  } catch (error) {}
});
