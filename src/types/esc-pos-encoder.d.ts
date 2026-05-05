declare module "esc-pos-encoder" {
  export default class EscPosEncoder {
    initialize(): this;
    align(value: "left" | "center" | "right"): this;
    bold(value: boolean): this;
    line(text: string): this;
    newline(): this;
    cut(): this;
    encode(): Uint8Array;
  }
}
