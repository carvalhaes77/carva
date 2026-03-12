// @ts-check

//this is the normal stuff, get over to the Utilities.js for a message from me :)
//happy reading
//made by https://gildedbedrock.com
import { Player, world, CommandPermissionLevel, CustomCommandParamType, system, CustomCommandSource } from '@minecraft/server';
import Utilities from "./Utilities.js";
var tick = 0;
// World Tick Function
system.runInterval(() => {
    // Run hunt tick every tick
    Utilities.huntTick(tick);
    tick++;
}, 1);

system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {

    customCommandRegistry.registerCommand(
        {
            name: "hunt:track",
            description: "Giver yourself a tracker compass",
            cheatsRequired: false,
            permissionLevel: CommandPermissionLevel.Any
        },
        (_origin) => {
            system.run(() => {
                // Only run if executed by a player
                const player = _origin.sourceEntity;
                if (player?.typeId !== "minecraft:player") return;

                if (Utilities.hasTracker(player)) {
                    // @ts-ignore
                    player.sendMessage("§7§oYou already have a tracker");
                } else {
                    player.runCommand("give @s hunt:tracker1");
                    Utilities.trackerClick(player);
                    // @ts-ignore
                    player.sendMessage("§7§oYou have been given a tracker");
                }
            });
            return undefined;
        }
    );
    customCommandRegistry.registerCommand(
        {
            name: "hunt:add",
            description: "Add yourself as a Tracked Player. You can now be Tracked!",
            cheatsRequired: false,
            permissionLevel: CommandPermissionLevel.Any
        },
        (_origin) => {
            system.run(() => {
                const player = _origin.sourceEntity;
                // Only run if executed by a player
                if (player?.typeId !== "minecraft:player") return;

                if (Utilities.isOnlineBeacon(player)) {
                    // @ts-ignore
                    player.sendMessage("§7§oYou already are being tracked§r" + '\n' + "§7§oTo stop being tracked, run §r§4/remove§r");
                } else {
                    Utilities.addBeacon(player);
                    world.sendMessage("§2§l" + Utilities.bugFreeName(player) + " is being tracked!");
                    // @ts-ignore
                    player.sendMessage("§gYou are now being tracked§r" + " - " + "§4/remove§r to stop being tracked");
                }


            });
            return undefined;
        }
    );
    customCommandRegistry.registerCommand(
        {
            name: "hunt:remove",
            description: "Remove yourself as a Tracked Player. You can no longer be Tracked.",
            cheatsRequired: false,
            permissionLevel: CommandPermissionLevel.Any
        },
        (_origin) => {
            system.run(() => {
                // Only run if executed by a player
                const player = _origin.sourceEntity;
                if (player?.typeId !== "minecraft:player") return;

                if (Utilities.isOnlineBeacon(player)) {
                    Utilities.removeBeacon(player);
                    world.sendMessage("§4§l" + Utilities.bugFreeName(player) + " is no longer being tracked");
                    // @ts-ignore
                    player.sendMessage("§gYou are no longer being tracked§r" + " - " + "To become tracked again, run §2/add§r");
                } else {
                    // @ts-ignore
                    player.sendMessage("§7§oYou already are not being tracked§r" + '\n' + "§7§oTo become a tracked player, run §r§2/add§r");
                }
            });
            return undefined;
        }
    );
});

world.beforeEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId.includes("hunt:tracker")) {
        let source = event.source;
        system.run(() => {
            Utilities.trackerClick(source);
        });
    };
});