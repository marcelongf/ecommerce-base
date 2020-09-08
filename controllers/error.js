exports.handler404 = (req, res, next) => {
  res.status(404).render('404', { docTitle: 'page not found', path: '404' });
}