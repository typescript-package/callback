// Type.
import { CommonCallback } from "./common-callback.type";
export type ResultCallback<
  Value = unknown,
  Payload = Record<string, unknown>,
> = CommonCallback<Value, any, Payload, Value>;
