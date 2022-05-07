const router = require('express').Router();
const Thought = require('../../models/Thought');


// /api/thoughts
router.get('/', (req, res) => {
    Thought.find()
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/thoughts/:_id
router.get('/:_id', (req, res) => {
    Thought.findOne({ _id: req.params._id, })
      .then((userData) => res.json(userData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

// /api/thoughts
router.post('/', async (req, res) => {
    Thought.create(req.body)
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
})

router.put("/:id", (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
  });
  
  router.delete("/:id", (req, res) => {
    Thought.findOneAndDelete({
        _id: req.params.id,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No Thought with this id found" });
          return;
        }
        res.json({ message: "Deleted Thought" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // /api/thoughts/:thoughtId/reactions
  router.post('/:_id/reactions', async (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
})

router.delete("/:_id/reactions", (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: { reactions: { id: req.params.id } } },
    { new: true }
  )
    .then((userData) => {
      if (!userData) {
        res
          .status(404)
          .json({ message: "No thoughts with this particular ID!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => res.status(400).json(err));
});


  module.exports = router;