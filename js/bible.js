/**
 * MINISTERIO VIDA — MOTOR DE BIBLIA INTEGRADA (REINA VALERA 1960 - RVR1960)
 */

const BIBLE_BOOKS = [
  // ANTIGUO TESTAMENTO
  { id: 'GEN', name: 'Génesis', testament: 'AT', chapters: 50 },
  { id: 'EXO', name: 'Éxodo', testament: 'AT', chapters: 40 },
  { id: 'LEV', name: 'Levítico', testament: 'AT', chapters: 27 },
  { id: 'NUM', name: 'Números', testament: 'AT', chapters: 36 },
  { id: 'DEU', name: 'Deuteronomio', testament: 'AT', chapters: 34 },
  { id: 'JOS', name: 'Josué', testament: 'AT', chapters: 24 },
  { id: 'JDG', name: 'Jueces', testament: 'AT', chapters: 21 },
  { id: 'RUT', name: 'Rut', testament: 'AT', chapters: 4 },
  { id: '1SA', name: '1 Samuel', testament: 'AT', chapters: 31 },
  { id: '2SA', name: '2 Samuel', testament: 'AT', chapters: 24 },
  { id: '1KI', name: '1 Reyes', testament: 'AT', chapters: 22 },
  { id: '2KI', name: '2 Reyes', testament: 'AT', chapters: 25 },
  { id: '1CH', name: '1 Crónicas', testament: 'AT', chapters: 29 },
  { id: '2CH', name: '2 Crónicas', testament: 'AT', chapters: 36 },
  { id: 'EZR', name: 'Esdras', testament: 'AT', chapters: 10 },
  { id: 'NEH', name: 'Nehemías', testament: 'AT', chapters: 13 },
  { id: 'EST', name: 'Ester', testament: 'AT', chapters: 10 },
  { id: 'JOB', name: 'Job', testament: 'AT', chapters: 42 },
  { id: 'PSA', name: 'Salmos', testament: 'AT', chapters: 150 },
  { id: 'PRO', name: 'Proverbios', testament: 'AT', chapters: 31 },
  { id: 'ECC', name: 'Eclesiastés', testament: 'AT', chapters: 12 },
  { id: 'SNG', name: 'Cantares', testament: 'AT', chapters: 8 },
  { id: 'ISA', name: 'Isaías', testament: 'AT', chapters: 66 },
  { id: 'JER', name: 'Jeremías', testament: 'AT', chapters: 52 },
  { id: 'LAM', name: 'Lamentaciones', testament: 'AT', chapters: 5 },
  { id: 'EZK', name: 'Ezequiel', testament: 'AT', chapters: 48 },
  { id: 'DAN', name: 'Daniel', testament: 'AT', chapters: 12 },
  { id: 'HOS', name: 'Oseas', testament: 'AT', chapters: 14 },
  { id: 'JOL', name: 'Joel', testament: 'AT', chapters: 3 },
  { id: 'AMO', name: 'Amós', testament: 'AT', chapters: 9 },
  { id: 'OBA', name: 'Abdías', testament: 'AT', chapters: 1 },
  { id: 'JON', name: 'Jonás', testament: 'AT', chapters: 4 },
  { id: 'MIC', name: 'Miqueas', testament: 'AT', chapters: 7 },
  { id: 'NAM', name: 'Nahúm', testament: 'AT', chapters: 3 },
  { id: 'HAB', name: 'Habacuc', testament: 'AT', chapters: 3 },
  { id: 'ZEP', name: 'Sofonías', testament: 'AT', chapters: 3 },
  { id: 'HAG', name: 'Hageo', testament: 'AT', chapters: 2 },
  { id: 'ZEC', name: 'Zacarías', testament: 'AT', chapters: 14 },
  { id: 'MAL', name: 'Malaquías', testament: 'AT', chapters: 4 },

  // NUEVO TESTAMENTO
  { id: 'MAT', name: 'Mateo', testament: 'NT', chapters: 28 },
  { id: 'MRK', name: 'Marcos', testament: 'NT', chapters: 16 },
  { id: 'LUK', name: 'Lucas', testament: 'NT', chapters: 24 },
  { id: 'JHN', name: 'Juan', testament: 'NT', chapters: 21 },
  { id: 'ACT', name: 'Hechos', testament: 'NT', chapters: 28 },
  { id: 'ROM', name: 'Romanos', testament: 'NT', chapters: 16 },
  { id: '1CO', name: '1 Corintios', testament: 'NT', chapters: 16 },
  { id: '2CO', name: '2 Corintios', testament: 'NT', chapters: 13 },
  { id: 'GAL', name: 'Gálatas', testament: 'NT', chapters: 6 },
  { id: 'EPH', name: 'Efesios', testament: 'NT', chapters: 6 },
  { id: 'PHP', name: 'Filipenses', testament: 'NT', chapters: 4 },
  { id: 'COL', name: 'Colosenses', testament: 'NT', chapters: 4 },
  { id: '1TH', name: '1 Tesalonicenses', testament: 'NT', chapters: 5 },
  { id: '2TH', name: '2 Tesalonicenses', testament: 'NT', chapters: 3 },
  { id: '1TI', name: '1 Timoteo', testament: 'NT', chapters: 6 },
  { id: '2TI', name: '2 Timoteo', testament: 'NT', chapters: 4 },
  { id: 'TIT', name: 'Tito', testament: 'NT', chapters: 3 },
  { id: 'PHM', name: 'Filemón', testament: 'NT', chapters: 1 },
  { id: 'HEB', name: 'Hebreos', testament: 'NT', chapters: 13 },
  { id: 'JAS', name: 'Santiago', testament: 'NT', chapters: 5 },
  { id: '1PE', name: '1 Pedro', testament: 'NT', chapters: 5 },
  { id: '2PE', name: '2 Pedro', testament: 'NT', chapters: 3 },
  { id: '1JN', name: '1 Juan', testament: 'NT', chapters: 5 },
  { id: '2JN', name: '2 Juan', testament: 'NT', chapters: 1 },
  { id: '3JN', name: '3 Juan', testament: 'NT', chapters: 1 },
  { id: 'JUD', name: 'Judas', testament: 'NT', chapters: 1 },
  { id: 'REV', name: 'Apocalipsis', testament: 'NT', chapters: 22 }
];

// Pasajes Clave RVR1960 Precargados para Carga Instantánea
const SAMPLE_PASSAGES = {
  'JHN_3': {
    book: 'Juan',
    chapter: 3,
    verses: [
      { num: 1, text: "Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos." },
      { num: 2, text: "Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro; porque nadie puede hacer estas señales que tú haces, si no está Dios con él." },
      { num: 3, text: "Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios." },
      { num: 4, text: "Nicodemo le dijo: ¿Cómo puede un hombre nacer siendo viejo? ¿Puede acaso entrar por segunda vez en el vientre de su madre, y nacer?" },
      { num: 5, text: "Respondió Jesús: De cierto, de cierto te digo, que el que no naciere de agua y del Espíritu, no puede entrar en el reino de Dios." },
      { num: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
      { num: 17, text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él." }
    ]
  },
  'PSA_23': {
    book: 'Salmos',
    chapter: 23,
    verses: [
      { num: 1, text: "Jehová es mi pastor; nada me faltará." },
      { num: 2, text: "En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará." },
      { num: 3, text: "Confortará mi alma; me guiará por sendas de justicia por amor de su nombre." },
      { num: 4, text: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento." },
      { num: 5, text: "Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando." },
      { num: 6, text: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días." }
    ]
  },
  'ROM_8': {
    book: 'Romanos',
    chapter: 8,
    verses: [
      { num: 1, text: "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme a la carne, sino conforme al Espíritu." },
      { num: 28, text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados." },
      { num: 31, text: "¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?" },
      { num: 37, text: "Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó." },
      { num: 38, text: "Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir," },
      { num: 39, text: "ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro." }
    ]
  },
  'PHP_4': {
    book: 'Filipenses',
    chapter: 4,
    verses: [
      { num: 4, text: "Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!" },
      { num: 6, text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias." },
      { num: 7, text: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús." },
      { num: 13, text: "Todo lo puedo en Cristo que me fortalece." },
      { num: 19, text: "Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús." }
    ]
  },
  'PSA_91': {
    book: 'Salmos',
    chapter: 91,
    verses: [
      { num: 1, text: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente." },
      { num: 2, text: "Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré." },
      { num: 3, text: "Él te librará del lazo del cazador, de la peste destructora." },
      { num: 4, text: "Con sus plumas te cubrirá, y debajo de sus alas estarás seguro; escudo y adarga es su verdad." },
      { num: 11, text: "Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos." }
    ]
  }
};

class BibleApp {
  constructor() {
    this.currentBook = BIBLE_BOOKS.find(b => b.id === 'JHN');
    this.currentChapter = 3;
    this.fontSize = 18;
    this.init();
  }

  init() {
    this.renderBooks();
    this.loadChapter(this.currentBook.id, this.currentChapter);
    this.setupListeners();
  }

  renderBooks() {
    const atContainer = document.getElementById('booksAT');
    const ntContainer = document.getElementById('booksNT');
    if (!atContainer || !ntContainer) return;

    atContainer.innerHTML = '';
    ntContainer.innerHTML = '';

    BIBLE_BOOKS.forEach(book => {
      const btn = document.createElement('button');
      btn.className = `bible-book-pill ${book.id === this.currentBook.id ? 'active' : ''}`;
      btn.textContent = book.name;
      btn.dataset.bookId = book.id;
      btn.addEventListener('click', () => this.selectBook(book));

      if (book.testament === 'AT') {
        atContainer.appendChild(btn);
      } else {
        ntContainer.appendChild(btn);
      }
    });
  }

  selectBook(book) {
    this.currentBook = book;
    this.currentChapter = 1;
    this.renderBooks();
    this.renderChapterSelector();
    this.loadChapter(book.id, 1);
  }

  renderChapterSelector() {
    const container = document.getElementById('chapterSelector');
    if (!container) return;

    container.innerHTML = '';
    for (let c = 1; c <= this.currentBook.chapters; c++) {
      const btn = document.createElement('button');
      btn.className = `bible-chap-pill ${c === this.currentChapter ? 'active' : ''}`;
      btn.textContent = c;
      btn.addEventListener('click', () => {
        this.currentChapter = c;
        this.renderChapterSelector();
        this.loadChapter(this.currentBook.id, c);
      });
      container.appendChild(btn);
    }
  }

  async loadChapter(bookId, chapterNum) {
    const titleEl = document.getElementById('bibleChapterTitle');
    const versesContainer = document.getElementById('bibleVersesContainer');
    if (!titleEl || !versesContainer) return;

    titleEl.textContent = `${this.currentBook.name} ${chapterNum} (Reina-Valera 1960)`;
    versesContainer.innerHTML = '<div class="bible-loading">Cargando pasaje bíblico...</div>';

    const key = `${bookId}_${chapterNum}`;
    if (SAMPLE_PASSAGES[key]) {
      this.displayVerses(SAMPLE_PASSAGES[key].verses);
      return;
    }

    // Consulta API pública o fallback
    try {
      const response = await fetch(`https://bible-api.deno.dev/api/read/rv1960/${bookId.toLowerCase()}/${chapterNum}`);
      if (response.ok) {
        const data = await response.json();
        const verses = data.vers || data.verses || [];
        if (verses.length > 0) {
          this.displayVerses(verses.map((v, i) => ({ num: v.number || i + 1, text: v.verse || v.text })));
          return;
        }
      }
    } catch (e) {
      console.log("Cargando modo offline.");
    }

    // Fallback descriptivo si no hay internet
    versesContainer.innerHTML = `
      <div class="bible-offline-box">
        <p class="offline-msg">Lectura disponible de <strong>${this.currentBook.name} capítulo ${chapterNum}</strong>.</p>
        <p style="color: var(--t-muted); font-size: 15px; margin-top: 8px;">
          <em>"Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia." — 2 Timoteo 3:16</em>
        </p>
        <div style="margin-top: 20px;">
          <a href="https://www.bible.com/es/bible/149/${bookId}.${chapterNum}.RVR1960" target="_blank" rel="noopener noreferrer" class="orivex-btn-primary">
            <span>Abrir en YouVersion (RVR1960 Completa)</span>
          </a>
        </div>
      </div>
    `;
  }

  displayVerses(verses) {
    const container = document.getElementById('bibleVersesContainer');
    if (!container) return;

    container.innerHTML = '';
    verses.forEach(v => {
      const p = document.createElement('p');
      p.className = 'bible-verse-line';
      p.style.fontSize = `${this.fontSize}px`;
      p.innerHTML = `<sup class="verse-number">${v.num}</sup> <span class="verse-text">${v.text}</span>`;
      
      // Clic para copiar versículo
      p.addEventListener('click', () => {
        const copyText = `"${v.text}" — ${this.currentBook.name} ${this.currentChapter}:${v.num} (RVR1960)`;
        navigator.clipboard.writeText(copyText);
        this.showToast(`Copiado: ${this.currentBook.name} ${this.currentChapter}:${v.num}`);
      });

      container.appendChild(p);
    });
  }

  showToast(msg) {
    let toast = document.getElementById('bibleToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bibleToast';
      toast.className = 'bible-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  setupListeners() {
    this.renderChapterSelector();

    // Control de tamaño de letra
    document.getElementById('btnFontPlus')?.addEventListener('click', () => {
      if (this.fontSize < 28) {
        this.fontSize += 2;
        document.querySelectorAll('.bible-verse-line').forEach(el => el.style.fontSize = `${this.fontSize}px`);
      }
    });

    document.getElementById('btnFontMinus')?.addEventListener('click', () => {
      if (this.fontSize > 14) {
        this.fontSize -= 2;
        document.querySelectorAll('.bible-verse-line').forEach(el => el.style.fontSize = `${this.fontSize}px`);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bibleApp')) {
    window.bibleApp = new BibleApp();
  }
});
