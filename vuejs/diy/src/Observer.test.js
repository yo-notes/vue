import { Observer } from './Observer';

describe('test observer (checkout the log info)', () => {
  let obj;
  beforeEach(() => {
    obj = {
      name: 'jonge',
      age: 23,
      job: ['writer', 'coder']
    };
  });

  test('should make the object type reactive', () => {
    new Observer(obj);
    expect(obj.age).toBe(23);
    obj.age = 29;
    expect(obj.age).toBe(29);
  });

  test('should make array type reactive', () => {
    new Observer(obj);

    expect(obj.job.join(',')).toBe('writer,coder');
    obj.job.push('designer');
    expect(obj.job.join(',')).toBe('writer,coder,designer');
    obj.job[0] = 'painter';
    expect(obj.job.join(',')).toBe('painter,coder,designer');
    obj.job.splice(1, 0, 'singer');
    expect(obj.job.join(',')).toBe('painter,singer,coder,designer');
  });
});
