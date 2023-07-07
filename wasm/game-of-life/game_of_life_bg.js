let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
*/
export const Cell = Object.freeze({ Alive:1,"1":"Alive",Dead:0,"0":"Dead", });
/**
*/
export class Universe {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Universe.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_universe_free(ptr);
    }
    /**
    */
    tick() {
        wasm.universe_tick(this.__wbg_ptr);
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.universe_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} width
    */
    set_width(width) {
        wasm.universe_set_width(this.__wbg_ptr, width);
    }
    /**
    * @param {number} height
    */
    set_height(height) {
        wasm.universe_set_height(this.__wbg_ptr, height);
    }
    /**
    * @returns {number}
    */
    height() {
        const ret = wasm.universe_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    cells() {
        const ret = wasm.universe_cells(this.__wbg_ptr);
        return ret;
    }
    /**
    */
    reset_random() {
        wasm.universe_reset_random(this.__wbg_ptr);
    }
    /**
    */
    reset_pattern() {
        wasm.universe_reset_pattern(this.__wbg_ptr);
    }
    /**
    */
    render() {
        wasm.universe_render(this.__wbg_ptr);
    }
    /**
    * @returns {Universe}
    */
    static new() {
        const ret = wasm.universe_new();
        return Universe.__wrap(ret);
    }
}

export const __wbg_random_f67f027fd89c6d9c = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

