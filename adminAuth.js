const admins = require('./adminScheema');
const jwt = require('jsonwebtoken'); // Optional for JWT

// POST route to add data   

const path = require('path');
const fs = require('fs');

exports.adminAddQuaeyAPI = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await admins.findOne({ email: req.body.email });
     
    if (existingUser) {
      return res.status(400).json({
        success: false, 
        message: "This email already exists. Please use a different email."
      });
    }
 
    // Check if lesseeId already exists   
    if (req.body.lesseeId) {
      const existingLessee = await admins.findOne({ lesseeId: req.body.lesseeId });
      if (existingLessee) {
        return res.status(400).json({
          success: false,
          message: "This lessee ID already exists. Please use a different ID."
        });
      }
    }

    // If both checks pass, create new admin
    const newAdmin = new admins({
      ...req.body,
    });

    await newAdmin.save();

    res.status(201).json({ 
      success: true,
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
      success: false,
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Check if lesseeId exists
exports.checkLesseeIdExists = async (req, res) => {
  try {
    const existingAdmin = await admins.findOne({ lesseeId: req.params.lesseeId });
    res.status(200).json({ 
      exists: !!existingAdmin,
      existingData: existingAdmin || null
    });
  } catch (error) {
    console.error('Error checking lesseeId:', error);
    res.status(500).json({ 
      message: "Internal server error"
    });
  }
}

// Update existing admin
exports.updateAdminData = async (req, res) => {
  try {
    const { lesseeId } = req.body;
    
    const updatedAdmin = await admins.findOneAndUpdate(
      { lesseeId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Admin data updated successfully",
      data: updatedAdmin
    });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ 
      message: "Internal server error"
    });
  }
}


// Update admin with credentials
exports.updateAdminWithCredentials = async (req, res) => {
  try {
    const { userId, fullname, email, lesseeId, password } = req.body;

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAdmin = await admins.findByIdAndUpdate(
      userId,
      {
        $set: {
          fullname,
          email,
          lesseeId,
          password,
        }
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Registration completed successfully",
      data: updatedAdmin
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// In your authController.js or similar

exports.loginAdmin = async (req, res) => {
  try {
    const { lesseeId, password } = req.body;

    // Find user by lesseeId (username)
    const admin = await admins.findOne({  lesseeId,password });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    // OR for hashed passwords:
    // const isMatch = await bcrypt.compare(password, admin.password);


    // Create token (optional)
    const token = jwt.sign(
      { id: admin._id, lesseeId: admin.lesseeId },
      process.env.token,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        lesseeId: admin.lesseeId,
        fullname: admin.fullname,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
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
    const lastEntry = await admins.findOne()
      .sort({ _id: -1 }) // or use { createdAt: -1 } if timestamps are enabled
      .lean();

    if (!lastEntry) {
      return res.status(404).json({ 
        success: false,
        message: 'No admin entries found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: lastEntry
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Internal server error", 
      error: error.message 
    });
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
  const { id } = req.params;
  const updateData = req.body;

  try {
    // First check if the document exists
    const existingDoc = await admins.findById(id);
    if (!existingDoc) {
      return res.status(404).json({ 
        message: "Admin not found", 
        data: null 
      });
    }

    // Then update it
    const updatedDoc = await admins.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    res.status(200).json({
      message: "Admin data updated successfully",
      data: updatedDoc,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      message: "Update failed",
      error: error.message,
      data: null,
    });
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
