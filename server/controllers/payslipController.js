import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

// Create Payslip
// POST /api/payslips
export const createPayslip = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } =
      req.body;

    if (!employeeId || !month || !year || basicSalary === undefined) {
      return res.status(400).json({ error: "Missing field" });
    }

    // Salary Creation
    const salary = Number(basicSalary);
    const allowance = Number(allowances || 0);
    const deduction = Number(deductions || 0);
    const netSalary = salary + allowance - deduction;

    const payslip = await Payslip.create({
      employeeId,
      month: Number(month),
      year: Number(year),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
    });

    return res
      .status(201)
      .json({ success: true, message: "Payslip created", data: payslip });
  } catch (error) {
    return res.status(500).json({ error: "Failed" });
  }
};

// Get payslips list
// GET /api/payslips
export const getPayslips = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";

    if (isAdmin) {
      const payslips = await Payslip.find()
        .populate("employeeId")
        .sort({ createdAt: -1 });

      const data = payslips.map((p) => {
        const obj = p.toObject();

        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId,
        };
      });

      return res.json({ data });
    } else {
      const employee = await Employee.findOne({
        userId: session.userId,
      });

      if (!employee) {
        return res.status(404).json({
          error: "Employee Not Found",
        });
      }

      const payslips = await Payslip.find({
        employeeId: employee._id,
      }).sort({
        createdAt: -1,
      });

      return res.json({ data: payslips });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch data",
    });
  }
};

// Get payslip by ID
// GET /api/payslips/:id
export const getPayslipsById = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id)
      .populate("employeeId")
      .lean();

    if (!payslip) {
      return res.status(404).json({
        error: "Payslip Not Found",
      });
    }

    const result = {
      ...payslip,
      id: payslip._id.toString(),
      employee: payslip.employeeId,
    };

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Fail To Fetch",
    });
  }
};
