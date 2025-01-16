// Class.
import { Callback } from "./callback.class";
// Type.
import { ValidationCallback } from "../type";
/**
 * @description
 * @export
 * @class ValidationCallbacks
 * @template {string} Names 
 */
export class ValidationCallbacks<Names extends string> {
  #callback: Map<Names, ValidationCallback<any, any, any>> = new Map();

  constructor(...names: Names[]) {
    names.forEach(name => this.#callback.set(name, null as any));
  }

  public async asyncExecute<Value, Payload extends object = object, Return = boolean>(
    name: Names,
    result: boolean,
    value?: Value,
    payload?: Payload
  ): Promise<Return> {
    return await this.#callback.get(name)?.(result, value, payload);
  }

  public execute<Value, Payload extends object = object, Return = boolean>(
    name: Names,
    result: boolean,
    value?: Value,
    payload?: Payload
  ): Return {
    return this.#callback.get(name)?.(result, value, payload);
  }

  public get<Value, Payload extends object = object, Return = boolean>(name: Names): ValidationCallback<Value, Payload, Return> | undefined {
    return this.#callback.get(name) as ValidationCallback<Value, Payload, Return> | undefined;
  }

  public list(): Names[] {
    return Array.from(this.#callback.keys());
  }
  
  public remove(name: Names): this {
    this.#callback.delete(name);
    return this;
  }

  public set<Value, Payload extends object = object, Return = boolean>(
    name: Names,
    async = false,
    callback: ValidationCallback<Value, Payload, Return | Promise<Return>>,
    defaultPayload?: Payload,
  ): this {
    this.#callback.set(
      name,
      async === true
      ? async (
        result: boolean,
        value: Value,
        payload?: Payload,
      ): Promise<Return> => Callback.defineValidation<Value, Payload, Promise<Return>>(callback as any, defaultPayload)(result, value, payload)
      : Callback.defineValidation(callback, defaultPayload)
    );
    return this;
  } 
}
