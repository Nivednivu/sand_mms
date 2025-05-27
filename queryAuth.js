const querys = require("./queryScheema");

// Save query data
exports.queryData = async (req, res) => {
  try {
    const { _id, createdAt, updatedAt, ...cleanData } = req.body;

    const newQuery = new querys({
      ...cleanData,
      createdAt: new Date()
    });

    const savedQuery = await newQuery.save();

    res.status(201).json({
      success: true,
      message: 'Data saved successfully',
      data: savedQuery
    });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get latest serial number
exports.getCurrentSerial = async (req, res) => {
  try {
    const latestQuery = await querys.findOne().sort({ createdAt: -1 });

    if (!latestQuery) {
      return res.status(200).json({ success: true, data: { SerialNo: 0 } });
    }

    res.status(200).json({ success: true, data: latestQuery });

  } catch (error) {
    console.error('Error fetching latest query:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest data',
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
    const nextDispatch = String(Number(currentDispatch) + 1);

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
exports.getQueryById = async (req, res) => {
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
