import test from "node:test";
import assert from "node:assert/strict";
import {
  completeGrab,
  createClawState,
  moveClaw,
  selectClawProject,
  startGrab,
} from "../src/games/claw.ts";

test("wraps claw movement at both ends of the project rail", () => {
  assert.equal(moveClaw(createClawState(), -1, 6).selectedIndex, 5);
  assert.equal(moveClaw(createClawState(5), 1, 6).selectedIndex, 0);
});

test("selecting a project clears an earlier capture", () => {
  const captured = completeGrab(startGrab(createClawState(2)));
  const selected = selectClawProject(captured, 4, 6);
  assert.deepEqual(selected, {
    selectedIndex: 4,
    capturedIndex: null,
    phase: "ready",
  });
});

test("a grab captures the currently selected project", () => {
  const grabbing = startGrab(createClawState(3));
  assert.equal(grabbing.phase, "grabbing");
  assert.deepEqual(completeGrab(grabbing), {
    selectedIndex: 3,
    capturedIndex: 3,
    phase: "captured",
  });
});

test("does not move or select an invalid prize while the claw is grabbing", () => {
  const grabbing = startGrab(createClawState(1));
  assert.equal(moveClaw(grabbing, 1, 6), grabbing);
  assert.equal(selectClawProject(grabbing, 9, 6), grabbing);
  assert.equal(moveClaw(createClawState(), 1, 0).selectedIndex, 0);
});
