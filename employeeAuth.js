const employees = require("./employeeScheema");

exports.employeeData = async (req, res) => {
  try {
    const newEmployee = new employees(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Employee dispatch data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save dispatch data', error });
  }
};


exports.getLastEmployee = async (req, res) => {
  try {
    const lastEmployee = await employees.findOne()
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(1); // Limit to 1 result
    
    if (!lastEmployee) {
      return res.status(404).json({ message: 'No employee data found' });
    }
    
    res.status(200).json(lastEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch last employee data', error });
  }
};

// exports.employeeDataById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const employee = await employees.findById(id);

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee dispatch data not found' });
//     }

//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch dispatch data by ID', error });
//   }
// };
