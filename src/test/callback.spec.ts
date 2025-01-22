import { Status } from "../enum/status.enum";
import { Callback } from "../lib";

let asyncCallback = Callback.defineAsync((result, value, payload) => {
  console.log(`AsyncCallback`, result, value, payload);
  return new Promise(resolve => {
    resolve('string');
  });
});

let errorCallback = Callback.defineError(Error, "The error", false, (context, payload, message, type) => {
  console.log(`ErrorCallback`, context, payload, message, type);
});

let failureCallback = Callback.defineFailure<number>((value, payload) => {
  console.log(`FailureCallback`, value, payload);
});

let processCallback = Callback.defineProcess((element) => {
  console.log(`ProcessCallback`, element);
});

let statusCallback = Callback.defineStatus<Status, number>((status, value, payload) => {
  console.log(`StatusCallback`, status, value, payload);
  return status;
});

let successCallback = Callback.defineSuccess<number>((value, payload) => {
  console.log(`SuccessCallback`, value, payload);
});


let validationCallback = Callback.defineValidation((result, value, payload) => {
  console.log(`ValidationCallback`, value, payload);
  return result;
});

describe(`Callback`, () => {
  it(`defineAsync`, async () => {
    asyncCallback = Callback.defineAsync<number>((result, value, payload) => {
      console.log(`AsyncCallback`, result, value, payload);
      expect(value).toEqual('string');
      expect(payload).toEqual({ });
      return new Promise(resolve => {
        resolve('string');
      });    
    });
    await asyncCallback(false, 'string', { }).then((value) => expect(value).toEqual('string'));
  });

  it(`defineError`, () => {
    errorCallback = Callback.defineError(Error, "The error", false, (context, payload, message, type) => {
      console.log(`ErrorCallback`, context, payload, message, type);
      expect(context).toEqual({'code': 127});
      expect(payload).toEqual({ min: 125 });
      expect(message).toEqual("Message");
      expect(type).toEqual(Error);
      return false;
    });
    try {
      errorCallback({'code': 127}, { min: 125 }, "Message", Error);
    } catch(error) {
      console.log(error);
    }
  });

  it(`defineFailure`, () => {
    failureCallback = Callback.defineFailure<number>((value, payload) => {
      console.log(`FailureCallback`, value, payload);
      expect(value).toEqual(127);
      expect(payload).toEqual({ min: 125 });
    });
    failureCallback(127, { min: 125 });
  });

  it(`defineProcess`, () => {
    processCallback = Callback.defineProcess(element => {
      console.log(`ProcessCallback`, element);
      expect(element).toEqual(137);
    });
    processCallback(137);
  });

  it(`defineStatus`, () => {
    statusCallback = Callback.defineStatus<Status, number>((status, value, payload) => {
      console.log(`StatusCallback`, status, value, payload);
      expect(value).toEqual(37);
      expect(payload).toEqual({ success: false });
      return status;
    });
    statusCallback(Status.Failure, 37, { success: false });
  });

  it(`defineSuccess`, () => {
    successCallback = Callback.defineSuccess<number>((value, payload) => {
      console.log(`SuccessCallback`, value, payload);
      expect(value).toEqual(27);
      expect(payload).toEqual({ min: 25 });
    });
    successCallback(27, { min: 25 });
  });

  it(`defineValidation`, () => {
    validationCallback = Callback.defineValidation((result, value, payload) => {
      console.log(`ValidationCallback`, value, payload);
      expect(result).toBeFalse();
      expect(value).toEqual('string');
      expect(payload).toEqual({ 'not-empty': true, 'lowercase': false });
      return result;
    });
    validationCallback(false, 'string', { 'not-empty': true, 'lowercase': false });
  });
});

// AsyncCallback
// console.group(`AsyncCallback`);
// const asyncCallback = Callback.defineAsync((result, value, payload) => {
//   return new Promise<number>((resolve) => {
//     console.log(`value, `, value);
//     setTimeout(() => resolve(value as number * 2), 1000);  // Simulating async logic
//   });
// })

// asyncCallback(new Promise((resolve) => resolve(5)), 10).then((value) => console.log(`value: `, value));

// console.groupEnd();





// ErrorCallback
// console.group(`ErrorCallback`);
// const errorCallback = Callback.defineError(Error, 'a', false, (result, value, payload) => {
//   return result;
// })

// try {
//   errorCallback(false, []);
// } catch(error) {
//   console.log(error);
// }
// console.groupEnd();




// FailureCallback
// console.group(`FailureCallback`);
// const failureCallback = Callback.defineFailure<string, {[index: string]: any }>((value, payload) => {
//   console.log(`value,`, value);
//   console.log(`payload,`, payload);
//   return false;
// }, {'test': 1, "rule": "non-empty"})

// failureCallback('', {'a': 1});
// console.groupEnd();





// StatusCallback
// console.group(`StatusCallback`);
// const statusCallback = Callback.defineStatus<Status, any, {}, boolean>((status, value, payload) => {
//   console.log(`status, `, status);
//   console.log(`value, `, value);
//   console.log(`payload, `, payload);
//   return false;
// });

// statusCallback(Status.Success, 'test', {'a': 2});
// console.groupEnd();





// SuccessCallback
// console.group(`SuccessCallback`);
// const successCallback = Callback.defineSuccess<string, {[index: string]: any }>((value, payload) => {
//   console.log(`value,`, value);
//   console.log(`payload,`, payload);
//   return true;
// }, {'test': 1, "rule": "non-empty"})

// successCallback('', {'a': 1});
// console.groupEnd();


// Default callbacks.
// Callback.setValidation('isValid', (result, value, payload) => {
//   console.log(`validationCallback: `, 'isValid', result, value, payload);
//   return false;
// })

// // Instance.
// const callback = new Callback('isValid');

// callback.validation('isValid');



// /*
// Result type
// v Validation: boolean
// v Status codes: number
// v Custom outcomes: enum
// */

// /*
// enum Status {
//   Success = "SUCCESS",
//   Error = "ERROR",
// }

// const statusCallback: ResultCallback<string, { error: string }, Status> = (
//   result,
//   value,
//   payload
// ) => {
//   console.log(`Status: ${result}, Message: ${value}`);
//   if (payload?.error) console.error(`Error: ${payload.error}`);
//   return result === Status.Success;
// };

// statusCallback(Status.Success, "Operation completed");
// statusCallback(Status.Error, "Operation failed", { error: "Network issue" });
// */

// /*
// const numericCallback: ResultCallback<string, null, number> = (result, value) => {
//   console.log(`Code: ${result}, Message: ${value}`);
//   return result === 200; // Treat HTTP 200 as success
// };

// numericCallback(200, "OK"); // true
// numericCallback(404, "Not Found"); // false
// */


// /*
// const asyncCallback: ResultCallback<number, boolean, {}, Promise<string>> = async (
//   result,
//   value
// ) => {
//   return result
//     ? Promise.resolve(`Success with value: ${value}`)
//     : Promise.reject(`Failure with value: ${value}`);
// };

// asyncCallback(true, 100).then(console.log).catch(console.error);
// // Output: Success with value: 100
// */


// /*
// interface ComplexResult {
//   status: "success" | "error";
//   message: string;
// }

// const complexCallback: ResultCallback<number, ComplexResult, { retry: boolean }, void> = (
//   result,
//   value,
//   payload
// ) => {
//   console.log(`Status: ${result.status}, Message: ${result.message}`);
//   if (payload?.retry) console.log("Retrying...");
// };

// complexCallback(
//   { status: "error", message: "Failed to process" },
//   404,
//   { retry: true }
// );
// // Logs: Status: error, Message: Failed to process
// // Logs: Retrying...
// */