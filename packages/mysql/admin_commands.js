var fractionnames = require('./functions.js').fractionnames;

/*
 * Command for giving a Player Money, must be a Admin with admin_level >= 5 (Admin)
 * @param admin     (sender)
 * @param player    (receiver)
 * @param amount    (amount of money)
 */ 
mp.events.addCommand('givemoney', (admin, player, amount) => {
    if (admin.admin_level >= 5) {
        if (!player || isNaN(player) || !amount || isNaN(amount)) return admin.outputChatBox('SYNTAX: /givemoney [player] [amount]')
        gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [amount, player.name], function(err, res){
            if (!err) {
                player.money += amount;
                player.outputChatBox(`You were given ${amount} from Admin ${admin.name}`);
                admin.outputChatBox(`You gave ${player.name} ${amount} $`);
            } else {
                console.log(err)
            }
        });
    }
       
});

mp.events.addCommand('sethealth', (player, health) => {
    if(!health || isNaN(health)) return player.outputChatBox('SYNTAX: /sethealth [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET health = ? WHERE username = ?', [health, player.name], function(err, res){
        if(!err){
            player.health = parseInt(health);
            player.outputChatBox("Health Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('setarmour', (player, armour) => {
    if(!armour || isNaN(armour)) return player.outputChatBox('SYNTAX: /setarmour [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET armour = ? WHERE username = ?', [armour, player.name], function(err, res){
        if(!err){
            player.armour = parseInt(armour);
            player.outputChatBox("Armour Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('getpos', (player) => {
    if (player.admin_level >= 2) {

        const playerPos = player.position;
        player.outputChatBox(playerPos.toString());
        mp.vehicles.new(mp.joaat("bati"), player.position,
            {
                heading: player.heading,
                dimension: player.dimension,
                locked: false

            });
        
    }

});

mp.events.addCommand('setpos', (player) => {

    player.position = new mp.Vector3(243.2230, 224.7587, 106.2868);

});


mp.events.addCommand('makeleader', (player, fractionid) => {
    if (player.admin_level >= 5) {
        if (!fractionid || isNaN(fractionid)) return player.outputChatBox('SYNTAX: /makeleader [fractionid]');
        if (fractionid > 1 && fractionid <= 17) {
            gm.mysql.handle.query('UPDATE `fraction` SET fraction_level = ?, fraction_rank = 13 WHERE username = ?', [fractionid, player.name], function (err, res) {
                if (!err) {
  
                    player.fraction_level = fractionid;
                    player.fraction_rank = 13;
                    //TODO: Replace Leader with getFractionRank() <- to be written
                    player.outputChatBox(`You was made the Leader of the Fraction <b style='color:red'>${fractionnames[fractionid]}</b> .`);
                } else {
                    console.log(err)
                }
            });
        } else {
            player.outputChatBox("Invalid Fraction ID!")
        }
    }
});