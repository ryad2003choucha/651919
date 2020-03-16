const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://glitch-bot1.glitch.me/`);
}, 280000);
 
// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');



const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
  if (args[0].toLowerCase() == `${prefix}credits`) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**${mention.username}, your :credit_card: balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2])) return message.channel.send(`**:x: | Error**`);
      if (args[2] < 1) return message.channel.send(`**:x: | Error**`);
      if (mention.bot) return message.channel.send(`**:x: | Error**`);
      if (mentionn.id === message.author.id)
        return message.channel.send(`**:x: | Error**`);
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:x: | Error , You Don't Have Enough Credit**`
       );
     if (args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
     let resulting = Math.floor(args[2] - args[2] * (5 / 100));
     let tax = Math.floor(args[2] * (5 / 100));
     let first = Math.floor(Math.random() * 9);
     let second = Math.floor(Math.random() * 9);
     let third = Math.floor(Math.random() * 9);
     let fourth = Math.floor(Math.random() * 9);
     let num = `${first}${second}${third}${fourth}`;
     let canvas = Canvas.createCanvas(108, 40);
     let ctx = canvas.getContext("2d");
     const background = await Canvas.loadImage(
       "https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png"
     );
     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
     ctx.font = "20px Arial Bold";
     ctx.fontSize = "20px";
     ctx.fillStyle = "#ffffff";
     message.channel
       .send(
         `**${
           message.author.username
         }, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `
       )
       .then(essss => {
         ctx.fillText(num, canvas.width / 2.4, canvas.height / 1.7);
         message.channel.sendFile(canvas.toBuffer()).then(m => {
           message.channel
             .awaitMessages(r => r.author.id === message.author.id, {
               max: 1,
               time: 20000,
               errors: ["time"]
             })
             .then(collected => {
               if (collected.first().content === num) {
                 message.channel.send(
                   `**:moneybag: | ${
                     message.author.username
                   }, Done Trans \`$${resulting.toLocaleString()}\` To ${mentionn}**`
                 );
                 mention.send(
                   `**:money_with_wings: | Transfer Receipt \`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${
                     message.author.username
                   }; (ID (${message.author.id})\`\`\``
                 );
                 m.delete();
                 credits[author].credits += Math.floor(
                   -resulting.toLocaleString()
                 );
                 credits[mentionn.id].credits += Math.floor(
                   +resulting.toLocaleString()
                 );
                 fs.writeFileSync(
                   "./credits.json",
                   JSON.stringify(credits, null, 4)
                 );
               } else {
                 m.delete();
                 essss.delete();
               }
             });
         });
       });
   } else {
     message.channel.send(
       `**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
     );
   }
 }
 if (args[0].toLowerCase() === `${prefix}daily`) {
   let cooldown = 8.64e7;
   let Daily = time[message.author.id];
   if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
     let times = cooldown - (Date.now() - Daily);
     message.channel.send( `** ${ message.author.username }, your daily credits refreshes in ${pretty(times, { verbose: true })}.**`);
     fs.writeFile("./time.json", JSON.stringify(time), function(e) {
       if (e) throw e;
     });
   } else {
     let ammount = (300, 500, 100,700,900,200, 120, 150, 350, 320, 220, 250);
     credits[author].credits += ammount;
     time[message.author.id] = Date.now();
     message.channel.send(
       `**:atm:  | ${message.author.username}, you received your :yen: ${ammount} daily credits!**`
     );
     fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
       if (e) throw e;
     });
   }
 }
});

const profile = JSON.parse(fs.readFileSync("profile.json", "utf8"));
 
 
 client.on('message', message => {
          if(!profile[message.author.id]) profile[message.author.id] ={
              points: 0,
              level: 1,
              rep: 0,
              tite: "No Title"
          };
          if(message.author.bot) return;
          profile[message.author.id].points = Math.floor(profile[message.author.id].points+1);
          if(profile[message.author.id].points > 250) {
              profile[message.author.id].points = 0
              profile[message.author.id].level = Math.floor(profile[message.author.id].level+1);
              message.channel.send(`**${message.author.username}, You leveld up to __${profile[message.author.id].level}__**`)
          }
          fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      })
 
    client.on('message', message => {
        let tit = message.content.split(" ").slice(1).join(" ");
        if(message.content.startsWith(prefix + "title")) {
        if(!profile[message.author.id].tite) profile[message.author.id].tite = "Hey im using Super"
        if(!tit) {
            message.channel.send("**Usage: <title <something>**");
        } else {
            profile[message.author.id].tite = tit
            message.channel.send(`:ok:`)
        }
        }
        fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
    })
 
client.on('message', message => {
 
    if(message.content.startsWith(prefix + 'rep')) {
      if(!message.channel.guild) return;
                    moment.locale('en');
                  var getvalueof = message.mentions.users.first()
                    if(!getvalueof) return message.channel.send(`**:mag: |  ${message.author.username}, the user could not be found.    **`);
                       if(getvalueof.id == message.author.id) return message.channel.send(`**${message.author.username}, you cant give yourself a reputation !**`)
    if(profile[message.author.id].reps != moment().format('L')) {
            profile[message.author.id].reps = moment().format('L');
            profile[getvalueof.id].rep = Math.floor(profile[getvalueof.id].rep+1);
         message.channel.send(`** :up:  |  ${message.author.username} has given ${getvalueof} a reputation point!**`)
        } else {
         message.channel.send(`**:stopwatch: |  ${message.author.username}, you can raward more reputation  ${moment().endOf('day').fromNow()} **`)
        }
       }
       fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});
 
    client.on("message", message => {
  if (message.author.bot) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + "profile")) {
                               let user = message.mentions.users.first();
         var men = message.mentions.users.first();
            var heg;
            if(men) {
                heg = men
            } else {
                heg = message.author
            }
          var mentionned = message.mentions.members.first();
             var h;
            if(mentionned) {
                h = mentionned
            } else {
                h = message.member
            }
            var ment = message.mentions.users.first();
            var getvalueof;
            if(ment) {
              getvalueof = ment;
            } else {
              getvalueof = message.author;
            }
   var mentionned = message.mentions.users.first();
  let mention = message.mentions.users.first() || message.author;
 
    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;
 
      }
if (!profile[getvalueof.id]) profile[getvalueof.id] = {points: 0,reps: "No Reps", credits: 1, level: 1,tite: "Earth Bot User", rep: 0, lastDaily: "NOT COLLECTED"};
            let Image = Canvas.Image,
            canvas = new Canvas.createCanvas(300, 300),
            ctx = canvas.getContext('2d');
            fs.readFile("Pic.jpg", function (err, Background) { //امتداد الصورة
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 300, 300); // حجم الصورة
 
})
 
 
 
 
                let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#000000"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 153, 104) // احداثيات اسمك
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                        ctx.fontSize = '40px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1"; // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${getvalueof.username}`, 151, 102) // احداثيات اسمك
 
                        //credit
                        ctx.font = "bold 10px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`$${credits[mention.id].credits}`, 230, 182) // احداثيات المصاري
 
 
                        ctx.font = "bold 14px kathen" // نوع الخط وحجمه
                        ctx.fontSize = '12px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[mention.id].tite}`, 150, 130) // احداثيات المصاري
 
                        //Level
                        ctx.font = "bold 24px kathen" // نوع الخط و حجمه
                        ctx.fontSize = '10px'; // عرض الخط
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].level}`, 70, 78) // احداثيات اللفل
 
                         //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#000000" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        //info
                        ctx.font = "bold 12px kathen" // ن
                        ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                        ctx.fillStyle = "#f1f1f1" // لون الخط
                        ctx.textAlign = "center"; // محاذا ة النص
                        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232) // احداثيات النقاط
 
                        // REP
                        ctx.font = "bold 20px  kathen";
                        ctx.fontSize = "50px";
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`+${profile[mention.id].rep}`, 225, 76)
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
 
ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 110, 29, 82, 60);
 
message.channel.startTyping()
message.channel.sendFile(canvas.toBuffer())
message.channel.stopTyping()
})
})
}
});