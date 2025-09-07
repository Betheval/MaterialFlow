// test/materials.test.js
const cds = require('@sap/cds');

describe('Materials Service', () => {
  const { GET, POST, PATCH, DELETE } = cds.test("serve", __dirname + '/../srv');
  let createdMaterialId;
  it('should request materials', async () => {
    const {status} = await GET('/odata/v4/mflow/Materials', { auth: {username: 'admin', password: 'admin'}});
    expect(status).toBe(200);
  });
  it('should create a new material', async () => {
    const payload = {
      name: "Test Material",
      description: "Material for testing",
      quantity: 10,
      unitPrice: 5.0
    };
    const { status, data } = await POST('/odata/v4/mflow/Materials', payload, { auth: { username: 'admin', password: 'admin' } });
    expect(status).toBe(201);
    expect(data).toHaveProperty('ID');
    createdMaterialId = data.ID;
  });

  it('should update the material', async () => {
    const update = { quantity: 20 };
    const { status, data } = await PATCH(`/odata/v4/mflow/Materials(ID=${createdMaterialId},IsActiveEntity=false)`, update, { auth: { username: 'admin', password: 'admin' } });
    expect(status).toBe(200);
    expect(data.quantity).toBe(20);
  });

  it('should delete the material', async () => {
    const { status } = await DELETE(`/odata/v4/mflow/Materials(ID=${createdMaterialId},IsActiveEntity=false)`, { auth: { username: 'admin', password: 'admin' } });
    expect(status).toBe(204);
  });

});
