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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
    User.create(req.body)
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
})

router.put("/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
  });
  
  router.delete("/:id", (req, res) => {
    User.findOneAndDelete({
        _id: req.params.id,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id found" });
          return;
        }
        res.json({ message: "Deleted User" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // /api/users/:userId/friends/:friendId

router.post('/:id/friends/:friendId', (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true }
  )
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
})

router.delete("/:id/friends/:friendId", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true }
  )
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
});

  module.exports = router;