export type ClawPhase = "ready" | "grabbing" | "captured";

export interface ClawState {
  selectedIndex: number;
  capturedIndex: number | null;
  phase: ClawPhase;
}

export function createClawState(selectedIndex = 0): ClawState {
  return { selectedIndex, capturedIndex: null, phase: "ready" };
}

export function moveClaw(
  state: ClawState,
  direction: -1 | 1,
  projectCount: number,
): ClawState {
  if (projectCount <= 0 || state.phase === "grabbing") return state;
  return {
    selectedIndex:
      (state.selectedIndex + direction + projectCount) % projectCount,
    capturedIndex: null,
    phase: "ready",
  };
}

export function selectClawProject(
  state: ClawState,
  index: number,
  projectCount: number,
): ClawState {
  if (state.phase === "grabbing" || index < 0 || index >= projectCount) {
    return state;
  }
  return { selectedIndex: index, capturedIndex: null, phase: "ready" };
}

export function startGrab(state: ClawState): ClawState {
  return state.phase === "ready" ? { ...state, phase: "grabbing" } : state;
}

export function completeGrab(state: ClawState): ClawState {
  return state.phase === "grabbing"
    ? { ...state, capturedIndex: state.selectedIndex, phase: "captured" }
    : state;
}
