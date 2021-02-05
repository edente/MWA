const faculty = require("../models/facultys");
const Farmer = require("../models/farmers");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//faculty Sign in
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //simple validation
  if (!email || !password) {
    res.status(400).json({
      msg: "All fields are required"
    })
  }

  faculty.findOne({
      email: email
    })
    .then((faculty) => {
      if (!faculty.active) {
        res.status(400).json({
          msg: "Sorry, Your account is Deactivated.please contact adminstration for more Information."
        });
      }
      if (faculty) {
        bcrypt.compare(password, faculty.password).then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({
              id: faculty._id
            }, "yye", {
              expiresIn: 3600,
            });
            res.status(200).json({
              token,
              faculty
            });
          } else {
            res.status(400).json({
              msg: "Password doesn't match"
            });
          }
        });
      } else {
        res.status(400).json({
          msg: "This account doesn't exist"
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        msg: err
      });
    });
};


//faculty sign up

exports.signup = (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password
  } = req.body;
console.log(req.body ,"kkkkk")
  //simple validation
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    res.status(400).json({
      msg: "All fields are required"
    });
  }
  //Check existing farmer
  faculty.findOne({
      email: email
    })
    .then((facultyExist) => {
      if (facultyExist) {
        res.status(400).json({
          msg: "This account is already exists"
        });
      }
      return bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const faculty = new faculty({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            active: true,
            phoneNumber,
          });
          return faculty.save();
        })
        .then((faculty) => {
          const token = jwt.sign({
            id: faculty._id,
          }, "yye", {
            expiresIn: 3600,
          });
          res.status(200).json({
            token,
            faculty
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        msg: err
      });
    });
};

// get all facultys
exports.facultys = (req, res, next) => {
  faculty.find()
    .then((response) =>
      res.status(200).json(response)
    )
    .catch((error) =>
      res.status(404).json(error)
    )
}

//reset password
exports.resetPassword = (req, res, next) => {
  const {
    password
  } = req.body;
  console.log(req.body.password)
  return bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      return faculty.updateOne({
          _id: req.params.id
        }, {
          $set: {
            password: hashedPassword
          }
        })
        .then((response) =>
          res.status(200).json(response)
        )
        .catch((error) =>
          res.status(500).json(error)
        )
    })
    .catch((error) =>
      res.status(500).json(error)
    )

}
//faculty account deactivation

exports.deactivateAccount = (req, res, next) => {
  const {
    active
  } = req.body;

  faculty.updateOne({
      _id: req.params.id
    }, {
      $set: {
        active
      }
    })
    .then((response) =>
      res.status(200).json(response)
    )
    .catch((error) =>
      res.status(500).json(error)
    )
}

// add to cart

exports.addCart = async (req, res, next) => {
  console.log(req.body,"ADDDDDDDDDDD");
  let _id = req.body.product._id;
  let quantity = req.body.quantity;
  let subprice = req.body.subprice;
  let faculty = await faculty.findById({
    _id: req.params.id
  })

  let cart = faculty.cart;
  const index = cart.items.findIndex(item => {
    return item.product._id == _id;
  });
  console.log(index)
  let newQuantity = quantity;
  const newItems = [...cart.items];

  if (index >= 0) {
    newQuantity = cart.items[index].quantity + quantity;
    newItems[index].quantity = newQuantity;
  } else {
    newItems.push({
      product: req.body.product,
      quantity: newQuantity
    });
  }

  if (!cart.totalPrice) cart.totalPrice = parseInt(subprice);
  else cart.totalPrice += parseInt(subprice);


  const newCart = {
    items: newItems,
    totalPrice: cart.totalPrice
  };

  faculty.updateOne({
      _id: req.params.id
    }, {
      $set: {
        'cart': newCart,
      }
    }).then((response) =>
      res.status(200).json(response)
    )
    .catch((error) =>
      res.status(500).json(error)
    )

}

// get cart

exports.cart = (req, res, next) => {
  faculty.findById({
      _id: req.params.id
    }).then(response =>
      res.status(200).json(response.cart)
    )
    .catch((error) =>
      res.status(500).json(error)
    )
}

// delete from cart
exports.deleteCart = async (req, res, next) => {
  const {
    price,
    _id
  } = req.body.product;
  console.log("delete", req.body)
  let faculty = await faculty.findById({
    _id: req.params.id
  })
  let cart = faculty.cart;

  const index = cart.items.findIndex(item => {
    return item.product._id.toString() == _id.toString();
  });

  cart.totalPrice -= cart.items[index].quantity * parseInt(price);
  const newItems = cart.items.filter(item => {
    return item.product._id != _id;
  });
  console.log(newItems, "new")

  const newCart = {
    items: newItems,
    totalPrice: cart.totalPrice
  };

  faculty.updateOne({
      _id: req.params.id
    }, {
      $set: {
        'cart': newCart,
      }
    }).then((response) =>
      res.status(200).json(response)
    )
    .catch((error) =>
      res.status(500).json(error)
    )
}

// faculty history
exports.orderHistory = (req, res, next) => {
  let id = req.params.id;

  Farmer.find({role:"farmer"})
    .then(farmers => {
     return farmers.map(farmer => {
        let order = farmer.orders.filter(order => 
                 order.facultyId == id
        );
        if(order.length>0){
          return farmer;
        }
      })
    })
    .then((response) =>
      res.status(200).json(response)
    )
    .catch((error) =>
      res.status(500).json(error)
    )
}

