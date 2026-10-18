// ============================================================
// Front Security - Coberturas
// QRAs por posto, alertas de folga e QRAs de cobertura com
// verificação de choque de empenhos. Sincronizado em tempo real.
// ============================================================

// Same QTHs as the QTI Monitor (seeded only when this database is empty)
const DEFAULT_POSTS = [
  { id: 'butant__1791116240885', name: 'Butantã', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'giovanni_gronch_1789936066037', name: 'Giovanni Gronchi', category: 'Segurança Econ', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'ipiranga_1789935880313', name: 'Ipiranga', category: 'Segurança Econ', escalaType: 'hibrido', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00', hibridoSchedule: ['24h','noturno','noturno','noturno','noturno','noturno','24h'] },
  { id: 'ipiranga_demoli_o_1791576121407', name: 'Ipiranga Demolição', category: 'Segurança Econ', escalaType: 'hibrido', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00', hibridoSchedule: ['24h','noturno','noturno','noturno','noturno','noturno','24h'] },
  { id: 'mascote_1789935938743', name: 'Mascote', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'patriarca_1790890629489', name: 'Patriarca', category: 'Segurança Econ', escalaType: 'hibrido', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00', hibridoSchedule: ['24h','noturno','noturno','noturno','noturno','noturno','24h'] },
  { id: 'sabar__1789935953916', name: 'Sabara', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'tumiaru_1789935977310', name: 'Tumiaru', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'bosque_1789936154381', name: 'Bosque', category: 'Segurança Nurban', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'ces_rio_1789936139904', name: 'Cesario', category: 'Segurança Nurban', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'palmeiras_1789936128170', name: 'Palmeiras', category: 'Segurança Nurban', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'perdizes_1789936116950', name: 'Perdizes', category: 'Segurança Nurban', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'central_kallas_1789936253543', name: 'Central Kallas', category: 'Segurança Kallas', escalaType: 'hibrido', days: [1,3,5], alertTimeDiurno: '06:00', alertTimeNoturno: '', hibridoSchedule: ['folga','diurno','folga','diurno','folga','diurno','folga'] },
  { id: 'jaguare_1790803002520', name: 'Jaguare', category: 'Segurança Kallas', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'jurema_1790802984078', name: 'Jurema', category: 'Segurança Kallas', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'teixeira_1790803017399', name: 'Teixeira', category: 'Segurança Kallas', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '04:00', alertTimeNoturno: '17:00' },
  { id: 'cursino_1789936223784', name: 'Cursino', category: 'Segurança Cursino', escalaType: 'hibrido', days: [1,2,3,4,5,6], alertTimeDiurno: '06:00', alertTimeNoturno: '', hibridoSchedule: ['folga','diurno','diurno','diurno','diurno','diurno','diurno'] },
  { id: 'bosque_1789937345756', name: 'Bosque', category: 'Limpeza', escalaType: 'diurno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '06:00', alertTimeNoturno: '' },
  { id: 'campo_belo_1789936312558', name: 'Campo Belo', category: 'Limpeza', escalaType: 'hibrido', days: [3], alertTimeDiurno: '06:00', alertTimeNoturno: '', hibridoSchedule: ['folga','folga','folga','diurno','folga','folga','folga'] },
  { id: 'ces_rio_1789936415820', name: 'Cesario', category: 'Limpeza', escalaType: 'hibrido', days: [1,2,4,5,6], alertTimeDiurno: '06:30', alertTimeNoturno: '', hibridoSchedule: ['folga','diurno','diurno','folga','diurno','diurno','diurno'] },
  { id: 'cl_nica_1789985216105', name: 'Clinica', category: 'Limpeza', escalaType: 'diurno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '' },
  { id: 'ibirapuera_1789936286981', name: 'Ibirapuera', category: 'Limpeza', escalaType: 'hibrido', days: [3], alertTimeDiurno: '07:00', alertTimeNoturno: '', hibridoSchedule: ['folga','folga','folga','diurno','folga','folga','folga'] },
];

const CATEGORY_ORDER = ['Segurança Econ', 'Segurança Nurban', 'Segurança Kallas', 'Segurança Cursino', 'Limpeza'];
const CATEGORY_ICONS = { 'Segurança Econ': '🛡️', 'Segurança Nurban': '🏢', 'Segurança Kallas': '🔐', 'Segurança Cursino': '📍', 'Limpeza': '🧹' };
const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const SHIFT_LABEL = { diurno: '☀️ Diurno', noturno: '🌙 Noturno', '24h': '🔄 24h' };
// QRA slots (vagas). Each post has a fixed set of slots and each slot holds ONE QRA.
// parity: 12x36 by day of the month (0 = even days, 1 = odd days) · dows: weekdays the slot works
const QRA_TURNOS = {
  diurno: { label: '☀️ Diurno', short: '☀️', shifts: ['diurno'], parity: null },
  diurno_par: { label: '☀️ Diurno par', short: '☀️P', shifts: ['diurno'], parity: 0 },
  diurno_impar: { label: '☀️ Diurno ímpar', short: '☀️I', shifts: ['diurno'], parity: 1 },
  diurno_semana: { label: '☀️ Diurno seg–sex', short: '☀️S', shifts: ['diurno'], parity: null, dows: [1, 2, 3, 4, 5] },
  diurno_sabado: { label: '☀️ Diurno sábado', short: '☀️Sáb', shifts: ['diurno'], parity: null, dows: [6] },
  diurno_domingo: { label: '☀️ Diurno domingo', short: '☀️Dom', shifts: ['diurno'], parity: null, dows: [0] },
  noturno_par: { label: '🌙 Noturno par', short: '🌙P', shifts: ['noturno'], parity: 0 },
  noturno_impar: { label: '🌙 Noturno ímpar', short: '🌙I', shifts: ['noturno'], parity: 1 },
  // legacy values, kept so older records still work
  noturno: { label: '🌙 Noturno', short: '🌙', shifts: ['noturno'], parity: null },
  '24h': { label: '🔄 24h', short: '🔄', shifts: ['diurno', 'noturno'], parity: null },
};
const TURNO2_START = 17 * 60; // Turno 1 (diurno): 00:00–16:59 · Turno 2 (noturno): 17:00–23:59
const ALERT_DAYS_AHEAD = 7;   // header badge / card warnings look this far ahead
const AGENDA_DAYS_AHEAD = 30;

// ===== Date & shift helpers (local time, dates as 'YYYY-MM-DD') =====

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(str, n) {
  const d = parseDate(str);
  d.setDate(d.getDate() + n);
  return toDateStr(d);
}

function todayStr() {
  return toDateStr(new Date());
}

// 'diurno' | 'noturno' | '24h' → the shifts it occupies
function shiftsOf(type) {
  if (type === '24h') return ['diurno', 'noturno'];
  if (type === 'diurno' || type === 'noturno') return [type];
  return [];
}

function currentSlot() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return { date: toDateStr(now), shift: minutes >= TURNO2_START ? 'noturno' : 'diurno' };
}

function prevSlot(date, shift) {
  return shift === 'noturno' ? { date, shift: 'diurno' } : { date: addDays(date, -1), shift: 'noturno' };
}

function nextSlot(date, shift) {
  return shift === 'diurno' ? { date, shift: 'noturno' } : { date: addDays(date, 1), shift: 'diurno' };
}

function dateLabel(date) {
  const today = todayStr();
  if (date === today) return 'Hoje';
  if (date === addDays(today, 1)) return 'Amanhã';
  if (date === addDays(today, -1)) return 'Ontem';
  const d = parseDate(date);
  return `${DAY_NAMES[d.getDay()]} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function slotLabel(date, shift) {
  return `${dateLabel(date)} ${SHIFT_LABEL[shift] || shift}`;
}

function normalizeText(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function makeId(name) {
  return normalizeText(name).replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').slice(0, 30) + '_' + Date.now();
}

// Google Calendar "new event" link (all-day event on `date`)
function gcalUrl(title, date, details) {
  const start = date.replace(/-/g, '');
  const end = addDays(date, 1).replace(/-/g, '');
  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${start}/${end}`, details: details || '' });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ============================================================
// Pure schedule logic (no DOM) — easy to test in isolation
// ============================================================

class Schedule {
  constructor() {
    this.posts = {};
    this.qras = {};
    this.folgas = {};
    this.coberturas = {};
  }

  // Shift a post works on `date`: 'diurno' | 'noturno' | '24h' | 'folga'
  postShiftOn(post, date) {
    if (!post) return 'folga';
    const dow = parseDate(date).getDay();
    if (post.escalaType === 'hibrido') {
      return (post.hibridoSchedule && post.hibridoSchedule[dow]) || 'folga';
    }
    const days = Array.isArray(post.days) ? post.days : [0, 1, 2, 3, 4, 5, 6];
    return days.includes(dow) ? post.escalaType : 'folga';
  }

  postWorks(post, date, shift) {
    return shiftsOf(this.postShiftOn(post, date)).includes(shift);
  }

  // Slots (vagas) of a post, derived from its escala
  postSlots(post) {
    if (!post) return [];
    if (post.escalaType === '24h') return ['diurno_par', 'diurno_impar', 'noturno_par', 'noturno_impar'];
    if (post.escalaType === 'noturno') return ['noturno_par', 'noturno_impar'];
    if (post.escalaType === 'diurno') return ['diurno'];
    const sched = post.hibridoSchedule || [];
    const hasDay = dow => sched[dow] === 'diurno' || sched[dow] === '24h';
    const slots = [];
    if ([1, 2, 3, 4, 5].some(hasDay)) slots.push('diurno_semana');
    if (hasDay(6)) slots.push('diurno_sabado');
    if (hasDay(0)) slots.push('diurno_domingo');
    if (sched.some(t => t === 'noturno' || t === '24h')) slots.push('noturno_par', 'noturno_impar');
    return slots;
  }

  // QRA holding a slot (at most one by design)
  slotHolder(postId, turno) {
    return Object.values(this.qras).find(q => q.postId === postId && q.turno === turno) || null;
  }

  qraShifts(qra) {
    const t = qra && QRA_TURNOS[qra.turno];
    return t ? t.shifts : [];
  }

  // Titular duty ignoring folgas: QRA has a post (reserves have none), the post operates in that
  // shift, the QRA's turno covers it (incl. even/odd day for par/ímpar) and the QRA works that weekday
  qraScheduled(qra, date, shift) {
    if (!qra || !qra.postId || !this.qraShifts(qra).includes(shift)) return false;
    const d = parseDate(date);
    const def = QRA_TURNOS[qra.turno];
    if (def.parity !== null && d.getDate() % 2 !== def.parity) return false;
    if (def.dows && !def.dows.includes(d.getDay())) return false;
    const days = Array.isArray(qra.days) ? qra.days : [0, 1, 2, 3, 4, 5, 6];
    if (!days.includes(d.getDay())) return false;
    return this.postWorks(this.posts[qra.postId], date, shift);
  }

  folgaOf(qraId, date) {
    return Object.values(this.folgas).find(f => f.qraId === qraId && f.date === date) || null;
  }

  // Registered QRA matching a typed name (so temporary names still get conflict checks)
  qraByName(name) {
    const n = normalizeText(name);
    if (!n) return null;
    return Object.values(this.qras).find(q => normalizeText(q.name) === n) || null;
  }

  // person = { qraId?, name }. Returns the duties of that person in the slot.
  empenhosAt(person, date, shift, excludeCobId) {
    const result = [];
    const qra = person.qraId ? this.qras[person.qraId] : this.qraByName(person.name);
    const qraId = qra ? qra.id : null;
    const name = normalizeText(qra ? qra.name : person.name);

    if (qra && this.qraScheduled(qra, date, shift) && !this.folgaOf(qra.id, date)) {
      result.push({ kind: 'fixo', postId: qra.postId, date, shift });
    }
    Object.values(this.coberturas).forEach(c => {
      if (c.id === excludeCobId || c.date !== date || !shiftsOf(c.turno).includes(shift)) return;
      const samePerson = (qraId && c.qraId === qraId) || (name && normalizeText(c.qraName) === name);
      if (samePerson) result.push({ kind: 'cobertura', postId: c.postId, date, shift, cobId: c.id });
    });
    return result;
  }

  // Validate a cobertura before saving.
  // conflicts = same shift already taken · warnings = double shift / post closed · infos = context
  checkCobertura({ postId, date, turno, person, excludeCobId }) {
    const out = { conflicts: [], warnings: [], infos: [] };
    const post = this.posts[postId];
    const shifts = shiftsOf(turno);
    if (!post || !date || shifts.length === 0 || !(person.qraId || normalizeText(person.name))) return out;

    shifts.forEach(s => {
      if (!this.postWorks(post, date, s)) {
        out.warnings.push(`O posto ${post.name} não opera em ${slotLabel(date, s)}.`);
      }
    });

    const describe = e => {
      const p = this.posts[e.postId];
      const where = p ? `${p.name} (${p.category})` : 'posto removido';
      return `${slotLabel(e.date, e.shift)} em ${where} — ${e.kind === 'fixo' ? 'titular' : 'cobertura'}`;
    };

    shifts.forEach(s => {
      this.empenhosAt(person, date, s, excludeCobId).forEach(e => {
        if (e.postId === postId && e.kind === 'fixo') {
          out.conflicts.push(`Já é titular deste posto em ${slotLabel(date, s)}.`);
        } else {
          out.conflicts.push(`Choque: já está empenhado em ${describe(e)}.`);
        }
      });
    });

    const before = prevSlot(date, shifts[0]);
    const after = nextSlot(date, shifts[shifts.length - 1]);
    this.empenhosAt(person, before.date, before.shift, excludeCobId).forEach(e => {
      out.warnings.push(`Dobra: empenhado no turno ANTERIOR — ${describe(e)}.`);
    });
    this.empenhosAt(person, after.date, after.shift, excludeCobId).forEach(e => {
      out.warnings.push(`Dobra: empenhado no turno POSTERIOR — ${describe(e)}.`);
    });

    const qra = person.qraId ? this.qras[person.qraId] : this.qraByName(person.name);
    if (qra && this.folgaOf(qra.id, date)) {
      out.infos.push(`${qra.name} está de folga neste dia (por isso está livre no posto dele).`);
    }
    if (!person.qraId && qra) {
      out.infos.push(`O nome digitado corresponde ao QRA cadastrado ${qra.name} — empenhos dele foram verificados.`);
    }
    return out;
  }

  // Coverage of one post slot
  slotStatus(post, date, shift) {
    const titulares = Object.values(this.qras).filter(q => q.postId === post.id && this.qraScheduled(q, date, shift));
    const ausentes = titulares.filter(q => this.folgaOf(q.id, date));
    const presentes = titulares.filter(q => !this.folgaOf(q.id, date));
    const coberturas = Object.values(this.coberturas).filter(c => c.postId === post.id && c.date === date && shiftsOf(c.turno).includes(shift));
    return { titulares, ausentes, presentes, coberturas, descoberto: Math.max(0, ausentes.length - coberturas.length) };
  }

  // Uncovered folga slots from the current slot up to `days` ahead
  uncoveredSlots(days) {
    const list = [];
    const cur = currentSlot();
    for (let i = 0; i <= days; i++) {
      const date = addDays(cur.date, i);
      Object.values(this.posts).forEach(post => {
        shiftsOf(this.postShiftOn(post, date)).forEach(shift => {
          if (date === cur.date && cur.shift === 'noturno' && shift === 'diurno') return; // already past
          const st = this.slotStatus(post, date, shift);
          if (st.descoberto > 0) list.push({ post, date, shift, status: st });
        });
      });
    }
    return list;
  }

  // Saturday and Sunday of the current week (weeks run Monday → Sunday)
  weekendDates(today = todayStr()) {
    const dow = parseDate(today).getDay();
    const sat = addDays(today, dow === 0 ? -1 : 6 - dow);
    return [sat, addDays(sat, 1)];
  }

  // From Monday on, every weekend shift of a hybrid post with nobody on duty
  // (no present titular and no cobertura) stays pending until it is filled
  weekendPendingSlots() {
    const cur = currentSlot();
    const list = [];
    this.weekendDates(cur.date).forEach(date => {
      if (date < cur.date) return;
      Object.values(this.posts).filter(p => p.escalaType === 'hibrido').forEach(post => {
        shiftsOf(this.postShiftOn(post, date)).forEach(shift => {
          if (date === cur.date && cur.shift === 'noturno' && shift === 'diurno') return;
          const st = this.slotStatus(post, date, shift);
          if (st.presentes.length === 0 && st.coberturas.length === 0) list.push({ post, date, shift, status: st });
        });
      });
    });
    return list;
  }

  // First duty from the current slot onwards
  nextEmpenho(qra, maxDays = 30) {
    let slot = currentSlot();
    for (let i = 0; i < maxDays * 2; i++) {
      const emp = this.empenhosAt({ qraId: qra.id }, slot.date, slot.shift);
      if (emp.length > 0) return emp[0];
      slot = nextSlot(slot.date, slot.shift);
    }
    return null;
  }
}

// ============================================================
// Sound
// ============================================================

class SoundManager {
  constructor() { this.ctx = null; }

  alarm() {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this.ctx;
      [0, 0.25].forEach(offset => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime + offset);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.2);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.2);
      });
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  }
}

// ============================================================
// Firebase
// ============================================================

class FirebaseManager {
  constructor() {
    this.db = null;
    this.isConnected = false;
    this.onConnectionChange = null;
  }

  getConfig() {
    try {
      const saved = localStorage.getItem('coberturasFirebaseConfig');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  saveConfig(config) {
    try { localStorage.setItem('coberturasFirebaseConfig', JSON.stringify(config)); } catch (e) {}
  }

  init(config) {
    try {
      if (!firebase.apps.length) firebase.initializeApp(config);
      this.db = firebase.database();

      this.db.ref('.info/connected').on('value', (snap) => {
        this.isConnected = snap.val() === true;
        const dot = document.getElementById('connection-status');
        const text = document.getElementById('connection-text');
        if (dot) dot.className = this.isConnected ? 'conn-dot connected' : 'conn-dot disconnected';
        if (text) text.textContent = this.isConnected ? 'Online' : 'Offline';
        if (this.onConnectionChange) this.onConnectionChange(this.isConnected);
      });

      // Mobile browsers kill the socket in background: force a fresh connection on return
      let hiddenAt = null;
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          hiddenAt = Date.now();
        } else if (hiddenAt && Date.now() - hiddenAt > 30000) {
          this.db.goOffline();
          this.db.goOnline();
          hiddenAt = null;
        }
      });
      return true;
    } catch (e) {
      console.error('Firebase init error:', e);
      return false;
    }
  }

  // Live listener that re-subscribes if Firebase cancels it (e.g. a rules error)
  listen(path, callback, onError) {
    const ref = this.db.ref(path);
    ref.on('value', snap => callback(snap.val() || {}), (error) => {
      console.error(`Listener ${path} cancelled:`, error);
      if (onError) onError(error);
      setTimeout(() => this.listen(path, callback, onError), 10000);
    });
  }

  async seedPostsIfEmpty() {
    const snap = await this.db.ref('posts').once('value');
    if (snap.exists()) return false;
    const data = {};
    DEFAULT_POSTS.forEach(p => { data[p.id] = p; });
    await this.db.ref('posts').set(data);
    return true;
  }

  set(path, value) { return this.db.ref(path).set(value); }
  update(path, value) { return this.db.ref(path).update(value); }
  remove(path) { return this.db.ref(path).remove(); }
}

// ============================================================
// App
// ============================================================

class CoberturasApp {
  // Dedicated Firebase project (separate from the QTI Monitor database)
  static DEFAULT_CONFIG = {
    apiKey: 'AIzaSyB2XpLy5atMeLtc-XuOaAtY9m72mK9dZSY',
    authDomain: 'front-security-coberturas.firebaseapp.com',
    databaseURL: 'https://front-security-coberturas-default-rtdb.firebaseio.com',
    projectId: 'front-security-coberturas',
    storageBucket: 'front-security-coberturas.firebasestorage.app',
    messagingSenderId: '820793276708',
    appId: '1:820793276708:web:869d32754c6375cd139bb1'
  };

  constructor() {
    this.firebase = new FirebaseManager();
    this.sched = new Schedule();
    this.sound = new SoundManager();
    this.loaded = { posts: false, qras: false, folgas: false, coberturas: false };
    this.view = 'postos';
    this.lastAlarmKeys = new Set();
    this.renderQueued = false;
  }

  init() {
    this.buildDayCheckboxes('post-days', 'day-cb');
    this.buildHibridoGrid();
    this.setupEventListeners();
    this.startClock();
    try { this.view = localStorage.getItem('coberturasView') || 'postos'; } catch (e) {}
    this.switchView(this.view);

    const config = this.firebase.getConfig() || CoberturasApp.DEFAULT_CONFIG;
    if (!config || !this.connect(config)) {
      this.showModal('firebase-setup-modal');
      document.getElementById('posts-container').innerHTML =
        '<div class="empty-state">Configure o Firebase (⚙️) para começar.</div>';
    }
  }

  connect(config) {
    if (!this.firebase.init(config)) return false;
    this.firebase.saveConfig(config);

    const onError = (error) => {
      if (error && /permission/i.test(error.message || '')) {
        this.showToast('⚠️ Sem permissão no Firebase. Verifique as Regras do Realtime Database.', 'error');
      }
    };
    ['posts', 'qras', 'folgas', 'coberturas'].forEach(path => {
      this.firebase.listen(path, (data) => {
        this.sched[path] = data;
        this.loaded[path] = true;
        this.queueRender();
      }, onError);
    });

    this.firebase.seedPostsIfEmpty()
      .then(seeded => { if (seeded) this.showToast('🏢 Postos do QTI importados para o banco de coberturas.', 'success'); })
      .catch(err => console.warn('seedPostsIfEmpty:', err));

    // Re-evaluate shift changes / alarms every 30 s
    setInterval(() => this.queueRender(), 30000);
    return true;
  }

  // Coalesce bursts of listener events into one render. setTimeout (not requestAnimationFrame):
  // rAF is paused in background tabs, which would freeze the screen and the alarms.
  queueRender() {
    if (this.renderQueued) return;
    this.renderQueued = true;
    setTimeout(() => {
      this.renderQueued = false;
      if (!this.loaded.posts) return;
      this.weekendPending = this.sched.weekendPendingSlots();
      this.uncovered = this.sched.uncoveredSlots(ALERT_DAYS_AHEAD);
      this.renderPosts();
      this.renderQraList();
      this.renderAgenda();
      this.updateAlerts();
    });
  }

  // ===== Writes (with visible failure, never silent) =====

  async write(promise, successMsg) {
    if (!this.firebase.isConnected) {
      this.showToast('⚠️ Sem conexão: a alteração será enviada quando a internet voltar. Não feche o app.', 'error');
    }
    try {
      await promise;
      if (successMsg) this.showToast(successMsg, 'success');
      return true;
    } catch (err) {
      console.error('Write failed:', err);
      this.showToast('❌ Falha ao salvar. A equipe NÃO vê essa alteração.', 'error');
      return false;
    }
  }

  // ===== Views =====

  switchView(view) {
    this.view = view;
    try { localStorage.setItem('coberturasView', view); } catch (e) {}
    document.querySelectorAll('.view-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${view}`));
  }

  postsByCategory() {
    const categories = {};
    Object.values(this.sched.posts).forEach(p => {
      const cat = p.category || 'Outros';
      (categories[cat] = categories[cat] || []).push(p);
    });
    const order = [...CATEGORY_ORDER, ...Object.keys(categories).filter(c => !CATEGORY_ORDER.includes(c)).sort()];
    return order.filter(c => categories[c]).map(c => [c, categories[c].sort((a, b) => a.name.localeCompare(b.name))]);
  }

  postLabel(postId) {
    const p = this.sched.posts[postId];
    return p ? `${p.name} · ${p.category}` : 'Sem posto (reserva)';
  }

  // ----- Postos -----

  renderPosts() {
    const container = document.getElementById('posts-container');
    const groups = this.postsByCategory();
    if (groups.length === 0) {
      container.innerHTML = '<div class="empty-state">Nenhum posto cadastrado.</div>';
      return;
    }
    container.innerHTML = groups.map(([cat, posts]) => `
      <div class="category-section">
        <div class="category-header">
          <div class="category-icon">${CATEGORY_ICONS[cat] || '📌'}</div>
          <h2 class="category-title">${esc(cat)}</h2>
          <span class="category-count">${posts.length} postos</span>
        </div>
        <div class="posts-grid">${posts.map(p => this.postCardHtml(p)).join('')}</div>
      </div>
    `).join('');
  }

  // Coverage pendings of a post: uncovered folgas (next days) + weekend shifts of hybrids
  postPendings(post) {
    const map = new Map();
    [...(this.uncovered || []), ...(this.weekendPending || [])]
      .filter(u => u.post.id === post.id)
      .forEach(u => map.set(`${u.date}|${u.shift}`, u));
    return [...map.values()].sort((a, b) => (a.date + a.shift).localeCompare(b.date + b.shift));
  }

  postCardHtml(post) {
    const s = this.sched;
    const today = todayStr();
    const cur = currentSlot();
    const todayType = s.postShiftOn(post, today);
    const slots = s.postSlots(post);
    const qras = Object.values(s.qras).filter(q => q.postId === post.id);

    const badgeLabel = post.escalaType === 'hibrido'
      ? `Híbrido · hoje ${todayType === 'folga' ? 'Folga' : (todayType === '24h' ? '24h' : SHIFT_LABEL[todayType].split(' ')[1])}`
      : ({ diurno: 'Diurno', noturno: 'Noturno', '24h': '24h' }[post.escalaType] || '');

    // Slot table: one row per vaga, one QRA per vaga (QRAs outside the escala are listed with a warning)
    const extra = qras.filter(q => !slots.includes(q.turno)).map(q => q.turno);
    const rows = [...slots, ...extra].map(turno => {
      const def = QRA_TURNOS[turno] || { label: turno, shifts: [] };
      const holder = s.slotHolder(post.id, turno);
      const onDutyToday = holder ? def.shifts.some(sh => s.qraScheduled(holder, today, sh)) : false;
      const offToday = holder && onDutyToday && s.folgaOf(holder.id, today);
      const outOfScale = !slots.includes(turno);
      const cell = holder
        ? `<span class="slot-name" onclick="app.showQraModal('${holder.id}')">${esc(holder.name)}</span>
           ${offToday ? '<span class="slot-tag off">🏖️ folga hoje</span>' : (onDutyToday ? '<span class="slot-tag today">hoje</span>' : '')}
           <button class="chip-x" onclick="app.confirmUnassignQra('${holder.id}')" title="Tirar do posto (continua na lista de QRAs)">✕</button>`
        : `<button class="slot-add" onclick="app.showAssignModal('${post.id}', '${turno}')">+ adicionar</button>`;
      return `<tr class="${holder ? '' : 'empty'}${outOfScale ? ' out' : ''}"><td class="slot-label">${outOfScale ? '⚠️ ' : ''}${def.label}</td><td class="slot-cell">${cell}</td></tr>`;
    }).join('');

    // Today's shifts with who is on duty
    let flashingNow = false;
    const shiftLines = shiftsOf(todayType).map(shift => {
      const st = s.slotStatus(post, today, shift);
      const isPast = cur.shift === 'noturno' && shift === 'diurno';
      if (!isPast && shift === cur.shift && st.descoberto > 0) flashingNow = true;
      const parts = [];
      st.presentes.forEach(q => parts.push(`<span class="who ok">${esc(q.name)}</span>`));
      st.ausentes.forEach(q => parts.push(`<span class="who off">🏖️ ${esc(q.name)}</span>`));
      st.coberturas.forEach(c => parts.push(`<span class="who cover">🔁 ${esc(c.qraName)}</span>`));
      if (st.descoberto > 0) parts.push('<span class="who alert">⚠️ SEM COBERTURA</span>');
      if (st.titulares.length === 0 && st.coberturas.length === 0) parts.push('<span class="who muted">Ninguém escalado</span>');
      return `<div class="shift-line${isPast ? ' past' : ''}"><span class="shift-tag">${SHIFT_LABEL[shift]}</span>${parts.join('')}</div>`;
    });

    // Windows that need coverage: the card flashes and says date + shift
    const pendings = this.postPendings(post);
    const alertHtml = pendings.length
      ? `<div class="cover-alert">🚨 PRECISA DE COBERTURA
          <div class="cover-alert-list">${pendings.map(p =>
            `<button class="link-btn" onclick="app.showCoberturaModal({ postId: '${post.id}', date: '${p.date}', turno: '${p.shift}' })">${slotLabel(p.date, p.shift)}</button>`).join('')}</div>
        </div>`
      : '';

    const inactive = todayType === 'folga' && pendings.length === 0;
    return `
      <div class="post-card${inactive ? ' inactive' : ''}${pendings.length || flashingNow ? ' flashing' : ''}" id="card-${post.id}">
        <button class="btn-edit-post" onclick="app.showPostModal('${post.id}')" title="Editar posto">✏️</button>
        <button class="btn-delete-post" onclick="app.confirmDeletePost('${post.id}')" title="Deletar posto">✕</button>
        <div class="post-header">
          <span class="post-name">${esc(post.name)}</span>
          <span class="post-type-badge ${post.escalaType} badge-${post.escalaType}">${badgeLabel}</span>
        </div>
        ${alertHtml}
        <table class="slot-table"><tbody>${rows}</tbody></table>
        <div class="shift-lines">
          ${todayType === 'folga' ? '<div class="shift-line"><span class="who muted">⛔ Posto não opera hoje</span></div>' : shiftLines.join('')}
        </div>
        <div class="card-actions single">
          <button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ postId: '${post.id}' })">🔁 Cobertura</button>
        </div>
      </div>
    `;
  }

  // ----- QRAs -----

  renderQraList() {
    const s = this.sched;
    const list = document.getElementById('qra-list');
    const query = normalizeText(document.getElementById('qra-search').value);
    const qras = Object.values(s.qras)
      .filter(q => !query || normalizeText(q.name).includes(query) || normalizeText(this.postLabel(q.postId)).includes(query))
      .sort((a, b) => a.name.localeCompare(b.name));

    document.getElementById('qra-count').textContent = Object.keys(s.qras).length || '';

    if (qras.length === 0) {
      list.innerHTML = `<div class="empty-state">${query ? 'Nenhum QRA encontrado.' : 'Nenhum QRA cadastrado ainda. Clique em "➕ Novo QRA".'}</div>`;
      return;
    }

    const today = todayStr();
    list.innerHTML = qras.map(q => {
      const next = s.nextEmpenho(q);
      const nextText = next
        ? `${slotLabel(next.date, next.shift)} · ${esc(s.posts[next.postId] ? s.posts[next.postId].name : '?')}${next.kind === 'cobertura' ? ' <span class="tag-cover">cobertura</span>' : ''}`
        : '<span class="muted-text">Nenhum nos próximos 30 dias</span>';
      const folgas = Object.values(s.folgas).filter(f => f.qraId === q.id && f.date >= today).sort((a, b) => a.date.localeCompare(b.date));
      const days = Array.isArray(q.days) && q.days.length < 7 ? q.days.map(d => DAY_NAMES[d]).join(', ') : 'Todos os dias';
      return `
        <div class="qra-row">
          <div class="qra-main">
            <div class="qra-name">${esc(q.name)} ${q.phone ? `<a class="qra-phone" href="tel:${esc(q.phone)}">📞 ${esc(q.phone)}</a>` : ''}</div>
            <div class="qra-meta${q.postId ? '' : ' reserve'}">🏢 ${esc(this.postLabel(q.postId))}${q.postId ? ` · ${(QRA_TURNOS[q.turno] || {}).label || ''} · ${days}` : ''}</div>
            <div class="qra-next">➡️ Próximo empenho: ${nextText}</div>
            ${folgas.length ? `<div class="qra-folgas">🏖️ Folgas: ${folgas.slice(0, 4).map(f => dateLabel(f.date)).join(', ')}${folgas.length > 4 ? '…' : ''}</div>` : ''}
          </div>
          <div class="qra-actions">
            <button class="btn-mini" onclick="app.showFolgaModal('${q.id}')">🏖️ Folga</button>
            <button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ qraId: '${q.id}' })">🔁 Cobrir</button>
            ${q.postId ? `<button class="btn-mini" onclick="app.confirmUnassignQra('${q.id}')" title="Tirar do posto (continua na lista)">🚫 Tirar do posto</button>` : ''}
            <button class="btn-icon" onclick="app.showQraModal('${q.id}')" title="Editar">✏️</button>
            <button class="btn-icon danger" onclick="app.confirmDeleteQra('${q.id}')" title="Excluir de vez">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ----- Agenda (folgas & coberturas) -----

  renderAgenda() {
    const s = this.sched;
    const today = todayStr();
    const end = addDays(today, AGENDA_DAYS_AHEAD);
    const folgas = Object.values(s.folgas).filter(f => f.date >= today && f.date <= end);
    const cobs = Object.values(s.coberturas).filter(c => c.date >= today && c.date <= end);
    const dates = [...new Set([...folgas.map(f => f.date), ...cobs.map(c => c.date)])].sort();

    const weekend = this.weekendPending || [];
    document.getElementById('agenda-count').textContent = (folgas.length + cobs.length + weekend.length) || '';
    const list = document.getElementById('agenda-list');

    const weekendHtml = weekend.length ? `
      <div class="agenda-day weekend-section">
        <h3 class="agenda-date">📅 Fim de semana — coberturas pendentes <span>postos híbridos</span></h3>
        ${weekend.map(w => `
          <div class="agenda-item uncovered">
            <div class="agenda-main">
              <div class="agenda-title"><strong>${esc(w.post.name)}</strong> · ${esc(w.post.category)}</div>
              <div class="agenda-status"><span class="who alert">${slotLabel(w.date, w.shift)}: SEM COBERTURA</span>
                ${w.status.ausentes.map(q => `<span class="who off">🏖️ ${esc(q.name)}</span>`).join('')}</div>
            </div>
            <div class="agenda-actions">
              <button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ postId: '${w.post.id}', date: '${w.date}', turno: '${w.shift}' })">🔁 Cobrir</button>
            </div>
          </div>`).join('')}
      </div>` : '';

    if (dates.length === 0) {
      list.innerHTML = weekendHtml || '<div class="empty-state">Nenhuma folga ou cobertura nos próximos 30 dias.</div>';
      return;
    }

    list.innerHTML = weekendHtml + dates.map(date => {
      const dayFolgas = folgas.filter(f => f.date === date);
      const dayCobs = cobs.filter(c => c.date === date);
      const folgaHtml = dayFolgas.map(f => {
        const q = s.qras[f.qraId];
        const post = q ? s.posts[q.postId] : null;
        const shifts = q ? s.qraShifts(q).filter(sh => s.qraScheduled(q, date, sh)) : [];
        const statusHtml = shifts.length === 0
          ? '<span class="who muted">Não teria empenho neste dia</span>'
          : shifts.map(sh => {
              const st = s.slotStatus(post, date, sh);
              return st.descoberto > 0
                ? `<span class="who alert">${SHIFT_LABEL[sh]}: SEM COBERTURA</span>`
                : `<span class="who cover">${SHIFT_LABEL[sh]}: 🔁 ${st.coberturas.map(c => esc(c.qraName)).join(', ')}</span>`;
            }).join('');
        const uncovered = shifts.find(sh => s.slotStatus(post, date, sh).descoberto > 0);
        const title = `🏖️ Folga: ${q ? q.name : 'QRA removido'}${post ? ` (${post.name})` : ''}`;
        return `
          <div class="agenda-item folga${uncovered ? ' uncovered' : ''}">
            <div class="agenda-main">
              <div class="agenda-title">🏖️ Folga — <strong>${esc(q ? q.name : 'QRA removido')}</strong> ${post ? `· ${esc(post.name)}` : ''}</div>
              <div class="agenda-status">${statusHtml}</div>
              ${f.note ? `<div class="agenda-note">📝 ${esc(f.note)}</div>` : ''}
            </div>
            <div class="agenda-actions">
              ${uncovered ? `<button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ postId: '${q.postId}', date: '${date}', turno: '${uncovered}', folgaId: '${f.id}' })">🔁 Cobrir</button>` : ''}
              <a class="btn-mini" target="_blank" rel="noopener" href="${esc(gcalUrl(title, date, f.note || ''))}">📅 Agenda</a>
              <button class="btn-icon danger" onclick="app.confirmDeleteFolga('${f.id}')" title="Excluir">🗑️</button>
            </div>
          </div>`;
      }).join('');
      const cobHtml = dayCobs.map(c => {
        const post = s.posts[c.postId];
        const title = `🔁 Cobertura: ${c.qraName} → ${post ? post.name : '?'} (${SHIFT_LABEL[c.turno] || c.turno})`;
        return `
          <div class="agenda-item cobertura">
            <div class="agenda-main">
              <div class="agenda-title">🔁 Cobertura — <strong>${esc(c.qraName)}</strong>${c.qraId ? '' : ' <span class="tag-temp">temporário</span>'} → ${esc(post ? post.name : 'posto removido')}</div>
              <div class="agenda-status"><span class="who cover">${SHIFT_LABEL[c.turno] || esc(c.turno)}</span></div>
              ${c.note ? `<div class="agenda-note">📝 ${esc(c.note)}</div>` : ''}
            </div>
            <div class="agenda-actions">
              <a class="btn-mini" target="_blank" rel="noopener" href="${esc(gcalUrl(title, date, c.note || ''))}">📅 Agenda</a>
              <button class="btn-icon danger" onclick="app.confirmDeleteCobertura('${c.id}')" title="Excluir">🗑️</button>
            </div>
          </div>`;
      }).join('');
      return `<div class="agenda-day"><h3 class="agenda-date">${dateLabel(date)} <span>${date.split('-').reverse().join('/')}</span></h3>${folgaHtml}${cobHtml}</div>`;
    }).join('');
  }

  // ----- Alerts (header badge + alarm like the QTI app) -----

  updateAlerts() {
    const uncovered = this.uncovered || [];
    const weekend = this.weekendPending || [];
    // Same slot may be both an uncovered folga and a weekend pending: count it once
    const all = new Map();
    [...uncovered, ...weekend].forEach(u => all.set(`${u.post.id}|${u.date}|${u.shift}`, u));
    const badge = document.getElementById('pending-count');
    if (all.size > 0) {
      badge.textContent = `⚠️ ${all.size} sem cobertura`;
      badge.className = 'pending-badge';
      badge.title = [...all.values()].map(u => `${slotLabel(u.date, u.shift)} · ${u.post.name}`).join('\n');
    } else {
      badge.textContent = '✓ Tudo coberto';
      badge.className = 'pending-badge all-clear';
      badge.title = '';
    }

    // Sound once for each newly uncovered slot in the CURRENT shift
    const cur = currentSlot();
    const nowKeys = new Set(uncovered.filter(u => u.date === cur.date && u.shift === cur.shift).map(u => `${u.post.id}|${u.date}|${u.shift}`));
    const isNew = [...nowKeys].some(k => !this.lastAlarmKeys.has(k));
    if (isNew) {
      this.sound.alarm();
      this.showToast('🚨 Posto sem cobertura no turno atual!', 'error');
    }
    this.lastAlarmKeys = nowKeys;

    // Weekend reminder (from Monday on): sound + toast at most every 2 hours per device, until filled
    if (weekend.length > 0) {
      let last = 0;
      try { last = Number(localStorage.getItem('coberturasWeekendAlertAt')) || 0; } catch (e) {}
      if (Date.now() - last > 2 * 60 * 60 * 1000) {
        try { localStorage.setItem('coberturasWeekendAlertAt', String(Date.now())); } catch (e) {}
        this.sound.alarm();
        this.showToast(`📅 ${weekend.length} cobertura(s) de fim de semana pendente(s) nos postos híbridos`, 'error');
      }
    }
  }

  // ===== QRA modal =====

  fillPostSelect(selectId, selectedId, placeholder) {
    const options = this.postsByCategory().map(([cat, posts]) =>
      `<optgroup label="${esc(cat)}">${posts.map(p => `<option value="${p.id}"${p.id === selectedId ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}</optgroup>`
    ).join('');
    document.getElementById(selectId).innerHTML = (placeholder ? `<option value="">${placeholder}</option>` : '') + options;
  }

  // Edit a QRA (name/phone) or create a reserve QRA from the QRAs tab. Slots change only via the post table.
  showQraModal(qraId) {
    const q = qraId ? this.sched.qras[qraId] : null;
    document.getElementById('qra-modal-title').textContent = q ? '✏️ Editar QRA' : '👤 Novo QRA (reserva)';
    document.getElementById('qra-id').value = q ? q.id : '';
    document.getElementById('qra-post').value = '';
    document.getElementById('qra-turno').value = '';
    document.getElementById('qra-name').value = q ? q.name : '';
    document.getElementById('qra-phone').value = q ? (q.phone || '') : '';
    const post = q && this.sched.posts[q.postId];
    document.getElementById('qra-slot-info').innerHTML = post
      ? `🏢 <strong>${esc(post.name)}</strong> · ${(QRA_TURNOS[q.turno] || {}).label || ''}<br><small>Para trocar de vaga, tire do posto (✕) e adicione na vaga nova.</small>`
      : '🗂️ <strong>Reserva</strong> (sem posto) — para colocar num posto, use "+ adicionar" na vaga do posto.';
    document.getElementById('qra-pick-group').style.display = 'none';
    document.getElementById('qra-name-group').style.display = 'block';
    document.getElementById('qra-phone-group').style.display = 'block';
    this.showModal('qra-modal');
    setTimeout(() => document.getElementById('qra-name').focus(), 50);
  }

  // Fill one vaga of a post: pick a reserve QRA or type a new one. Post and turno come from the slot.
  showAssignModal(postId, turno) {
    const post = this.sched.posts[postId];
    if (!post) return;
    const holder = this.sched.slotHolder(postId, turno);
    if (holder) return this.showToast(`Vaga ocupada por ${holder.name}. Tire do posto (✕) antes de colocar outro.`, 'error');
    document.getElementById('qra-modal-title').textContent = '👤 Adicionar QRA à vaga';
    document.getElementById('qra-id').value = '';
    document.getElementById('qra-post').value = postId;
    document.getElementById('qra-turno').value = turno;
    document.getElementById('qra-name').value = '';
    document.getElementById('qra-phone').value = '';
    document.getElementById('qra-slot-info').innerHTML = `🏢 <strong>${esc(post.name)}</strong> · ${QRA_TURNOS[turno].label}`;
    const reserves = Object.values(this.sched.qras).filter(q => !q.postId).sort((a, b) => a.name.localeCompare(b.name));
    document.getElementById('qra-pick').innerHTML = '<option value="__new__">✍️ Novo QRA (digitar nome)</option>' +
      reserves.map(q => `<option value="${q.id}">🗂️ ${esc(q.name)} (reserva)</option>`).join('');
    document.getElementById('qra-pick-group').style.display = 'block';
    this.onQraPickChange();
    this.showModal('qra-modal');
  }

  onQraPickChange() {
    const isNew = document.getElementById('qra-pick').value === '__new__';
    document.getElementById('qra-name-group').style.display = isNew ? 'block' : 'none';
    document.getElementById('qra-phone-group').style.display = isNew ? 'block' : 'none';
    if (isNew) setTimeout(() => document.getElementById('qra-name').focus(), 50);
  }

  confirmUnassignQra(qraId) {
    const q = this.sched.qras[qraId];
    if (!q || !q.postId) return;
    const post = this.sched.posts[q.postId];
    this.confirm(`Tirar ${q.name} do posto ${post ? post.name : ''}? Ele continua na lista geral de QRAs como reserva e pode ser usado em coberturas.`, () =>
      this.write(this.firebase.update(`qras/${qraId}`, { postId: '' }), `${q.name} saiu do posto e ficou na reserva`));
  }

  async saveQra() {
    const editId = document.getElementById('qra-id').value;
    const postId = document.getElementById('qra-post').value;
    const turno = document.getElementById('qra-turno').value;
    const name = document.getElementById('qra-name').value.trim();
    const phone = document.getElementById('qra-phone').value.trim();
    const allDays = [0, 1, 2, 3, 4, 5, 6];

    if (editId) {
      if (!name) return this.showToast('Informe o nome do QRA', 'error');
      const dup = this.sched.qraByName(name);
      if (dup && dup.id !== editId) return this.showToast(`Já existe um QRA chamado "${dup.name}"`, 'error');
      this.hideModal('qra-modal');
      return this.write(this.firebase.update(`qras/${editId}`, { name, phone }), `QRA ${name} atualizado`);
    }

    if (postId) {
      // One QRA per vaga: re-check against the latest data before writing
      const holder = this.sched.slotHolder(postId, turno);
      if (holder) return this.showToast(`Vaga já ocupada por ${holder.name}. Tire do posto antes de colocar outro.`, 'error');
      const pick = document.getElementById('qra-pick').value;
      const label = `${this.sched.posts[postId].name} · ${QRA_TURNOS[turno].label}`;
      if (pick !== '__new__') {
        const q = this.sched.qras[pick];
        this.hideModal('qra-modal');
        return this.write(this.firebase.update(`qras/${pick}`, { postId, turno }), `${q.name} na vaga ${label}`);
      }
      if (!name) return this.showToast('Informe o nome do QRA', 'error');
      const dup = this.sched.qraByName(name);
      if (dup) return this.showToast(`Já existe um QRA chamado "${dup.name}"${dup.postId ? '' : ' na reserva — escolha ele na lista'}`, 'error');
      const id = makeId(name);
      this.hideModal('qra-modal');
      return this.write(this.firebase.set(`qras/${id}`, { id, name, postId, turno, days: allDays, phone }), `${name} na vaga ${label}`);
    }

    // New reserve QRA (QRAs tab)
    if (!name) return this.showToast('Informe o nome do QRA', 'error');
    const dup = this.sched.qraByName(name);
    if (dup) return this.showToast(`Já existe um QRA chamado "${dup.name}"`, 'error');
    const id = makeId(name);
    this.hideModal('qra-modal');
    return this.write(this.firebase.set(`qras/${id}`, { id, name, postId: '', turno: '', days: allDays, phone }), `QRA ${name} cadastrado na reserva`);
  }

  confirmDeleteQra(qraId) {
    const q = this.sched.qras[qraId];
    if (!q) return;
    const folgaIds = Object.values(this.sched.folgas).filter(f => f.qraId === qraId).map(f => f.id);
    this.confirm(`Excluir o QRA "${q.name}"?${folgaIds.length ? ` As ${folgaIds.length} folga(s) dele também serão apagadas.` : ''}`, async () => {
      const updates = { [`qras/${qraId}`]: null };
      folgaIds.forEach(id => { updates[`folgas/${id}`] = null; });
      await this.write(this.firebase.update('/', updates), `QRA ${q.name} excluído`);
    });
  }

  // ===== Folga modal =====

  fillQraSelect(selectId, selectedId, extraOptions) {
    const qras = Object.values(this.sched.qras).sort((a, b) => a.name.localeCompare(b.name));
    document.getElementById(selectId).innerHTML = (extraOptions || '') + qras.map(q => {
      const p = this.sched.posts[q.postId];
      return `<option value="${q.id}"${q.id === selectedId ? ' selected' : ''}>${esc(q.name)} — ${esc(p ? p.name : 'sem posto')}</option>`;
    }).join('');
  }

  showFolgaModal(qraId) {
    if (Object.keys(this.sched.qras).length === 0) return this.showToast('Cadastre um QRA antes de lançar folgas', 'error');
    this.fillQraSelect('folga-qra', qraId, '<option value="">— selecione o QRA —</option>');
    document.getElementById('folga-date').value = addDays(todayStr(), 1);
    document.getElementById('folga-note').value = '';
    this.updateFolgaInfo();
    this.showModal('folga-modal');
  }

  updateFolgaInfo() {
    const box = document.getElementById('folga-info');
    const q = this.sched.qras[document.getElementById('folga-qra').value];
    const date = document.getElementById('folga-date').value;
    if (!q || !date) { box.innerHTML = ''; box.className = 'info-box'; return; }
    const shifts = this.sched.qraShifts(q).filter(sh => this.sched.qraScheduled(q, date, sh));
    const lines = [];
    if (this.sched.folgaOf(q.id, date)) lines.push(['warn', `${q.name} já tem folga lançada em ${dateLabel(date)}.`]);
    if (shifts.length === 0) {
      lines.push(['info', `${q.name} não teria empenho em ${dateLabel(date)} (posto fechado ou fora dos dias dele).`]);
    } else {
      lines.push(['info', `Deixará descoberto: ${esc(this.postLabel(q.postId))} — ${shifts.map(sh => SHIFT_LABEL[sh]).join(' e ')}. O posto vai alertar até alguém ser escalado para cobrir.`]);
    }
    box.className = 'info-box visible';
    box.innerHTML = lines.map(([cls, text]) => `<div class="check-${cls}">${cls === 'warn' ? '⚠️' : 'ℹ️'} ${text}</div>`).join('');
  }

  async saveFolga() {
    const qraId = document.getElementById('folga-qra').value;
    const date = document.getElementById('folga-date').value;
    const note = document.getElementById('folga-note').value.trim();
    if (!qraId) return this.showToast('Selecione o QRA', 'error');
    if (!date) return this.showToast('Informe o dia da folga', 'error');
    if (this.sched.folgaOf(qraId, date)) return this.showToast('Essa folga já está lançada', 'error');
    const q = this.sched.qras[qraId];
    const id = makeId(`folga_${q.name}_${date}`);
    this.hideModal('folga-modal');
    const ok = await this.write(this.firebase.set(`folgas/${id}`, { id, qraId, date, note, createdAt: new Date().toISOString() }),
      `🏖️ Folga de ${q.name} em ${dateLabel(date)} lançada`);
    if (ok) this.switchView('agenda');
  }

  confirmDeleteFolga(folgaId) {
    const f = this.sched.folgas[folgaId];
    if (!f) return;
    const q = this.sched.qras[f.qraId];
    this.confirm(`Excluir a folga de ${q ? q.name : 'QRA'} em ${dateLabel(f.date)}?`, () =>
      this.write(this.firebase.remove(`folgas/${folgaId}`), 'Folga excluída'));
  }

  // ===== Cobertura modal =====

  showCoberturaModal({ postId, date, turno, qraId, folgaId } = {}) {
    this.cobFolgaId = folgaId || null;
    this.fillPostSelect('cob-post', postId || '', '— selecione o posto —');
    document.getElementById('cob-date').value = date || todayStr();
    this.fillQraSelect('cob-qra', qraId || '',
      '<option value="">— selecione quem vai cobrir —</option><option value="__temp__">✍️ QRA temporário (digitar nome)</option>');
    document.getElementById('cob-temp-name').value = '';
    document.getElementById('cob-note').value = '';
    this.refreshCobTurnoOptions(turno);
    this.onCobQraChange();
    this.showModal('cobertura-modal');
  }

  refreshCobTurnoOptions(preferred) {
    const post = this.sched.posts[document.getElementById('cob-post').value];
    const date = document.getElementById('cob-date').value;
    const type = post && date ? this.sched.postShiftOn(post, date) : 'folga';
    const options = type === '24h' ? ['24h', 'diurno', 'noturno'] : (type === 'folga' ? ['diurno', 'noturno', '24h'] : [type, ...['diurno', 'noturno', '24h'].filter(t => t !== type)]);
    const select = document.getElementById('cob-turno');
    const current = preferred || select.value;
    select.innerHTML = options.map(t => `<option value="${t}">${SHIFT_LABEL[t]}${t === type || (type === '24h' && t === '24h') ? ' (turno do posto)' : ''}</option>`).join('');
    if (options.includes(current) && (preferred || type === 'folga')) select.value = current;
    this.updateCobCheck();
  }

  onCobQraChange() {
    const isTemp = document.getElementById('cob-qra').value === '__temp__';
    document.getElementById('cob-temp-group').style.display = isTemp ? 'block' : 'none';
    this.updateCobCheck();
  }

  readCobForm() {
    const qraSel = document.getElementById('cob-qra').value;
    const isTemp = qraSel === '__temp__';
    const qra = !isTemp ? this.sched.qras[qraSel] : null;
    return {
      postId: document.getElementById('cob-post').value,
      date: document.getElementById('cob-date').value,
      turno: document.getElementById('cob-turno').value,
      person: { qraId: qra ? qra.id : null, name: qra ? qra.name : document.getElementById('cob-temp-name').value.trim() },
      note: document.getElementById('cob-note').value.trim(),
    };
  }

  updateCobCheck() {
    const form = this.readCobForm();
    const box = document.getElementById('cob-check');
    const btn = document.getElementById('save-cobertura');
    const res = this.sched.checkCobertura(form);
    const lines = [
      ...res.conflicts.map(t => `<div class="check-conflict">⛔ ${esc(t)}</div>`),
      ...res.warnings.map(t => `<div class="check-warn">⚠️ ${esc(t)}</div>`),
      ...res.infos.map(t => `<div class="check-info">ℹ️ ${esc(t)}</div>`),
    ];
    const ready = form.postId && form.date && form.person.name;
    if (ready && lines.length === 0) lines.push('<div class="check-ok">✅ Nenhum choque de empenho encontrado.</div>');
    box.innerHTML = lines.join('');
    box.className = `info-box${lines.length ? ' visible' : ''}`;
    const risky = res.conflicts.length > 0 || res.warnings.length > 0;
    btn.textContent = risky ? '⚠️ Salvar mesmo assim' : '✅ Salvar Cobertura';
    btn.classList.toggle('btn-warning', risky);
  }

  async saveCobertura() {
    const form = this.readCobForm();
    if (!form.postId) return this.showToast('Selecione o posto', 'error');
    if (!form.date) return this.showToast('Informe o dia', 'error');
    if (!form.person.name) return this.showToast('Selecione ou digite quem vai cobrir', 'error');
    const res = this.sched.checkCobertura(form);
    if (res.conflicts.length > 0) {
      this.confirm(`Choque de empenho: ${res.conflicts.join(' ')} Salvar mesmo assim?`, () => this.persistCobertura(form));
      return;
    }
    await this.persistCobertura(form);
  }

  async persistCobertura(form) {
    const id = makeId(`cob_${form.person.name}_${form.date}`);
    const cob = {
      id, postId: form.postId, date: form.date, turno: form.turno,
      qraId: form.person.qraId || null, qraName: form.person.name,
      folgaId: this.cobFolgaId || null, note: form.note, createdAt: new Date().toISOString(),
    };
    this.hideModal('cobertura-modal');
    await this.write(this.firebase.set(`coberturas/${id}`, cob),
      `🔁 ${form.person.name} cobrindo ${this.sched.posts[form.postId].name} em ${slotLabel(form.date, shiftsOf(form.turno)[0])}`);
  }

  confirmDeleteCobertura(cobId) {
    const c = this.sched.coberturas[cobId];
    if (!c) return;
    this.confirm(`Excluir a cobertura de ${c.qraName} em ${dateLabel(c.date)}?`, () =>
      this.write(this.firebase.remove(`coberturas/${cobId}`), 'Cobertura excluída'));
  }

  // ===== Post modal (same rules as the QTI app) =====

  buildDayCheckboxes(containerId, cls) {
    document.getElementById(containerId).innerHTML = DAY_NAMES.map((d, i) =>
      `<label class="day-checkbox"><input type="checkbox" class="${cls}" value="${i}" checked> ${d}</label>`).join('');
  }

  buildHibridoGrid() {
    const names = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    document.querySelector('.hibrido-grid').innerHTML = names.map((name, idx) => `
      <div class="hibrido-row">
        <span>${name}</span>
        <select id="hibrido-day-${idx}" class="form-select hibrido-select">
          <option value="folga">Folga</option><option value="diurno">Diurno</option>
          <option value="noturno">Noturno</option><option value="24h">24h</option>
        </select>
      </div>`).join('');
  }

  updateEscalaUI(type) {
    const show = (id, on) => { document.getElementById(id).style.display = on ? 'block' : 'none'; };
    show('group-alert-diurno', type !== 'noturno');
    show('group-alert-noturno', type !== 'diurno');
    show('group-standard-days', type !== 'hibrido');
    show('group-hibrido-days', type === 'hibrido');
  }

  showPostModal(postId) {
    const p = postId ? this.sched.posts[postId] : null;
    document.getElementById('add-post-modal-title').textContent = p ? '✏️ Editar Posto' : '➕ Novo Posto';
    document.getElementById('edit-post-id').value = p ? p.id : '';
    document.getElementById('new-post-name').value = p ? p.name : '';
    const catSelect = document.getElementById('new-post-category');
    const known = [...catSelect.options].map(o => o.value);
    const cat = p ? p.category : 'Segurança Econ';
    catSelect.value = known.includes(cat) ? cat : 'custom';
    document.getElementById('custom-category-group').style.display = known.includes(cat) ? 'none' : 'block';
    document.getElementById('new-post-custom-category').value = known.includes(cat) ? '' : cat;
    const escala = p ? p.escalaType : 'diurno';
    document.getElementById('new-post-escala-type').value = escala;
    this.updateEscalaUI(escala);
    document.getElementById('new-post-alert-diurno').value = p ? (p.alertTimeDiurno || '') : '04:00';
    document.getElementById('new-post-alert-noturno').value = p ? (p.alertTimeNoturno || '') : '17:00';
    const days = p && Array.isArray(p.days) ? p.days : [0, 1, 2, 3, 4, 5, 6];
    document.querySelectorAll('.day-cb').forEach(cb => { cb.checked = days.includes(Number(cb.value)); });
    for (let i = 0; i < 7; i++) {
      document.getElementById(`hibrido-day-${i}`).value = (p && p.hibridoSchedule && p.hibridoSchedule[i]) || 'folga';
    }
    this.showModal('add-post-modal');
  }

  async savePost() {
    const name = document.getElementById('new-post-name').value.trim();
    if (!name) return this.showToast('Informe o nome do posto', 'error');
    const catSel = document.getElementById('new-post-category').value;
    const category = catSel === 'custom' ? document.getElementById('new-post-custom-category').value.trim() : catSel;
    if (!category) return this.showToast('Informe o nome da categoria', 'error');

    const escalaType = document.getElementById('new-post-escala-type').value;
    let alertTimeDiurno = document.getElementById('new-post-alert-diurno').value;
    let alertTimeNoturno = document.getElementById('new-post-alert-noturno').value;
    let days = [...document.querySelectorAll('.day-cb:checked')].map(cb => Number(cb.value));
    const hibridoSchedule = [];
    for (let i = 0; i < 7; i++) hibridoSchedule.push(document.getElementById(`hibrido-day-${i}`).value);

    if (escalaType === 'hibrido') {
      days = hibridoSchedule.map((t, i) => (t !== 'folga' ? i : -1)).filter(i => i >= 0);
      if (days.length === 0) return this.showToast('Configure pelo menos um dia ativo na escala híbrida', 'error');
      const usesT1 = hibridoSchedule.some(t => t === 'diurno' || t === '24h');
      const usesT2 = hibridoSchedule.some(t => t === 'noturno' || t === '24h');
      if (usesT1 && !alertTimeDiurno) return this.showToast('Informe o horário do Turno 1', 'error');
      if (usesT2 && !alertTimeNoturno) return this.showToast('Informe o horário do Turno 2', 'error');
      if (!usesT1) alertTimeDiurno = '';
      if (!usesT2) alertTimeNoturno = '';
    } else {
      if (days.length === 0) return this.showToast('Selecione pelo menos um dia de funcionamento', 'error');
      if (escalaType === 'diurno') alertTimeNoturno = '';
      if (escalaType === 'noturno') alertTimeDiurno = '';
    }

    const editId = document.getElementById('edit-post-id').value;
    const id = editId || makeId(name);
    const post = { id, name, category, escalaType, days, alertTimeDiurno, alertTimeNoturno };
    if (escalaType === 'hibrido') post.hibridoSchedule = hibridoSchedule;
    this.hideModal('add-post-modal');
    await this.write(this.firebase.set(`posts/${id}`, post), editId ? `Posto ${name} atualizado` : `Posto ${name} criado`);
  }

  confirmDeletePost(postId) {
    const p = this.sched.posts[postId];
    if (!p) return;
    const qras = Object.values(this.sched.qras).filter(q => q.postId === postId);
    this.confirm(`Excluir o posto "${p.name}"?${qras.length ? ` ${qras.length} QRA(s) ficarão sem posto.` : ''}`, () =>
      this.write(this.firebase.remove(`posts/${postId}`), `Posto ${p.name} excluído`));
  }

  // ===== WhatsApp export (same style as the QTI app) =====

  buildWhatsAppMessage() {
    const s = this.sched;
    const now = new Date();
    const today = todayStr();
    const line = '━━━━━━━━━━━━━━━━━━━━━';
    let msg = `🛡️ *FRONT SECURITY - Coberturas*\n📅 ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n${line}\n\n`;
    const totals = { ok: 0, cover: 0, missing: 0, empty: 0 };

    this.postsByCategory().forEach(([cat, posts]) => {
      const blocks = posts.map(post => {
        const shifts = shiftsOf(s.postShiftOn(post, today));
        if (shifts.length === 0) return '';
        const rows = shifts.map(shift => {
          const st = s.slotStatus(post, today, shift);
          const label = SHIFT_LABEL[shift].split(' ')[1];
          const names = [...st.presentes.map(q => q.name), ...st.coberturas.map(c => `${c.qraName} (cobertura)`)].join(', ');
          const off = st.ausentes.length ? ` — folga: ${st.ausentes.map(q => q.name).join(', ')}` : '';
          if (st.descoberto > 0) { totals.missing++; return `  🔴 ${label}: SEM COBERTURA${off}`; }
          if (st.presentes.length === 0 && st.coberturas.length === 0) { totals.empty++; return `  ⚪ ${label}: ninguém escalado`; }
          if (st.coberturas.length > 0) { totals.cover++; return `  🟡 ${label}: ${names}${off}`; }
          totals.ok++;
          return `  🟢 ${label}: ${names}`;
        });
        return `*${post.name}*\n${rows.join('\n')}`;
      }).filter(Boolean);
      if (blocks.length) msg += `${CATEGORY_ICONS[cat] || '📌'} *${cat.toUpperCase()}*\n${blocks.join('\n')}\n\n`;
    });

    const pendings = new Map();
    [...(this.uncovered || []), ...(this.weekendPending || [])].forEach(u => pendings.set(`${u.post.id}|${u.date}|${u.shift}`, u));
    const future = [...pendings.values()].filter(u => u.date > today)
      .sort((a, b) => (a.date + a.shift + a.post.name).localeCompare(b.date + b.shift + b.post.name));
    if (future.length) {
      msg += `${line}\n🚨 *PRECISAM DE COBERTURA*\n`;
      future.forEach(u => { msg += `  🔴 ${slotLabel(u.date, u.shift)} — ${u.post.name}\n`; });
      msg += '\n';
    }

    msg += `${line}\n📊 *RESUMO DE HOJE:*\n🟢 Titular: ${totals.ok} | 🟡 Cobertura: ${totals.cover}\n🔴 Sem cobertura: ${totals.missing} | ⚪ Ninguém escalado: ${totals.empty}`;
    return msg;
  }

  exportWhatsApp() {
    if (!this.loaded.posts) return this.showToast('Aguarde carregar os dados', 'error');
    window.open(`https://wa.me/?text=${encodeURIComponent(this.buildWhatsAppMessage())}`, '_blank');
  }

  // ===== Firebase setup =====

  async saveFirebaseConfig() {
    let input = document.getElementById('firebase-config-input').value.trim();
    try {
      input = input.replace(/^(const|var|let)\s+\w+\s*=\s*/, '').replace(/;\s*$/, '')
        .replace(/'/g, '"').replace(/(\s*)(\w+)\s*:/g, '$1"$2":').replace(/""/g, '"').replace(/,\s*}/g, '}');
      const config = JSON.parse(input);
      if (!config.apiKey || !config.databaseURL) return this.showToast('Faltam campos obrigatórios: apiKey e databaseURL', 'error');
      this.firebase.saveConfig(config);
      location.reload();
    } catch (e) {
      this.showToast('Formato inválido. Cole o firebaseConfig como aparece no Firebase.', 'error');
    }
  }

  // ===== UI utilities =====

  startClock() {
    const tick = () => {
      const now = new Date();
      document.getElementById('clock').textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    };
    tick();
    setInterval(tick, 1000);
  }

  showModal(id) { document.getElementById(id).classList.add('active'); }
  hideModal(id) { document.getElementById(id).classList.remove('active'); }

  confirm(message, onYes) {
    document.getElementById('confirm-message').textContent = message;
    this.showModal('confirm-overlay');
    document.getElementById('confirm-yes').onclick = () => { this.hideModal('confirm-overlay'); onYes(); };
    document.getElementById('confirm-no').onclick = () => this.hideModal('confirm-overlay');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000);
  }

  setupEventListeners() {
    const on = (id, ev, fn) => document.getElementById(id).addEventListener(ev, fn);
    document.querySelectorAll('.view-tab').forEach(t => t.addEventListener('click', () => this.switchView(t.dataset.view)));
    document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => this.hideModal(b.dataset.close)));
    document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('active'); }));

    on('config-btn', 'click', () => {
      const cfg = this.firebase.getConfig();
      document.getElementById('firebase-config-input').value = cfg ? JSON.stringify(cfg, null, 2) : '';
      this.showModal('firebase-setup-modal');
    });
    on('save-firebase-config', 'click', () => this.saveFirebaseConfig());

    on('add-post-btn', 'click', () => this.showPostModal(null));
    on('submit-new-post', 'click', () => this.savePost());
    on('new-post-category', 'change', e => {
      document.getElementById('custom-category-group').style.display = e.target.value === 'custom' ? 'block' : 'none';
    });
    on('new-post-escala-type', 'change', e => this.updateEscalaUI(e.target.value));

    on('add-qra-btn', 'click', () => this.showQraModal(null));
    on('save-qra', 'click', () => this.saveQra());
    on('qra-pick', 'change', () => this.onQraPickChange());
    on('whatsapp-btn', 'click', () => this.exportWhatsApp());
    on('qra-search', 'input', () => this.renderQraList());

    on('add-folga-btn', 'click', () => this.showFolgaModal(null));
    on('save-folga', 'click', () => this.saveFolga());
    on('folga-qra', 'change', () => this.updateFolgaInfo());
    on('folga-date', 'change', () => this.updateFolgaInfo());

    on('add-cobertura-btn', 'click', () => this.showCoberturaModal());
    on('save-cobertura', 'click', () => this.saveCobertura());
    on('cob-post', 'change', () => this.refreshCobTurnoOptions());
    on('cob-date', 'change', () => this.refreshCobTurnoOptions());
    on('cob-turno', 'change', () => this.updateCobCheck());
    on('cob-qra', 'change', () => this.onCobQraChange());
    on('cob-temp-name', 'input', () => this.updateCobCheck());
  }
}

// Exposed for tests (Node) without touching the DOM
if (typeof module !== 'undefined') {
  module.exports = { Schedule, shiftsOf, prevSlot, nextSlot, addDays, toDateStr };
} else {
  const app = new CoberturasApp();
  window.app = app;
  document.addEventListener('DOMContentLoaded', () => app.init());
}
