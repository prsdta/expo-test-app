import { TaskEither, tryCatch, left, right, chain } from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Simple way of getting data via HTTP
 */
const performRequest = (method: HTTPMethod) => (
	url: string
): Promise<XMLHttpRequest> => {
	return new Promise((right, left) => {
		const request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				left("cannot connect");
			}

			if (request.status === 200) {
				right(request);
			} else {
				left("server error");
			}
		};

		request.onerror = (e) => left(`Network error: ${request.statusText}`);

		request.open(method, url);
		request.send();
	});
};

const isJson = (req: XMLHttpRequest): TaskEither<Error, string> =>
	req.responseType === "json"
		? right(req.responseText)
		: left(new Error("not the right content type"));

const isXml = (req: XMLHttpRequest): TaskEither<Error, XMLDocument> =>
	req.responseType === "document" && req.responseXML
		? right(req.responseXML)
		: left(new Error("not the right content type"));

const httpRequest = (method: HTTPMethod) => (
	url: string
): TaskEither<Error, XMLHttpRequest> => {
	return tryCatch(() => performRequest("GET")(url), toError);
};

/** GET helper */
export const getJson = (url: string) => chain(isJson)(httpRequest("GET")(url));

export const getXml = (url: string) => chain(isXml)(httpRequest("GET")(url));
