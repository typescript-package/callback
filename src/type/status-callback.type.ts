// Type.
import { CommonCallback } from "./common-callback.type";
export type StatusCallback<
  Status,
  Value = unknown,
  Payload = Record<string, unknown>,
  Return = Status
> = CommonCallback<Value, Status, Payload, Return>;
