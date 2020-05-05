import { Type, Errors, string, success, failure } from "io-ts";
import { either, tryCatch } from "fp-ts/lib/Either";

/** Decoder for a Date, taken from the io-ts docs */
export const DateFromString = new Type<Date, string, unknown>(
	"DateFromString",
	(u): u is Date => u instanceof Date,
	(u, c) =>
		either.chain(string.validate(u, c), (s) => {
			const d = new Date(s);
			return isNaN(d.getTime()) ? failure(u, c) : success(d);
		}),
	(a) => a.toISOString()
);

/** Decoder for a URL */
export const URLFromString = new Type<URL, string, unknown>(
	"URLFromString",
	(u): u is URL => u instanceof URL,
	(u, c) =>
		either.chain(string.validate(u, c), (s) => {
			return tryCatch(
				() => new URL(s),
				(e) => <Errors>e
			);
		}),
	(a) => a.href
);
