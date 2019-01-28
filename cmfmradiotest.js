const req    = require('snekfetch');
const Eris   = require('eris');
const client = new Eris('NTAyMDkxNzE1ODY0NDI4NTQ2.DzC2Qg.3pu7De9NJMDKALhOo2BVde_ER8Y');

client.connect();

client.on('ready', async () => {
    const vc = await client.joinVoiceChannel('537369068001427460');
    vc.play('http://178.128.251.224:8000/stream');
});

client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (msg.content === 'cmfm save') 
        msg.author.createMessage(now);
    if (msg.content === 'cmfm stats') 
        msg.channel.createMessage({ embed: {
            color: 0xE60268,
            title: 'CMFM! Stats',
            description: `Ping: ${msg.channel.guild.shard.latency}ms\n` +
                `RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
                `Uptime: ${process.uptime() / 60} minutes`
        }});

    if (msg.content === 'cmfm np') 
        msg.channel.createMessage({ embed: {
            color: 0xE60268,
            title: 'Now Playing',
            description: now
        }});

    if (msg.content === 'cmfm help') 
        msg.channel.createMessage('cmfm < save | stats | np >');
});

let now = '';

setInterval(async () => {
    let res = await req.get('https://live.slam.nl/slam-hardstyle/metadata/hardstyle_livewall').set('User-Agent', 'discord-cmfmbot/1.0');
    if (res.status !== 200 || !res.body.nowArtist || !res.body.nowTitle || now === `${res.body.nowArtist} - ${res.body.nowTitle}`) return;

    now = `${res.body.nowArtist} - ${res.body.nowTitle}`;
    client.editStatus({ name: `${res.body.nowArtist} - ${res.body.nowTitle}` });
}, 10000)