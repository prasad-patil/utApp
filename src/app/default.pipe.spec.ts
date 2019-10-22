import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe;
  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  afterEach(() => (pipe = null));

  it('it should return fallback if value is empty', () => {
    expect(pipe.transform('', 'http://place-hold.it/300', false)).toBe(
      'http://place-hold.it/300'
    );
  });

  it('it should return value if value is not empty', () => {
    expect(pipe.transform('http://place-hold.it/300')).toBe(
      'http://place-hold.it/300'
    );
  });

  it('it should contain https if falg is true', () => {
    expect(pipe.transform('http://place-hold.it/300', 'someThing', true)).toBe(
      'https://place-hold.it/300'
    );
  });
});
