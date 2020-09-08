const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-products', { 
    docTitle: 'Adicionar produto',
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body;
  console.log(title, imageUrl, price, description);
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        prods: products,
        hasProds: products.length > 0,
        docTitle: 'Admin Products'
      })
    })
    .catch(err => console.log(err));
    
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      if(!prodId){
        return res.redirect('/');
      }
      res.render('admin/add-products', { 
        docTitle: 'Editar produto',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err))
    1
}

exports.postEditProduct = (req, res, next) => {
  const {productId, title, imageUrl, price, description} = req.body;
  console.log('ATRIBUTOS', title, imageUrl, price, description);
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
  const updatedProd = new Product(productId, title, imageUrl, description, price);
  updatedProd.save();
}

exports.postDeleteProduct = (req, res, next) => {
  const {productId} = req.body;
  Product.findByPk(productId)
    .then(product => {
      product.destroy();
    })
    .then(result => {
      console.log("Destruido");
    })
    .catch(err => console.log(err));
  res.redirect('/admin/products');
}