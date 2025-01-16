// Type.
import { CommonCallback } from "./common-callback.type";
export type AsyncCallback<
  Value = unknown,
  Result = any,
  Payload = Record<string, unknown>,
  Return = Result
> = CommonCallback<Value, Result, Payload, Promise<Return>>;
