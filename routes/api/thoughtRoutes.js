const router = require('express').Router();
const { Thought } = require('../../models/');


// /api/thoughts
router.get('/', (req, res) => {
    Thought.findAll()
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/thoughts/:_id
router.get('/_id', (req, res) => {
    Thought.findOne({
        where: {
            _id: req.body._id,
        },
    })
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/thoughts
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

    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: req.body._id,
      })
        .then((userData) => {
          req.session.save(() => {
            req.session.userId = userData._id;
            req.session.username = userData.username;
            req.session.thoughtText = userData.thoughtText;
    
            res.json(userData);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
})

router.put("/:_id", (req, res) => {
    Thought.update(req.body, {
      where: {
        _id: req.params.id,
      },
    })
      .then((userData) => {
        if (!userData[0]) {
          res.status(404).json({ message: "No Thought with this id found" });
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
    Thought.destroy({
      where: {
        _id: req.params._id,
      },
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No Thought with this id found" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });