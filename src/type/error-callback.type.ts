// Type.
import { CommonCallback } from "./common-callback.type";
export type ErrorCallback<
  Value = unknown,
  Payload = Record<string, unknown>,
  Message extends string | ((value: Value, payload: Payload) => string) = string,
  Type extends typeof Error = typeof Error,
> = CommonCallback<Value, boolean, Payload, boolean>;
