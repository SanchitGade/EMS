export const leaveApplicationReminderTemplate = (
  employee,
  leaveApplication,
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
        background: #dc2626;
        color: white;
        padding: 20px;
        text-align: center;
      ">
        <h1 style="margin: 0;">
          Leave Application Requires Action
        </h1>
      </div>

      <div style="padding: 24px;">

        <h2 style="color: #1f2937;">
          Hi Admin 👋
        </h2>

        <p style="
          color: #4b5563;
          font-size: 16px;
          line-height: 1.6;
        ">
          A leave application is still pending approval and requires your attention.
        </p>

        <div style="
          background: #f8fafc;
          border-left: 4px solid #dc2626;
          padding: 16px;
          margin: 20px 0;
          border-radius: 6px;
        ">

          <p style="margin: 0;">
            <strong>Employee:</strong>
            ${employee.firstName} ${employee.lastName}
          </p>

          <p style="margin-top: 10px;">
            <strong>Department:</strong>
            ${employee.department}
          </p>

          <p style="margin-top: 10px;">
            <strong>Leave Type:</strong>
            ${leaveApplication.type}
          </p>

          <p style="margin-top: 10px;">
            <strong>Start Date:</strong>
            ${new Date(leaveApplication.startDate).toLocaleDateString("en-IN")}
          </p>

          <p style="margin-top: 10px;">
            <strong>End Date:</strong>
            ${new Date(leaveApplication.endDate).toLocaleDateString("en-IN")}
          </p>

          <p style="margin-top: 10px;">
            <strong>Reason:</strong>
            ${leaveApplication.reason}
          </p>

          <p style="margin-top: 10px;">
            <strong>Status:</strong>
            <span style="
              color: #d97706;
              font-weight: bold;
            ">
              PENDING
            </span>
          </p>

        </div>

        <p style="
          color: #dc2626;
          font-weight: bold;
          font-size: 16px;
        ">
          Please review and take action on this leave application.
        </p>

        <br />

        <p>Best Regards,</p>
        <p><strong>EMS System</strong></p>

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
