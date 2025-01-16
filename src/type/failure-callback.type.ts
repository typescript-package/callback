export type FailureCallback<
  Value = unknown,
  Payload = Record<string, unknown>,
  Return = false
> = (value: Value, payload?: Payload) => Return;
