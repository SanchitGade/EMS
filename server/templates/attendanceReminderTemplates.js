export const attendanceReminderTemplate = (
  employee,
  attendance
) => {
  return `
    <div style="
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      background: #ffffff;
    ">

      <div style="
        background: #2563eb;
        color: white;
        padding: 20px;
        text-align: center;
      ">
        <h1 style="margin: 0;">
          Attendance Check-Out Reminder
        </h1>
      </div>

      <div style="padding: 24px;">

        <h2 style="color: #1f2937;">
          Hi ${employee.firstName} 👋
        </h2>

        <p style="
          color: #4b5563;
          font-size: 16px;
          line-height: 1.6;
        ">
          We noticed that you checked in today but have not
          checked out yet.
        </p>

        <div style="
          background: #f8fafc;
          border-left: 4px solid #2563eb;
          padding: 16px;
          margin: 20px 0;
          border-radius: 6px;
        ">
          <p style="margin: 0;">
            <strong>Department:</strong>
            ${employee.department}
          </p>

          <p style="margin-top: 10px;">
            <strong>Check-In Time:</strong>
            ${attendance?.checkIn?.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <p style="
          color: #dc2626;
          font-weight: bold;
        ">
          Please make sure to check out within the next hour.
        </p>

        <p style="
          color: #4b5563;
          line-height: 1.6;
        ">
          If you have already checked out, please ignore this email.
        </p>

        <br />

        <p>Best Regards,</p>
        <p><strong>EMS</strong></p>

      </div>

      <div style="
        background: #f3f4f6;
        text-align: center;
        padding: 12px;
        color: #6b7280;
        font-size: 12px;
      ">
        Employee Management System
      </div>

    </div>
  `;
};