# Bot Project
## Overview
Facebook bot based on Mirai/FCA.

## Recent Changes
- Added 'المحرك' command: إرسال رسالة تلقائية كل 45 ثانية مع خيار تغيير الرسالة.
- Added 'تكرار' command: تغيير اسم المجموعة كل 45 ثانية بالاسم المحدد.
- Added 'كنيات' command: تغيير كنيات جميع أعضاء المجموعة كل 45 ثانية.
- Added 'اضافة الادمن' command: إضافة مستخدم لقائمة الأدمن من قبل المطور الرئيسي.
- Added SUPERADMIN rank in config.json: رتبة المطور الرئيسي فوق الأدمن.

## Permission System
- hasPermssion 0: الجميع
- hasPermssion 1: أدمن المجموعة
- hasPermssion 2: أدمن البوت (ADMINBOT في config.json)
- SUPERADMIN: المطور الرئيسي (يتجاوز كل الصلاحيات)

## Project Architecture
- `modules/commands/`: Command definitions.
- `main.js`: Main entry point (obfuscated).
- `index.js`: Starter script.
- `config.json`: Bot configuration including ADMINBOT and SUPERADMIN lists.
