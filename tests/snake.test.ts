import test from 'node:test';
import assert from 'node:assert/strict';
import { ArcadeSnake, BOARD } from '../src/games/snake.ts';

test('starts safely even when the random source selects the end of the grid', t => {
  t.mock.method(Math, 'random', () => 0.999999);
  const game = new ArcadeSnake();
  t.after(() => game.dispose());
  const state = game.getSnapshot();
  assert.equal(state.status, 'ready');
  assert.equal(state.body.length, 3);
  for (const cell of [...state.body, state.food]) {
    assert.ok(cell.x >= 0 && cell.x < BOARD.width);
    assert.ok(cell.y >= 0 && cell.y < BOARD.height);
  }
  assert.ok(!state.body.some(cell => cell.x === state.food.x && cell.y === state.food.y));
});

test('cannot reverse into itself; pause stops movement and resume continues', t => {
  const game = new ArcadeSnake();
  t.after(() => game.dispose());
  game.start();
  game.setDirection({ x: -1, y: 0 });
  game.step();
  assert.deepEqual(game.getSnapshot().body[0], { x: 8, y: 7 });
  game.stop();
  game.step();
  assert.equal(game.getSnapshot().status, 'paused');
  assert.deepEqual(game.getSnapshot().body[0], { x: 8, y: 7 });
  game.start();
  game.step();
  assert.deepEqual(game.getSnapshot().body[0], { x: 9, y: 7 });
});

test('food increases score and length; restart clears the round but retains best', t => {
  t.mock.method(Math, 'random', () => 0.5);
  const game = new ArcadeSnake();
  t.after(() => game.dispose());
  const food = game.getSnapshot().food;
  game.start();
  while (game.getSnapshot().body[0].x < food.x) game.step();
  game.setDirection({ x: 0, y: -1 });
  while (game.getSnapshot().body[0].y > food.y) game.step();
  assert.equal(game.getSnapshot().score, 10);
  game.step();
  assert.equal(game.getSnapshot().body.length, 4);
  game.reset();
  assert.equal(game.getSnapshot().score, 0);
  assert.equal(game.getSnapshot().body.length, 3);
  assert.equal(game.getSnapshot().best, 10);
  assert.equal(game.getSnapshot().status, 'ready');
});

test('wall collision ends the round and further ticks cannot change it', t => {
  const game = new ArcadeSnake();
  t.after(() => game.dispose());
  game.start();
  for (let i = 0; i < BOARD.width; i++) game.step();
  const state = game.getSnapshot();
  assert.equal(state.status, 'over');
  game.step();
  assert.equal(game.getSnapshot(), state);
  game.start();
  assert.equal(game.getSnapshot().status, 'over');
});

test('rapid pause/resume leaves only one active game clock', t => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  const game = new ArcadeSnake();
  t.after(() => game.dispose());
  game.start(); game.stop(); game.start(); game.start();
  t.mock.timers.tick(BOARD.tickMs);
  assert.deepEqual(game.getSnapshot().body[0], { x: 8, y: 7 });
  game.dispose();
  t.mock.timers.tick(BOARD.tickMs * 10);
  assert.deepEqual(game.getSnapshot().body[0], { x: 8, y: 7 });
});
