# MesterX - متجر إلكتروني احترافي (RTL)

مشروع متجر إلكتروني متجاوب بالكامل لبيع الملابس ومنتجات أخرى، مع نظام طلب بدون دفع إلكتروني (الدفع عند الاستلام فقط) ولوحة تحكم كاملة لإدارة المنتجات والطلبات.

## التقنيات
- **Frontend:** React + Vite + React Router + CSS حديث
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Security:** JWT + Helmet + Rate Limit + Hashing لكلمات المرور

## المميزات

### واجهة المتجر
- تصميم عصري متجاوب 100% (موبايل/تابلت/كمبيوتر)
- دعم العربية RTL
- صفحة رئيسية مع بانر رئيسي وقسم منتجات مميزة
- صفحة منتجات مع فلترة:
  - السعر
  - القسم
  - المقاس
  - اللون
  - الترتيب (الأحدث/السعر)
- صفحة تفاصيل المنتج:
  - صور متعددة
  - اختيار المقاس واللون
  - نموذج "اطلب الآن"

### نظام الطلب (COD فقط)
- عند إرسال الطلب يتم حفظه في MongoDB
- الحقول المطلوبة:
  - الاسم
  - اللقب
  - الهاتف
  - الولاية
  - ملاحظات (اختياري)
- **لا توجد أي بوابة دفع إلكتروني**

### لوحة التحكم (Admin)
- تسجيل دخول مدير فقط
- إدارة الأقسام (إضافة/تعديل/حذف)
- إدارة المنتجات:
  - إضافة منتج مع صور متعددة
  - تعديل/حذف منتج
  - تفعيل/تعطيل منتج
  - التحكم في السعر
- إدارة الطلبات:
  - عرض كل الطلبات
  - تغيير حالة الطلب:
    - طلب جديد
    - تم الاتصال بالزبون
    - تم تأكيد الطلب
    - تم الشحن
    - تم التسليم
    - ملغي
  - البحث برقم الهاتف
- إحصائيات:
  - إجمالي الطلبات
  - المؤكدة
  - الملغاة

---

## دليل التثبيت الكامل للمبتدئين (خطوة بخطوة)

## 1) المتطلبات قبل البدء
تأكد أن هذه البرامج مثبتة في جهازك:
- **Git**
- **Node.js** (يفضل نسخة LTS 18 أو 20)
- **npm** (يأتي مع Node.js)
- **MongoDB** (محلي) أو حساب **MongoDB Atlas**

### التحقق من التثبيت
افتح Terminal / CMD ونفّذ:
```bash
node -v
npm -v
git --version
```

---

## 2) تحميل المشروع
```bash
git clone <REPO_URL>
cd mesterx
```

---

## 3) تثبيت MongoDB للمبتدئين

## الخيار A (الأسهل): MongoDB Atlas (سحابي)
مناسب إذا لا تريد تثبيت MongoDB على جهازك.

1. ادخل: [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. أنشئ حساب جديد.
3. أنشئ **Cluster مجاني**.
4. من **Database Access**:
   - أنشئ User (اسم مستخدم + كلمة مرور)
5. من **Network Access**:
   - أضف IP (للتجربة يمكنك إضافة `0.0.0.0/0`)
6. اضغط **Connect** ثم اختر **Drivers** وانسخ الرابط.
7. سيظهر رابط شبيه بـ:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/mesterx?retryWrites=true&w=majority
   ```
8. استبدل `USERNAME` و `PASSWORD` بالقيم الحقيقية.

## الخيار B: تثبيت MongoDB محليًا

### Windows
1. نزّل MongoDB Community Server من:
   [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. أثناء التثبيت اختر **Complete**.
3. فعّل خيار **Install MongoDB as a Service**.
4. بعد التثبيت، افتح `services.msc` وتأكد خدمة MongoDB تعمل.

### Ubuntu / Debian
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl enable mongodb
sudo systemctl start mongodb
sudo systemctl status mongodb
```

### macOS (Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
brew services list
```

> إذا كنت تستخدم MongoDB محليًا، غالبًا الرابط يكون:
```env
MONGO_URI=mongodb://127.0.0.1:27017/mesterx
```

---

## 4) إعداد وتشغيل Backend

ادخل مجلد الباك اند:
```bash
cd backend
```

انسخ ملف البيئة:
```bash
cp .env.example .env
```

عدّل `.env` وضع القيم المناسبة خصوصًا:
- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

ثبت الحزم:
```bash
npm install
```

أنشئ حساب المدير:
```bash
npm run seed-admin
```

شغّل الخادم:
```bash
npm run dev
```

الخادم يعمل على:
- `http://localhost:5000`
- فحص الصحة: `http://localhost:5000/api/health`

---

## 5) إعداد وتشغيل Frontend
افتح Terminal جديد ثم:
```bash
cd frontend
npm install
npm run dev
```

الواجهة تعمل على:
- `http://localhost:5173`

---

## 6) تسجيل دخول لوحة التحكم
- افتح: `http://localhost:5173/admin/login`
- استخدم:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
(القيم التي وضعتها في `.env` داخل backend)

---

## تشغيل المشروع محليًا (مختصر سريع)

## Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed-admin
npm run dev
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## حل مشكلة MongoDB (ECONNREFUSED 127.0.0.1:27017)
إذا ظهر هذا الخطأ عند `npm run dev` فهذا يعني أن MongoDB غير شغّال محليًا أو أن `MONGO_URI` غير صحيح.

### حلول سريعة
1. تأكد خدمة MongoDB تعمل (محليًا).
2. إذا تستعمل Atlas، تأكد:
   - الرابط صحيح
   - اسم المستخدم/كلمة المرور صحيح
   - IP مضاف في Network Access
3. أعد تشغيل الخادم بعد تعديل `.env`.

### ملاحظة مهمة
المشروع يحتوي Retry تلقائي لاتصال MongoDB عبر:
- `DB_MAX_RETRIES`
- `DB_RETRY_DELAY_MS`

---

## بنية المشروع
```bash
/backend
  /config
  /middleware
  /models
  /routes
  /seed
/frontend
  /src
```

## النشر على استضافة مشتركة

### خيار موصى به
- **Frontend (React):** ارفع ملفات `frontend/dist` بعد تنفيذ `npm run build`.
- **Backend (Node.js API):** يحتاج استضافة تدعم Node.js (مثل cPanel Node App أو VPS).
- **MongoDB:** استخدم MongoDB Atlas واربطه عبر `MONGO_URI`.

### خطوات سريعة
1. عدّل متغيرات البيئة في backend:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
2. شغّل:
   ```bash
   cd backend && npm install && npm start
   ```
3. في frontend:
   - أنشئ ملف `.env` يحتوي:
     ```env
     VITE_API_URL=https://your-domain.com/api
     ```
   - نفّذ البناء:
     ```bash
     npm run build
     ```
   - ارفع محتوى `dist` إلى `public_html`.

## SEO الأساسي
- تم إضافة meta description في `index.html`.
- بنية صفحات واضحة وروابط نظيفة عبر slug.

## ملاحظات
- الصور حاليًا عبر روابط مباشرة (URL). يمكن لاحقًا إضافة رفع ملفات فعلي (Cloudinary/S3).
- يمكن ربط WhatsApp API أو SMS لإشعارات الطلبات مستقبلًا.
