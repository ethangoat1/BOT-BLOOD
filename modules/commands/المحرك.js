const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "المحرك",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "تشغيل/إيقاف الرد التلقائي للمطورين",
  commandCategory: "المطور",
  usages: "[تشغيل/إيقاف]",
  cooldowns: 5
};

module.exports.handleEvent = async function({ event, api }) {
  const { threadID, messageID } = event;
  const pathData = path.join(__dirname, "cache", "engine_status.json");
  
  if (!fs.existsSync(pathData)) return;
  
  let data = fs.readJsonSync(pathData);
  if (data[threadID] === "on") {
    const message = `𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬.⛔\n\n𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈\n\n\n-  𝑻𝒉𝒆 𝑪𝒓𝒐𝒘 𝑯𝒂𝒅𝒆𝒔 𝑰𝒔 𝑯𝒆𝒓𝒆🐦‍⬛🎴`;
    return api.sendMessage(message, threadID, messageID);
  }
};

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  const pathData = path.join(__dirname, "cache", "engine_status.json");
  
  // Developer check
  const config = require(path.join(global.client.mainPath, "config.json"));
  if (!config.ADMINBOT.includes(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين فقط ❌", threadID, messageID);

  if (!fs.existsSync(pathData)) fs.writeJsonSync(pathData, {});
  let data = fs.readJsonSync(pathData);
  
  if (args[0] == "تشغيل" || args[0] == "on") {
    data[threadID] = "on";
    fs.writeJsonSync(pathData, data);
    return api.sendMessage("تم تشغيل المحرك بنجاح ✅ (للمطورين)", threadID, messageID);
  } else if (args[0] == "إيقاف" || args[0] == "ايقاف" || args[0] == "off") {
    data[threadID] = "off";
    fs.writeJsonSync(pathData, data);
    return api.sendMessage("تم إيقاف المحرك بنجاح ❌", threadID, messageID);
  } else {
    return api.sendMessage("يرجى استخدام: المحرك [تشغيل/إيقاف]", threadID, messageID);
  }
};