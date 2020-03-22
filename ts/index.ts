/**
 * Zong Deng
 * zongd@mtu.edu
 */

import * as FS from "fs";
import * as Path from "path";
import {KBBot, KBResponse, KBMessage} from "@elijahjcobb/keybase-bot-builder";

//  Husky Campus Shuttle Daily
const yellow: string[] = [ "Forestry Building (Lot 21/26 Sidewalk)", "Forestry Building 9Rear Parking Lot)",
    "SDC Main Doors", "Gates Tennis Center Front Door", "Lot 32 (St. AL's)", "Woodland (Behind Wads)",
    "Library Bus Stop"]
// Husky Campus Nightly
const black: string[] = ["MUB", "SDC", "Upper Heights", "Lower Heights <Stop Sign)", "Woodland (behind Wads)",
    "Library"]
// Daniell Heights Shuttle
const red: string[] = [ "MUB", "SDC", "Upper Heights", "Lower Heights", "Library"]
// City Commuter
const green: string[] = [ "MUB", "City Center", "Econo Foods", "Walmart", "Razorback Stop", "Houghton Ave & 4th Street",
    "Houghton Ave & Bridge Street", "Houghton County Courthouse", "Houghton Ave & Portage Street", "Houghton Ave & Franklin Street",
    "Houghton Ave & Agate Street", "Houghton Ave & Emerald Street", "MUB"]
// Shopping Shuttle
const blue: string[] = [ "Upper Heights", "Lower Heights", "Behind Wads", "Library", "MUB", "Econo", "Walmart"]

/*
    get stopName print route names that goes through the stop
 */
function getRouteName(stop: string): string
{
    var output = "no output";
    return output;
}

/*
get route number return full route
 */
function getRoute(route: number): string
{
    switch (route)
    {
        case 0: {   //  Campus daily
            return getEachStop(yellow);
            break;
        }

        case 1: {   // Campus nightly
            return getEachStop(black);
            break;
        }

        case 2: {   // Daniell Heights
            return getEachStop(red);
            break;
        }

        case 3: {   //  City Commuter
            return getEachStop(green);
            break;
        }

        case 4: {   // Shopping shuttle
            return getEachStop(blue);
            break;
        }
        default: {
            return "Error for getRoute\n";
            break;
        }
    }
}

/*
    get all station names for the route
 */
function getEachStop(route: string[]): string
{
    var output = "";
    for(let i=0; i<route.length;i++)
    {
        output.concat(route[i]);
        output.concat(" ");
    }
    return output;
}


(async (): Promise<void> => {
        const paperKeyPath: string = Path.resolve("./blizzard_paper_key.txt");    // using paper key: "stage pisto..."
        const paperKeyData: Buffer = FS.readFileSync(paperKeyPath);
        const paperKey: string = paperKeyData.toString("utf8");
        const bot: KBBot = await KBBot.init("blizzard_t_husky", paperKey,
            {
                logging: true,
                debugging: true,
                hostname: "bot-blizzard-ZD"
            }
        )

        bot.command(
            {
                name: "shuttle",
                description: "check shuttle",
                usage: "!shuttle schedule City Commuter",
                handler: async (msg: KBMessage, res: KBResponse): Promise<void> =>
                {
                    const input:(string | number)[] = msg.getParameters();
                    let size: number = input.length;
                    var output = "";

                    for( const word in input)
                    {
                        output.concat(word);
                        output.concat(" ");
                    }

                    await res.send(output);
                }
            }
        );

        bot.start();
    }
)().then((): void =>{}).catch((err: any): void => console.error(err));