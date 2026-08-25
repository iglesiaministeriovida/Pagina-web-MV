/**
 * MINISTERIO VIDA — SISTEMA DE TRADUCCIÓN MULTI-IDIOMA (i18n)
 * Idiomas soportados: Español (ES), Português (PT), English (EN)
 */

const translations = {
  es: {
    // Nav
    nav_home: "Inicio",
    nav_about: "Nosotros",
    nav_pillars: "Pilares",
    nav_events: "Eventos",
    nav_reading: "Lecturas",
    nav_sermons: "Sermones",
    nav_bible: "Biblia",
    nav_location: "Ubicación",
    nav_cta: "Planifica tu Visita",
    nav_whatsapp: "Escribir al Pastor",

    // Hero
    hero_title_1: "Transformando",
    hero_title_2: "Vidas con Dios",
    hero_btn_new: "Soy Nuevo / Sedes",
    hero_btn_whatsapp: "WhatsApp Pastoral",
    hero_intro: "Te damos la bienvenida a una comunidad contemporánea, cálida y de sólida base bíblica. Un lugar seguro para aprender, sanar, hacer amigos sinceros y vivir con propósito eterno.",
    
    // Ticker
    ticker_label: "REUNIONES DOMINICALES",
    ticker_central: "Campus Central",
    ticker_central_time: "Domingos 09:00 AM & 11:00 AM",
    ticker_north: "Campus Norte",
    ticker_north_time: "Domingos 10:00 AM",
    ticker_kids: "Vida Kids",
    ticker_kids_desc: "Atención especial para niños",
    ticker_online: "Encuentro Online",
    ticker_online_desc: "Transmisiones en vivo por YouTube",

    // General
    btn_read_more: "Conoce nuestra historia",
    btn_view_sermons: "Ver todos los sermones",
    btn_explore: "Explorar",
    footer_rights: "© 2024 Ministerio Vida. Santa Cruz de la Sierra, Bolivia. Todos los derechos reservados."
  },

  pt: {
    // Nav
    nav_home: "Início",
    nav_about: "Sobre Nós",
    nav_pillars: "Pilares",
    nav_events: "Eventos",
    nav_reading: "Leituras",
    nav_sermons: "Sermões",
    nav_bible: "Bíblia",
    nav_location: "Localização",
    nav_cta: "Planeje sua Visita",
    nav_whatsapp: "Falar com o Pastor",

    // Hero
    hero_title_1: "Transformando",
    hero_title_2: "Vidas com Deus",
    hero_btn_new: "Sou Novo / Sedes",
    hero_btn_whatsapp: "WhatsApp Pastoral",
    hero_intro: "Seja bem-vindo a uma comunidade contemporânea, acolhedora e de sólida base bíblica. Um lugar seguro para aprender, curar, fazer amigos verdadeiros e viver com propósito eterno.",
    
    // Ticker
    ticker_label: "REUNIÕES DE DOMINGO",
    ticker_central: "Campus Central",
    ticker_central_time: "Domingos 09:00 e 11:00",
    ticker_north: "Campus Norte",
    ticker_north_time: "Domingos 10:00",
    ticker_kids: "Vida Kids",
    ticker_kids_desc: "Ministério especial para crianças",
    ticker_online: "Culto Online",
    ticker_online_desc: "Transmissões ao vivo no YouTube",

    // General
    btn_read_more: "Conheça nossa história",
    btn_view_sermons: "Ver todos os sermões",
    btn_explore: "Explorar",
    footer_rights: "© 2024 Ministério Vida. Santa Cruz de la Sierra, Bolívia. Todos os direitos reservados."
  },

  en: {
    // Nav
    nav_home: "Home",
    nav_about: "About Us",
    nav_pillars: "Pillars",
    nav_events: "Events",
    nav_reading: "Reading",
    nav_sermons: "Sermons",
    nav_bible: "Bible",
    nav_location: "Locations",
    nav_cta: "Plan Your Visit",
    nav_whatsapp: "Message the Pastor",

    // Hero
    hero_title_1: "Transforming",
    hero_title_2: "Lives with God",
    hero_btn_new: "I'm New / Locations",
    hero_btn_whatsapp: "Pastoral WhatsApp",
    hero_intro: "Welcome to a contemporary, warm, and Bible-centered community. A safe place to learn, heal, build genuine friendships, and live with eternal purpose.",
    
    // Ticker
    ticker_label: "SUNDAY SERVICES",
    ticker_central: "Central Campus",
    ticker_central_time: "Sundays 09:00 AM & 11:00 AM",
    ticker_north: "North Campus",
    ticker_north_time: "Sundays 10:00 AM",
    ticker_kids: "Vida Kids",
    ticker_kids_desc: "Specialized ministry for children",
    ticker_online: "Online Service",
    ticker_online_desc: "Live stream on YouTube",

    // General
    btn_read_more: "Our Story",
    btn_view_sermons: "View All Sermons",
    btn_explore: "Explore",
    footer_rights: "© 2024 Ministerio Vida. Santa Cruz de la Sierra, Bolivia. All rights reserved."
  }
};

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('mv_lang') || 'es';
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.setupListeners();
  }

  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('mv_lang', lang);
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    const dict = translations[lang] || translations.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Actualizar indicador visual en el selector
    document.querySelectorAll('.lang-selector-btn .current-lang-text').forEach(el => {
      el.textContent = lang.toUpperCase();
    });

    document.querySelectorAll('.lang-dropdown-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-lang') === lang);
    });

    // Atributo lang en html
    document.documentElement.lang = lang;
  }

  setupListeners() {
    // Dropdown toggle
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.lang-selector-btn');
      const dropdown = document.querySelector('.lang-dropdown-menu');

      if (trigger) {
        e.stopPropagation();
        dropdown?.classList.toggle('active');
      } else if (!e.target.closest('.lang-dropdown-menu')) {
        dropdown?.classList.remove('active');
      }

      // Cambio de idioma
      const langItem = e.target.closest('.lang-dropdown-item');
      if (langItem) {
        const lang = langItem.getAttribute('data-lang');
        this.setLanguage(lang);
        dropdown?.classList.remove('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new LanguageManager();
});
