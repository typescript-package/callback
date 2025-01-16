// Type.
import { CommonCallback } from "./common-callback.type";
export type ValidationCallback<
  Value = unknown,
  Payload = Record<string, unknown>,
  Return = boolean
> = CommonCallback<Value, boolean, Payload, Return>;
