// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    res.status(200).json((await db.collection("scoreboard").find().toArray()).sort((a, b) => b.score - a.score));
}

