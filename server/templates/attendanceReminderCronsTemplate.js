export const attendanceReminderCronsTemplate = (employee) => {
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
        background: #dc2626;
        color: white;
        padding: 20px;
        text-align: center;
      ">
        <h1 style="margin: 0;">
          Attendance Reminder
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
          We noticed that you have not marked your attendance today.
        </p>

        <div style="
          background: #fef2f2;
          border-left: 4px solid #dc2626;
          padding: 16px;
          margin: 20px 0;
          border-radius: 6px;
        ">
          <p style="margin: 0;">
            <strong>Department:</strong>
            ${employee.department}
          </p>

          <p style="margin-top: 10px;">
            <strong>Status:</strong>
            Attendance Not Marked
          </p>

          <p style="margin-top: 10px;">
            <strong>Deadline:</strong>
            11:30 AM
          </p>
        </div>

        <p style="
          color: #dc2626;
          font-weight: bold;
          font-size: 16px;
        ">
          Your attendance is still pending.
        </p>

        <p style="
          color: #4b5563;
          line-height: 1.6;
        ">
          Please mark your attendance as soon as possible.
        </p>

        <p style="
          color: #4b5563;
          line-height: 1.6;
        ">
          If you're experiencing any issues, please contact your administrator.
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
