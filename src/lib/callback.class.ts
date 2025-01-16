// Type.
import {
  AsyncCallback,
  ErrorCallback,
  FailureCallback,
  StatusCallback,
  SuccessCallback,
  ValidationCallback
} from '../type';
/**
 * @description Manages the callback function of `CommonCallback`.
 * @export
 * @class Callback
 * @template [Value=unknown] 
 * @template [Result=any] 
 * @template {object} [Payload=object] 
 * @template [Return=any] 
 */
export class Callback<
  Value = unknown,
  Result = any,
  Payload extends object = object,
  Return = any
> {
  public static defineAsync<Return = boolean, Value = unknown, Result = any, Payload extends object = object>(
    callback: AsyncCallback<Value, Result, Payload, Return>,
    defaultPayload?: Payload
  ): AsyncCallback<Value, Result, Payload, Return> {
    return async (result: Result, value: Value, payload: Payload = {} as Payload) => 
      callback(result, value, {...(defaultPayload || {}), ...payload});
  }

  public static defineError<
    Value = any,
    Payload extends object = object,
    Message extends string | ((value: Value, payload: Payload) => string) = string,
    Type extends typeof Error = typeof Error,
  >(
    error: Type,
    message: Message,
    throwOnState: boolean = false,
    callback: ErrorCallback<Value, Payload, Message, Type>,
    defaultPayload?: Payload
  ): ErrorCallback<Value, Payload, Message, Type> {
    return (result: boolean, value: Value, payload: Payload = {} as Payload) => {
      const state = callback(result, value, {...(defaultPayload || {}), ...payload});
      if (state === throwOnState) {
        throw new error(message as string);
      }
      return state;
    }
  }

  public static defineFailure<Value, Payload extends object = object, Return = false>(
    callback: FailureCallback<Value, Payload, Return>,
    defaultPayload?: Payload
  ): FailureCallback<Value, Payload, Return> {
    return (value: Value, payload: Payload = {} as Payload): Return =>
      callback(value, { ...(defaultPayload || {}), ...payload })
  }

  public static defineStatus<Status, Value = any, Payload extends object = object, Return = Status>(
    callback: StatusCallback<Status, Value, Payload, Return>,
    defaultPayload?: Payload
  ): StatusCallback<Status, Value, Payload, Return> {
    return (status: Status, value: Value, payload: Payload = {} as Payload) =>
      callback(status, value, {...(defaultPayload || {}), ...payload});
  }

  public static defineSuccess<Value, Payload extends object = object, Return = true>(
    callback: SuccessCallback<Value, Payload, Return>,
    defaultPayload?: Payload
  ): SuccessCallback<Value, Payload, Return> {
    return (value: Value, payload: Payload = {} as Payload): Return =>
      callback(value, { ...(defaultPayload || {}), ...payload })
  }

  public static defineValidation<Value, Payload extends object = object, Return = boolean>(
    callback: ValidationCallback<Value, Payload, Return>,
    defaultPayload?: Payload
  ): ValidationCallback<Value, Payload, Return> {
    return (result: boolean, value: Value, payload: Payload = {} as Payload): Return => 
      callback(result, value, {...(defaultPayload || {}), ...payload});
  }

  public static setValidation<Value, Payload extends object = object, Return = boolean>(
    callback: ValidationCallback<Value, Payload, Return>,
    defaultPayload?: Payload
  ): typeof Callback {
    this.#validation = (result: boolean, value: Value, payload: Payload = {} as Payload): Return => 
      callback(result, value, {...(defaultPayload || {}), ...payload});
    return this;
  }

  static #validation: ValidationCallback<any, any, any>;
  
  #payload: Payload;
  #result: Result;
  #value: Value;
    
  constructor(
    type: 'async' | 'validation',
    result: Result,
    value: Value,
    payload: Payload = {} as Payload,
  ) {
    this.#result = result;
    this.#value = value;
    this.#payload = payload;
    type === 'validation' && Callback.#validation(result as boolean, value, payload);
  }

  public validation(
    callback: ValidationCallback<Value, Payload, Return> = Callback.#validation,
    defaultPayload?: Payload
 ): this {
    Callback.defineValidation<Value, Payload, Return>(callback, defaultPayload)(
      this.#result as boolean,
      this.#value,
      this.#payload
    );
    return this;
  }
}
