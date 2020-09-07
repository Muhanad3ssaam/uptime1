// Fully Custom Discord Bot Made By DarkBoy For Free haha
const setTitle = require('node-bash-title');
setTitle('🍻 Dark Bot [DarkDevs]');
console.log("\nLoading...")
console.log("If This Take Too long make sure u have add right token!")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const { join } = require('path');
const { readdirSync } = require('fs');
client.commands= new Discord.Collection();
client.login(token)
const jimp = require('jimp')
const ms = require('ms')
const fetch = require("node-fetch");
setInterval(() => {
    var links = db.get("DarkUpTime");
    if(!links) return;
    var linkA = links.map(c => c.url)
    linkA.forEach(link => {
      try {

        fetch(link)
      } catch(e) { console.log("" + e) };
    })
    console.log("Pong")
  }, 30000)
  
  
client.on('ready', () => {
    client.user.setActivity('-help | Glitch-Uptimer', { type: 'PLAYING' });
    console.clear();
console.log(`Ready to use`)
 });

 const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

 for (const file of commandFiles) {
     const command = require(join(__dirname, "commands", `${file}`));
     client.commands.set(command.name , command);
 }
 
 client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
   if(prefix === null) prefix = mainprefix;
       if(message.author.bot) return;
       if(message.channel.type === 'dm') return;
   
       if(message.content.startsWith(prefix)) {
           const args = message.content.slice(prefix.length).trim().split(/ +/);
   
           const command = args.shift().toLowerCase();
   
           if(!client.commands.has(command)) return;
   
   
           try {
               client.commands.get(command).run(client, message, args);
   
           } catch (error){
               console.error(error);
           }
        }
   })
