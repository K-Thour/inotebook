const express = require("express");
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
// Route 1: Fetch all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/", fetchuser, async (req, res) => {
  try {
    // Fetching notes from database
    const notes = await Note.find({ user: req.user })
      .then((notes) => res.json(notes))
      // Sending response
      .catch((err) => {
        res.status(500).send("notes not found");
      });
  } catch (err) {
    // Error handling
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Creating a new note
    try {
      const errors = validationResult(req);
      const { title, description, tag } = req.body;
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: "Please authanticate the user\n", errors });
      }
      await Note.create({
        title,
        description,
        tag,
        user: req.user,
      })
        // Sending response
        .then((note) => res.json(note))
        .catch((err) => {
          res.status(500).send("unable to create a note");
        });
      // Error handling
    } catch (error) {
      res.status(500).json({ error: `Internal Server Error ${error}` });
    }
  }
);

// Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Find note by id
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find note by id and update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }
    if (note.user.toString() !== req.user) {
      return res.status(401).send("Not Allowed wrong user");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
    // Error handling
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find note by id and delete
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }
    // Allow deletion only if user owns the note
    if (note.user.toString() !== req.user) {
      return res.status(401).send("Not Allowed wrong user");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted\n", note });
    // Error handling
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
