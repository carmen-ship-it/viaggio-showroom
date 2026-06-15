/**
 * Canonical PathInstance contract — C-08.
 * Aligned with docs/schemas/path-instance.schema.json and
 * docs/governance/CPI_OS_DEPENDENCY_GRAPH.md §4.3, §5.
 */

/** Channel emitting edges into a PathInstance. */
export type PathChannel =
  | "kiosk"
  | "voice"
  | "whatsapp"
  | "consultant_tablet"
  | "copilot";

/** Lifecycle per DECISION_GRAPH_SPEC §4.2–4.3. */
export type PathInstanceState =
  | "active"
  | "pending_outcome"
  | "outcome_attached"
  | "frozen";

/** SCDG transition types — subset; extend per CPO without breaking schema. */
export type PathTransitionType =
  | "fear_to_proof"
  | "proof_to_resolution"
  | "proof_to_action"
  | "action_to_outcome"
  | "action_to_failure"
  | "override"
  | "spouse_injection"
  | "screen_transition"
  | "conversation_turn";

export interface PathEdge {
  /** UUID — unique per observed transition. */
  edgeId: string;
  from: string;
  to: string;
  transitionType: PathTransitionType | string;
  /** ISO 8601 datetime — when the transition was observed. */
  observedAt: string;
  channel: PathChannel;
  /** PCM turn index or kiosk step ordinal, when applicable. */
  turnIndex?: number;
  metadata?: Record<string, unknown>;
}

export type CanonicalSessionMintReason =
  | "session_start"
  | "async_continue"
  | "crm_backfill";

export type CanonicalSessionLinkReason =
  | "kiosk_primary"
  | "whatsapp_deep_link"
  | "consultant_handoff"
  | "crm_reconciliation"
  | "explicit_merge";

export type CanonicalSessionCollisionResolution =
  | "url_over_storage"
  | "expired_remint"
  | "superseded"
  | "none";

/** Cross-channel link manifest — C-09. See canonical-session.schema.json. */
export interface CanonicalSessionLink {
  canonicalSessionId: string;
  sessionId: string;
  channel: PathChannel;
  /** ISO 8601 datetime. */
  linkedAt: string;
  linkReason: CanonicalSessionLinkReason;
  isPrimary?: boolean;
}

export interface CanonicalSessionRecord {
  canonicalSessionId: string;
  links: CanonicalSessionLink[];
  /** ISO 8601 datetime. */
  mintedAt: string;
  mintChannel: PathChannel;
  mintReason: CanonicalSessionMintReason;
  persistedAt?: string;
  collisionResolution?: CanonicalSessionCollisionResolution;
}

/**
 * Ordered edge list for one channel trace within a purchase thread.
 * Immutable after freeze except outcome attachment (CRM-driven).
 */
export interface PathInstance {
  /** UUID — stable graph trace ID; may differ per channel under same canonicalSessionId. */
  pathInstanceId: string;
  /** Per-channel session ID. */
  sessionId: string;
  /** Cross-channel purchase-thread join key (CPI-G-COIE-10). */
  canonicalSessionId: string;
  channel: PathChannel;
  edges: PathEdge[];
  /** Semver — CPO version active when path started. */
  cpo_version: string;
  state: PathInstanceState;
  leadId?: string;
  householdId?: string;
  customerDnaId?: string;
  campaignFirstTouch?: string;
  assistedChannels?: PathChannel[];
  /** ISO 8601 datetime — set on session closure (pending_outcome). */
  frozenAt?: string;
  outcomeNodeId?: string;
  /** ISO 8601 datetime. */
  createdAt: string;
  /** ISO 8601 datetime. */
  updatedAt: string;
}

/** Minimum fields required to append an edge (factory input). */
export interface PathEdgeInput {
  from: string;
  to: string;
  transitionType: PathTransitionType | string;
  channel: PathChannel;
  turnIndex?: number;
  metadata?: Record<string, unknown>;
}

/** CRM close join uses canonicalSessionId per EB-002. */
export interface CloseJoinRef {
  canonicalSessionId: string;
  pathInstanceIds: string[];
}
