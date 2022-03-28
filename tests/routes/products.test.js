import request from 'supertest';
import app from '../../app.js';

//TOKEN VALIDATIONS
describe('CHECK valid token', () => {
  it('JWT Token is valid', async () => {
    await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200);
  });

  it('JWT Token is NOT valid', async () => {
    await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer randoMTestToken`)
      .expect(401);
  });
});

describe('GET /products', () => {
  it('returns success when fetch /products endpoind', async () => {
    await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200);
  });

  it(`returns an error if route it's not found`, async () => {
    await request(app)
      .get('/productsTest')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(404)
      .expect((res) => {
        const actual = res.body;
        const expected = {
          error: {
            code: 404,
            status: 'Not found',
            message: `We couldn't find what you were looking for`,
          },
        };
        expect(actual).toStrictEqual(expected);
      });
  });
});

describe('GET /products/:id', () => {
  it('returns a product when call /id endpoind', async () => {
    await request(app)
      .get('/products/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200);
  });

  it('returns an error when id is not found', async () => {
    await request(app)
      .get('/products/45671')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect((res) => {
        const actual = res.body;
        const expected = {
          success: false,
          payload: {
            code: 404,
            status: 'Not found',
            message: `We couldn't find the product with the id 45671`,
          },
        };
        expect(actual).toStrictEqual(expected);
      });
  });

  it('returns an error when ID is out of range', async () => {
    await request(app)
      .get('/products/2147483650')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect((res) => {
        const actual = res.body;
        const expected = {
          success: false,
          payload: {
            code: 400,
            status: 'Bad request',
            message: 'Not a valid range for the ID',
          },
        };
        expect(actual).toStrictEqual(expected);
      });
  });

  it('returns an error when id < 0', async () => {
    await request(app)
      .get('/products/-4')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect((res) => {
        const actual = res.body;
        const expected = {
          success: false,
          payload: {
            code: 400,
            status: 'Bad request',
            message: 'Not a valid range for the ID',
          },
        };
        expect(actual).toStrictEqual(expected);
      });
  });

  it('returns an error when id is not a number', async () => {
    await request(app)
      .get('/products/as4!c')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect((res) => {
        const actual = res.body;
        const expected = {
          success: false,
          payload: {
            code: 400,
            status: 'Bad request',
            message: 'The product id must be a valid number',
          },
        };
        expect(actual).toStrictEqual(expected);
      });
  });
});
