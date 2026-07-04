const CRIME_TYPES = [
  { id: 'all', label: 'Tutti', icon: '📊' },
  { id: 'furti', label: 'Furti', icon: '👜' },
  { id: 'rapine', label: 'Rapine', icon: '⚠️' },
  { id: 'spaccio', label: 'Spaccio', icon: '💊' },
  { id: 'violenza', label: 'Violenze', icon: '🔴' },
  { id: 'danneggiamenti', label: 'Danneggiamenti', icon: '🔨' },
  { id: 'truffe', label: 'Truffe', icon: '🖥️' }
];

const RISK_LEVELS = [
  { level: 1, label: 'Basso', color: '#22c55e' },
  { level: 2, label: 'Medio-basso', color: '#84cc16' },
  { level: 3, label: 'Medio', color: '#eab308' },
  { level: 4, label: 'Alto', color: '#f97316' },
  { level: 5, label: 'Molto alto', color: '#ef4444' }
];

const MUNICIPI_NAMES = {
  1: 'Centro Storico',
  2: 'Porta Nuova — Stazione Centrale',
  3: 'Porta Venezia — Lambrate',
  4: 'Porta Vittoria — Forlanini',
  5: 'Vigentino — Corvetto',
  6: 'Barona — Navigli',
  7: 'Baggio — Lorenteggio',
  8: 'Fiera — San Siro',
  9: 'Niguarda — Bovisa'
};

const MUNICIPI_DATA = {
  1: {
    risk: 3,
    crimes: {
      furti: { level: 4, desc: 'Furti con destrezza e nei negozi, soprattutto in zona Duomo e Brera. Milano è 1ª in Italia per furti con destrezza.' },
      rapine: { level: 3, desc: 'Rapine moderate in aree turistiche e nelle ore serali.' },
      spaccio: { level: 2, desc: 'Presenza limitata, concentrata in alcune vie periferiche del municipio.' },
      violenza: { level: 2, desc: 'Incidenza contenuta rispetto alla media cittadina.' },
      danneggiamenti: { level: 3, desc: 'Vandalismo e danneggiamenti in aree di movida.' },
      truffe: { level: 3, desc: 'Truffe a turisti e schema del cordone.' }
    },
    tips: 'Attenzione a borse e telefoni in zona Duomo, Galleria e Brera. Evitare vicoli isolati di notte.',
    orari: {
      fasce: [
        { da: '22:00', a: '06:00', giorni: 'Tutti i giorni', livello: 3, nota: 'Vicoli isolati e zone turistiche deserte.' },
        { da: '23:00', a: '03:00', giorni: 'Ven — Dom', livello: 4, nota: 'Movida in Brera e zona Duomo: furti e rapine.' }
      ],
      preferibile: '08:00 — 20:00, giorni feriali'
    }
  },
  2: {
    risk: 4,
    crimes: {
      furti: { level: 4, desc: 'Alto tasso di furti con strappo vicino a Stazione Centrale e Corso Buenos Aires.' },
      rapine: { level: 5, desc: 'Milano è 1ª in Italia per rapine in pubblica via. Stazione Centrale e Corso Como sono hotspot.' },
      spaccio: { level: 4, desc: 'Spaccio attivo in zone limitrofe alla stazione e nella movida di Corso Como.' },
      violenza: { level: 4, desc: 'Violenze sessuali e aggressioni elevate in zona stazione e nightlife.' },
      danneggiamenti: { level: 3, desc: 'Danneggiamenti frequenti in aree di passaggio.' },
      truffe: { level: 3, desc: 'Truffe a viaggiatori e furti in hotel/hostel.' }
    },
    tips: 'Massima cautela in Stazione Centrale, Piazzale Loreto e Corso Como dopo le 22. Non mostrare oggetti di valore.',
    orari: {
      fasce: [
        { da: '21:00', a: '06:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Stazione Centrale e Piazzale Loreto: rapine e aggressioni.' },
        { da: '00:00', a: '05:00', giorni: 'Ven — Dom', livello: 5, nota: 'Corso Como e zona Isola: movida e spaccio.' },
        { da: '18:00', a: '22:00', giorni: 'Lun — Ven', livello: 3, nota: 'Corso Buenos Aires: furti con strappo all\'uscita dal lavoro.' }
      ],
      preferibile: '07:00 — 18:00, giorni feriali'
    }
  },
  3: {
    risk: 3,
    crimes: {
      furti: { level: 3, desc: 'Furti in abitazione e auto in Lambrate e Città Studi.' },
      rapine: { level: 3, desc: 'Rapine moderate, con picchi in Via Padova e Porta Venezia.' },
      spaccio: { level: 3, desc: 'Spaccio presente in Via Padova e zone limitrofe.' },
      violenza: { level: 3, desc: 'Milano 3ª in Italia per violenze sessuali; incidenza in zone di passaggio.' },
      danneggiamenti: { level: 3, desc: 'Danneggiamenti in aree residenziali e commerciali.' },
      truffe: { level: 2, desc: 'Incidenza media, in crescita le truffe informatiche.' }
    },
    tips: 'Via Padova richiede attenzione di sera. Lambrate e Porta Venezia: vigilare su borse e zaini.',
    orari: {
      fasce: [
        { da: '20:00', a: '06:00', giorni: 'Tutti i giorni', livello: 4, nota: 'Via Padova: spaccio e rapine nelle ore serali.' },
        { da: '22:00', a: '02:00', giorni: 'Ven — Sab', livello: 4, nota: 'Porta Venezia e Città Studi: furti in uscita dai locali.' }
      ],
      preferibile: '08:00 — 19:00, giorni feriali'
    }
  },
  4: {
    risk: 3,
    crimes: {
      furti: { level: 3, desc: 'Furti in abitazione e nei box auto nelle zone residenziali.' },
      rapine: { level: 3, desc: 'Rapine sporadiche, più frequenti verso Porta Vittoria.' },
      spaccio: { level: 2, desc: 'Presenza moderata, soprattutto in aree di degrado urbano.' },
      violenza: { level: 2, desc: 'Sotto la media cittadina per lesioni dolose.' },
      danneggiamenti: { level: 3, desc: 'Danneggiamenti a veicoli e proprietà private.' },
      truffe: { level: 2, desc: 'Truffe informatiche in crescita tra i residenti.' }
    },
    tips: 'Zona generalmente tranquilla di giorno. Attenzione ai parcheggi non custoditi.',
    orari: {
      fasce: [
        { da: '21:00', a: '06:00', giorni: 'Tutti i giorni', livello: 3, nota: 'Parcheggi e vie secondarie poco illuminate.' }
      ],
      preferibile: '07:00 — 21:00, tutti i giorni'
    }
  },
  5: {
    risk: 4,
    crimes: {
      furti: { level: 3, desc: 'Furti nelle case popolari e nei box.' },
      rapine: { level: 4, desc: 'Corvetto è tra i quartieri più critici della città, soprattutto di notte.' },
      spaccio: { level: 4, desc: 'Milano 5ª per stupefacenti. Spaccio attivo in Corvetto e zone limitrofe.' },
      violenza: { level: 4, desc: 'Presenza di baby gang e risse tra gruppi giovanili.' },
      danneggiamenti: { level: 3, desc: 'Danneggiamenti diffusi nelle aree di edilizia popolare.' },
      truffe: { level: 2, desc: 'Incidenza bassa rispetto ad altri reati.' }
    },
    tips: 'Corvetto e Chiaravalle: evitare di notte. Presenza di baby gang nelle aree di edilizia popolare.',
    orari: {
      fasce: [
        { da: '20:00', a: '06:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Corvetto: baby gang e spaccio nelle case popolari.' },
        { da: '18:00', a: '22:00', giorni: 'Sab — Dom', livello: 4, nota: 'Chiaravalle: risse e microcriminalità.' }
      ],
      preferibile: '07:00 — 18:00, giorni feriali'
    }
  },
  6: {
    risk: 4,
    crimes: {
      furti: { level: 4, desc: 'Furti e scippi frequenti sui Navigli e in zona Porta Ticinese, soprattutto nel weekend.' },
      rapine: { level: 4, desc: 'Rapine di orologi e oggetti di lusso nella movida dei Navigli e Porta Genova.' },
      spaccio: { level: 3, desc: 'Spaccio nelle aree limitrofe alla movida notturna.' },
      violenza: { level: 3, desc: 'Risse e aggressioni legate alla movida nei weekend.' },
      danneggiamenti: { level: 4, desc: 'Milano 2ª in Italia per danneggiamenti. Incidenza alta in zona Navigli.' },
      truffe: { level: 2, desc: 'Truffe occasionali a clienti dei locali.' }
    },
    tips: 'Navigli e Porta Ticinese: attenzione a furti di telefoni e rapine di lusso nel weekend notturno.',
    orari: {
      fasce: [
        { da: '23:00', a: '05:00', giorni: 'Ven — Dom', livello: 5, nota: 'Navigli: rapine di lusso e furti nella movida.' },
        { da: '22:00', a: '04:00', giorni: 'Gio — Sab', livello: 4, nota: 'Porta Ticinese e Darsena: risse e scippi.' },
        { da: '21:00', a: '06:00', giorni: 'Lun — Gio', livello: 3, nota: 'Zone residenziali Barona: attenzione moderata.' }
      ],
      preferibile: '10:00 — 20:00, giorni feriali'
    }
  },
  7: {
    risk: 5,
    crimes: {
      furti: { level: 4, desc: 'Furti con strappo e in abitazione in Giambellino e Lorenteggio.' },
      rapine: { level: 5, desc: 'Giambellino-Lorenteggio tra le zone più critiche: scontri tra clan e rapine frequenti.' },
      spaccio: { level: 5, desc: 'Forte presenza di spaccio e traffico stupefacenti nelle periferie del municipio.' },
      violenza: { level: 5, desc: 'Baby gang radicate (MS-13, Z4). Alto tasso di lesioni dolose.' },
      danneggiamenti: { level: 4, desc: 'Danneggiamenti diffusi nelle aree di degrado.' },
      truffe: { level: 2, desc: 'Incidenza contenuta.' }
    },
    tips: 'Giambellino, Lorenteggio e Quarto Oggiaro: zone ad alto rischio. Evitare isolamento notturno.',
    orari: {
      fasce: [
        { da: '19:00', a: '07:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Giambellino, Lorenteggio, Quarto Oggiaro: massima pericolosità.' },
        { da: '15:00', a: '19:00', giorni: 'Sab — Dom', livello: 4, nota: 'Pomeriggio weekend: risse tra gruppi giovanili.' }
      ],
      preferibile: '08:00 — 17:00, solo giorni feriali e in gruppo'
    }
  },
  8: {
    risk: 4,
    crimes: {
      furti: { level: 4, desc: 'Furti nelle case popolari di San Siro e QT8.' },
      rapine: { level: 4, desc: 'San Siro tra i quartieri più critici per rapine e microcriminalità.' },
      spaccio: { level: 4, desc: 'Spaccio attivo nelle aree di San Siro e Gallaratese.' },
      violenza: { level: 4, desc: 'Baby gang e risse frequenti nelle case popolari di San Siro.' },
      danneggiamenti: { level: 3, desc: 'Danneggiamenti nelle aree periferiche.' },
      truffe: { level: 2, desc: 'Incidenza bassa.' }
    },
    tips: 'San Siro e QT8: forte presenza di baby gang. Controlli antidroga frequenti nelle case popolari.',
    orari: {
      fasce: [
        { da: '20:00', a: '06:00', giorni: 'Tutti i giorni', livello: 5, nota: 'San Siro e QT8: baby gang e spaccio nelle case popolari.' },
        { da: '22:00', a: '02:00', giorni: 'Giorni con partite allo stadio', livello: 4, nota: 'Zona San Siro stadio: risse e furti ai tifosi.' }
      ],
      preferibile: '08:00 — 18:00, giorni feriali (evitare Fiera di notte)'
    }
  },
  9: {
    risk: 2,
    crimes: {
      furti: { level: 2, desc: 'Furti contenuti, principalmente auto e box.' },
      rapine: { level: 2, desc: 'Rapine sporadiche, sotto la media cittadina.' },
      spaccio: { level: 2, desc: 'Presenza limitata rispetto alle periferie sud-ovest.' },
      violenza: { level: 2, desc: 'Incidenza bassa per lesioni e violenze.' },
      danneggiamenti: { level: 2, desc: 'Danneggiamenti sotto la media milanese.' },
      truffe: { level: 2, desc: 'Truffe informatiche in linea con la media.' }
    },
    tips: 'Zona relativamente tranquilla. Bovisa in riqualificazione: attenzione nelle aree ancora in transizione.',
    orari: {
      fasce: [
        { da: '23:00', a: '05:00', giorni: 'Ven — Dom', livello: 3, nota: 'Bovisa e zona stazione: attenzione moderata.' }
      ],
      preferibile: '06:00 — 23:00, tutti i giorni'
    }
  }
};

const HOTSPOTS = [
  {
    id: 'centrale',
    name: 'Stazione Centrale',
    municipio: 2,
    lat: 45.4863,
    lng: 9.2041,
    risk: 5,
    crimes: ['rapine', 'furti', 'violenza', 'spaccio'],
    desc: 'Hotspot nazionale per rapine in pubblica via, scippi e violenze sessuali. Zona ad altissimo flusso turistico e transito.',
    orari: {
      fasce: [
        { da: '20:00', a: '06:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Piazza Duca d\'Aosta e sottopassaggi: evitare assolutamente.' },
        { da: '06:00', a: '09:00', giorni: 'Tutti i giorni', livello: 4, nota: 'Orario mattutino: furti a viaggiatori assonnati.' }
      ],
      preferibile: '09:00 — 18:00, giorni feriali'
    }
  },
  {
    id: 'corso-como',
    name: 'Corso Como',
    municipio: 2,
    lat: 45.4818,
    lng: 9.1860,
    risk: 4,
    crimes: ['rapine', 'furti', 'spaccio'],
    desc: 'Movida notturna con aumento di rapine e reati legati allo spaccio. Furti di orologi e oggetti di lusso.',
    orari: {
      fasce: [
        { da: '23:00', a: '05:00', giorni: 'Gio — Dom', livello: 5, nota: 'Uscita dai locali: rapine e spaccio.' },
        { da: '22:00', a: '24:00', giorni: 'Lun — Mer', livello: 3, nota: 'Serate infrasettimanali: rischio moderato.' }
      ],
      preferibile: '12:00 — 20:00, tutti i giorni'
    }
  },
  {
    id: 'san-siro',
    name: 'San Siro',
    municipio: 8,
    lat: 45.4781,
    lng: 9.1240,
    risk: 5,
    crimes: ['rapine', 'spaccio', 'violenza'],
    desc: 'Quartiere critico con baby gang radicate, spaccio e microcriminalità nelle case popolari.',
    orari: {
      fasce: [
        { da: '18:00', a: '07:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Case popolari e via Harar: non transitare da soli.' },
        { da: '22:00', a: '02:00', giorni: 'Giorni partita', livello: 5, nota: 'Zona stadio: risse e rapine ai tifosi.' }
      ],
      preferibile: '08:00 — 17:00, giorni feriali, vie principali'
    }
  },
  {
    id: 'corvetto',
    name: 'Corvetto',
    municipio: 5,
    lat: 45.4330,
    lng: 9.2140,
    risk: 5,
    crimes: ['rapine', 'spaccio', 'violenza'],
    desc: 'Tra i quartieri meno sicuri di Milano, soprattutto nelle ore notturne. Presenza di baby gang.',
    orari: {
      fasce: [
        { da: '19:00', a: '07:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Intero quartiere: evitare completamente di notte.' },
        { da: '16:00', a: '20:00', giorni: 'Sab — Dom', livello: 4, nota: 'Pomeriggio: risse tra gruppi giovanili.' }
      ],
      preferibile: '07:00 — 16:00, solo giorni feriali'
    }
  },
  {
    id: 'lorenteggio',
    name: 'Giambellino — Lorenteggio',
    municipio: 7,
    lat: 45.4420,
    lng: 9.1080,
    risk: 5,
    crimes: ['rapine', 'spaccio', 'violenza', 'furti'],
    desc: 'Zona segnalata dall\'ex capo della polizia Gabrielli. Scontri tra clan, spaccio e baby gang.',
    orari: {
      fasce: [
        { da: '18:00', a: '07:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Via Lorenteggio e Giambellino: massima cautela.' },
        { da: '14:00', a: '18:00', giorni: 'Sab — Dom', livello: 4, nota: 'Pomeriggio: attività di spaccio e risse.' }
      ],
      preferibile: '08:00 — 14:00, giorni feriali, vie trafficate'
    }
  },
  {
    id: 'quarto-oggiaro',
    name: 'Quarto Oggiaro',
    municipio: 7,
    lat: 45.5080,
    lng: 9.1480,
    risk: 5,
    crimes: ['rapine', 'spaccio', 'violenza', 'danneggiamenti'],
    desc: 'Uno dei tassi di criminalità più alti dell\'area metropolitana. Degrado urbano e microcriminalità.',
    orari: {
      fasce: [
        { da: '17:00', a: '08:00', giorni: 'Tutti i giorni', livello: 5, nota: 'Quartiere tra i più critici: evitare dal tramonto.' },
        { da: '12:00', a: '17:00', giorni: 'Sab — Dom', livello: 4, nota: 'Weekend pomeridiani: degrado e microcriminalità.' }
      ],
      preferibile: '08:00 — 12:00, giorni feriali'
    }
  },
  {
    id: 'via-padova',
    name: 'Via Padova',
    municipio: 3,
    lat: 45.4980,
    lng: 9.2180,
    risk: 4,
    crimes: ['rapine', 'spaccio', 'furti'],
    desc: 'Zona pericolosa soprattore sera e notte. Spaccio e rapine nonostante tentativi di riqualificazione.',
    orari: {
      fasce: [
        { da: '20:00', a: '06:00', giorni: 'Tutti i giorni', livello: 4, nota: 'Via Padova e Piazzale Loreto nord: spaccio e rapine.' },
        { da: '22:00', a: '03:00', giorni: 'Ven — Sab', livello: 5, nota: 'Picco massimo: evitare completamente.' }
      ],
      preferibile: '08:00 — 18:00, giorni feriali'
    }
  },
  {
    id: 'navigli',
    name: 'Navigli',
    municipio: 6,
    lat: 45.4510,
    lng: 9.1760,
    risk: 4,
    crimes: ['furti', 'rapine', 'danneggiamenti'],
    desc: 'Furti con destrezza e rapine di lusso nel weekend. Milano 2ª per danneggiamenti.',
    orari: {
      fasce: [
        { da: '23:00', a: '05:00', giorni: 'Ven — Dom', livello: 5, nota: 'Movida: rapine orologi e scippi ai clienti dei locali.' },
        { da: '22:00', a: '24:00', giorni: 'Gio — Sab', livello: 4, nota: 'Serate pre-weekend: furti con destrezza.' }
      ],
      preferibile: '10:00 — 20:00, tutti i giorni'
    }
  },
  {
    id: 'duomo',
    name: 'Duomo — Galleria',
    municipio: 1,
    lat: 45.4641,
    lng: 9.1919,
    risk: 3,
    crimes: ['furti', 'truffe', 'rapine'],
    desc: 'Epicentro turistico: furti con destrezza, truffe ai turisti e rapine occasionali.',
    orari: {
      fasce: [
        { da: '22:00', a: '06:00', giorni: 'Tutti i giorni', livello: 3, nota: 'Galleria e vicoli: furti e truffe ai turisti.' },
        { da: '12:00', a: '18:00', giorni: 'Sab — Dom', livello: 3, nota: 'Affollamento turistico: massima attenzione a borse e telefoni.' }
      ],
      preferibile: '08:00 — 12:00, tutti i giorni'
    }
  },
  {
    id: 'porta-venezia',
    name: 'Porta Venezia',
    municipio: 3,
    lat: 45.4730,
    lng: 9.2050,
    risk: 3,
    crimes: ['furti', 'rapine', 'violenza'],
    desc: 'Zona di passaggio con rapine e furti, soprattutto nelle ore serali.',
    orari: {
      fasce: [
        { da: '21:00', a: '02:00', giorni: 'Ven — Sab', livello: 4, nota: 'Corso Buenos Aires sud e giardini: rapine serali.' },
        { da: '22:00', a: '06:00', giorni: 'Tutti i giorni', livello: 3, nota: 'Parchi e vie secondarie poco illuminate.' }
      ],
      preferibile: '08:00 — 20:00, giorni feriali'
    }
  }
];

const CITY_STATS = {
  denuncePer100k: 6952,
  totaleDenunce: 225786,
  posizioneItalia: 1,
  anno: 2024,
  principaliReati: [
    { nome: 'Furti', quota: '44%', trend: 'in crescita' },
    { nome: 'Rapine in strada', quota: '1ª in Italia', trend: 'stabile' },
    { nome: 'Danneggiamenti', quota: '32.000 denunce', trend: '2ª in Italia' },
    { nome: 'Spaccio', quota: '2.209 denunce', trend: '3ª in Italia' }
  ]
};