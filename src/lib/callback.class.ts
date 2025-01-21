// Type.
import {
  AsyncCallback,
  ErrorCallback,
  ErrorMessage,
  FailureCallback,
  ProcessCallback,
  ResultCallback,
  StatusCallback,
  SuccessCallback,
  ValidationCallback
} from '@typedly/callback';
/**
 * @description Manages the various types of callbacks.
 * @export
 * @class Callback
 */
export class Callback {
  /**
   * @description Defines an asynchronous callback with a default payload.
   * @public
   * @static
   * @template [Result=any] 
   * @template [Value=unknown] 
   * @template {object} [Payload=object] 
   * @template [Return=unknown] 
   * @param {AsyncCallback<Result, Value, Payload, Return>} callback 
   * @param {?Payload} [defaultPayload] 
   * @returns {AsyncCallback<Result, Value, Payload, Return>} 
   */
  public static defineAsync<
    Result = any,
    Value = unknown,
    Payload extends object = object,
    Return = unknown
  >(
    callback: AsyncCallback<Result, Value, Payload, Return>,
    defaultPayload?: Payload
  ): AsyncCallback<Result, Value, Payload, Return> {
    return async (result: Result, value: Value, payload: Payload = {} as Payload) => 
      callback(result, value, {...(defaultPayload || {}), ...payload});
  }

  /**
   * @description Defines an error callback with customizable error handling.
   * @public
   * @static
   * @template [Context=unknown] 
   * @template {object} [Payload=object] 
   * @template [Return=void] 
   * @template [Message=string | ErrorMessage<Context, Payload>] 
   * @template {typeof Error} [Type=typeof Error] 
   * @param {Type} error 
   * @param {Message} message 
   * @param {boolean} [throwOnState=false] 
   * @param {ErrorCallback<Context, Payload, Return, Type>} callback 
   * @param {?Payload} [defaultPayload] 
   * @returns {ErrorCallback<Context, Payload, Return, Type>} 
   */
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

  /**
   * @description Defines a failure callback with a default payload.
   * @public
   * @static
   * @template [Value=unknown] 
   * @template {object} [Payload=object] 
   * @param {FailureCallback<Value, Payload>} callback 
   * @param {?Payload} [defaultPayload] 
   * @returns {FailureCallback<Value, Payload>} 
   */
  public static defineFailure<
    Value = unknown,
    Payload extends object = object,
  >(
    callback: FailureCallback<Value, Payload>,
    defaultPayload?: Payload
  ): FailureCallback<Value, Payload> {
    return (value: Value, payload: Payload = {} as Payload): void =>
      callback(value, { ...(defaultPayload || {}), ...payload })
  }

  /**
   * @description Defines a status callback with a default payload.
   * @public
   * @static
   * @template Status 
   * @template [Value=unknown] 
   * @template {object} [Payload=object] 
   * @template [Return=Status] 
   * @param {StatusCallback<Status, Value, Payload, Return>} callback 
   * @param {?Payload} [defaultPayload] 
   * @returns {StatusCallback<Status, Value, Payload, Return>} 
   */
  public static defineStatus<
    Status, Value = unknown,
    Payload extends object = object,
    Return = Status
  >(
    callback: StatusCallback<Status, Value, Payload, Return>,
    defaultPayload?: Payload
  ): StatusCallback<Status, Value, Payload, Return> {
    return (status: Status, value: Value, payload: Payload = {} as Payload) =>
      callback(status, value, {...(defaultPayload || {}), ...payload});
  }
  
  /**
   * @description Defines a result callback with a default payload.
   * @public
   * @static
   * @template Element 
   * @template [Return=Promise<void>] 
   * @param {ProcessCallback<Element, Return>} callback 
   * @returns {ProcessCallback<Element, Return>} 
   */
  public static defineProcess<
    Element,
    Return = Promise<void>
  >(
    callback: ProcessCallback<Element, Return>,
  ): ProcessCallback<Element, Return> {
    return (element: Element): Return => callback(element);
  }

  /**
   * @description Defines a success callback with a default payload.
   * @public
   * @static
   * @template [Value=unknown] 
   * @template {object} [Payload=object] 
   * @param {SuccessCallback<Value, Payload>} callback 
   * @param {?Payload} [defaultPayload] 
   * @returns {SuccessCallback<Value, Payload>} 
   */
  public static defineSuccess<
    Value = unknown,
    Payload extends object = object
  >(
    callback: SuccessCallback<Value, Payload>,
    defaultPayload?: Payload
  ): SuccessCallback<Value, Payload> {
    return (value: Value, payload: Payload = {} as Payload): void =>
      callback(value, { ...(defaultPayload || {}), ...payload })
  }

  /**
   * @description Defines a validation callback with a default payload.
   * @public
   * @static
   * @template [Value=unknown] 
   * @template {object} [Payload=object] 
   * @param {ValidationCallback<Value, Payload>} callback 
   * @param {?Payload} [defaultPayload] 
   * @returns {ValidationCallback<Value, Payload>} 
   */
  public static defineValidation<Value = unknown, Payload extends object = object>(
    callback: ValidationCallback<Value, Payload>,
    defaultPayload?: Payload
  ): ValidationCallback<Value, Payload> {
    return (result: boolean, value: Value, payload: Payload = {} as Payload) => 
      callback(result, value, this.#mergePayload<Payload>(payload, defaultPayload));
  }

  /**
   * @description Merge payload with the default.
   * @static
   * @template {object} [Payload=object] 
   * @param {Payload} payload 
   * @param {Payload} defaultPayload 
   * @returns {Payload} 
   */
  static #mergePayload<Payload extends object = object>(
    payload: Payload,
    defaultPayload?: Payload
  ): Payload {
    return {...(defaultPayload || {}), ...payload};
  }
}
