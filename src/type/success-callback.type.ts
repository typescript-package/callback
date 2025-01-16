export type SuccessCallback<
  Value = unknown,
  Payload = Record<string, unknown>,
  Return = true
> = (value: Value, payload?: Payload) => Return;
