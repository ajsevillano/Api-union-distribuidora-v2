import { errorMsgs } from '../data/errorMsg.js';
import {
  responseHandler,
  ErrorMsg,
  checkBodyObjIsEmpty,
  checkIfItemExist,
  notFound,
} from './products.js';

//Map errors messages
const getErrors = errorMsgs.map((error) => error.name);

describe('TEST helper functions', () => {
  it('returns a response', () => {
    const actual = responseHandler(true, 'Product not found');
    const expected = {
      success: expect.any(Boolean),
      payload: expect.any(String),
    };
    expect(actual).toStrictEqual(expected);
  });

  getErrors.forEach((error) => {
    it(`returns a msg for ${error} error`, () => {
      const actual = ErrorMsg(error);
      const expected = {
        code: expect.any(Number),
        status: expect.any(String),
        message: expect.any(String),
      };
      expect(actual).toStrictEqual(expected);
    });
  });
});
