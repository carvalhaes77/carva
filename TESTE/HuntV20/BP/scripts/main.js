
// @ts-check

//this is the normal stuff, get over to the Utilities.js for a message from me :)
//happy reading
//made by https://gildedbedrock.com
import { system, world } from "@minecraft/server";
import Utilities from "./Utilities.js";
import './Commands.js';

export let beaconScoreboard;
//global coordinate scoreboards
export let beaconOverworldX;
export let beaconOverworldY;
export let beaconOverworldZ;
export let beaconNetherX;
export let beaconNetherY;
export let beaconNetherZ;
export let beaconEndX;
export let beaconEndY;
export let beaconEndZ;

world.afterEvents.worldLoad.subscribe(() => {
    try {
        world.scoreboard.addObjective("beaconData", "Beacon Players");
    } catch (e) { };
    try {
        world.scoreboard.addObjective("beaconOverworldX", "Beacon Overworld X");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconOverworldY", "Beacon Overworld Y");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconOverworldZ", "Beacon Overworld Z");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconNetherX", "Beacon Nether X");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconNetherY", "Beacon Nether Y");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconNetherZ", "Beacon Nether Z");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconEndX", "Beacon End X");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconEndY", "Beacon End Y");
    } catch (e) { }
    try {
        world.scoreboard.addObjective("beaconEndZ", "Beacon End Z");
    } catch (e) { }
    
    
    
    //global variable scoreboards
    beaconScoreboard = world.scoreboard.getObjective("beaconData");
    //global coordinate scoreboards
    beaconOverworldX = world.scoreboard.getObjective("beaconOverworldX");
    beaconOverworldY = world.scoreboard.getObjective("beaconOverworldY");
    beaconOverworldZ = world.scoreboard.getObjective("beaconOverworldZ");
    beaconNetherX = world.scoreboard.getObjective("beaconNetherX");
    beaconNetherY = world.scoreboard.getObjective("beaconNetherY");
    beaconNetherZ = world.scoreboard.getObjective("beaconNetherZ");
    beaconEndX = world.scoreboard.getObjective("beaconEndX");
    beaconEndY = world.scoreboard.getObjective("beaconEndY");
    beaconEndZ = world.scoreboard.getObjective("beaconEndZ");
    
})
