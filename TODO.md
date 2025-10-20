# Portfolio Website Personalization Checklist

Bu dosya, portfolio web sitenizi kişiselleştirmek için yapmanız gereken değişiklikleri içerir.

## 🚨 ÖNEMLİ: Tüm [PLACEHOLDER] Değerlerini Değiştirin

Aşağıdaki dosyalarda `[PLACEHOLDER]` olarak işaretlenmiş tüm değerleri kendi bilgilerinizle değiştirin:

### 📁 Dosya: `index.html`
- `[YOUR_NAME]` → Kendi adınız
- `[YOUR_WEBSITE_URL]` → Web sitenizin URL'si
- `[YOUR_EMAIL]` → E-posta adresiniz

### 📁 Dosya: `data/profile.json`
- `[YOUR_NAME]` → Kendi adınız
- `[YOUR_COMPANY]` → Şirket adınız (varsa)
- `[YOUR_CITY]` → Şehriniz
- `[YOUR_EMAIL]` → E-posta adresiniz
- `[YOUR_PHONE]` → Telefon numaranız (WhatsApp için)
- `[YOUR_LINKEDIN]` → LinkedIn kullanıcı adınız
- `[YOUR_GITHUB]` → GitHub kullanıcı adınız
- `[YOUR_TWITTER]` → Twitter kullanıcı adınız
- `[YOUR_INSTAGRAM]` → Instagram kullanıcı adınız

### 📁 Dosya: `js/config.js`
- `[YOUR_GITHUB]` → GitHub kullanıcı adınız
- `[YOUR_LINKEDIN]` → LinkedIn kullanıcı adınız
- `[YOUR_TWITTER]` → Twitter kullanıcı adınız
- `[YOUR_INSTAGRAM]` → Instagram kullanıcı adınız
- `[YOUR_EMAIL]` → E-posta adresiniz
- `[YOUR_PHONE]` → Telefon numaranız
- `[YOUR_CAL_LINK]` → Cal.com linkiniz

## 🖼️ Görsel Dosyaları Ekleme

### Profil Fotoğrafı
- `assets/images/profile.jpg` → Kendi profil fotoğrafınızı ekleyin
- Boyut: 400x400px (kare format)
- Format: JPG veya PNG
- Dosya boyutu: < 500KB

### Proje Görselleri
- `assets/images/projects/` klasörüne proje görsellerinizi ekleyin
- Her proje için bir görsel (16:9 oranında)
- Format: JPG veya PNG
- Dosya boyutu: < 1MB

### Blog Görselleri
- `assets/images/blog/` klasörüne blog yazılarınızın görsellerini ekleyin
- Format: JPG veya PNG
- Dosya boyutu: < 800KB

### İkonlar
- `assets/icons/` klasörüne servis ikonlarınızı ekleyin
- Format: SVG (tercih edilen) veya PNG
- Boyut: 60x60px

## 📝 İçerik Güncellemeleri

### Kişisel Bilgiler
1. **Profil Bilgileri** (`data/profile.json`)
   - Bio metninizi güncelleyin
   - Deneyim yılınızı düzeltin
   - Tamamlanan proje sayısını güncelleyin
   - Müşteri puanınızı güncelleyin
   - Yanıt sürenizi güncelleyin

2. **Yetenekler Listesi**
   - Sahip olduğunuz teknolojileri ekleyin/çıkarın
   - Seviyelerini (beginner, intermediate, advanced, expert) güncelleyin

### Servisler
1. **Hizmet Listesi** (`data/services.json`)
   - Sunduğunuz hizmetleri güncelleyin
   - Açıklamaları kendi kelimelerinizle yazın
   - Fiyat aralıklarını güncelleyin
   - Teslim sürelerini güncelleyin

### Projeler
1. **Proje Listesi** (`data/projects.json`)
   - Gerçek projelerinizi ekleyin
   - Proje açıklamalarını yazın
   - Kullanılan teknolojileri güncelleyin
   - Proje linklerini ekleyin
   - Müşteri bilgilerini güncelleyin

### Blog Yazıları
1. **Makale Listesi** (`data/articles.json`)
   - Kendi blog yazılarınızı ekleyin
   - Başlıkları ve açıklamaları güncelleyin
   - Yayın tarihlerini düzeltin
   - Okuma sürelerini güncelleyin
   - Link'leri ekleyin

### SSS
1. **SSS Listesi** (`data/faq-templates.json`)
   - Müşterilerinizin sık sorduğu soruları ekleyin
   - Kendi cevaplarınızı yazın
   - Kategorileri güncelleyin

## 🔧 Teknik Ayarlar

### API Entegrasyonları
1. **Clerk Authentication** (Opsiyonel)
   - `.env` dosyasında `CLERK_PUBLISHABLE_KEY` ekleyin
   - `js/services/clerk-auth.js` dosyasında gerçek entegrasyonu yapın

2. **OpenAI API** (Opsiyonel)
   - `.env` dosyasında `OPENAI_API_KEY` ekleyin
   - `functions/chat.js` dosyasında gerçek API entegrasyonunu yapın

3. **EmailJS** (Opsiyonel)
   - `.env` dosyasında EmailJS bilgilerinizi ekleyin
   - `js/services/email-service.js` dosyasında gerçek entegrasyonu yapın

### Cal.com Entegrasyonu
1. **Cal.com Hesabı**
   - Cal.com hesabı oluşturun
   - `[YOUR_CAL_LINK]` değerini gerçek linkinizle değiştirin
   - `js/components/organisms/cal-embed.js` dosyasında gerçek entegrasyonu yapın

## 🎨 Tasarım Özelleştirmeleri

### Renk Paleti
1. **CSS Değişkenleri** (`css/variables.css`)
   - `--color-primary` → Ana renginizi değiştirin
   - `--color-primary-dark` → Koyu ton
   - `--color-primary-light` → Açık ton

### Fontlar
1. **Font Ailesi**
   - `--font-sans` → Tercih ettiğiniz font ailesini ekleyin
   - Google Fonts'tan font ekleyebilirsiniz

## 📱 Sosyal Medya

### Sosyal Medya Linkleri
1. **Profil Linkleri**
   - GitHub, LinkedIn, Twitter, Instagram linklerinizi ekleyin
   - WhatsApp numaranızı ekleyin
   - E-posta adresinizi ekleyin

## 🚀 Deployment

### Netlify Deployment
1. **GitHub Repository**
   - Projeyi GitHub'a yükleyin
   - Netlify'da GitHub repository'nizi bağlayın
   - Otomatik deployment ayarlayın

2. **Environment Variables**
   - Netlify dashboard'da environment variables ekleyin
   - API key'lerinizi güvenli şekilde saklayın

### Domain Ayarları
1. **Custom Domain**
   - Kendi domain'inizi bağlayın
   - SSL sertifikasını aktifleştirin

## ✅ Kontrol Listesi

### Temel Kontroller
- [ ] Tüm [PLACEHOLDER] değerleri değiştirildi
- [ ] Profil fotoğrafı eklendi
- [ ] Proje görselleri eklendi
- [ ] Blog görselleri eklendi
- [ ] Servis ikonları eklendi
- [ ] Kişisel bilgiler güncellendi
- [ ] Servisler güncellendi
- [ ] Projeler güncellendi
- [ ] Blog yazıları güncellendi
- [ ] SSS güncellendi

### Teknik Kontroller
- [ ] API key'leri eklendi (opsiyonel)
- [ ] Cal.com entegrasyonu yapıldı
- [ ] Sosyal medya linkleri eklendi
- [ ] Renk paleti özelleştirildi
- [ ] Font ayarları yapıldı

### Deployment Kontrolleri
- [ ] GitHub repository oluşturuldu
- [ ] Netlify'da deployment yapıldı
- [ ] Environment variables eklendi
- [ ] Custom domain bağlandı
- [ ] SSL sertifikası aktifleştirildi

### Test Kontrolleri
- [ ] Tüm sayfalar açılıyor
- [ ] Mobil uyumluluk test edildi
- [ ] Formlar çalışıyor
- [ ] Chat modal çalışıyor
- [ ] Slider'lar çalışıyor
- [ ] Linkler çalışıyor

## 📞 Destek

Herhangi bir sorunuz olursa:
- GitHub Issues'da soru sorabilirsiniz
- E-posta ile iletişime geçebilirsiniz
- Dokümantasyonu inceleyebilirsiniz

## 🔄 Güncellemeler

Bu portfolio web sitesi sürekli geliştirilmektedir. Yeni özellikler ve iyileştirmeler için GitHub repository'yi takip edin.

---

**Not:** Bu checklist'i tamamladıktan sonra, web siteniz tamamen kişiselleştirilmiş ve kullanıma hazır olacaktır.
