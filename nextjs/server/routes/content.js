const { Router } = require('express');

const router = Router();

module.exports = (client) => {
  router.get('/*/:type/:id(\\d{8})/:slug', (req, res) => {
    console.info('content!!');
    const { id } = req.params;
    const actualPage = '/content';
    const props = { id };
    client.render(req, res, actualPage, props);
  });
};
