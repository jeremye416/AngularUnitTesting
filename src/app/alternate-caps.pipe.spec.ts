import { AlternateCapsPipe } from './alternate-caps.pipe';

describe('AlternateCapsPipe', () => {
  it('create an instance', () => {
    const pipe = new AlternateCapsPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms a sentence', () => {
    const pipe = new AlternateCapsPipe();
    expect(pipe.transform("Hello World")).toBe("hElLo wOrLd");
  });

  it('transforms lowercase', () => {
    const pipe = new AlternateCapsPipe();
    expect(pipe.transform("what a wonderful world")).toBe("wHaT A WoNdErFuL WoRlD");
  });

  it('transforms uppercase', () => {
    const pipe = new AlternateCapsPipe();
    expect(pipe.transform("THIS IS AMAZING")).toBe("tHiS Is aMaZiNg");
  });

});
