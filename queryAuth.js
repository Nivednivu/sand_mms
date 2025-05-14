const querys = require("./queryScheema");

exports.queryData =  async (req, res) => {
  try {
    const newQuery = new querys(req.body);
    await newQuery.save();
    res.status(201).json({ message: 'Query saved successfully', data: newQuery });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ error: 'Failed to save query' });
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
