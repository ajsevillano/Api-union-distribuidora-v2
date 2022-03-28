import { errorMsgs } from '../data/errorMsg.js';
import {
  responseHandler,
  ErrorMsg,
  checkBodyObjIsEmpty,
  checkIfItemExist,
} from './products.js';

describe('TEST helper functions', () => {
  describe('CHECK valid responses', () => {
    const responses = [
      [false, 'Product not found'],
      [true, 'Product found'],
    ];
    responses.forEach((response) => {
      it(`returns ${response[0]} response for ${response[1]}`, () => {
        const actual = responseHandler(response[0], response[1]);
        const expected = {
          success: expect.any(Boolean),
          payload: expect.any(String),
        };
        expect(actual).toStrictEqual(expected);
      });
    });
  });

  describe('RETURN error messages', () => {
    const getErrors = errorMsgs.map((error) => error.name);
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
  describe('CHECK body', () => {
    it('Object is empty', () => {
      const actual = checkBodyObjIsEmpty({});
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('Object is not empty', () => {
      const actual = checkBodyObjIsEmpty({ id: 1, category: 'wine' });
      const expected = false;
      expect(actual).toBe(expected);
    });
  });

  describe('CHECK items exist in the DB', () => {
    it('Item doesnt exist', () => {
      const actual = checkIfItemExist({ rowCount: 0 }, 12);
      const expected = {
        success: false,
        payload: expect.any(Object),
      };
      expect(actual).toStrictEqual(expected);
    });

    it('Item exist', () => {
      const data = { rowCount: 1, rows: { id: 1, name: 'successProduct' } };
      const actual = checkIfItemExist(data, 12);
      const expected = {
        success: true,
        payload: expect.any(Object),
      };
      expect(actual).toStrictEqual(expected);
    });
  });
});
