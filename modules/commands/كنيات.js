const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "كنيات",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "تغيير كنية جميع أعضاء المجموعة تلقائياً كل 45 ثانية",
  commandCategory: "المطور",
  usages: "[تشغيل الكنية / إيقاف]",
  cooldowns: 5
};

function isSuperDev(senderID) {
  try {
    const configPath = path.join(global.client.mainPath, "config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return (config.SUPERADMIN || []).includes(senderID) || (config.ADMINBOT || []).includes(senderID);
  } catch(e) { return false; }
}

module.exports.onLoad = function () {
  if (!global.nickname_intervals) global.nickname_intervals = new Map();
};

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID, senderID } = event;

  if (!isSuperDev(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين فقط ❌", threadID, messageID);

  const pathData = path.join(__dirname, "cache", "nicknames_status.json");
  if (!fs.existsSync(pathData)) fs.writeJsonSync(pathData, {});
  let data = fs.readJsonSync(pathData);

  if (args[0] == "تشغيل" || args[0] == "on") {
    const nickname = args.slice(1).join(" ");
    if (!nickname) return api.sendMessage("يرجى تحديد الكنية المراد تطبيقها ⚠️\nمثال: .كنيات تشغيل الكنية الجديدة", threadID, messageID);

    if (data[threadID] === "on") {
      data[threadID + "_nick"] = nickname;
      fs.writeJsonSync(pathData, data);
      return api.sendMessage(`تم تحديث الكنية إلى: ${nickname} ✅`, threadID, messageID);
    }

    data[threadID] = "on";
    data[threadID + "_nick"] = nickname;
    fs.writeJsonSync(pathData, data);

    const applyNicknames = async () => {
      try {
        const currentData = fs.readJsonSync(pathData);
        if (currentData[threadID] !== "on") {
          clearInterval(interval);
          return;
        }
        const currentNick = currentData[threadID + "_nick"] || nickname;
        const info = await api.getThreadInfo(threadID);
        const participants = info.participantIDs || [];
        for (const uid of participants) {
          try {
            await api.changeNickname(currentNick, threadID, uid);
          } catch(e) {}
          await new Promise(r => setTimeout(r, 500));
        }
      } catch(e) {
        console.log("[كنيات] Error:", e.message);
        clearInterval(interval);
      }
    };

    const interval = setInterval(applyNicknames, 45000);
    if (!global.nickname_intervals) global.nickname_intervals = new Map();
    global.nickname_intervals.set(threadID, interval);

    return api.sendMessage(`تم تشغيل تغيير كنيات المجموعة إلى "${nickname}" كل 45 ثانية ✅`, threadID, messageID);

  } else if (args[0] == "إيقاف" || args[0] == "ايقاف" || args[0] == "off") {
    data[threadID] = "off";
    fs.writeJsonSync(pathData, data);

    if (global.nickname_intervals && global.nickname_intervals.has(threadID)) {
      clearInterval(global.nickname_intervals.get(threadID));
      global.nickname_intervals.delete(threadID);
    }

    return api.sendMessage("تم إيقاف تغيير الكنيات ❌", threadID, messageID);
  } else {
    return api.sendMessage("يرجى استخدام: كنيات تشغيل [الكنية] أو كنيات إيقاف", threadID, messageID);
  }
};
