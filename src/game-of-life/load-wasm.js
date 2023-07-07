const { Universe, Cell } = await import("game-of-life");
const { memory } = await import("game-of-life/game_of_life_bg.wasm");

export { Universe, Cell, memory };
