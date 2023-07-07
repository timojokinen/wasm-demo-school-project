import * as wasm from "./game_of_life_bg.wasm";
import { __wbg_set_wasm } from "./game_of_life_bg.js";
__wbg_set_wasm(wasm);
export * from "./game_of_life_bg.js";
