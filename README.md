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

## تشغيل المشروع محليًا

## 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed-admin
npm run dev
```

## 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

ثم افتح:
- الواجهة: `http://localhost:5173`
- API: `http://localhost:5000/api`

## بيانات المدير الافتراضية
يتم إنشاؤها من `.env`:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

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
