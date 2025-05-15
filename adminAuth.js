const admins = require('./adminScheema');

// POST route to add data
exports.adminAddQuaeyAPI =  async (req, res) => {
  try {
    const newAdmin = new admins(req.body);
    await newAdmin.save();
    res.status(201).json({ message: "Admin data added successfully", data: newAdmin });
  } catch (error) {
    console.error('Error adding admin data:', error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllAdminEntries = async (req, res) => {
  try {
    const entries = await admins.find();
    res.status(200).json({ data: entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Internal server error", error });
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

