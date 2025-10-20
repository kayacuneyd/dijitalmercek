# Freelance Web Developer Portfolio

Modern, performant ve mobil uyumlu freelance web developer portfolio web sitesi. Web Components, Bootstrap 5 ve vanilla JavaScript kullanılarak Atomic Design prensiplerine göre geliştirilmiştir.

## 🚀 Özellikler

### 🎨 Tasarım ve UX
- **Modern Tasarım**: Temiz, profesyonel ve çağdaş tasarım
- **Responsive**: Tüm cihazlarda mükemmel görünüm (320px - 1920px+)
- **Mobile-First**: Mobil öncelikli yaklaşım
- **Dark Mode Ready**: Gelecekte dark mode desteği için hazır
- **Accessibility**: WCAG AA uyumlu, ekran okuyucu dostu

### 🛠️ Teknoloji Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.x
- **Architecture**: Atomic Design + Web Components
- **Animations**: AOS.js (Animate On Scroll)
- **Sliders**: Swiper.js 11.x
- **Build**: Netlify (Serverless Functions)

### 🧩 Bileşenler
- **Atomic Components**: Button, Avatar, Badge, Icon, Loader
- **Molecular Components**: Service Card, Project Card, FAQ Button, Article Preview
- **Organism Components**: Header, Sidebars, Sliders, Modals, Chat System

### 🤖 AI Chat Sistemi
- **Mock OpenAI Integration**: Türkçe yanıtlar
- **Guest Mode**: 3 mesaj limiti
- **Authentication**: Clerk entegrasyonu (placeholder)
- **Chat History**: LocalStorage ile saklama
- **Export Feature**: Sohbet geçmişini e-posta ile gönderme

### 📱 Responsive Layout
- **Desktop (≥992px)**: 3 kolonlu layout
- **Tablet (768-991px)**: 2 kolonlu layout  
- **Mobile (<768px)**: Tek kolonlu layout
- **Touch Friendly**: 44x44px minimum dokunma alanları

### ⚡ Performans
- **Lighthouse Score**: 90+ hedefi
- **Lazy Loading**: Görseller ve bileşenler için
- **Code Splitting**: Dinamik import'lar
- **Optimized Assets**: WebP görseller, minified CSS/JS
- **CDN**: Bootstrap, Swiper, AOS CDN'den yükleniyor

## 📁 Proje Yapısı

```
portfolio-website/
├── index.html                 # Ana HTML dosyası
├── css/                       # Stil dosyaları
│   ├── variables.css          # CSS değişkenleri
│   ├── base.css              # Temel stiller
│   ├── layout.css            # Layout sistemi
│   ├── utilities.css         # Yardımcı sınıflar
│   └── main.css              # Ana stil dosyası
├── js/                        # JavaScript dosyaları
│   ├── main.js               # Ana uygulama
│   ├── config.js             # Konfigürasyon
│   ├── utils/                # Yardımcı modüller
│   ├── services/             # Servis katmanı
│   └── components/           # Web Components
│       ├── atoms/            # Atom bileşenler
│       ├── molecules/        # Molekül bileşenler
│       └── organisms/        # Organizma bileşenler
├── data/                      # JSON veri dosyaları
│   ├── profile.json          # Profil bilgileri
│   ├── services.json         # Hizmetler
│   ├── projects.json         # Projeler
│   ├── articles.json         # Blog yazıları
│   └── faq-templates.json    # SSS şablonları
├── assets/                    # Statik dosyalar
│   ├── images/               # Görseller
│   ├── icons/                # İkonlar
│   └── fonts/                # Fontlar
├── functions/                 # Netlify Functions
│   └── chat.js               # Chat API
├── .env.example              # Environment variables
├── netlify.toml              # Netlify konfigürasyonu
└── README.md                 # Bu dosya
```

## 🚀 Kurulum

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Environment Variables
`.env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun:
```bash
cp .env.example .env
```

### 3. Yerel Geliştirme
Basit bir HTTP server kullanarak test edebilirsiniz:
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve .

# VS Code Live Server extension
```

### 4. Netlify Deployment
1. GitHub repository'nizi Netlify'a bağlayın
2. Build settings:
   - Build command: (boş bırakın)
   - Publish directory: `.`
3. Environment variables ekleyin
4. Deploy edin

## ⚙️ Konfigürasyon

### Kişiselleştirme
`TODO.md` dosyasındaki checklist'i takip ederek sitenizi kişiselleştirin:

1. **Placeholder Değerleri**: Tüm `[PLACEHOLDER]` değerlerini değiştirin
2. **Görseller**: Profil fotoğrafı, proje görselleri ekleyin
3. **İçerik**: Hizmetler, projeler, blog yazıları güncelleyin
4. **Sosyal Medya**: Linklerinizi ekleyin

### API Entegrasyonları (Opsiyonel)

#### Clerk Authentication
```javascript
// .env dosyasında
CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

#### OpenAI API
```javascript
// .env dosyasında
OPENAI_API_KEY=sk-xxx
```

#### EmailJS
```javascript
// .env dosyasında
EMAILJS_SERVICE_ID=service_xxx
EMAILJS_TEMPLATE_ID=template_xxx
EMAILJS_PUBLIC_KEY=xxx
```

## 🎨 Özelleştirme

### Renk Paleti
`css/variables.css` dosyasında renkleri değiştirin:
```css
:root {
  --color-primary: #2563eb;      /* Ana renk */
  --color-primary-dark: #1e40af; /* Koyu ton */
  --color-primary-light: #3b82f6; /* Açık ton */
}
```

### Fontlar
Google Fonts'tan font ekleyebilirsiniz:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Bileşen Stilleri
Her bileşen kendi CSS sınıflarına sahiptir ve kolayca özelleştirilebilir.

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 576px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 992px) { /* Large devices */ }
@media (min-width: 1200px) { /* Extra large devices */ }
@media (min-width: 1400px) { /* XXL devices */ }
```

## 🧪 Test Etme

### Cross-Browser Testing
- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)

### Device Testing
- ✅ iPhone SE (320px)
- ✅ iPhone 12 (390px)
- ✅ iPad (768px)
- ✅ Desktop (1920px+)

### Performance Testing
- ✅ Lighthouse Performance: 90+
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3.5s
- ✅ Cumulative Layout Shift: < 0.1

## 🔧 Geliştirme

### Yeni Bileşen Ekleme
1. `js/components/` altında uygun klasöre ekleyin
2. Web Component standardını takip edin
3. `main.js`'de import edin
4. CSS stillerini ekleyin

### Yeni Servis Ekleme
1. `js/services/` klasörüne ekleyin
2. Singleton pattern kullanın
3. Error handling ekleyin
4. `main.js`'de initialize edin

### Stil Güncellemeleri
1. `css/variables.css`'de değişkenleri güncelleyin
2. Component-specific stilleri ilgili CSS dosyasında güncelleyin
3. Utility sınıfları `utilities.css`'de ekleyin

## 📊 Analytics

### Event Tracking
```javascript
// Button click tracking
analyticsService.trackButtonClick('contact-btn', 'İletişim');

// Form submission tracking
analyticsService.trackFormSubmission('contact-form', 'contact', true);

// Chat interaction tracking
analyticsService.trackChat('open', 'user');
```

### Performance Monitoring
```javascript
// Page load performance
analyticsService.trackPerformance({
  loadTime: 1500,
  firstPaint: 800,
  firstContentfulPaint: 1200
});
```

## 🐛 Hata Ayıklama

### Console Logs
Geliştirme modunda detaylı console logları:
```javascript
// Config.js'de debug modunu açın
Config.app.debug = true;
```

### Error Handling
Global error handler tüm hataları yakalar:
```javascript
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
```

## 📈 Performans Optimizasyonu

### Lazy Loading
```javascript
// Intersection Observer ile lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});
```

### Code Splitting
```javascript
// Dinamik import'lar
const { AIChatModal } = await import('./components/organisms/ai-chat-modal.js');
```

### Image Optimization
- WebP format kullanın
- Responsive images (srcset)
- Lazy loading attribute
- Compression (80-85% kalite)

## 🔒 Güvenlik

### Environment Variables
Sensitive bilgileri `.env` dosyasında saklayın:
```bash
# .env dosyası git'e commit edilmez
echo ".env" >> .gitignore
```

### Content Security Policy
Netlify'da CSP header'ları ekleyin:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net"
```

## 📚 API Dokümantasyonu

### Chat API
```javascript
// POST /.netlify/functions/chat
{
  "messages": [
    {
      "role": "user",
      "content": "Web sitesi fiyatları nasıl?"
    }
  ]
}

// Response
{
  "message": "Web sitesi fiyatlandırması...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "success": true
}
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- **GitHub**: [yourusername](https://github.com/yourusername)
- **LinkedIn**: [yourname](https://linkedin.com/in/yourname)
- **Email**: [your.email@example.com](mailto:your.email@example.com)

## 🙏 Teşekkürler

- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [Swiper](https://swiperjs.com/) - Touch Slider
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - Native Components

---

**Not**: Bu portfolio web sitesi sürekli geliştirilmektedir. Yeni özellikler ve iyileştirmeler için GitHub repository'yi takip edin.