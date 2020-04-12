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
  
     
    const newprod = req.body;

  

  js.push(newprod);

     

  // saving the array in a file
  const da = JSON.stringify(js);
  fs.writeFileSync('signup.json', da, 'utf-8');
    

  res.redirect('/');
});



router.post('/home', (req, res) => {
  
     
  const { image, name, price } = req.body;

  
  let newprod = {
    id:json.length + 1,
    image,
    name,
    price
    
  };


  json.push(newprod);

     

  // saving the array in a file
  const data = JSON.stringify(json);
  fs.writeFileSync('products.json', data, 'utf-8');
    

  res.redirect('/home');
});

router.get('/delete/:id', (req, res) => {
  json = json.filter(d => d.id != req.params.id);

  // saving data
  const data = JSON.stringify(json);
  fs.writeFileSync('products.json', data, 'utf-8');

  res.redirect('/home')
  });






   router.post('/up', (req, res) => {
  console.log(req.body, req.params)
  const { id } = req.body;
  const { image,name,price } = req.body;

  json.forEach((product, i) => {
    if (product.id == id) {
      product.image = image;
       product.name = name;
        product.price = price;
    }
  });
  res.redirect('/home');

});
module.exports = router;


