
import db, { client } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let username = req.body.username;
    console.log(username)
    let location = req.body.location;
    let type = req.body.type;
    let user = await db.collection("scoreboard").findOne({
        username: username
    })
    if(user){
        await db.collection("scoreboard").updateOne({
            username: username
        }, {
            $set: {
                score: user.score + 1,
                locations: [...user.locations, location],
                type: [...user.type, type]

            },
            
        })
    }
    else {
        await db.collection("scoreboard").insertOne({
            username: username,
            score: 1,
            locations: [location],
            type: [type]
        })
    }
    res.json({
        message: "sucesses"
    })
}

