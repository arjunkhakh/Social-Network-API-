const router = require('express').Router();
const { User } = require('../../models');


// /api/users
router.get('/', (req, res) => {
    User.findAll()
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/users/:_id
router.get('/_id', (req, res) => {
    User.findOne({
        where: {
            _id: req.body._id,
            thoughts: req.body.thoughts,
            friends: req.body.thoughts
        },
    })
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/users
router.post('/', async (req, res) => {
    // try {
    //     const newUser = await User.create({
    //       username: req.session.username,
    //       email: req.session.email,
    //     });
    //     res.status(200).json(newUser);
    //   } catch (err) {
    //     res.status(400).json(err);
    //   }

    User.create({
        username: req.body.username,
        email: req.body.email,
      })
        .then((userData) => {
          req.session.save(() => {
            req.session._id = userData._id;
            req.session.username = userData.username;
            req.session.email = userData.email;
    
            res.json(userData);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
})

router.put("/:_id", (req, res) => {
    User.update(req.body, {
      where: {
        _id: req.params.id,
      },
    })
      .then((userData) => {
        if (!userData[0]) {
          res.status(404).json({ message: "No user with this id found" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.delete("/:_id", (req, res) => {
    User.destroy({
      where: {
        _id: req.params._id,
      },
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id found" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });