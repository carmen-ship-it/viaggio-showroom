"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

export type VisitorPath = "first_time" | "pre_researched";

export interface FinancingSelection {
  trimId: string;
  trimLabel: string;
  plazo: number;
  cuotaMin: number;
  cuotaMax: number;
}

export type ChildSeatOption = "yes" | "no" | "unknown";

export interface TestDriveDraft {
  spouseAttending?: boolean;
  childrenAttending?: boolean;
  childSeat?: ChildSeatOption;
  preferredTime?: string;
  routePreference?: string;
  email?: string;
}

interface SessionContextValue {
  visitorPath: VisitorPath;
  setVisitorPath: (path: VisitorPath) => void;
  trustSignals: number;
  recordTrustSignal: (reason?: string) => void;
  topicsVisited: string[];
  recordTopicVisit: (topicId: string) => void;
  compareTarget: string | null;
  setCompareTarget: (target: string | null) => void;
  financingSelection: FinancingSelection | null;
  setFinancingSelection: (selection: FinancingSelection | null) => void;
  financingInterestFlagged: boolean;
  setFinancingInterestFlagged: (flagged: boolean) => void;
  testDriveDraft: TestDriveDraft;
  setTestDriveDraft: (draft: TestDriveDraft) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  canShowConvertCta: boolean;
  canShowCompareCta: boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const TRUST_COMPARE_THRESHOLD = 2;
const TRUST_CONVERT_THRESHOLD = 4;

export function SessionProvider({ children }: { children: ReactNode }) {
  const [visitorPath, setVisitorPath] = useState<VisitorPath>("first_time");
  const [trustSignals, setTrustSignals] = useState(0);
  const [topicsVisited, setTopicsVisited] = useState<string[]>([]);
  const [compareTarget, setCompareTarget] = useState<string | null>(null);
  const [financingSelection, setFinancingSelection] =
    useState<FinancingSelection | null>(null);
  const [financingInterestFlagged, setFinancingInterestFlagged] =
    useState(false);
  const [testDriveDraft, setTestDriveDraft] = useState<TestDriveDraft>({});
  const [customerName, setCustomerName] = useState("");

  const recordTrustSignal = useCallback((reason?: string) => {
    setTrustSignals((n) => n + 1);
    trackEvent({ type: "trust_signal", metadata: { reason } });
  }, []);

  const recordTopicVisit = useCallback((topicId: string) => {
    setTopicsVisited((prev) =>
      prev.includes(topicId) ? prev : [...prev, topicId],
    );
    trackEvent({ type: "topic_view", metadata: { topicId } });
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      visitorPath,
      setVisitorPath,
      trustSignals,
      recordTrustSignal,
      topicsVisited,
      recordTopicVisit,
      compareTarget,
      setCompareTarget,
      financingSelection,
      setFinancingSelection,
      financingInterestFlagged,
      setFinancingInterestFlagged,
      testDriveDraft,
      setTestDriveDraft,
      customerName,
      setCustomerName,
      canShowCompareCta:
        trustSignals >= TRUST_COMPARE_THRESHOLD ||
        topicsVisited.includes("adas"),
      canShowConvertCta: trustSignals >= TRUST_CONVERT_THRESHOLD,
    }),
    [
      visitorPath,
      trustSignals,
      recordTrustSignal,
      topicsVisited,
      recordTopicVisit,
      compareTarget,
      financingSelection,
      financingInterestFlagged,
      testDriveDraft,
      customerName,
    ],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
