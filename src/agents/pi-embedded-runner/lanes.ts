import { CommandLane } from "../../process/lanes.js";

export function resolveSessionLane(key: string) {
  const cleaned = key.trim() || CommandLane.Main;
  return cleaned.startsWith("session:") ? cleaned : `session:${cleaned}`;
}

export function resolveGlobalLane(lane?: string) {
  const cleaned = lane?.trim();
  if (!cleaned) {
    return CommandLane.Main;
  }
  // Map cron lane to nested to prevent deadlock when isolated cron jobs
  // trigger inner operations (e.g. compaction). Outer execution holds the
  // cron lane slot; inner work now uses nested lane.
  if (cleaned === "cron") {
    return CommandLane.Nested;
  }
  return cleaned;
}

export function resolveEmbeddedSessionLane(key: string) {
  return resolveSessionLane(key);
}
