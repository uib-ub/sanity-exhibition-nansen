import {sanityClient as client} from '../../../../lib/sanity.server'
import { getDump } from "../lib/queries";
import { toJSONLD } from "../lib";
import { context } from "../lib/context";

export default async function handler(req, res) {
  const response = await client.fetch(getDump);
  const body = await response;

  const json = toJSONLD(body)
  
  const jsonldData = {
    ...context,
    "@graph": json,
  };

  res.status(200).json(jsonldData);
}
