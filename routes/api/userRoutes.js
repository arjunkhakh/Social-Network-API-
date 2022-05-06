const router = require('express').Router();
const User = require('../../models/User');


// /api/users
router.get('/', (req, res) => {
    User.find()
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/users/:_id
router.get('/id', (req, res) => {
    // User.findOne({
    //     where: {
    //         _id: req.body._id,
    //         thoughts: req.body.thoughts,
    //         friends: req.body.thoughts
    //     },
    // })
    //   .then((userData) => res.json(userData))
    //   .catch((err) => {
    //     res.status(500).json(err);
    //   });

    User.findOne({ _id: req.params.id })
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// /api/users
router.post('/', async (req, res) => {
    User.create(req.body)
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
})

router.put("/:id", (req, res) => {
    User.updateOne(req.body, {
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
  
  router.delete("/:id", (req, res) => {
    User.findOneAndDelete({
      where: {
        id: req.params._id,
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

  module.exports = router;