module.exports = function(app, passport, { User, Item }) {
  app.get('/', function(req, res) {
    res.render('index.ejs', { user: req.user || null, title: 'Home' });
  });

  app.get('/home', isLoggedIn, (req, res) => {
    Item.find({ owner: req.user._id }).then(items => {
      res.render('home.ejs', { items, user: req.user, title: 'Inventory'  });
    }).catch(err => {
      res.status(500).send('Error fetching items');
    });
  });

  app.get('/items/new', isLoggedIn, (req, res) => {
    res.render('newItem.ejs', { user: req.user, title: 'New Item' });
  });

  app.post('/items/new', isLoggedIn, (req, res) => {
    const { name, description, imageURL, quantity, minimumStock } = req.body;
    const newItem = new Item({
      name,
      description,
      imageURL,
      quantity,
      minimumStock,
      owner: req.user._id
    });
    newItem.save().then(() => {
      res.redirect('/home');
    }).catch(err => {
      res.status(500).send('Error saving item');
    });
  });

  app.get('/items/:itemID', isLoggedIn, (req, res) => {
    const id = req.params.itemID;
    Item.findOne({ _id: id, owner: req.user._id }).then(item => {
      if (item) {
        res.render('item.ejs', { item, user: req.user, title: item.name });
      } else {
        res.status(404).send('Item not found');
      }
    }).catch(err => {
      res.status(500).send('Error fetching item');
    });
  });

  app.put('/items/:itemID', isLoggedIn, (req, res) => {
    const { name, description, imageURL, quantity, minimumStock } = req.body;
    Item.findOneAndUpdate(
      { _id: req.params.itemID, owner: req.user._id },
      { name, description, imageURL, quantity, minimumStock },
      { new: true }
    ).then(updatedItem => {
      if (updatedItem) {
        res.status(200).send('Item updated successfully');
      } else {
        res.status(404).send('Item not found');
      }
    }).catch(err => {
      res.status(500).send('Error updating item');
    });
  });

  app.delete('/items/:itemID', isLoggedIn, (req, res) => {
    Item.findOneAndDelete(
      { _id: req.params.itemID },
      { new: true }
    ).then(deletedItem => {
      if (deletedItem) {
        res.status(200).json({ success: 'Item Deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    }).catch(err => {
      res.status(500).send(`Error updating item: ${err}`);
    });
  });

  app.get('/logout', function(req, res) {
    req.logout(() => {
      console.log('User has logged out!');
    });
    res.redirect('/');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage'), user: null, title: 'Login'  });
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage'), user: null, title: 'Sign up'  });
  });

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}
