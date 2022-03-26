import request from 'supertest';
import app from '../app.js';

//TESTING DIFFERENT ROUTES FOR THE /products ENDPOIND
describe('Test the routes for the /products endpoind', function () {
  //TOKEN VALIDATIONS
  it('JWT Token is valid', async () => {
    const res = await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('JWT Token is NOT valid', async () => {
    const res = await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer randoMTestToken`);

    expect(res.statusCode).toBe(401);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  //RETURNING PRODUCTS
  it('returns succes when fetch /products endpoind', async () => {
    const res = await request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.text).toContain(`"success":true`);
  });

  it('should return an error if route its not found', async () => {
    const res = await request(app)
      .get('/productsTest')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.text).toContain(`"code":404`);
  });

  it('returns the product when call /id endpoind endpoind', async () => {
    const res = await request(app)
      .get('/products/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('returns product not found error', async () => {
    const res = await request(app)
      .get('/products/45671')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    console.log(res);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.text).toContain(
      `"message":"We couldn't find the product with the id 45671"`
    );
  });
});
