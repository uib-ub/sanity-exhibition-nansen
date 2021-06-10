import {sanityClient as client} from '../../../../lib/sanity.server'
import { getDump } from "../lib/api";
import { toJSONLD } from "../lib";
import { context } from "../lib/context";

export default async function handler(req, res) {
  const response = await client.fetch(getDump);
  const data = await response;

  const result = toJSONLD(data)
  
  const json = {
    ...context,
    "@graph": result,
  };

  res.status(200).json(json);
}
