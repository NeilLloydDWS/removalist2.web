import type { FeaturePageData } from "./types";
import { calendarScheduling } from "./calendar-scheduling";
import { jobManagement } from "./job-management";
import { fleetManagement } from "./fleet-management";
import { onlineBookings } from "./online-bookings";
import { customerCommunications } from "./customer-communications";
import { invoicingXero } from "./invoicing-xero";
import { dashboardAnalytics } from "./dashboard-analytics";
import { mobileApp } from "./mobile-app";
import { teamChat } from "./team-chat";

export const featurePages: Record<string, FeaturePageData> = {
  "calendar-scheduling": calendarScheduling,
  "job-management": jobManagement,
  "fleet-management": fleetManagement,
  "online-bookings": onlineBookings,
  "customer-communications": customerCommunications,
  "invoicing-xero": invoicingXero,
  "dashboard-analytics": dashboardAnalytics,
  "mobile-app": mobileApp,
  "team-chat": teamChat,
};
