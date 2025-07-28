const { default: mongoose } = require("mongoose");
const querys = require("./queryScheema");

// Save query data with serial number from backend

// Save query data as it comes (no SerialNo generation)
exports.queryData = async (req, res) => {
  try {
    // Destructure to remove unwanted fields
    const { _id, createdAt, updatedAt, __v, ...cleanData } = req.body;

    // Log incoming data for debugging
    console.log('Incoming data:', cleanData);

    // Validate required fields
    if (!cleanData.SerialNo) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields (SerialNo  are required)'
      });
    }

    // Handle email uniqueness - either remove or generate unique email
    if (cleanData.email) {
      const existing = await querys.findOne({ email: cleanData.email });
      if (existing) {
        
        // Option 1: Skip saving email
        // delete cleanData.email;
        
        // Option 2: Generate unique email
        cleanData.email = `${Date.now()}_${cleanData.email}`;
      }
    }

    // Create new document 
    const newQuery = new querys({
      ...cleanData,
      createdAt: new Date()  
    });

    // Save the document
    const savedQuery = await newQuery.save();
  
    // Send response
    res.status(201).json({
      success: true,
      message: 'Data saved successfully',
      data: savedQuery
    });

  } catch (error) {
    console.error('Database save error:', error);
    
    let errorMessage = 'Failed to save data';
    if (error.code === 11000) { // MongoDB duplicate key error
      errorMessage = 'Duplicate key error - email already exists';
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack,
        fullError: error
      } : undefined
    }); 
  }
};
  // Delete single query

  exports.getAllQueries = async (req, res) => {
  try {
    const queries = await querys.find(); // Fetch all documents
    res.status(200).json(queries);
  } catch (error) {
    console.error('Error fetching queries:', error); 
    res.status(500).json({ error: 'Failed to fetch queries' });
  }
};


// In your backend controller
exports.getQueriesByLessee = async (req, res) => {
  try {
    const { lesseeId } = req.params;
    const queries = await querys.find({ lesseeId });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queries' });
  }
};



exports.getCurrentSerial = async (req, res) => {
 try {
    const latestQuery = await querys.findOne().sort({ createdAt: -1 }); // Sort by newest
// console.log(latestQuery);

    if (!latestQuery) {
      return res.status(404).json({
        success: false, 
        message: 'No data found'
      });
    }

    res.status(200).json({
      success: true,
      data: latestQuery
    });

  } catch (error) {
    // console.error('Error fetching latest query:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest data',
      
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }};



exports.getQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await querys.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }
    res.status(200).json(query);
  } catch (error) {
    // console.error('Error fetching query:', error); 
    res.status(500).json({ error: 'Failed to fetch query' });
  }
}; 



exports.deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const deletedQuery = await querys.findByIdAndDelete(id);
    if (!deletedQuery) {
      return res.status(404).json({ error: 'Query not found' });
    }
    res.status(200).json({ message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({ 
      error: 'Failed to delete query',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.deleteAllQueries = async (req, res) => {
  try {
    const result = await querys.deleteMany({});
    res.status(200).json({ 
      message: 'All queries deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) { 
    console.error('Error deleting all queries:', error);
    res.status(500).json({ 
      error: 'Failed to delete all queries',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



exports.generateNextSerial = async (req, res) => {
  try {
    // Get current highest serial
    const lastDoc = await querys.findOne().sort({ SerialNo: -1 });
    const currentSerial = lastDoc?.SerialNo || '0';
    
    // Calculate next serial (numeric increment)
    const nextSerial = String(Number(currentSerial) + 1);
    
    // Create new document with incremented serial
    const newDoc = await querys.create({
      SerialNo: nextSerial,
      isSerialUpdate: true
    });
    
    res.status(200).json({
      success: true,
      newSerial: nextSerial,
      data: newDoc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update serial number'
    });
  }};



exports.getCurrentDispatch = async (req, res) => {
  try {
    const lastEntry = await querys.findOne().sort({ createdAt: -1 });
    const currentDispatch = lastEntry?.dispatchNo || '1';
    res.json(currentDispatch);
  } catch (error) {
    console.error('Error fetching current serial:', error);
    res.status(500).json({ error: 'Failed to fetch serial number' });
  }
};


exports.generateNextDispatch = async (req, res) => {
  try {
    const lastEntry = await querys.findOne().sort({ createdAt: -1 });
    const currentDispatch = lastEntry?.dispatchNo || '1';
    console.log(currentDispatch);
    
    const nextDispatch = String(Number(currentDispatch) + 1);
console.log(nextDispatch);

    // Save the new serial as a record flagged for serial update
    await new querys({
      dispatchNo: nextDispatch,
      isSerialUpdate: true
    }).save();

    res.status(201).json(nextDispatch);
  } catch (error) {
    console.error('Error generating next serial:', error);
    res.status(500).json({ error: 'Failed to generate next serial number' });
  }
}; 


exports.getAllQueries = async (req, res) => {
  try {
    const queries = await querys.find(); // Fetch all documents
    res.status(200).json(queries);
  } catch (error) {
    console.error('Error fetching queries:', error); 
    res.status(500).json({ error: 'Failed to fetch queries' });
  }
};

// Get single query by ID

exports.getuserById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await querys.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }
    res.status(200).json(query);
  } catch (error) {
    console.error('Error fetching query:', error);
    res.status(500).json({ error: 'Failed to fetch query' });
  }
};


exports.getCurrentSerial = async (req, res) => {
 try {
    const latestQuery = await querys.findOne().sort({ createdAt: -1 }); // Sort by newest
console.log(latestQuery);

    if (!latestQuery) {
      return res.status(404).json({
        success: false, 
        message: 'No data found'
      });
    }

    res.status(200).json({
      success: true,
      data: latestQuery
    });

  } catch (error) {
    console.error('Error fetching latest query:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }};
