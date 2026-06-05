import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";
import { attendanceReminderTemplate } from "../templates/attendanceReminderTemplates.js";
import { leaveApplicationReminderTemplate } from "../templates/leaveApplicationTemplate.js";
import { attendanceReminderCronsTemplate } from "../templates/attendanceReminderCronsTemplate.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "EMS" });

// Autocheck
const autoCheckOut = inngest.createFunction(
  { id: "auto-check-out", triggers: [{ event: "employee/check-out" }] },

  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    // Wait for 9 hours
    await step.sleepUntil(
      "wait-for-the-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000),
    );

    let attendance = await Attendance.findById(attendanceId);

    if (!attendance?.checkOut) {
      const employee = await Employee.findById(employeeId);

      // Send reminder email to employee
      await sendEmail({
        to: employee.email,
        subject: "Attendence Check Out Reminder",
        body: attendanceReminderTemplate(employee, attendance),
      });

      await step.sleepUntil(
        "wait-for-1-hour",
        new Date(Date.now() + 1 * 60 * 60 * 1000),
      );

      attendance = await Attendance.findById(attendanceId);

      if (!attendance?.checkOut) {
        attendance.checkOut = new Date(
          new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000,
        );

        attendance.workingHours = 4;
        attendance.dayType = "Half Day";
        attendance.status = "LATE";

        await attendance.save();
      }
    }
  },
);

//Leave Application Reminder
//Sending email to admin, if admin doesnt take action on leave application within 24
const leaveApplicationsReminder = inngest.createFunction(
  { id: "leave-application-reminder", triggers: [{ event: "leave/pending" }] },

  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    await step.sleepUntil(
      "wait-for-24-hours",
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    );

    const leaveApplication =
      await LeaveApplication.findById(leaveApplicationId);

    if (leaveApplication?.status === "PENDING") {
      const employee = await Employee.findById(leaveApplication.employeeId);

      //Sending reminder email to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Leave Application Reminder",
        body: leaveApplicationReminderTemplate(employee, leaveApplication),
      });
    }
  },
);

//Absent Employee Mail
//Cron: Check the attendance at 11:30 AM IST and eamil all absent employee
const attendanceReminderCrons = inngest.createFunction(
  {
    id: "attendance-reminder-cron",
    triggers: [{ cron: "TZ=Asia/Kolkata 30 11 * * *" }],
  }, // 11:30 AM IST

  async ({ step }) => {
    // 1. Today's date range
    const today = await step.run("get-today-date", () => {
      const startUTC = new Date(
        new Date().toLocaleString("en-CA", {
          timeZone: "Asia/Kolkata",
        }) + "T00:00:00+05:30",
      );

      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);

      return {
        startUTC: startUTC.toISOString(),
        endUTC: endUTC.toISOString(),
      };
    });

    // 2. Active employees
    const activeEmployees = await step.run("get-active-employees", async () => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();

      return employees.map((e) => ({
        _id: e._id.toString(),
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        department: e.department,
      }));
    });

    // 3. Employees on approved leave
    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: { $lte: new Date(today.endUTC) },
        endDate: { $gte: new Date(today.startUTC) },
      }).lean();

      return leaves.map((l) => l.employeeId.toString());
    });

    // 4. Employees who checked in today
    const checkedInIds = await step.run("get-checked-in-ids", async () => {
      const attendances = await Attendance.find({
        date: {
          $gte: new Date(today.startUTC),
          $lt: new Date(today.endUTC),
        },
      }).lean();

      return attendances.map((a) => a.employeeId.toString());
    });

    // 5. Absent employees
    const absentEmployees = activeEmployees.filter(
      (emp) => !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id),
    );

    // 6. Send reminder emails
    await Promise.all(
      absentEmployees.map((employee) =>
        sendEmail({
          to: employee.email,
          subject: "Attendance Reminder - Please Mark Your Attendance",
          body: attendanceReminderCronsTemplate(employee),
        }),
      ),
    );

    return {
      totalActive: activeEmployees.length,
      onLeave: onLeaveIds.length,
      checkedIn: checkedInIds.length,
      absent: absentEmployees.length,
    };
  },
);

// Add the function to the exported array:
export const functions = [
  autoCheckOut,
  leaveApplicationsReminder,
  attendanceReminderCrons,
];
