const express = require('express');
const fs = require('fs');
const router = express.Router();


   const  data = fs.readFileSync('products.json');
let json = JSON.parse(data);


 const  da = fs.readFileSync('signup.json');
let js = JSON.parse(da);



router.get('/home', (req, res) => {
  
  res.render('Home',{json});
});
router.get('/', (req, res) => {
  
  res.render('login',{json});
});

// Login
router.post('/login', (req, res) => {
  
       const us = req.body.username;
       console.log(us)
       const ps = req.body.password;
      for (let i = 0; i < js.length; i++) {
      
              if (js[i].username == us && js[i].password == ps) {

                 res.redirect("/home")
                  

              }

      }
       

        res.redirect("/signup")  

});

router.get('/signup', (req, res) => {
  
  res.render('signUp',{json});
});


router.post('/signup', (req, res) => { 
    const newproduct = req.body;
    js.push(newproduct);

     
 // saving the array in a file
  const data1= JSON.stringify(js);
  fs.writeFileSync('signup.json', data1, 'utf-8');
    res.redirect('/');
});

// Part Add 
router.post('/home', (req, res) => {
  const { image, name, price } = req.body;
  let newproduct = {
    id:json.length + 1,
    image,
    name,
    price
    
  };

  json.push(newproduct);

  const data = JSON.stringify(json);
  fs.writeFileSync('products.json', data, 'utf-8');
    

  res.redirect('/home');
});

// Part Delete
router.get('/delete/:id', (req, res) => {
  json = json.filter(d => d.id != req.params.id);

  // Saving data
  const data = JSON.stringify(json);
  fs.writeFileSync('products.json', data, 'utf-8');
  res.redirect('/home')
  });
  
// Part Update
  router.post('/update', (req, res) => {
  const { id } = req.body;
  const { image,name,price } = req.body;

  json.forEach((product) => {
    if (product.id == id) {
      product.image = image;
       product.name = name;
        product.price = price;
    }
  });
  const data = JSON.stringify(json);
  fs.writeFileSync('products.json', data, 'utf-8');
  res.redirect('/home')
  });

module.exports = router;


