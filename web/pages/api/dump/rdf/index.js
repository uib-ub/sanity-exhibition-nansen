import {sanityClient as client} from '../../../../lib/sanity.server'
import { toJSONLD } from "../lib";
import { context } from "../lib/context";
import * as jsonld from "jsonld";
import { getDump } from "../lib/api";

export default async function rdfHandler(req, res) {
  const response = await client.fetch(getDump);
  const data = await response;

  const result = toJSONLD(data)

  const json = {
    ...context,
    "@graph": [...result],
  };

  const nquads = await jsonld.toRDF(json, { format: "application/n-quads" });

  res.status(200).send(nquads);
}
