const admins = require('./adminScheema');

// POST route to add data
const path = require('path');
const fs = require('fs');

exports.adminAddQuaeyAPI = async (req, res) => {
  try {
    // Handle file upload
    // Create new admin with file info
    const newAdmin = new admins({
      ...req.body,

    });

    await newAdmin.save();

    res.status(201).json({ 
      message: "Admin data added successfully", 
      data: newAdmin 
    });
  } catch (error) {
    console.error('Error adding admin data:', error);
    
    // Clean up uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getAllAdminEntries = async (req, res) => {
  try {
    const entries = await admins.find();
    
    // Transform entries to include full signature URL

    res.status(200).json({ data: entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllAdminEntriesLast = async (req, res) => {
  try {
    const limit = req.query.limit || 10; // Default to 10 if not specified
    const entries = await admins.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    res.status(200).json({ data: entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
// Add this to serve signature images
exports.getSignature = async (req, res) => {
  try {
    const admin = await admins.findById(req.params.id);
    if (!admin || !admin.signature) {
      return res.status(404).send('Signature not found');
    }
    
    res.sendFile(admin.signature.path);
  } catch (error) {
    console.error('Error fetching signature:', error);
    res.status(500).send('Error fetching signature');
  }
};

exports.admingetQueryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    const result = await admins.findById(id); // or findOne({ _id: id })
    if (!result) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching query:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Import your model

// Controller to update an entry by ID
exports.adminUpdateQueryById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    const result = await admins.findByIdAndUpdate(id, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Query not found for update" });
    }

    res.status(200).json({
      message: "Query updated successfully",
      updatedEntry: result
    });
  } catch (error) {
    console.error('Error updating query:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE: Delete query by ID
exports.adminDeleteQueryById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    const result = await admins.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Query not found for deletion" });
    }

    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({ message: "Server error" });
  }
};
