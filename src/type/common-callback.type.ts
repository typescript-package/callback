/**
 * @description Represents a callback function with parameters, the `value` being processed, the `result` of this processing, an optional
 * `payload`, and the ability to return a custom value of generic type variable `Return`.
 * @param result The processed result of generic type variable `Result` type of the given `value`.
 * @param value The value of the generic type variable `Value` to be processed and which the given `result` applies.
 * @param payload An optional parameter of a generic type variable `Payload` to provide data - additional context or metadata.
 * @export
 * @template [Value] Determines `value` parameter type.
 * @template [Result] Specifies the type of the `result` parameter, indicating the outcome of the processing.
 * @template [Payload] Indicates `payload` parameter type.
 * @template [Return] Specifies the type of the return value of the callback.
 * @returns The returned value is generic type variable `Return` indicating the processing result of the given `value`.
 */
export type CommonCallback<
  Value,
  Result,
  Payload,
  Return
> = (
  result: Result,
  value: Value,
  payload?: Payload
) => Return;


/*
Result type
- Validation: boolean
- Status codes: number
- Custom outcomes: enum
*/

/*
enum Status {
  Success = "SUCCESS",
  Error = "ERROR",
}

const statusCallback: ResultCallback<string, { error: string }, Status> = (
  result,
  value,
  payload
) => {
  console.log(`Status: ${result}, Message: ${value}`);
  if (payload?.error) console.error(`Error: ${payload.error}`);
  return result === Status.Success;
};

statusCallback(Status.Success, "Operation completed");
statusCallback(Status.Error, "Operation failed", { error: "Network issue" });
*/

/*
const numericCallback: ResultCallback<string, null, number> = (result, value) => {
  console.log(`Code: ${result}, Message: ${value}`);
  return result === 200; // Treat HTTP 200 as success
};

numericCallback(200, "OK"); // true
numericCallback(404, "Not Found"); // false
*/


/*
const asyncCallback: ResultCallback<number, boolean, {}, Promise<string>> = async (
  result,
  value
) => {
  return result
    ? Promise.resolve(`Success with value: ${value}`)
    : Promise.reject(`Failure with value: ${value}`);
};

asyncCallback(true, 100).then(console.log).catch(console.error);
// Output: Success with value: 100
*/


/*
interface ComplexResult {
  status: "success" | "error";
  message: string;
}

const complexCallback: ResultCallback<number, ComplexResult, { retry: boolean }, void> = (
  result,
  value,
  payload
) => {
  console.log(`Status: ${result.status}, Message: ${result.message}`);
  if (payload?.retry) console.log("Retrying...");
};

complexCallback(
  { status: "error", message: "Failed to process" },
  404,
  { retry: true }
);
// Logs: Status: error, Message: Failed to process
// Logs: Retrying...
*/