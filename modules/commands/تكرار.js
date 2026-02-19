const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "تكرار",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "تغيير اسم المجموعة تلقائياً كل 45 ثانية بالاسم المحدد",
  commandCategory: "المطور",
  usages: "[تشغيل اسم_المجموعة / إيقاف]",
  cooldowns: 5
};

module.exports.onLoad = function () {
    if (!global.repeat_intervals) global.repeat_intervals = new Map();
}

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  const pathData = path.join(__dirname, "cache", "repeat_status.json");
  
  // Extra safety check for developers (usually handled by hasPermssion: 2)
  const config = require(path.join(global.client.mainPath, "config.json"));
  if (!config.ADMINBOT.includes(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين فقط ❌", threadID, messageID);

  if (!fs.existsSync(pathData)) fs.writeJsonSync(pathData, {});
  let data = fs.readJsonSync(pathData);

  if (args[0] == "تشغيل" || args[0] == "on") {
    let targetName = args.slice(1).join(" ");
    if (!targetName) return api.sendMessage("يرجى تحديد الاسم الذي تريد تكراره ⚠️\nمثال: .تكرار تشغيل اسم المجموعة", threadID, messageID);

    if (data[threadID] === "on") {
      // If already running, update the name but don't start a new interval
      data[threadID + "_name"] = targetName;
      fs.writeJsonSync(pathData, data);
      return api.sendMessage(`تم تحديث الاسم المكرر إلى: ${targetName} ✅`, threadID, messageID);
    }
    
    data[threadID] = "on";
    data[threadID + "_name"] = targetName;
    fs.writeJsonSync(pathData, data);
    
    const interval = setInterval(async () => {
      try {
        const currentData = fs.readJsonSync(pathData);
        if (currentData[threadID] !== "on") {
          clearInterval(interval);
          return;
        }
        let nameToSet = currentData[threadID + "_name"] || "Default Name";
        await api.setTitle(nameToSet, threadID);
      } catch (e) {
        console.log(e);
        clearInterval(interval);
      }
    }, 45000);
    
    if (!global.repeat_intervals) global.repeat_intervals = new Map();
    global.repeat_intervals.set(threadID, interval);
    
    return api.sendMessage(`تم تشغيل تكرار تغيير اسم المجموعة إلى "${targetName}" كل 45 ثانية ✅`, threadID, messageID);
    
  } else if (args[0] == "إيقاف" || args[0] == "ايقاف" || args[0] == "off") {
    data[threadID] = "off";
    fs.writeJsonSync(pathData, data);
    
    if (global.repeat_intervals && global.repeat_intervals.has(threadID)) {
      clearInterval(global.repeat_intervals.get(threadID));
      global.repeat_intervals.delete(threadID);
    }
    
    return api.sendMessage("تم إيقاف تكرار تغيير اسم المجموعة ❌", threadID, messageID);
  } else {
    return api.sendMessage("يرجى استخدام: تكرار تشغيل [الاسم] أو تكرار إيقاف", threadID, messageID);
  }
};