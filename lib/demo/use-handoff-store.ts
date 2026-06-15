"use client";

import { useCallback, useEffect, useState } from "react";
import {
  claimHandoff,
  cancelHandoff,
  getActiveHandoffs,
  getHandoffs,
  subscribeHandoffs,
  triggerHandoff,
  type LiveHandoff,
  type TriggerHandoffInput,
} from "./handoff-store";

export function useHandoffStore() {
  const [handoffs, setHandoffs] = useState<LiveHandoff[]>(() =>
    typeof window !== "undefined" ? getHandoffs() : [],
  );
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setHandoffs(getHandoffs());
    return subscribeHandoffs(() => setHandoffs(getHandoffs()));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const trigger = useCallback((input?: TriggerHandoffInput) => triggerHandoff(input), []);

  const claim = useCallback((id: string, advisorName: string) => {
    return claimHandoff(id, advisorName);
  }, []);

  const activeHandoffs = handoffs.filter((h) => h.status !== "completed");
  const pendingHandoffs = handoffs.filter((h) => h.status === "pending");

  const cancel = useCallback((id: string) => cancelHandoff(id), []);

  return {
    handoffs,
    activeHandoffs,
    pendingHandoffs,
    now,
    trigger,
    claim,
    cancel,
    refresh: () => setHandoffs(getActiveHandoffs()),
  };
}
