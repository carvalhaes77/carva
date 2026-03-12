// @ts-check

/*
Original Creator - Gilded Bedrock at https://gildedbedrock.com
made by flakeyguide, a part of gildedbedrock (hi there :D )


(Hey, you... yeah you! Wait a sec, read through this before you select it all and delete it…. Please…. Some of its funny if your in the mood)

Hello, thanks for downloading this pack! Weird to see you snooping in the code :) dont worry, i didnt obfuscate it or anything lol
Actually, i dont care, as long as you credit this,
yeah, i know it sounds annoying, sorry, but please just add a link to the gildedbedrock.com dl page plz. 
Oh, and if you found this on some weird direct link not on gildedbedrock.com, they pirated it, which really hurts creators, 
so you could like, report their website or something, idk how that works
If your gonna do a yt review or something, please include a link to the dl page, and dont just send a direct link. 
Its expensive to rent server time for a website, and (like you if youre a yt god) ads support us

This took quite awhile to make, but it is a pretty good way to animate an item, 
and also for custom compasses, canceling the item swap animation is helpful too, (but it doesnt work when sneaking MOJANG!!!) i have no idea why, i couldnt figure it out

Use this code for whatever you want, but i would really appreciate it if you ---> credit us <---
If you really make some cash from an addon heavily based on this *very clean* and useful code, 
a donation would really be appreciated, hopefully i remember to add a link here —> https://gildedbedrock.com/donate/.
If you dont want to type the whole link, just do https://bit.ly/gbdonate Thanks!!!! 🥳❤❤❤

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Support Us without paying a dime :) Secret below XD 🤫
Dont tell google i said this plz, but if you click an ad on https://gildedbedrock.com, 
it can give us like 20cents if you stay on the ad page for 5 seconds, which actually helps us way more than you think…
(especially if every person who peeks at this code clicks one lol, infinite money $$). 
This is a really great way to support us, but dont do it too much or google will get sus of us. 
(and dont let google know i told you this)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*/

/* 

sorry for taking up space, hope you read text above
    
    *****Just remember to credit us, and maybe support us if you like this or if this is helpful in any way*****


now, the wait is over, and the code is belowwww






lol, having fun scrolling?


   ▄▄▄▄▄▄▄  ▄     ▄▄ ▄▄▄ ▄▄▄▄▄▄▄  
   █ ▄▄▄ █ ▀█▄█▀ ▄ ▄▀▀▄▄ █ ▄▄▄ █  
   █ ███ █ ▀▀▄▀▄▄▄▄▀█▄█  █ ███ █  
   █▄▄▄▄▄█ █ █ ▄▀█▀█▀▄ █ █▄▄▄▄▄█  
   ▄▄▄▄▄ ▄▄▄▄▄ █▀▄█ ▄ █ ▄ ▄ ▄ ▄   
     ▀▄█▄▄ ▄█ ▄▄  ▀▀▀▀▀█▀▀▀█   ▀  
   █▄ ▄▄ ▄▀██▀█  ▀ ▀▄▄▀   ▀▀█▄▀   
   █  █▀▀▄▄█▀█ ▀███▄█▀▀█▀▀▀█▄▄ ▀  
   █▄▀▀▀▄▄ ▄██ █▀▄ ▀▄ █▀▀ ▀ ▄▄▀   
   █ ▀▀█▀▄▀█▄▀▄▄  ▄▄ ▀▀▀█▀██ █ ▀  
   █ ██▀▀▄▀█▀▄█  ▀█▀▄▀▀▄██▄▄ ▄█▄  
   ▄▄▄▄▄▄▄ █▄█ ▀██▄▀█▀██ ▄ ███▀▀  
   █ ▄▄▄ █ ▄ ▀ █▀▄██▄ ▀█▄▄▄█ ▄▄   
   █ ███ █ █▀█▄▄  ▄██▀▄ ▄▄▄▄███▀  
   █▄▄▄▄▄█ ██▄█  ▀█ ▄▀▄▀  █▄▀▄▀   
                                  
(hush) dont forget to support us by doing the click ad secret above, or donate a buck, bc that would be super duper awesome👍







lol, long comment is over

*/
import { system, world, ItemStack } from "@minecraft/server";
import { beaconScoreboard, beaconOverworldX, beaconOverworldY, beaconOverworldZ, beaconNetherX, beaconNetherY, beaconNetherZ, beaconEndX, beaconEndY, beaconEndZ } from "./main";

var globalHuntTick = 0;

export default class Utilities {

    // -------------------------------------------------------------------------
    // Hunt Tick
    // -------------------------------------------------------------------------
    static huntTick(tick) {
        globalHuntTick = tick;
        if (tick === 300) {
            //on first join
            Utilities.huntWorldIntroWelcome();
        }
        Utilities.updateBeaconLocations();
        Utilities.updateTrackers();
    }
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // Beacon Setup/Removal
    // -------------------------------------------------------------------------
    static bugFreeName(player) {
        let badName = player.name;
        //remove all spaces, this was rare bug when name had spaces, weird
        let almostName = badName.replace(/ /g, "-");
        let goodName = almostName.slice(0, 16);
        return goodName;
    }
    static addBeacon(player) {
        player.addTag("beacon");
        Utilities.addBlankBeaconScoreboards(player);
        // run this the next tick after the scoreboard has been created
        // needed because runCommand runs at the end of the tick
        system.run(async () => {
            //i literally have to have a function here to make a longer pause between ticks. 
            //This was so annoyyying to bugfix, as i added a world say as a sort of tracking how far it got, but it actually fixed it. Help me.... XD
            await world.sendMessage("");
            await Utilities.createBeaconNameScoreboard(player, player.scoreboardIdentity.id, Utilities.bugFreeName(player));
        });
        return;
    }
    //made by https://gildedbedrock.com 
    static removeBeacon(player) {
        player.removeTag("beacon");
        //removes tracking scoreboards
        Utilities.deleteBeaconScoreboards(player);
        //removes the tags of all players tracking the now removed beacon
        for (const person of world.getPlayers()) {
            if (person.hasTag(Utilities.bugFreeName(player))) {
                person.removeTag(Utilities.bugFreeName(player));
            }
        }
        //removes the scoreboard storing the name and id of the beacon
        Utilities.deleteBeaconNameScoreboard(player);
        return;
    }

    //not currently used (and doesnt work rn bc bug freename change)
    /*
    static onlineBeaconScoreboardID(player) {
        // gets the id of the beacons scoreboard
        for (const identity of world.scoreboard.getParticipants()) {
            if (identity.displayName == Utilities.bugFreeName(player)) {
                return identity.id;
            }
        }
    }
    */
    static createBeaconNameScoreboard(player, id, name) {
        //creates the scoreboard storing the new beacons name and id
        player.runCommand("scoreboard objectives add " + name + " dummy \"" + id + "\"");
    }
    static deleteBeaconNameScoreboard(player) {
        //removes the scoreboard storing the beacons name and id
        let beaconName = Utilities.bugFreeName(player);
        player.runCommand("scoreboard objectives remove " + beaconName);
    }
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // Miscellaneous Functions 
    // -------------------------------------------------------------------------
    static allBeaconInfo() {
        //holds all of the beacons name, scoreboard id, and scoreboard identities 
        let info = [];
        for (const participant of beaconScoreboard.getParticipants()) {
            for (const objective of world.scoreboard.getObjectives()) {
                if (participant.id.toString() == objective.displayName) {
                    let thisName = objective.id;
                    let thisId = objective.displayName;
                    let sbIdentity = participant;
                    const beaconInfo = { name: thisName, id: thisId, sbIdentity: sbIdentity };
                    info.push(beaconInfo);
                }
            }
        }
        return info;
    }

    static getPlayerName(id) {
        //returns the name of a certain player based on their scoreboard id
        let objectives = world.scoreboard.getObjectives();
        for (const obj of objectives) {
            if (obj.displayName == id.toString()) {
                return obj.id;
            }
        }
    }

    static huntWorldIntroWelcome() {
        world.sendMessage("§gThank you for downloading §l§2Hunt - a Manhunt Addon!§r");
        world.sendMessage("For Updates and More Packs, visit §5§lgildedbedrock.com");
        world.sendMessage("§7Quick Start: Run §2/add§r§7 to become a tracked player");
        world.sendMessage("§7To recieve a tracker, run §3/track");
        return;
    }

    static getTrackedPlayerName(player) {
        // returns the name of the beacon that the player is tracking, based on the tag the player has
        for (const tag of player.getTags()) {
            for (const item of world.scoreboard.getObjectives()) {
                if (tag == item.id.toString()) {
                    return tag;
                }
            }
        }
        return "";
    }
    static deleteBeaconScoreboards(player) {
        player.runCommand("scoreboard players reset @s beaconData");
        player.runCommand("scoreboard players reset @s beaconOverworldX");
        player.runCommand("scoreboard players reset @s beaconOverworldY");
        player.runCommand("scoreboard players reset @s beaconOverworldZ");
        player.runCommand("scoreboard players reset @s beaconNetherX");
        player.runCommand("scoreboard players reset @s beaconNetherY");
        player.runCommand("scoreboard players reset @s beaconNetherZ");
        player.runCommand("scoreboard players reset @s beaconEndX");
        player.runCommand("scoreboard players reset @s beaconEndY");
        player.runCommand("scoreboard players reset @s beaconEndZ");
        return;
    }
    static addBlankBeaconScoreboards(player) {
        player.runCommand("scoreboard players set @s beaconData 0");
        player.runCommand("scoreboard players set @s beaconOverworldX 0");
        player.runCommand("scoreboard players set @s beaconOverworldY 1000");
        player.runCommand("scoreboard players set @s beaconOverworldZ 0");
        player.runCommand("scoreboard players set @s beaconNetherX 0");
        player.runCommand("scoreboard players set @s beaconNetherY 1000");
        player.runCommand("scoreboard players set @s beaconNetherZ 0");
        player.runCommand("scoreboard players set @s beaconEndX 0");
        player.runCommand("scoreboard players set @s beaconEndY 1000");
        player.runCommand("scoreboard players set @s beaconEndZ 0");
        return;
    }
    static isOnlineBeacon(player) {
        // returns true or false depending on if the player (online players only) is a beacon
        if (player.hasTag("beacon")) {
            return true;
        } else {
            return false;
        }
    }
    static hasTracker(player) {
        // returns true if the player has a tracker
        const inventory = player.getComponent("minecraft:inventory").container;
        for (let i = 0; i < inventory.size; i++) {
            if (inventory.getItem(i)?.typeId.includes("hunt:tracker")) {
                return true;
            }
        }
        return false;
    }
    static getAllActiveBeaconPlayers() {
        //returns a list of all online beacons
        // used to iterate over changing coordinates
        let allActiveBeacons = [];
        for (const player of world.getPlayers()) {
            if (Utilities.isOnlineBeacon(player)) {
                allActiveBeacons.push(player);
            }
        }
        return allActiveBeacons;
    }
    static getAllTrackingPlayers() {
        // returns a list of all players that are holding a tracker
        let allTrackers = [];
        for (const player of world.getPlayers()) {
            if (Utilities.hasTracker(player)) {
                allTrackers.push(player);
            }
        }
        return allTrackers;
    }
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // Tracker Logic
    // -------------------------------------------------------------------------
    static trackerClick(player) {
        // this updates who the player who clicked the tracker is tracking
        /*
        if (they have a tag of a beacon) 
            if (this index is not the last) 
                if (next index is last one && themselves)
                    if (first index is them) ---> there is no one to track besides you
                    else ---> track first index
                else if (next index is them) ---> track nextNext index
                else ---> track next index
            else ---> track first beacon that isn't themselves
        else ---> track first beacon that isn't themselves ? or tell them there are no beacons besides themselves //FIRST CLICK
        otherwise ---> __No Beacons__
        */
        /*
            special cases:
                if (length is 0) {
                    tell no one to track
                }
                if (length is 1) {
                    if (we are the one beacon) {
                        no one to track //besides us
                    } else {
                        track index 0
                for i, we have tag i:
                    if (this is last index)
                        track first beacon not self
                    else if (next is us)
                        if (next is last)
                            track first beacon not self
                        else
                            track nextNext
                    else 
                    track next
                track first beacon not us

        */
        let beaconInfo = Utilities.allBeaconInfo();

        const noOneToTrack = "§7There is no player to track";


        // if there are no beacons
        if (beaconInfo.length == 0) {
            //there are no beacons
            player.sendMessage(noOneToTrack);
            return;
        }
        // if there is only one beacon
        if (beaconInfo.length == 1) {
            // if the one beacon is themselves
            if (Utilities.bugFreeName(beaconInfo[0]) == Utilities.bugFreeName(player)) {
                player.sendMessage(noOneToTrack);
                return;
            }
            //try, it may already be added
            try {
                player.addTag(Utilities.bugFreeName(beaconInfo[0]));
                player.sendMessage("§7You are now tracking §3" + Utilities.bugFreeName(beaconInfo[0]));
            } catch { }
            return;
        }
        // go through and find beacon that they are on
        for (let i = 0; i < beaconInfo.length; i++) {
            if (player.hasTag(Utilities.bugFreeName(beaconInfo[i]))) {
                //remove tag of current tracked player
                player.removeTag(Utilities.bugFreeName(beaconInfo[i]));
                //if this is last index
                if (i == beaconInfo.length - 1) {
                    //track first player not them
                    for (let j = 0; j < beaconInfo.length; j++) {
                        if (Utilities.bugFreeName(beaconInfo[j]) != Utilities.bugFreeName(player)) {
                            player.addTag(Utilities.bugFreeName(beaconInfo[j]));
                            player.sendMessage("§7You are now tracking §3" + Utilities.bugFreeName(beaconInfo[j]));
                            return;
                        }
                    }
                }
                //if next is us
                if (Utilities.bugFreeName(beaconInfo[i + 1]) == Utilities.bugFreeName(player)) {
                    if (i + 1 == beaconInfo.length - 1) {
                        //track the first one not us
                        for (let j = 0; j < beaconInfo.length; j++) {
                            if (Utilities.bugFreeName(beaconInfo[j]) != Utilities.bugFreeName(player)) {
                                player.addTag(Utilities.bugFreeName(beaconInfo[j]));
                                player.sendMessage("§7You are now tracking §3" + Utilities.bugFreeName(beaconInfo[j]));
                                return;
                            }
                        }
                    }
                    //track next-next one
                    player.addTag(Utilities.bugFreeName(beaconInfo[i + 2]));
                    player.sendMessage("§7You are now tracking §3" + Utilities.bugFreeName(beaconInfo[i + 2]));
                    return;
                }
                //track next one regularly
                player.addTag(Utilities.bugFreeName(beaconInfo[i + 1]));
                player.sendMessage("§7You are now tracking §3" + Utilities.bugFreeName(beaconInfo[i + 1]));
                return;
            }
        }
        //they have no beacon tag (first track)
        //track first one not us
        for (var i = 0; i < beaconInfo.length; i++) {
            if (Utilities.bugFreeName(beaconInfo[i]) != Utilities.bugFreeName(player)) {
                player.addTag(Utilities.bugFreeName(beaconInfo[i]));
                player.sendMessage("§7You are now tracking §3" + Utilities.bugFreeName(beaconInfo[i]));
                return;
            }
        }
        //idk, this should never run
        world.sendMessage("Error, you may need to download a newer version on gildedbedrock.com");
    }
    static replaceTrackerTexture(tracker, textureId) {
        // Edits so that it points to correct texture
        if (textureId > 8) {
            textureId = textureId - 8;
        } else {
            textureId += 24;
        }
        // set the item to the new tracker texture
        const inventory = tracker.getComponent("minecraft:inventory").container;
        let trackerItemStack = new ItemStack("hunt:tracker" + textureId, 1);

        //get name of tracked player
        let trackedPlayer = Utilities.getTrackedPlayerName(tracker);
        // set lore to say who they are tracking
        trackerItemStack.setLore(["§o§7Tracking §r§3§l" + trackedPlayer, "§r§7Click to Swap Tracking Player§r"]);
        for (let i = 0; i < inventory.size; i++) {
            if (inventory.getItem(i)?.typeId.includes("hunt:tracker")) {
                inventory.setItem(i, trackerItemStack);
            }
        }
        return;

    }
    static spinTexture(tracker) {
        //spin texture based on world tick
        const ticksBetweenUpdates = 4;
        if (globalHuntTick % ticksBetweenUpdates != 0) {
            return;
        }
        const inventory = tracker.getComponent("minecraft:inventory").container;
        let trackerItemStack = new ItemStack("hunt:tracker" + (globalHuntTick % 32 + 1), 1);
        //say that they are not tracking anyone
        trackerItemStack.setLore(["§o§7Not Tracking a Player§r", "§r§7Click to Track§r"]);
        for (let i = 0; i < inventory.size; i++) {
            if (inventory.getItem(i)?.typeId.includes("hunt:tracker")) {
                inventory.setItem(i, trackerItemStack);
            }
        }
        return;
    }
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // Beacon Logic
    // -------------------------------------------------------------------------
    static updateBeaconLocations() {
        for (const player of Utilities.getAllActiveBeaconPlayers()) {
            //update all beacon scorebaords of their current dimension
            switch (player.dimension.id) {
                case "minecraft:overworld":
                    player.runCommand("scoreboard players set @s beaconOverworldX " + Math.floor(player.location.x));
                    player.runCommand("scoreboard players set @s beaconOverworldY " + Math.floor(player.location.y));
                    player.runCommand("scoreboard players set @s beaconOverworldZ " + Math.floor(player.location.z));
                    break;
                case "minecraft:nether":
                    player.runCommand("scoreboard players set @s beaconNetherX " + Math.floor(player.location.x));
                    player.runCommand("scoreboard players set @s beaconNetherY " + Math.floor(player.location.y));
                    player.runCommand("scoreboard players set @s beaconNetherZ " + Math.floor(player.location.z));
                    break;
                case "minecraft:the_end":
                    player.runCommand("scoreboard players set @s beaconEndX " + Math.floor(player.location.x));
                    player.runCommand("scoreboard players set @s beaconEndY " + Math.floor(player.location.y));
                    player.runCommand("scoreboard players set @s beaconEndZ " + Math.floor(player.location.z));
                    break;
                default:
                    break;
            }
        }
    }
    static getBeaconCoords(request, beacon) {
        let coords = [];
        // get the coords of the current dimension of the tracker
        switch (request.dimension.id) {
            case "minecraft:overworld":
                coords[0] = beaconOverworldX.getScore(beacon);
                coords[1] = beaconOverworldY.getScore(beacon);
                coords[2] = beaconOverworldZ.getScore(beacon);
                break;
            case "minecraft:nether":
                coords[0] = beaconNetherX.getScore(beacon);
                coords[1] = beaconNetherY.getScore(beacon);
                coords[2] = beaconNetherZ.getScore(beacon);
                break;
            case "minecraft:the_end":
                coords[0] = beaconEndX.getScore(beacon);
                coords[1] = beaconEndY.getScore(beacon);
                coords[2] = beaconEndZ.getScore(beacon);
                break;
        }
        return coords;

    }
    static vectorToYaw(viewDirection) {
        // normalize the vector
        const length = Math.sqrt(viewDirection.x ** 2 + viewDirection.y ** 2 + viewDirection.z ** 2);
        const normalizedX = viewDirection.x / length;
        const normalizedZ = viewDirection.z / length;
    
        // Calculate yaw angle (rotation around the vertical axis)
        const yaw = Math.atan2(normalizedZ, normalizedX);
    
        // Convert radians to degrees
        const yawDegrees = (yaw * 180) / Math.PI + 180;
    
        return yawDegrees;
    }
            
    static updateTrackers() {
        for (const player of Utilities.getAllTrackingPlayers()) {
            //make sure that there are beacons, and the player is tracking a beacon
            if ((Utilities.allBeaconInfo().length == 0) || (Utilities.getTrackedPlayerName(player) == "")) {
                //There are no beacons or they are not tracking someone
                Utilities.spinTexture(player);
                continue;
            } else {
                //if there is a beacon and they are tracking someone
                for (const beacon of Utilities.allBeaconInfo()) {
                    //update based on the beacon they are tracking
                    if (player.hasTag(Utilities.bugFreeName(beacon))) {
                        //get the beacon they are tracking
                        //get the coords of each
                        const beaconCoords = Utilities.getBeaconCoords(player, beacon.sbIdentity);
                        const playerCoords = player.location;
                        //get the vector of player view rotation

                        if (beaconCoords[0] == 0 && beaconCoords[1] == 1000 && beaconCoords[2] == 0) {
                            // beacon has not been tracked in the trackers current dimension
                            Utilities.spinTexture(player);
                            break;
                        }

                        // comment out for testing coords 100, 100, 100
                        let playerToBeaconVector = { x: beaconCoords[0] - playerCoords.x, y: 0, z: beaconCoords[2] - playerCoords.z };
                        // let playerToBeaconVector = new Vector(100 - playerCoords.x, 100 - playerCoords.y, 100 - playerCoords.z);

                        // remove y coords, not needed for compass 

                        // calculate angle between vectors
                        //i have to do weird stuff to make arctan not loop, and instead be more than current in certain quadrants of the vector
                        let angleToBeacon = this.vectorToYaw(playerToBeaconVector);
                        let playerRotation = this.vectorToYaw(player.getViewDirection());
                        let angleDifference = angleToBeacon - playerRotation;
                        //adjust for negative and positive rotation (from other way around)
                        angleDifference = (angleDifference - 90) % 360;
                        if (angleDifference < -5.625) {
                            angleDifference += 360;
                        } 
                        
                        // update texture based on rotation
                        for (let i = 0; i < 32; i++) {
                            //i first did this is a dumb and long if-else statment lol
                            if (angleDifference >= (11.25 * i) - 5.625 && angleDifference < (11.25 * (i + 1)) - 5.625) {
                                // update/replace all the textures
                                    Utilities.replaceTrackerTexture(player, i);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
}
// I better add this just incase someone deletes my cool comment up top :(
// Made by Gilded Bedrock - https://gildedbedrock.com
// Dont forget to credit us when using this code, and support us if possible