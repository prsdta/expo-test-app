import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Simple way of getting data via HTTP
 */
const performRequest = (method: HTTPMethod) => (
	responseType: XMLHttpRequestResponseType
) => (url: string): Promise<XMLHttpRequest['response']> =>
	new Promise((right, left) => {
		const request = new XMLHttpRequest();
		request.onload = (e) => {
			if (request.status === 200) {
				right(request.response);
			} else {
				left("server error");
			}
		};
		request.onerror = (e) => left(`Network error: ${request.statusText}`);
		request.responseType = responseType;
		request.open(method, url);
		request.send();
	});

const httpRequest = (method: HTTPMethod) => (
	responseType: XMLHttpRequestResponseType
) => (url: string): TaskEither<Error, XMLHttpRequest> => {
	return tryCatch(() => performRequest(method)(responseType)(url), toError);
};

/** GET helper */
export const getJson = httpRequest("GET")("json");

export const getXml = httpRequest("GET")("document");
