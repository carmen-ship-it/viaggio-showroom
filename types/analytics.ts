/** Reserved for Phase 2.1+ — analytics event types aligned with docs/schemas/conversion-event.schema.json */

export type ConversionEventType =
  | "session_start"
  | "vehicle_select"
  | "theme_view"
  | "topic_view"
  | "tour_start"
  | "tour_complete"
  | "compare_view"
  | "test_drive_intent"
  | "whatsapp_click"
  | "consultant_handoff";

export interface AnalyticsEventPayload {
  type: ConversionEventType;
  sessionId?: string;
  vehicleSlug?: string;
  metadata?: Record<string, unknown>;
}
