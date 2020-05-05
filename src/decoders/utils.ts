import t, { Errors } from "io-ts";
import { either, tryCatch } from "fp-ts/lib/Either";

/** Decoder for a Date, taken from the io-ts docs */
export const DateFromString = new t.Type<Date, string, unknown>(
	"DateFromString",
	(u): u is Date => u instanceof Date,
	(u, c) =>
		either.chain(t.string.validate(u, c), (s) => {
			const d = new Date(s);
			return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
		}),
	(a) => a.toISOString()
);

/** Decoder for a URL */
export const URLFromString = new t.Type<URL, string, unknown>(
	"URLFromString",
	(u): u is URL => u instanceof URL,
	(u, c) =>
		either.chain(t.string.validate(u, c), (s) => {
			return tryCatch(
				() => new URL(s),
				(e) => <Errors>e
			);
		}),
	(a) => a.href
);
