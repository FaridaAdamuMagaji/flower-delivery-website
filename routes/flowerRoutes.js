/*const express = require('express')
const Flower = require('../models/flowerModel')
const multer = require('multer')
const path = require('path')
const router = express.Router()


const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

/*router.post('/assets', upload.single('flowerImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ 
        message: 'Image uploaded successfully!',
        imagePath: `/assets/${req.file.filename}`
    });
});

router.use('/assets', express.static(path.join(__dirname, '../uploads')));*/

/*
//get all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//get a single workout
router.get('/:id', (req, res) =>{
    res.json({mssg: 'GET a single workout'})
})

//post a new

router.post('/assets', upload.single('flowerImage'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const {names, description, price, category} = req.body

    try{
        const flower = await Flower.create({names, description, price, category})
        res.status(200).json(flower)
    } catch(error) {
        res.status(400).json({error: error.message})

    }
})

//delete a work
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a new workout'})
})

//update
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new workout'})
})

module.exports = router*/



/*const express = require("express");

const multer = require("multer");
const path = require("path");
const Flower = require('../models/flowerModel');

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: "./assets/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all flowers
router.get("/flowers", async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single flower by ID
router.get("/flowers/:id", async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ message: "Flower not found" });
    res.json(flower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new flower with an image upload
router.post("/flowers", upload.single("image"), async (req, res) => {
  const { name, description, category, price, } = req.body;
  const image = req.file ? `./assets/${req.file.filename}` : "";

  if (!name || !description || !category || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const flower = new Flower({ name, description, category, price, image });
    const newFlower = await flower.save();
    res.status(201).json(newFlower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a flower (with optional image update)
router.put("/flowers/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    let updateData = { name, description, category, price };

    if (req.file) {
      updateData.image = `/assets/${req.file.filename}`;
    }

    const updatedFlower = await Flower.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedFlower) return res.status(404).json({ message: "Flower not found" });

    res.json(updatedFlower);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a flower by ID
router.delete("/flowers/:id", async (req, res) => {
  try {
    const deletedFlower = await Flower.findByIdAndDelete(req.params.id);
    if (!deletedFlower) return res.status(404).json({ message: "Flower not found" });
    res.json({ message: "Flower deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;*/


/* MY WORKING CODE

const express = require("express");
const multer = require("multer");
const path = require("path");
const Flower = require('../models/flowerModel');

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: "./assets",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route to upload image and create a flower
router.post("/flowers", upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image = `/assets/${req.file.filename}`;

    // Ensure all fields are present
    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const flower = new Flower({ name, description, category, price, image });
    const savedFlower = await flower.save();

    res.status(201).json(savedFlower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;*/


const express = require("express");
const multer = require("multer");
const path = require("path");
const Flower = require("../models/flowerModel");

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: "./assets",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST route to upload image and create a flower
router.post("/flowers", upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image = `/assets/${req.file.filename}`;

    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const flower = new Flower({ name, description, category, price, image });
    const savedFlower = await flower.save();

    res.status(201).json(savedFlower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all flowers
router.get("/flowers", async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.status(200).json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single flower by ID
router.get("/flowers/:id", async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }
    res.status(200).json(flower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a flower by ID
router.put("/flowers/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    let updateData = { name, description, category, price };

    if (req.file) {
      updateData.image = `/assets/${req.file.filename}`;
    }

    const updatedFlower = await Flower.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedFlower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    res.status(200).json(updatedFlower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a flower by ID
router.delete("/flowers/:id", async (req, res) => {
  try {
    const deletedFlower = await Flower.findByIdAndDelete(req.params.id);
    if (!deletedFlower) {
      return res.status(404).json({ message: "Flower not found" });
    }
    res.status(200).json({ message: "Flower deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


