// Class.
import { ValidationCallbacks } from './validation-callbacks.class';
// Type.
import {
  AsyncCallback,
  ErrorCallback,
  ErrorMessage,
  FailureCallback,
  StatusCallback,
  SuccessCallback,
  ValidationCallback
} from '@typedly/callback';
/**
 * @description Manages the callback function of `CommonCallback`.
 * @export
 * @class Callback
 * @template {object} [Payload=object] 
 * @template [Return=any] 
 * @template [Value=unknown] 
 * @template [Result=any] 
 */
export class Callback<
  Payload extends object = object,
  Return = any,
  Value = unknown,
  Result = any,
> {
  public static defineAsync<Result = any, Value = unknown, Payload = unknown, Return = unknown>(
    callback: AsyncCallback<Result, Value, Payload, Return>,
    defaultPayload?: Payload
  ): AsyncCallback<Result, Value, Payload, Return> {
    return async (result: Result, value: Value, payload: Payload = {} as Payload) => 
      callback(result, value, {...(defaultPayload || {}), ...payload});
  }

  public static defineError<
    Context = unknown,
    Payload extends object = object,
    Return = void,
    Message = string | ErrorMessage<Context, Payload>,
    Type extends typeof Error = typeof Error,
  >(
    error: Type,
    message: Message,
    throwOnState: boolean = false,
    callback: ErrorCallback<Context, Payload, Return, Type>,
    defaultPayload?: Payload
  ): ErrorCallback<Context, Payload, Return, Type> {
    return (context: Context, payload: Payload = {} as Payload) => {
      const state = callback(context, {...(defaultPayload || {}), ...payload});
      if (state === throwOnState) {
        throw new error(typeof message === "function" ? message(context, payload) : message);
      }
      return state;
    }
  }

  public static defineFailure<Value = unknown, Payload = unknown>(
    callback: FailureCallback<Value, Payload>,
    defaultPayload?: Payload
  ): FailureCallback<Value, Payload> {
    return (value: Value, payload: Payload = {} as Payload): void =>
      callback(value, { ...(defaultPayload || {}), ...payload })
  }

  public static defineStatus<Status, Value = unknown, Payload = unknown, Return = Status>(
    callback: StatusCallback<Status, Value, Payload, Return>,
    defaultPayload?: Payload
  ): StatusCallback<Status, Value, Payload, Return> {
    return (status: Status, value: Value, payload: Payload = {} as Payload) =>
      callback(status, value, {...(defaultPayload || {}), ...payload});
  }

  public static defineSuccess<Value = unknown, Payload = unknown>(
    callback: SuccessCallback<Value, Payload>,
    defaultPayload?: Payload
  ): SuccessCallback<Value, Payload> {
    return (value: Value, payload: Payload = {} as Payload): void =>
      callback(value, { ...(defaultPayload || {}), ...payload })
  }

  public static defineValidation<Value = unknown, Payload = unknown>(
    callback: ValidationCallback<Value, Payload>,
    defaultPayload?: Payload
  ): ValidationCallback<Value, Payload> {
    return (result: boolean, value: Value, payload: Payload = {} as Payload) => 
      callback(result, value, {...(defaultPayload || {}), ...payload});
  }

  public static setValidation<Value = unknown, Payload = unknown>(
    name: string,
    callback: ValidationCallback<Value, Payload>,
    defaultPayload?: Payload
  ): typeof Callback {
    this.validation.set(name, false, Callback.defineValidation<Value, Payload>(callback, defaultPayload));
    return this;
  }

  private static validation = new ValidationCallbacks();

  #name: string;
  #payload: Payload;
  #result?: Result;
  #value?: Value;

  constructor(
    name: string,
    result?: Result,
    value?: Value,
    payload: Payload = {} as Payload,
  ) {
    this.#name = name;
    this.#payload = payload;
    result && (this.#result = result);
    value && (this.#value = value);
  }

  public validation(
    name: string = this.#name,
    result: Result = this.#result || false as Result,
    value: Value = this.#value || undefined as Value,
    payload: Payload = this.#payload
  ): boolean | undefined {
    return Callback.validation.get(name)?.(result as boolean, value, payload);
  }
}
