import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// GET employees
// GET /api/employees
export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    const where = {};

    if (department) where.department = department;

    const employees = await Employee.find(where)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "FAILED TO FETCH EMPLOYEES DATA" });
  }
};

//Create employees
//POST /api/employees
export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: `Missing required fields` });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role: role || "EMPLOYEE",
    });

    const employee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: new Date(joinDate),
      bio: bio || "",
    });

    return res.status(201).json({ success: true, employee });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email Already Exists" });
    }
    console.error("Create employee error: ", error);
    return res.status(500).json({ error: "Failed to create employee" });
  }
};

//Update Employee
//PUT /api/employee/:id
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      password,
      role,
      bio,
      employmentStatus,
    } = req.body;

    const employee = await Employee.findById(id);

    if (!employee)
      return res.status(404).json({ error: "Sorry, Employee Not Found." });

    // await Employee.findByIdAndUpdate(
    //   id,
    //   {
    //     firstName,
    //     lastName,
    //     email,
    //     phone,
    //     position,
    //     department: department || "Engineering",
    //     basicSalary: Number(basicSalary) || 0,
    //     allowances: Number(allowances) || 0,
    //     deductions: Number(deductions) || 0,
    //     employmentStatus: employmentStatus || "ACTIVE",
    //     bio: bio || "",
    //   },
    //   { new: true },
    // );

    const employeeUpdate = {};

    if (firstName) employeeUpdate.firstName = firstName;
    if (lastName) employeeUpdate.lastName = lastName;
    if (email) employeeUpdate.email = email;
    if (phone) employeeUpdate.phone = phone;
    if (position) employeeUpdate.position = position;
    if (department) employeeUpdate.department = department;
    if (bio) employeeUpdate.bio = bio;
    if (basicSalary !== undefined)
      employeeUpdate.basicSalary = Number(basicSalary);
    if (allowances !== undefined)
      employeeUpdate.allowances = Number(allowances);
    if (deductions !== undefined)
      employeeUpdate.deductions = Number(deductions);
    if (employmentStatus) employeeUpdate.employmentStatus = employmentStatus;
    await Employee.findByIdAndUpdate(id, employeeUpdate, { new: true });

    const userUpdate = {};
    if (email) userUpdate.email = email;
    if (role) userUpdate.role = role;
    if (password) userUpdate.password = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(employee.userId, userUpdate);

    return res.json({ success: true, message: "Updated successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: "Failed To Update Employee" });
  }
};

//Delete Employee
//DELETE /api/employee/:id
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee)
      return res.status(404).json({ error: "Sorry, Employee Not Found." });

    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";
    await employee.save();

    return res.json({ success: true, message:"Employee deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Fail To Delete The Employee" });
  }
};
