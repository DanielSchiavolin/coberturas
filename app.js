// ============================================================
// Front Security - Coberturas
// QRAs por posto, alertas de folga e QRAs de cobertura com
// verificação de choque de empenhos. Sincronizado em tempo real.
// ============================================================

// Same QTHs as the QTI Monitor (seeded only when this database is empty)
const DEFAULT_POSTS = [
  { id: 'butant__1791116240885', name: 'Butantã', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'giovanni_gronch_1789936066037', name: 'Giovanni Gronchi', category: 'Segurança Econ', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'ipiranga_1789935880313', name: 'Ipiranga', category: 'Segurança Econ', escalaType: 'hibrido', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00', hibridoSchedule: ['24h','noturno','noturno','noturno','noturno','noturno','24h'] },
  { id: 'ipiranga_demoli_o_1791576121407', name: 'Ipiranga Demolição', category: 'Segurança Econ', escalaType: 'hibrido', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00', hibridoSchedule: ['24h','noturno','noturno','noturno','noturno','noturno','24h'] },
  { id: 'mascote_1789935938743', name: 'Mascote', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'patriarca_1790890629489', name: 'Patriarca', category: 'Segurança Econ', escalaType: 'hibrido', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00', hibridoSchedule: ['24h','noturno','noturno','noturno','noturno','noturno','24h'] },
  { id: 'sabar__1789935953916', name: 'Sabara', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'tumiaru_1789935977310', name: 'Tumiaru', category: 'Segurança Econ', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'bosque_1789936154381', name: 'Bosque', category: 'Segurança Nurban', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'ces_rio_1789936139904', name: 'Cesario', category: 'Segurança Nurban', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'palmeiras_1789936128170', name: 'Palmeiras', category: 'Segurança Nurban', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'perdizes_1789936116950', name: 'Perdizes', category: 'Segurança Nurban', escalaType: 'noturno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '', alertTimeNoturno: '17:00' },
  { id: 'central_kallas_1789936253543', name: 'Central Kallas', category: 'Segurança Kallas', escalaType: 'hibrido', days: [1,3,5], alertTimeDiurno: '05:00', alertTimeNoturno: '', hibridoSchedule: ['folga','diurno','folga','diurno','folga','diurno','folga'] },
  { id: 'jaguare_1790803002520', name: 'Jaguare', category: 'Segurança Kallas', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'jurema_1790802984078', name: 'Jurema', category: 'Segurança Kallas', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'teixeira_1790803017399', name: 'Teixeira', category: 'Segurança Kallas', escalaType: '24h', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '17:00' },
  { id: 'cursino_1789936223784', name: 'Cursino', category: 'Segurança Cursino', escalaType: 'hibrido', days: [1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '', hibridoSchedule: ['folga','diurno','diurno','diurno','diurno','diurno','diurno'] },
  { id: 'bosque_1789937345756', name: 'Bosque', category: 'Limpeza', escalaType: 'diurno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '' },
  { id: 'campo_belo_1789936312558', name: 'Campo Belo', category: 'Limpeza', escalaType: 'hibrido', days: [3], alertTimeDiurno: '05:00', alertTimeNoturno: '', hibridoSchedule: ['folga','folga','folga','diurno','folga','folga','folga'] },
  { id: 'ces_rio_1789936415820', name: 'Cesario', category: 'Limpeza', escalaType: 'hibrido', days: [1,2,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '', hibridoSchedule: ['folga','diurno','diurno','folga','diurno','diurno','diurno'] },
  { id: 'cl_nica_1789985216105', name: 'Clinica', category: 'Limpeza', escalaType: 'diurno', days: [0,1,2,3,4,5,6], alertTimeDiurno: '05:00', alertTimeNoturno: '' },
  { id: 'ibirapuera_1789936286981', name: 'Ibirapuera', category: 'Limpeza', escalaType: 'hibrido', days: [3], alertTimeDiurno: '05:00', alertTimeNoturno: '', hibridoSchedule: ['folga','folga','folga','diurno','folga','folga','folga'] },
];

// Bump together with version.json on every deploy: open apps reload themselves when it changes
const APP_VERSION = '2026-10-23.1';

const CATEGORY_ORDER = ['Segurança Econ', 'Segurança Nurban', 'Segurança Kallas', 'Segurança Cursino', 'Limpeza'];
const CATEGORY_ICONS = { 'Segurança Econ': '🛡️', 'Segurança Nurban': '🏢', 'Segurança Kallas': '🔐', 'Segurança Cursino': '📍', 'Limpeza': '🧹' };
const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const SHIFT_LABEL = { diurno: '☀️ Diurno', noturno: '🌙 Noturno', '24h': '🔄 24h' };
// QRA slots (vagas). Each post has a fixed set of slots and each slot holds ONE QRA.
// parity: 12x36 by day of the month (0 = even days, 1 = odd days) · dows: weekdays the slot works
const QRA_TURNOS = {
  diurno: { label: '☀️ Diurno todo dia', short: '☀️', shifts: ['diurno'], parity: null },
  diurno_par: { label: '☀️ Diurno par', short: '☀️P', shifts: ['diurno'], parity: 0 },
  diurno_impar: { label: '☀️ Diurno ímpar', short: '☀️I', shifts: ['diurno'], parity: 1 },
  diurno_semana: { label: '☀️ Diurno seg–sex', short: '☀️S', shifts: ['diurno'], parity: null, dows: [1, 2, 3, 4, 5] },
  diurno_sabado: { label: '☀️ Diurno sábado', short: '☀️Sáb', shifts: ['diurno'], parity: null, dows: [6] },
  diurno_domingo: { label: '☀️ Diurno domingo', short: '☀️Dom', shifts: ['diurno'], parity: null, dows: [0] },
  noturno_par: { label: '🌙 Noturno par', short: '🌙P', shifts: ['noturno'], parity: 0 },
  noturno_impar: { label: '🌙 Noturno ímpar', short: '🌙I', shifts: ['noturno'], parity: 1 },
  // vagas with chosen weekdays (stored in vaga.dows), e.g. Jaguare: Mosca seg/qua/sex, Isaque ter/qui/sáb/dom
  diurno_dias: { label: '☀️ Diurno', short: '☀️D', shifts: ['diurno'], parity: null, custom: true },
  noturno_dias: { label: '🌙 Noturno', short: '🌙D', shifts: ['noturno'], parity: null, custom: true },
  // legacy values, kept so older records still work
  noturno: { label: '🌙 Noturno', short: '🌙', shifts: ['noturno'], parity: null },
  '24h': { label: '🔄 24h', short: '🔄', shifts: ['diurno', 'noturno'], parity: null },
};
// Shift hours. Diurno 07:00–19:00 · Noturno 19:00–07:00 (next day).
// Hybrid posts start the night at 17:00 on weekdays (Mon–Fri); weekends 19:00.
// A night slot belongs to the date it STARTS on. Default alert times: diurno 05:00, noturno 17:00.
const DAY_START = 7 * 60;
const NIGHT_START = 19 * 60;
const HYBRID_WEEKDAY_NIGHT_START = 17 * 60;
const DEFAULT_ALERT = { diurno: '05:00', noturno: '17:00' };
// Weekend vagas of hybrid posts are not fixed: they are filled week by week and free up every Monday
const WEEKLY_TURNOS = ['diurno_sabado', 'diurno_domingo'];
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

// 12x36 alternation: the team works one day and rests the next, ALWAYS (also from the 31st to
// the 1st). "Par" = the team that worked the even days of October 2026; from then on it simply
// alternates, so it does not depend on the day of the month. 0 = turma par, 1 = turma ímpar.
const ALTERNATION_ANCHOR = '2026-10-02';
function dayNumber(date) {
  const [y, m, d] = date.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}
function alternationParity(date) {
  return (((dayNumber(date) - dayNumber(ALTERNATION_ANCHOR)) % 2) + 2) % 2;
}

// Monday of the week (Mon→Sun) containing the date
function weekStart(date) {
  const dow = parseDate(date).getDay();
  return addDays(date, dow === 0 ? -6 : 1 - dow);
}

// Operational date: before 07:00 we are still in the previous date's night shift
function todayStr() {
  return currentSlot().date;
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
  if (minutes < DAY_START) {
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    return { date: toDateStr(y), shift: 'noturno' };
  }
  return { date: toDateStr(now), shift: minutes >= NIGHT_START ? 'noturno' : 'diurno' };
}

function atMinutes(date, minutes) {
  const d = parseDate(date);
  d.setMinutes(minutes);
  return d;
}

function hhmmToMinutes(hhmm, fallback) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || '');
  return m ? Number(m[1]) * 60 + Number(m[2]) : fallback;
}

// Real start/end of a post's shift on a date (end of a night is 07:00 of the next day)
function shiftWindow(post, date, shift) {
  if (shift === 'diurno') return { start: atMinutes(date, DAY_START), end: atMinutes(date, NIGHT_START) };
  const dow = parseDate(date).getDay();
  const startMin = post && post.escalaType === 'hibrido' && dow >= 1 && dow <= 5 ? HYBRID_WEEKDAY_NIGHT_START : NIGHT_START;
  return { start: atMinutes(date, startMin), end: atMinutes(addDays(date, 1), DAY_START) };
}

function slotEnded(post, date, shift) {
  return new Date() >= shiftWindow(post, date, shift).end;
}

// Alarm window of a shift: from the post's alert time (default 05:00 / 17:00) until the shift ends
function slotAlarmActive(post, date, shift) {
  const fallback = hhmmToMinutes(DEFAULT_ALERT[shift]);
  const alertMin = hhmmToMinutes(shift === 'diurno' ? post.alertTimeDiurno : post.alertTimeNoturno, fallback);
  const now = new Date();
  return now >= atMinutes(date, alertMin) && now < shiftWindow(post, date, shift).end;
}

// "☀️ Diurno par", "☀️ Diurno seg, qua, sex" (chosen days), "☀️ Diurno sábado (24/10)" (weekly)
function vagaTurnoLabel(v, withWeek) {
  const def = QRA_TURNOS[v.turno];
  if (!def) return v.turno;
  if (def.custom) return `${def.label} ${(v.dows || []).slice().sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7)).map(d => DAY_NAMES[d].toLowerCase()).join(', ')}`;
  if (withWeek && WEEKLY_TURNOS.includes(v.turno) && v.weekOf) {
    const day = addDays(v.weekOf, v.turno === 'diurno_sabado' ? 5 : 6);
    return `${def.label} (${day.split('-').reverse().slice(0, 2).join('/')})`;
  }
  return def.label;
}

// "☀️ 07h–19h · 🌙 19h–07h" — hybrids show the 17h weekday entry
function postHoursLabel(post) {
  const sched = post.hibridoSchedule || [];
  const isNight = t => t === 'noturno' || t === '24h';
  const isDay = t => t === 'diurno' || t === '24h';
  let day = false, nightWeek = false, nightWeekend = false;
  if (post.escalaType === 'hibrido') {
    day = sched.some(isDay);
    nightWeek = [1, 2, 3, 4, 5].some(d => isNight(sched[d]));
    nightWeekend = [0, 6].some(d => isNight(sched[d]));
  } else {
    day = post.escalaType === 'diurno' || post.escalaType === '24h';
    nightWeekend = nightWeek = post.escalaType === 'noturno' || post.escalaType === '24h';
  }
  const parts = [];
  if (day) parts.push('☀️ 07h–19h');
  if (post.escalaType === 'hibrido' && nightWeek && nightWeekend) parts.push('🌙 seg–sex 17h–07h · sáb/dom 19h–07h');
  else if (post.escalaType === 'hibrido' && nightWeek) parts.push('🌙 17h–07h');
  else if (nightWeek || nightWeekend) parts.push('🌙 19h–07h');
  return parts.join(' · ');
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
    if (post.escalaType === 'diurno') return ['diurno', 'diurno_par', 'diurno_impar'];
    const sched = post.hibridoSchedule || [];
    const hasDay = dow => sched[dow] === 'diurno' || sched[dow] === '24h';
    const slots = [];
    if ([1, 2, 3, 4, 5].some(hasDay)) slots.push('diurno_semana');
    if (hasDay(6)) slots.push('diurno_sabado');
    if (hasDay(0)) slots.push('diurno_domingo');
    if (sched.some(t => t === 'noturno' || t === '24h')) slots.push('noturno_par', 'noturno_impar');
    return slots;
  }

  // ----- Vagas -----
  // A vaga is { postId, turno, weekOf?, dows? }. Its key identifies it inside a post:
  // the turno, or "turno:days" for vagas with chosen weekdays (e.g. "diurno_dias:135").
  vagaKey(v) {
    const def = QRA_TURNOS[v.turno];
    return def && def.custom ? `${v.turno}:${(v.dows || []).join('')}` : v.turno;
  }

  parseVagaKey(postId, key) {
    const [turno, days] = String(key).split(':');
    const v = { postId, turno };
    if (days !== undefined) v.dows = days.split('').filter(Boolean).map(Number);
    return v;
  }

  // Every stored vaga of a QRA (main postId/turno + extra), including expired weekly ones
  allVagas(qra) {
    if (!qra) return [];
    const norm = (src, x) => {
      const v = { postId: x.postId, turno: x.turno, weekOf: x.weekOf || '' };
      if (Array.isArray(x.dows) && x.dows.length) v.dows = x.dows.map(Number);
      return v;
    };
    const vagas = [];
    if (qra.postId && qra.turno) vagas.push(norm(qra, qra));
    (Array.isArray(qra.extra) ? qra.extra : []).forEach(x => { if (x && x.postId && x.turno) vagas.push(norm(qra, x)); });
    return vagas;
  }

  // Weekly vagas (weekend of hybrids) belong to one week; expired ones are ignored
  vagaCurrent(v) {
    return !WEEKLY_TURNOS.includes(v.turno) || (v.weekOf && v.weekOf >= weekStart(todayStr()));
  }

  // All vagas of a QRA still in force (main + extra = escala dupla)
  qraVagas(qra) {
    return this.allVagas(qra).filter(v => this.vagaCurrent(v));
  }

  isDupla(qra) {
    return this.qraVagas(qra).length > 1;
  }

  // Week whose weekend is the next one not over yet (weekly vagas are filled for it)
  targetWeekOf(post) {
    const w = weekStart(todayStr());
    return slotEnded(post, addDays(w, 6), 'diurno') ? addDays(w, 7) : w;
  }

  // QRA holding a vaga of a post. For weekly vagas: the holder for `week` (default: next weekend)
  slotHolder(postId, key, week) {
    const turno = String(key).split(':')[0];
    const weekly = WEEKLY_TURNOS.includes(turno);
    const wk = weekly ? (week || this.targetWeekOf(this.posts[postId])) : null;
    return Object.values(this.qras).find(q => this.qraVagas(q)
      .some(v => v.postId === postId && this.vagaKey(v) === key && (!weekly || v.weekOf === wk))) || null;
  }

  qraShifts(qra) {
    return [...new Set(this.qraVagas(qra).flatMap(v => (QRA_TURNOS[v.turno] || { shifts: [] }).shifts))];
  }

  // A vaga works this shift on this date: post operates, turno covers it (par/ímpar, weekdays,
  // chosen days) and, for weekly vagas that carry a week, that date is in that week
  vagaScheduled(vaga, date, shift) {
    const def = QRA_TURNOS[vaga.turno];
    if (!def || !def.shifts.includes(shift)) return false;
    const d = parseDate(date);
    if (def.parity !== null && alternationParity(date) !== def.parity) return false;
    if (def.dows && !def.dows.includes(d.getDay())) return false;
    if (def.custom && !(vaga.dows || []).includes(d.getDay())) return false;
    if (WEEKLY_TURNOS.includes(vaga.turno) && vaga.weekOf && vaga.weekOf !== weekStart(date)) return false;
    return this.postWorks(this.posts[vaga.postId], date, shift);
  }

  // Vagas of the QRA on duty at that date/shift (optionally only at one post), ignoring folgas
  qraVagasOn(qra, date, shift, postId) {
    if (!qra) return [];
    const days = Array.isArray(qra.days) ? qra.days : [0, 1, 2, 3, 4, 5, 6];
    if (!days.includes(parseDate(date).getDay())) return [];
    return this.qraVagas(qra).filter(v => (!postId || v.postId === postId) && this.vagaScheduled(v, date, shift));
  }

  // Titular duty ignoring folgas (reserves have no vaga, so never)
  qraScheduled(qra, date, shift, postId) {
    return this.qraVagasOn(qra, date, shift, postId).length > 0;
  }

  // Dates/shifts (next `days` days) where two vagas both work
  vagasOverlap(a, b, days = 28) {
    const hits = [];
    const start = todayStr();
    for (let i = 0; i < days; i++) {
      const date = addDays(start, i);
      ['diurno', 'noturno'].forEach(shift => {
        if (this.vagaScheduled(a, date, shift) && this.vagaScheduled(b, date, shift)) hits.push({ date, shift });
      });
    }
    return hits;
  }

  // Other QRAs whose vagas in the same post work at the same time as `vaga` (two people
  // in one shift). E.g. "Diurno todo dia" vs "Diurno par", or chosen days vs par/ímpar.
  overlapHolders(vaga, ignoreQraId) {
    const out = [];
    Object.values(this.qras).forEach(q => {
      if (q.id === ignoreQraId) return;
      this.qraVagas(q).filter(v => v.postId === vaga.postId && this.vagaKey(v) !== this.vagaKey(vaga)).forEach(v => {
        const hits = this.vagasOverlap(vaga, v);
        if (hits.length) out.push({ qra: q, vaga: v, hits });
      });
    });
    return out;
  }

  // Time conflicts of adding `vaga` to a QRA who already has other vagas (next `days` days):
  // choques = same shift on the same day · dobras = shift right before/after one of his shifts
  // A plantão of his own vaga he really has to work: not on folga and not covered by someone else
  vagaBusy(qra, v, date, shift, out) {
    if (!this.vagaScheduled(v, date, shift)) return false;
    if (this.folgaOf(qra.id, date)) return false;
    const cov = this.releaseCover(qra, v, date, shift);
    if (cov) {
      if (out && !out.released.some(r => r.date === date && r.shift === shift && r.vaga.postId === v.postId)) out.released.push({ date, shift, vaga: v, by: cov.qraName });
      return false;
    }
    return true;
  }

  vagaConflicts(qra, vaga, days = 28) {
    const existing = this.qraVagas(qra);
    const out = { choques: [], dobras: [], released: [] };
    const start = todayStr();
    for (let i = 0; i < days; i++) {
      const date = addDays(start, i);
      (QRA_TURNOS[vaga.turno] || { shifts: [] }).shifts.forEach(shift => {
        if (!this.vagaScheduled(vaga, date, shift)) return;
        existing.forEach(v => {
          // plantões of his other vagas that are covered (or on folga) do not clash
          if (this.vagaBusy(qra, v, date, shift, out)) out.choques.push({ date, shift, vaga: v });
          const before = prevSlot(date, shift);
          const after = nextSlot(date, shift);
          if (this.vagaBusy(qra, v, before.date, before.shift, out)) out.dobras.push({ date, shift, vaga: v, side: 'anterior', at: before });
          if (this.vagaBusy(qra, v, after.date, after.shift, out)) out.dobras.push({ date, shift, vaga: v, side: 'posterior', at: after });
        });
      });
    }
    return out;
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
  // Cobertura (by someone else) already placed on a QRA's own vaga at that date/shift
  // A cobertura releases a titular only if it is for HIS vaga (or his folga); an old cobertura
  // without vaga info counts only when he is the single titular of that post/shift
  releaseCover(qra, vaga, date, shift, excludeCobId) {
    const post = this.posts[vaga.postId];
    return Object.values(this.coberturas).find(c => {
      if (c.pending || c.id === excludeCobId || c.postId !== vaga.postId || c.date !== date
        || !shiftsOf(c.turno).includes(shift) || c.qraId === qra.id) return false;
      if (c.vaga) return c.vaga === this.vagaKey(vaga);
      if (c.folgaId && this.folgas[c.folgaId]) return this.folgas[c.folgaId].qraId === qra.id;
      return post ? Object.values(this.qras).filter(q => this.qraScheduled(q, date, shift, post.id)).length === 1 : false;
    }) || null;
  }

  empenhosAt(person, date, shift, excludeCobId) {
    const result = [];
    const qra = person.qraId ? this.qras[person.qraId] : this.qraByName(person.name);
    const qraId = qra ? qra.id : null;
    const name = normalizeText(qra ? qra.name : person.name);

    if (qra && !this.folgaOf(qra.id, date)) {
      // His own shift already covered by someone else = he is released from it, not a clash
      this.qraVagasOn(qra, date, shift).forEach(v => {
        if (!this.releaseCover(qra, v, date, shift, excludeCobId)) result.push({ kind: 'fixo', postId: v.postId, date, shift });
      });
    }
    Object.values(this.coberturas).forEach(c => {
      if (c.pending || c.id === excludeCobId || c.date !== date || !shiftsOf(c.turno).includes(shift)) return;
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
    if (qra) {
      shifts.forEach(s => this.qraVagasOn(qra, date, s).forEach(v => {
        const cov = this.releaseCover(qra, v, date, s, excludeCobId);
        const p = this.posts[v.postId];
        if (cov) out.infos.push(`O plantão dele (${p ? p.name : '?'} ${slotLabel(date, s)}) já está coberto por ${cov.qraName || 'alguém'} — está liberado.`);
        else if (!this.folgaOf(qra.id, date)) out.infos.push(`Para liberar, primeiro lance uma cobertura no plantão dele: ${p ? p.name : '?'} ${slotLabel(date, s)}.`);
      }));
    }
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
    const titulares = Object.values(this.qras).filter(q => this.qraScheduled(q, date, shift, post.id));
    const ausentes = titulares.filter(q => this.folgaOf(q.id, date));
    const presentes = titulares.filter(q => !this.folgaOf(q.id, date));
    const all = Object.values(this.coberturas).filter(c => c.postId === post.id && c.date === date && shiftsOf(c.turno).includes(shift));
    // A request without a QRA yet ("a definir") does not cover anything: it only raises the alert
    const coberturas = all.filter(c => !c.pending);
    const pedidos = all.filter(c => c.pending);
    return { titulares, ausentes, presentes, coberturas, pedidos, descoberto: Math.max(0, ausentes.length - coberturas.length) };
  }

  // Vagas of a post that work on a given date: [{ slot, shift, holder }]
  postVagaKeys(post) {
    const keys = [...this.postSlots(post)];
    Object.values(this.qras).forEach(q => this.qraVagas(q).forEach(v => {
      if (v.postId === post.id && !keys.includes(this.vagaKey(v))) keys.push(this.vagaKey(v));
    }));
    return keys;
  }

  // Vagas working on a date: [{ slot (key), shift, holder }] — holder of weekly vagas = that week's
  activeSlotsOn(post, date) {
    return this.postVagaKeys(post).flatMap(key => {
      const v = this.parseVagaKey(post.id, key);
      return (QRA_TURNOS[v.turno] || { shifts: [] }).shifts
        .filter(shift => this.vagaScheduled(v, date, shift))
        .map(shift => ({ slot: key, shift, holder: this.slotHolder(post.id, key, weekStart(date)) }));
    });
  }

  // Coverage requests still waiting for a QRA, from the current slot on (any date ahead)
  pendingRequests() {
    const cur = currentSlot();
    const list = [];
    Object.values(this.coberturas).filter(c => c.pending && c.date >= addDays(cur.date, -1)).forEach(c => {
      const post = this.posts[c.postId];
      if (!post) return;
      shiftsOf(c.turno).forEach(shift => {
        if (slotEnded(post, c.date, shift)) return;
        list.push({ post, date: c.date, shift, status: this.slotStatus(post, c.date, shift), cob: c, kind: 'pedido' });
      });
    });
    return list;
  }

  // Uncovered folga slots from the current slot up to `days` ahead
  uncoveredSlots(days) {
    const list = [];
    const cur = currentSlot();
    for (let i = -1; i <= days; i++) {
      const date = addDays(cur.date, i);
      Object.values(this.posts).forEach(post => {
        shiftsOf(this.postShiftOn(post, date)).forEach(shift => {
          if (slotEnded(post, date, shift)) return; // already over
          const st = this.slotStatus(post, date, shift);
          if (st.descoberto > 0) list.push({ post, date, shift, status: st, kind: 'folga' });
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
      if (date < addDays(cur.date, -1)) return;
      Object.values(this.posts).filter(p => p.escalaType === 'hibrido').forEach(post => {
        shiftsOf(this.postShiftOn(post, date)).forEach(shift => {
          if (slotEnded(post, date, shift)) return;
          const st = this.slotStatus(post, date, shift);
          if (st.presentes.length === 0 && st.coberturas.length === 0) list.push({ post, date, shift, status: st, kind: 'fds' });
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
  constructor() {
    this.ctx = null;
    try { this.wanted = localStorage.getItem('coberturasSound') !== 'off'; } catch (e) { this.wanted = true; }
  }

  // Browsers only allow audio after a user gesture: call this from a tap/click
  unlock() {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) { /* no audio support */ }
  }

  get ready() {
    return !!(this.wanted && this.ctx && this.ctx.state === 'running');
  }

  setWanted(on) {
    this.wanted = on;
    try { localStorage.setItem('coberturasSound', on ? 'on' : 'off'); } catch (e) {}
  }

  alarm() {
    try {
      if (!this.ready) return false;
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
      return true;
    } catch (e) {
      console.warn('Audio not available:', e);
      return false;
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
  // Atomic read-modify-write on the server value (fn returns the new value, or undefined to abort)
  transaction(path, fn) { return this.db.ref(path).transaction(fn).then(r => r.committed); }
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
    this.buildDayCheckboxes('qra-custom-days', 'custom-day-cb');
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

    // Reload by itself when a new version is published (no stale screens writing old logic)
    this.checkForUpdate();
    setInterval(() => this.checkForUpdate(), 5 * 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.checkForUpdate(); });

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
      // Wait for ALL data (posts arrive a moment before QRAs/coberturas): computing alerts with
      // half the data showed false "sem cobertura" warnings and sounds on startup
      if (!Object.values(this.loaded).every(Boolean)) return;
      this.weekendPending = this.sched.weekendPendingSlots();
      this.uncovered = this.sched.uncoveredSlots(ALERT_DAYS_AHEAD);
      this.requests = this.sched.pendingRequests();
      this.renderPosts();
      this.renderQraList();
      this.renderAgenda();
      this.applyAgendaFilter();
      this.updateAlerts();
    });
  }

  async checkForUpdate() {
    try {
      const res = await fetch(`version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      const { v } = await res.json();
      if (!v || v === APP_VERSION || this.updating) return;
      // never reload in the middle of a form
      if (document.querySelector('.modal-overlay.active')) return;
      this.updating = true;
      this.showToast('⬆️ Nova versão do app — atualizando…', 'info');
      await Promise.all(['index.html', 'app.js', 'style.css'].map(f => fetch(f, { cache: 'reload' }).catch(() => null)));
      setTimeout(() => location.reload(), 800);
    } catch (e) { /* offline: try again later */ }
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

  vagaForSlot(post, key) {
    const v = this.sched.parseVagaKey(post.id, key);
    if (WEEKLY_TURNOS.includes(v.turno)) v.weekOf = this.sched.targetWeekOf(post);
    return v;
  }

  vagaLabel(v) {
    const p = this.sched.posts[v.postId];
    return `${p ? p.name : 'posto removido'} · ${vagaTurnoLabel(v, true)}`;
  }

  postLabel(postId) {
    const p = this.sched.posts[postId];
    return p ? `${p.name} · ${p.category}` : 'Sem posto (reserva)';
  }

  // ----- Postos -----

  renderPosts() {
    const container = document.getElementById('posts-container');
    let groups = this.postsByCategory();
    const query = normalizeText((document.getElementById('post-search') || {}).value);
    if (query) {
      const s = this.sched;
      const text = p => normalizeText([p.name, p.category,
        ...Object.values(s.qras).filter(q => s.qraVagas(q).some(v => v.postId === p.id)).map(q => q.name)].join(' '));
      groups = groups.map(([cat, posts]) => [cat, posts.filter(p => text(p).includes(query))]).filter(([, posts]) => posts.length);
      if (groups.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum posto encontrado.</div>';
        return;
      }
    }
    if (groups.length === 0) {
      container.innerHTML = '<div class="empty-state">Nenhum posto cadastrado.</div>';
      return;
    }
    // Posts with any alert go first, in their own section (earliest pending first)
    const firstPending = p => { const l = this.postPendings(p); return l.length ? l[0].date + l[0].shift : null; };
    const alerted = groups.flatMap(([, posts]) => posts).filter(p => firstPending(p))
      .sort((a, b) => firstPending(a).localeCompare(firstPending(b)) || a.name.localeCompare(b.name));
    const alertedIds = new Set(alerted.map(p => p.id));
    groups = groups.map(([cat, posts]) => [cat, posts.filter(p => !alertedIds.has(p.id))]).filter(([, posts]) => posts.length);
    if (alerted.length) groups.unshift(['🚨 Com alerta', alerted]);
    container.innerHTML = groups.map(([cat, posts]) => `
      <div class="category-section">
        <div class="category-header">
          <div class="category-icon">${cat.startsWith('🚨') ? '🚨' : (CATEGORY_ICONS[cat] || '📌')}</div>
          <h2 class="category-title">${esc(cat.replace('🚨 ', ''))}</h2>
          <span class="category-count">${posts.length} postos</span>
        </div>
        <div class="posts-grid">${posts.map(p => this.postCardHtml(p)).join('')}</div>
      </div>
    `).join('');
  }

  // Coverage pendings of a post: uncovered folgas (next days) + weekend shifts of hybrids
  // Everything that needs coverage: uncovered folgas, empty weekend shifts of hybrids and
  // requests "a definir". One entry per post/date/shift.
  allPendings() {
    const map = new Map();
    [...(this.uncovered || []), ...(this.weekendPending || []), ...(this.requests || [])]
      .forEach(u => { if (!map.has(`${u.post.id}|${u.date}|${u.shift}`)) map.set(`${u.post.id}|${u.date}|${u.shift}`, u); });
    return [...map.values()].sort((a, b) => (a.date + a.shift + a.post.name).localeCompare(b.date + b.shift + b.post.name));
  }

  postPendings(post) {
    return this.allPendings().filter(u => u.post.id === post.id);
  }

  postCardHtml(post) {
    const s = this.sched;
    const today = todayStr();
    const todayType = s.postShiftOn(post, today);
    const slots = s.postSlots(post);

    const badgeLabel = post.escalaType === 'hibrido'
      ? `Híbrido · hoje ${todayType === 'folga' ? 'Folga' : (todayType === '24h' ? '24h' : SHIFT_LABEL[todayType].split(' ')[1])}`
      : ({ diurno: 'Diurno', noturno: 'Noturno', '24h': '24h' }[post.escalaType] || '');

    // Slot table: one row per vaga, one QRA per vaga (QRAs outside the escala are listed with a warning)
    const rows = s.postVagaKeys(post).map(key => {
      const vaga = this.vagaForSlot(post, key);
      const def = QRA_TURNOS[vaga.turno] || { label: key, shifts: [] };
      const holder = s.slotHolder(post.id, key);
      const onDutyToday = holder ? def.shifts.some(sh => s.vagaScheduled(vaga, today, sh)) : false;
      const offToday = holder && onDutyToday && s.folgaOf(holder.id, today);
      const outOfScale = !slots.includes(key) && !def.custom;
      const dupla = holder && s.isDupla(holder);
      // an empty vaga that would put two people in the same shift is locked
      const lock = holder ? null : s.overlapHolders(vaga)[0];
      const cell = holder
        ? `<span class="slot-name" onclick="app.showQraModal('${holder.id}')">${esc(holder.name)}</span>
           ${dupla ? `<span class="slot-tag dupla" title="${esc(s.qraVagas(holder).map(v => this.vagaLabel(v)).join(' + '))}">2× ESCALA DUPLA</span>` : ''}
           ${offToday ? '<span class="slot-tag off">🏖️ folga hoje</span>' : (onDutyToday ? '<span class="slot-tag today">hoje</span>' : '')}
           <button class="chip-x" onclick="app.confirmUnassignQra('${holder.id}', '${post.id}', '${key}')" title="Tirar desta vaga (continua na lista de QRAs)">✕</button>`
        : lock
          ? `<span class="slot-lock" title="Mesmo turno já ocupado por ${esc(lock.qra.name)} (${esc(vagaTurnoLabel(lock.vaga))})">🔒 ${esc(lock.qra.name)} já cobre</span>`
          : `<button class="slot-add" onclick="app.showAssignModal('${post.id}', '${key}')">+ adicionar</button>`;
      const weekly = WEEKLY_TURNOS.includes(vaga.turno) ? ` <small class="weekly-tag">· semanal ${vagaTurnoLabel(vaga, true).match(/\((.*)\)/)[1]}</small>` : '';
      return `<tr class="${holder ? '' : 'empty'}${outOfScale ? ' out' : ''}${dupla ? ' is-dupla' : ''}"><td class="slot-label">${outOfScale ? '⚠️ ' : ''}${vagaTurnoLabel(vaga)}${weekly}</td><td class="slot-cell">${cell}</td></tr>`;
    }).join('') + `<tr class="empty"><td class="slot-cell" colspan="2"><button class="slot-add slot-add-custom" onclick="app.showAssignModal('${post.id}', '__custom__')">+ vaga com dias escolhidos</button></td></tr>`;

    // Today's shifts with who is on duty
    let flashingNow = false;
    const shiftLines = shiftsOf(todayType).map(shift => {
      const st = s.slotStatus(post, today, shift);
      const isPast = slotEnded(post, today, shift);
      if (!isPast && slotAlarmActive(post, today, shift) && st.descoberto > 0) flashingNow = true;
      const parts = [];
      // When the shift has a cobertura, the titular being covered shows in red
      const covered = st.coberturas.length > 0;
      st.presentes.forEach(q => parts.push(`<span class="who ${covered ? 'covered' : 'ok'}">${esc(q.name)}</span>`));
      st.ausentes.forEach(q => parts.push(`<span class="who ${covered ? 'covered' : 'off'}">🏖️ ${esc(q.name)}</span>`));
      st.coberturas.forEach(c => parts.push(`<span class="who cover big${isPast ? '' : ' blink'}">🔁 ${esc(c.qraName)}</span>`));
      st.pedidos.forEach(() => parts.push('<span class="who alert">⏳ cobertura a definir</span>'));
      if (st.descoberto > 0) parts.push('<span class="who alert">⚠️ SEM COBERTURA</span>');
      if (st.titulares.length === 0 && st.coberturas.length === 0) parts.push('<span class="who muted">Ninguém escalado</span>');
      return `<div class="shift-line${isPast ? ' past' : ''}"><span class="shift-tag">${SHIFT_LABEL[shift]}</span>${parts.join('')}</div>`;
    });

    // Windows that need coverage: the card flashes and says date + shift
    const pendings = this.postPendings(post);
    // Each pending says why: ⏳ request "a definir" · 🏖️ uncovered folga · 📅 empty weekend shift (hybrids)
    const reason = { pedido: ['⏳', 'pedido de cobertura (QRA a definir)'], folga: ['🏖️', 'folga sem cobertura'], fds: ['📅', 'fim de semana sem ninguém'] };
    const alertHtml = pendings.length
      ? `<div class="cover-alert">🚨 PRECISA DE COBERTURA
          <div class="cover-alert-list">${pendings.map(p => {
            const [icon, why] = reason[p.kind] || ['⚠️', ''];
            const action = p.kind === 'pedido' && p.cob
              ? `app.showCoberturaModal({ editId: '${p.cob.id}' })`
              : `app.showCoberturaModal({ postId: '${post.id}', date: '${p.date}', turno: '${p.shift}' })`;
            return `<button class="link-btn" title="${why}" onclick="${action}">${icon} ${slotLabel(p.date, p.shift)}</button>`;
          }).join('')}</div>
          <div class="cover-alert-legend">${[...new Set(pendings.map(p => p.kind))].map(k => (reason[k] || ['', ''])).map(([i, w]) => `${i} ${w}`).join(' · ')}</div>
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
        <div class="post-hours">${postHoursLabel(post)}</div>
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
      .filter(q => this.qraMatchesFilters(q))
      .filter(q => !query || normalizeText(q.name).includes(query)
        || normalizeText(s.qraVagas(q).map(v => this.postLabel(v.postId)).join(' ') || this.postLabel('')).includes(query)
        || (query.includes('dupla') && s.isDupla(q)))
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
            <div class="qra-name">${esc(q.name)} ${s.isDupla(q) ? '<span class="slot-tag dupla">2× ESCALA DUPLA</span>' : ''} ${q.phone ? `<a class="qra-phone" href="tel:${esc(q.phone)}">📞 ${esc(q.phone)}</a>` : ''}</div>
            ${s.qraVagas(q).length
              ? s.qraVagas(q).map(v => `<div class="qra-meta">🏢 ${esc(this.vagaLabel(v))}${days !== 'Todos os dias' ? ` · ${days}` : ''}
                  <button class="chip-x" onclick="app.confirmUnassignQra('${q.id}', '${v.postId}', '${s.vagaKey(v)}')" title="Tirar desta vaga">✕</button></div>`).join('')
              : '<div class="qra-meta reserve">🗂️ Sem posto (reserva)</div>'}
            <div class="qra-next">➡️ Próximo empenho: ${nextText}</div>
            ${folgas.length ? `<div class="qra-folgas">🏖️ Folgas: ${folgas.slice(0, 4).map(f => dateLabel(f.date)).join(', ')}${folgas.length > 4 ? '…' : ''}</div>` : ''}
          </div>
          <div class="qra-actions">
            <button class="btn-mini" onclick="app.showFolgaModal('${q.id}')">🏖️ Folga</button>
            <button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ qraId: '${q.id}' })">🔁 Cobrir</button>
            <button class="btn-icon" onclick="app.showQraModal('${q.id}')" title="Editar">✏️</button>
            <button class="btn-icon danger" onclick="app.confirmDeleteQra('${q.id}')" title="Excluir de vez">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // QRA tab filters: shift (diurno/noturno) and par/ímpar; a QRA matches if ONE of his vagas does
  qraMatchesFilters(q) {
    const f = this.qraFilter || {};
    if (!f.shift && f.parity === undefined) return true;
    return this.sched.qraVagas(q).some(v => {
      const def = QRA_TURNOS[v.turno];
      if (!def) return false;
      if (f.shift && !def.shifts.includes(f.shift)) return false;
      if (f.parity !== undefined && def.parity !== f.parity) return false;
      return true;
    });
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
        const duties = q ? ['diurno', 'noturno'].flatMap(sh => s.qraVagasOn(q, date, sh).map(v => ({ v, sh, post: s.posts[v.postId] }))) : [];
        const post = duties.length ? duties[0].post : (q ? s.posts[q.postId] : null);
        const multi = new Set(duties.map(d => d.v.postId)).size > 1;
        const statusHtml = duties.length === 0
          ? '<span class="who muted">Não teria empenho neste dia</span>'
          : duties.map(({ sh, post: dp }) => {
              const st = s.slotStatus(dp, date, sh);
              const where = multi ? `${esc(dp.name)} ` : '';
              return st.descoberto > 0
                ? `<span class="who alert">${where}${SHIFT_LABEL[sh]}: SEM COBERTURA</span>`
                : `<span class="who cover">${where}${SHIFT_LABEL[sh]}: 🔁 ${st.coberturas.map(c => esc(c.qraName)).join(', ')}</span>`;
            }).join('');
        const uncoveredDuty = duties.find(d => s.slotStatus(d.post, date, d.sh).descoberto > 0);
        const uncovered = uncoveredDuty ? uncoveredDuty.sh : null;
        const title = `🏖️ Folga: ${q ? q.name : 'QRA removido'}${post ? ` (${post.name})` : ''}`;
        return `
          <div class="agenda-item folga${uncovered ? ' uncovered' : ''}">
            <div class="agenda-main">
              <div class="agenda-title">🏖️ Folga — <strong>${esc(q ? q.name : 'QRA removido')}</strong> ${multi ? '· escala dupla' : (post ? `· ${esc(post.name)}` : '')}</div>
              <div class="agenda-status">${statusHtml}</div>
              ${f.note ? `<div class="agenda-note">📝 ${esc(f.note)}</div>` : ''}
            </div>
            <div class="agenda-actions">
              ${uncoveredDuty ? `<button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ postId: '${uncoveredDuty.v.postId}', date: '${date}', turno: '${uncoveredDuty.sh}|${s.vagaKey(uncoveredDuty.v)}', folgaId: '${f.id}' })">🔁 Cobrir</button>` : ''}
              <a class="btn-mini" target="_blank" rel="noopener" href="${esc(gcalUrl(title, date, f.note || ''))}">📅 Agenda</a>
              <button class="btn-icon danger" onclick="app.confirmDeleteFolga('${f.id}')" title="Excluir">🗑️</button>
            </div>
          </div>`;
      }).join('');
      const cobHtml = dayCobs.map(c => {
        const post = s.posts[c.postId];
        if (c.pending) {
          const ptitle = `⏳ Cobertura A DEFINIR: ${post ? post.name : '?'} (${SHIFT_LABEL[c.turno] || c.turno})`;
          return `
          <div class="agenda-item uncovered">
            <div class="agenda-main">
              <div class="agenda-title">⏳ Cobertura <strong>A DEFINIR</strong> → ${esc(post ? post.name : 'posto removido')}</div>
              <div class="agenda-status"><span class="who alert">${SHIFT_LABEL[c.turno] || esc(c.turno)}${c.vaga && QRA_TURNOS[c.vaga] ? ` · vaga ${QRA_TURNOS[c.vaga].label}` : ''}</span></div>
              ${c.note ? `<div class="agenda-note">📝 ${esc(c.note)}</div>` : ''}
            </div>
            <div class="agenda-actions">
              <button class="btn-mini btn-mini-cover" onclick="app.showCoberturaModal({ editId: '${c.id}' })">👤 Definir QRA</button>
              <a class="btn-mini" target="_blank" rel="noopener" href="${esc(gcalUrl(ptitle, date, c.note || ''))}">📅 Agenda</a>
              <button class="btn-icon danger" onclick="app.confirmDeleteCobertura('${c.id}')" title="Excluir">🗑️</button>
            </div>
          </div>`;
        }
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

  applyAgendaFilter() {
    const query = normalizeText((document.getElementById('agenda-search') || {}).value);
    const list = document.getElementById('agenda-list');
    list.querySelectorAll('.agenda-day').forEach(day => {
      const dayText = normalizeText(day.querySelector('.agenda-date').textContent);
      let visible = 0;
      day.querySelectorAll('.agenda-item').forEach(item => {
        const show = !query || dayText.includes(query) || normalizeText(item.textContent).includes(query);
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      day.style.display = visible ? '' : 'none';
    });
  }

  // ----- Alerts (header badge + alarm like the QTI app) -----

  updateAlerts() {
    const uncovered = this.uncovered || [];
    const weekend = this.weekendPending || [];
    // Same slot may be both an uncovered folga and a weekend pending: count it once
    const all = new Map(this.allPendings().map(u => [`${u.post.id}|${u.date}|${u.shift}`, u]));
    const badge = document.getElementById('pending-count');
    if (all.size > 0) {
      badge.innerHTML = `⚠️ ${all.size}<span class="badge-long"> sem cobertura</span>`;
      badge.className = 'pending-badge';
      badge.title = [...all.values()].map(u => `${slotLabel(u.date, u.shift)} · ${u.post.name}`).join('\n');
    } else {
      badge.innerHTML = '✓<span class="badge-long"> Tudo coberto</span>';
      badge.className = 'pending-badge all-clear';
      badge.title = '';
    }

    // Sound once for each newly uncovered slot in the CURRENT shift
    const nowKeys = new Set(this.allPendings().filter(u => u.kind !== 'fds' && slotAlarmActive(u.post, u.date, u.shift)).map(u => `${u.post.id}|${u.date}|${u.shift}`));
    const isNew = [...nowKeys].some(k => !this.lastAlarmKeys.has(k));
    if (isNew) {
      if (!this.sound.alarm()) this.soundBlockedHint();
      this.showToast('🚨 Posto sem cobertura no turno atual!', 'error');
    }
    this.lastAlarmKeys = nowKeys;

    // Weekend reminder (from Monday on): sound + toast at most every 2 hours per device, until filled
    if (weekend.length > 0) {
      let last = 0;
      try { last = Number(localStorage.getItem('coberturasWeekendAlertAt')) || 0; } catch (e) {}
      if (Date.now() - last > 2 * 60 * 60 * 1000) {
        try { localStorage.setItem('coberturasWeekendAlertAt', String(Date.now())); } catch (e) {}
        if (!this.sound.alarm()) this.soundBlockedHint();
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
    const vagas = q ? this.sched.qraVagas(q) : [];
    document.getElementById('qra-slot-info').innerHTML = vagas.length
      ? `${vagas.length > 1 ? '<span class="slot-tag dupla">2× ESCALA DUPLA</span><br>' : ''}${vagas.map(v => `🏢 <strong>${esc(this.vagaLabel(v))}</strong>`).join('<br>')}<br><small>Para trocar de vaga, tire da vaga (✕) e adicione na vaga nova.</small>`
      : '🗂️ <strong>Reserva</strong> (sem posto) — para colocar num posto, use "+ adicionar" na vaga do posto.';
    document.getElementById('qra-pick-group').style.display = 'none';
    document.getElementById('qra-name-group').style.display = 'block';
    document.getElementById('qra-phone-group').style.display = 'block';
    this.showModal('qra-modal');
    setTimeout(() => document.getElementById('qra-name').focus(), 50);
  }

  // Fill one vaga of a post: pick a QRA or type a new one. Post and vaga come from the table.
  // key "__custom__" = new vaga with chosen weekdays (shift + days picked in the form).
  showAssignModal(postId, key) {
    const post = this.sched.posts[postId];
    if (!post) return;
    const custom = key === '__custom__';
    if (!custom) {
      const holder = this.sched.slotHolder(postId, key);
      if (holder) return this.showToast(`Vaga ocupada por ${holder.name}. Tire da vaga (✕) antes de colocar outro.`, 'error');
      const lock = this.sched.overlapHolders(this.vagaForSlot(post, key))[0];
      if (lock) return this.showToast(`🔒 Esse turno já tem ${lock.qra.name} (${vagaTurnoLabel(lock.vaga)}). Tire ele antes para não ficar duas pessoas no mesmo turno.`, 'error');
    }
    document.getElementById('qra-modal-title').textContent = custom ? '👤 Vaga com dias escolhidos' : '👤 Adicionar QRA à vaga';
    document.getElementById('qra-id').value = '';
    document.getElementById('qra-post').value = postId;
    document.getElementById('qra-turno').value = key;
    document.getElementById('qra-name').value = '';
    document.getElementById('qra-phone').value = '';
    document.getElementById('qra-slot-info').innerHTML = custom
      ? `🏢 <strong>${esc(post.name)}</strong> · escolha o turno e os dias da semana`
      : `🏢 <strong>${esc(post.name)}</strong> · ${esc(vagaTurnoLabel(this.vagaForSlot(post, key), true))}`;
    // custom vaga: shift options the post actually has, days unchecked
    const shifts = ['diurno', 'noturno'].filter(sh => [0, 1, 2, 3, 4, 5, 6].some(d => shiftsOf(this.sched.postShiftOn(post, addDays(weekStart(todayStr()), (d + 6) % 7))).includes(sh)));
    document.getElementById('qra-custom-shift').innerHTML = shifts.map(sh => `<option value="${sh}_dias">${SHIFT_LABEL[sh]}</option>`).join('');
    document.querySelectorAll('.custom-day-cb').forEach(cb => { cb.checked = false; });
    document.getElementById('qra-custom-group').style.display = custom ? 'block' : 'none';
    const all = Object.values(this.sched.qras).sort((a, b) => a.name.localeCompare(b.name));
    const reserves = all.filter(q => this.sched.qraVagas(q).length === 0);
    const onDuty = all.filter(q => this.sched.qraVagas(q).length > 0);
    document.getElementById('qra-pick').innerHTML = '<option value="__new__">✍️ Novo QRA (digitar nome)</option>' +
      (reserves.length ? `<optgroup label="Reserva">${reserves.map(q => `<option value="${q.id}">🗂️ ${esc(q.name)}</option>`).join('')}</optgroup>` : '') +
      (onDuty.length ? `<optgroup label="Já escalados (escala dupla)">${onDuty.map(q =>
        `<option value="${q.id}">➕ ${esc(q.name)} — ${esc(this.sched.qraVagas(q).map(v => this.vagaLabel(v)).join(' + '))} (escala dupla)</option>`).join('')}</optgroup>` : '');
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

  // Firebase representation of a QRA's vagas (main fields + extra list)
  vagasToStore(vagas) {
    const clean = v => ({ postId: v.postId, turno: v.turno, weekOf: v.weekOf || '', dows: v.dows && v.dows.length ? v.dows : null });
    const main = vagas[0] ? clean(vagas[0]) : { postId: '', turno: '', weekOf: '', dows: null };
    return { postId: main.postId, turno: main.turno, weekOf: main.weekOf, dows: main.dows, extra: vagas.slice(1).map(clean) };
  }

  // Change a QRA's vagas atomically on the SERVER value, so a change made a moment before on
  // another device (or an old cached screen) is never overwritten. mutate(vagas) → new list.
  async updateQraVagas(qraId, mutate, successMsg) {
    let result = null;
    const ok = await this.write(this.firebase.transaction(`qras/${qraId}`, cur => {
      if (cur === null) return null; // not loaded yet: Firebase retries with the server value
      const next = mutate(this.sched.qraVagas(cur));
      if (!next) return; // abort
      result = next;
      return { ...cur, ...this.vagasToStore(next) };
    }).then(committed => { if (!committed) throw new Error('transaction aborted'); }), successMsg);
    return ok ? result : null;
  }

  sameVaga(a, b) {
    return a.postId === b.postId && this.sched.vagaKey(a) === this.sched.vagaKey(b) && (a.weekOf || '') === (b.weekOf || '');
  }

  // Remove one vaga from a QRA. With escala dupla the other vaga stays; with none left he becomes
  // reserve and his future folgas (which only made sense for his vagas) are removed too.
  confirmUnassignQra(qraId, postId, key) {
    const s = this.sched;
    const q = s.qras[qraId];
    if (!q) return;
    const vagas = s.qraVagas(q);
    const post = s.posts[postId];
    const wk = post && WEEKLY_TURNOS.includes(String(key).split(':')[0]) ? s.targetWeekOf(post) : null;
    const target = vagas.find(v => v.postId === postId && s.vagaKey(v) === key && (!wk || v.weekOf === wk))
      || vagas.find(v => v.postId === postId && s.vagaKey(v) === key) || vagas.find(v => v.postId === postId) || vagas[0];
    if (!target) return;
    const rest = vagas.filter(v => v !== target);
    const futureFolgas = Object.values(s.folgas).filter(f => f.qraId === qraId && f.date >= todayStr());
    const msg = rest.length
      ? `Tirar ${q.name} da vaga ${this.vagaLabel(target)}? Ele continua em ${rest.map(v => this.vagaLabel(v)).join(' + ')}.`
      : `Tirar ${q.name} da vaga ${this.vagaLabel(target)}? Ele continua na lista geral de QRAs como reserva e pode ser usado em coberturas.${futureFolgas.length ? ` As ${futureFolgas.length} folga(s) futura(s) dele serão apagadas.` : ''}`;
    this.confirm(msg, async () => {
      const left = await this.updateQraVagas(qraId, cur => {
        const idx = cur.findIndex(v => this.sameVaga(v, target));
        if (idx < 0) return cur; // already removed elsewhere: just rewrite clean data
        return cur.filter((_, i) => i !== idx);
      }, rest.length ? `${q.name} saiu de ${this.vagaLabel(target)}` : `${q.name} saiu do posto e ficou na reserva`);
      if (left && left.length === 0) {
        const folgas = Object.values(this.sched.folgas).filter(f => f.qraId === qraId && f.date >= todayStr());
        if (folgas.length) {
          const updates = {};
          folgas.forEach(f => { updates[`folgas/${f.id}`] = null; });
          this.write(this.firebase.update('/', updates));
        }
      }
    });
  }

  // Ask "escala dupla?" before giving a second vaga to a QRA; refuse real time clashes
  confirmDupla(q, vaga, onYes) {
    const conflicts = this.sched.vagaConflicts(q, vaga);
    const describe = list => [...new Map(list.map(c => [`${c.date}|${c.shift}`, c])).values()].slice(0, 3)
      .map(c => `${slotLabel(c.date, c.shift)}${c.at ? ` (${c.side}: ${slotLabel(c.at.date, c.at.shift)})` : ''} — ${this.vagaLabel(c.vaga)}`).join('; ');
    if (conflicts.choques.length) {
      this.showToast(`⛔ Não dá: choque de horário com a escala atual de ${q.name}. Ex.: ${describe(conflicts.choques)}`, 'error');
      return;
    }
    const current = this.sched.qraVagas(q).map(v => this.vagaLabel(v)).join(' + ');
    const dobra = conflicts.dobras.length
      ? ` ⚠️ Atenção: vai dar DOBRA (turno colado) ${new Set(conflicts.dobras.map(c => c.date)).size} vez(es) nos próximos 28 dias. Ex.: ${describe(conflicts.dobras)}.`
      : ' Sem choque nem dobra nos próximos 28 dias.';
    const freed = conflicts.released.slice(0, 3)
      .map(r => `${slotLabel(r.date, r.shift)} em ${(this.sched.posts[r.vaga.postId] || { name: '?' }).name} já coberto por ${r.by}`);
    const freedTxt = freed.length ? ` ✅ Considerado: ${freed.join('; ')}.` : '';
    this.confirm(`${q.name} já está escalado em ${current}. É ESCALA DUPLA (vai acumular com ${this.vagaLabel(vaga)})?${dobra}${freedTxt}`, onYes);
    document.getElementById('confirm-yes').textContent = 'Sim, escala dupla';
  }

  async saveQra() {
    const s = this.sched;
    const editId = document.getElementById('qra-id').value;
    const postId = document.getElementById('qra-post').value;
    const key = document.getElementById('qra-turno').value;
    const name = document.getElementById('qra-name').value.trim();
    const phone = document.getElementById('qra-phone').value.trim();
    const allDays = [0, 1, 2, 3, 4, 5, 6];

    if (editId) {
      if (!name) return this.showToast('Informe o nome do QRA', 'error');
      const dup = s.qraByName(name);
      if (dup && dup.id !== editId) return this.showToast(`Já existe um QRA chamado "${dup.name}"`, 'error');
      this.hideModal('qra-modal');
      return this.write(this.firebase.update(`qras/${editId}`, { name, phone }), `QRA ${name} atualizado`);
    }

    if (postId) {
      const post = s.posts[postId];
      let vaga;
      if (key === '__custom__') {
        const dows = [...document.querySelectorAll('.custom-day-cb:checked')].map(cb => Number(cb.value));
        if (dows.length === 0) return this.showToast('Escolha pelo menos um dia da semana', 'error');
        vaga = { postId, turno: document.getElementById('qra-custom-shift').value, dows };
        const closed = dows.filter(d => !QRA_TURNOS[vaga.turno].shifts.some(sh =>
          shiftsOf(s.postShiftOn(post, addDays(weekStart(todayStr()), (d + 6) % 7))).includes(sh)));
        if (closed.length) return this.showToast(`O posto não opera nesse turno em: ${closed.map(d => DAY_NAMES[d]).join(', ')}`, 'error');
        if (s.slotHolder(postId, s.vagaKey(vaga))) return this.showToast('Já existe essa vaga com esses dias', 'error');
      } else {
        vaga = this.vagaForSlot(post, key);
        // One QRA per vaga: re-check against the latest data before writing
        const holder = s.slotHolder(postId, key);
        if (holder) return this.showToast(`Vaga já ocupada por ${holder.name}. Tire da vaga antes de colocar outro.`, 'error');
      }
      let pick = document.getElementById('qra-pick').value;
      if (pick === '__new__') {
        if (!name) return this.showToast('Informe o nome do QRA', 'error');
        const dup = s.qraByName(name);
        if (dup) pick = dup.id; // typed an existing QRA: treat as picking him
      }
      // Two people in the same shift of the same post is not allowed (e.g. todo dia + par)
      const lock = s.overlapHolders(vaga, pick !== '__new__' ? pick : null)[0];
      if (lock) return this.showToast(`🔒 Choque no posto: ${lock.qra.name} (${vagaTurnoLabel(lock.vaga)}) já trabalha nesse turno em ${slotLabel(lock.hits[0].date, lock.hits[0].shift)}. Tire ele antes.`, 'error');
      const label = `${post.name} · ${vagaTurnoLabel(vaga, true)}`;
      if (pick !== '__new__') {
        const q = s.qras[pick];
        const vagas = s.qraVagas(q);
        if (vagas.length === 0) {
          this.hideModal('qra-modal');
          return this.updateQraVagas(pick, cur => (cur.some(v => this.sameVaga(v, vaga)) ? cur : cur.concat([vaga])), `${q.name} na vaga ${label}`);
        }
        return this.confirmDupla(q, vaga, () => {
          this.hideModal('qra-modal');
          this.updateQraVagas(pick, cur => (cur.some(v => this.sameVaga(v, vaga)) ? cur : cur.concat([vaga])), `2× ${q.name} em escala dupla: ${label}`);
        });
      }
      const id = makeId(name);
      this.hideModal('qra-modal');
      return this.write(this.firebase.set(`qras/${id}`, { id, name, days: allDays, phone, ...this.vagasToStore([vaga]) }),
        `${name} na vaga ${label}${vaga.weekOf ? ' (só esse fim de semana)' : ''}`);
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
      const vagas = this.sched.qraVagas(q);
      const where = vagas.length ? vagas.map(v => (this.sched.posts[v.postId] || { name: '?' }).name).join(' + ') : 'reserva';
      return `<option value="${q.id}"${q.id === selectedId ? ' selected' : ''}>${vagas.length > 1 ? '2× ' : ''}${esc(q.name)} — ${esc(where)}</option>`;
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
    const duties = ['diurno', 'noturno'].flatMap(sh => this.sched.qraVagasOn(q, date, sh).map(v => ({ v, sh })));
    const shifts = duties.map(d => d.sh);
    const lines = [];
    if (this.sched.folgaOf(q.id, date)) lines.push(['warn', `${q.name} já tem folga lançada em ${dateLabel(date)}.`]);
    if (shifts.length === 0) {
      lines.push(['info', `${q.name} não teria empenho em ${dateLabel(date)} (posto fechado ou fora dos dias dele).`]);
    } else {
      lines.push(['info', `Deixará descoberto: ${duties.map(d => `${esc(this.vagaLabel(d.v))} (${SHIFT_LABEL[d.sh]})`).join(' e ')}. O posto vai alertar até alguém ser escalado para cobrir.`]);
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

  // New cobertura, or edit one (editId) — e.g. to define the QRA of a request "a definir"
  showCoberturaModal({ postId, date, turno, qraId, folgaId, editId } = {}) {
    const edit = editId ? this.sched.coberturas[editId] : null;
    this.cobEditId = edit ? edit.id : null;
    this.cobFolgaId = edit ? (edit.folgaId || null) : (folgaId || null);
    document.getElementById('cobertura-modal-title').textContent = edit
      ? (edit.pending ? '👤 Definir QRA da cobertura' : '✏️ Editar cobertura')
      : '🔁 QRA de Cobertura';
    this.fillPostSelect('cob-post', edit ? edit.postId : (postId || ''), '— selecione o posto —');
    document.getElementById('cob-date').value = edit ? edit.date : (date || todayStr());
    const picked = edit ? (edit.pending ? '' : (edit.qraId || '__temp__')) : (qraId || '');
    this.fillQraSelect('cob-qra', picked,
      '<option value="">— selecione quem vai cobrir —</option>' +
      '<option value="__pending__">⏳ Ainda não sei — só criar o alerta</option>' +
      '<option value="__temp__">✍️ QRA temporário (digitar nome)</option>');
    if (picked === '__temp__') document.getElementById('cob-qra').value = '__temp__';
    document.getElementById('cob-temp-name').value = edit && !edit.qraId && !edit.pending ? edit.qraName : '';
    document.getElementById('cob-note').value = edit ? (edit.note || '') : '';
    this.refreshCobTurnoOptions(edit ? `${edit.turno}|${edit.vaga || ''}` : turno);
    this.onCobQraChange();
    this.showModal('cobertura-modal');
  }

  // Turno options = vagas of the post working on that date that NEED someone: empty, titular on
  // folga, or with a request "a definir". Vagas with the titular present (or already covered) are
  // only listed when nothing is open. "Dia inteiro" only when both shifts are open.
  // Option value: "<shift>|<vaga key>".
  refreshCobTurnoOptions(preferred) {
    const s = this.sched;
    const post = s.posts[document.getElementById('cob-post').value];
    const date = document.getElementById('cob-date').value;
    const select = document.getElementById('cob-turno');
    const current = preferred || select.value;
    const editKey = this.cobEditId && s.coberturas[this.cobEditId] ? `${s.coberturas[this.cobEditId].turno}|${s.coberturas[this.cobEditId].vaga || ''}` : null;
    let options = [];
    let note = '';
    if (post && date) {
      const all = s.activeSlotsOn(post, date).map(({ slot, shift, holder }) => {
        const off = holder && s.folgaOf(holder.id, date);
        const covered = Object.values(s.coberturas).some(c => !c.pending && c.id !== this.cobEditId && c.postId === post.id
          && c.date === date && shiftsOf(c.turno).includes(shift) && (c.vaga ? c.vaga === slot : !holder || off));
        const requested = Object.values(s.coberturas).some(c => c.pending && c.id !== this.cobEditId && c.postId === post.id
          && c.date === date && shiftsOf(c.turno).includes(shift) && (!c.vaga || c.vaga === slot));
        // an empty vaga only needs someone if nobody else covers that shift that day (e.g. Jaguare:
        // "Diurno par" is empty but the chosen-days vagas already cover the diurno)
        const st = s.slotStatus(post, date, shift);
        const shiftTaken = st.presentes.length > 0 || st.coberturas.length > 0;
        const open = !covered && ((!holder && !shiftTaken) || off || requested);
        const vaga = s.parseVagaKey(post.id, slot);
        const who = holder ? `titular: ${holder.name}${off ? ' (de folga)' : ''}` : (shiftTaken ? 'turno já coberto' : 'vaga vazia');
        return { value: `${shift}|${slot}`, shift, open, label: `${vagaTurnoLabel(vaga)} — ${covered ? 'já coberta' : (requested && holder && !off ? `pedido a definir · ${who}` : who)}` };
      });
      options = all.filter(o => o.open || o.value === editKey);
      const openShifts = new Set(options.map(o => o.shift));
      if (s.postShiftOn(post, date) === '24h' && openShifts.has('diurno') && openShifts.has('noturno')) {
        options.push({ value: '24h|', label: '🔄 Dia inteiro (diurno + noturno)' });
      }
      if (options.length === 0 && all.length) {
        options = all;
        note = 'Nenhuma vaga aberta neste dia: todas têm titular presente ou já estão cobertas.';
      }
    }
    if (options.length === 0) {
      // Post closed that day (or nothing selected yet): plain shifts
      options = ['diurno', 'noturno', '24h'].map(t => ({ value: `${t}|`, label: SHIFT_LABEL[t] }));
    }
    select.innerHTML = options.map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('');
    // Accept "noturno" (shift only) or "noturno|noturno_par" (shift + vaga) as the preferred value
    const match = options.find(o => o.value === current) || options.find(o => current && o.value.split('|')[0] === String(current).split('|')[0]);
    select.value = match ? match.value : options[0].value;
    this.cobOptionsNote = note;
    this.fillCobQraSelect();
    this.updateCobCheck();
  }

  // "Quem vai cobrir": QRAs grouped by availability for the chosen post/date/turno,
  // considering fixed vagas, coberturas already placed and folgas.
  // 🟢 free · 🟡 free but double shift (dobra) · 🔴 busy in that shift
  fillCobQraSelect() {
    const s = this.sched;
    const sel = document.getElementById('cob-qra');
    const current = sel.value;
    const postId = document.getElementById('cob-post').value;
    const date = document.getElementById('cob-date').value;
    const turno = (document.getElementById('cob-turno').value || '').split('|')[0];
    const fixed = '<option value="">— selecione quem vai cobrir —</option>' +
      '<option value="__pending__">⏳ Ainda não sei — só criar o alerta</option>' +
      '<option value="__temp__">✍️ QRA temporário (digitar nome)</option>';
    const qras = Object.values(s.qras).sort((a, b) => a.name.localeCompare(b.name));
    const where = q => {
      const vagas = s.qraVagas(q);
      return vagas.length ? [...new Set(vagas.map(v => (s.posts[v.postId] || { name: '?' }).name))].join(' + ') : 'reserva';
    };
    let html = fixed;
    if (!postId || !date || !turno) {
      html += qras.map(q => `<option value="${q.id}">${esc(q.name)} — ${esc(where(q))}</option>`).join('');
    } else {
      const groups = { ok: [], dobra: [], busy: [] };
      qras.forEach(q => {
        const res = s.checkCobertura({ postId, date, turno, person: { qraId: q.id, name: q.name }, excludeCobId: this.cobEditId || undefined });
        const off = s.folgaOf(q.id, date) ? ' · 🏖️ de folga' : '';
        if (res.conflicts.length) {
          const emp = shiftsOf(turno).flatMap(sh => s.empenhosAt({ qraId: q.id }, date, sh, this.cobEditId || undefined))[0];
          const busyAt = emp ? (emp.postId === postId ? 'já é titular aqui' : `ocupado em ${(s.posts[emp.postId] || { name: '?' }).name}${emp.kind === 'cobertura' ? ' (cobertura)' : ''}`) : 'ocupado';
          groups.busy.push({ q, info: busyAt });
        } else if (res.warnings.some(w => w.startsWith('Dobra'))) {
          const side = res.warnings.filter(w => w.startsWith('Dobra')).map(w => (w.includes('ANTERIOR') ? 'turno antes' : 'turno depois'));
          groups.dobra.push({ q, info: `dobra (${[...new Set(side)].join(' e ')}) · ${where(q)}${off}` });
        } else {
          groups.ok.push({ q, info: `${where(q)}${off}` });
        }
      });
      const block = (list, label, cls, icon) => list.length
        ? `<optgroup label="${label} (${list.length})">${list.map(({ q, info }) => `<option value="${q.id}" class="${cls}">${icon} ${esc(q.name)} — ${esc(info)}</option>`).join('')}</optgroup>`
        : '';
      html += block(groups.ok, '🟢 Disponíveis', 'opt-free', '🟢')
        + block(groups.dobra, '🟡 Disponíveis com dobra', 'opt-dobra', '🟡')
        + block(groups.busy, '🔴 Ocupados nesse turno', 'opt-busy', '🔴');
    }
    sel.innerHTML = html;
    sel.value = [...sel.options].some(o => o.value === current) ? current : '';
  }

  onCobQraChange() {
    const sel = document.getElementById('cob-qra').value;
    document.getElementById('cob-temp-group').style.display = sel === '__temp__' ? 'block' : 'none';
    this.updateCobCheck();
  }

  readCobForm() {
    const qraSel = document.getElementById('cob-qra').value;
    const pending = qraSel === '__pending__';
    const qra = this.sched.qras[qraSel] || null;
    const [turno, vaga] = document.getElementById('cob-turno').value.split('|');
    return {
      postId: document.getElementById('cob-post').value,
      date: document.getElementById('cob-date').value,
      turno,
      vaga: vaga || '',
      pending,
      person: pending ? { qraId: null, name: '' }
        : { qraId: qra ? qra.id : null, name: qra ? qra.name : (qraSel === '__temp__' ? document.getElementById('cob-temp-name').value.trim() : '') },
      note: document.getElementById('cob-note').value.trim(),
      excludeCobId: this.cobEditId || undefined,
    };
  }

  updateCobCheck() {
    const form = this.readCobForm();
    const box = document.getElementById('cob-check');
    const btn = document.getElementById('save-cobertura');
    if (form.pending) {
      box.innerHTML = '<div class="check-warn">⏳ Será criado um <strong>alerta de cobertura a definir</strong>: o posto vai piscar com a data e o turno até você escolher o QRA (aba Folgas &amp; Coberturas → "👤 Definir QRA").</div>';
      box.className = 'info-box visible';
      btn.textContent = '⏳ Criar alerta de cobertura';
      btn.classList.remove('btn-warning');
      return;
    }
    const res = this.sched.checkCobertura(form);
    const lines = [
      ...res.conflicts.map(t => `<div class="check-conflict">⛔ ${esc(t)}</div>`),
      ...res.warnings.map(t => `<div class="check-warn">⚠️ ${esc(t)}</div>`),
      ...res.infos.map(t => `<div class="check-info">ℹ️ ${esc(t)}</div>`),
    ];
    if (this.cobOptionsNote) lines.unshift(`<div class="check-info">ℹ️ ${esc(this.cobOptionsNote)}</div>`);
    const ready = form.postId && form.date && form.person.name;
    if (ready && lines.length === (this.cobOptionsNote ? 1 : 0)) lines.push('<div class="check-ok">✅ Nenhum choque de empenho encontrado.</div>');
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
    if (!form.pending && !form.person.name) return this.showToast('Selecione quem vai cobrir, ou "⏳ Ainda não sei" para só criar o alerta', 'error');
    const res = form.pending ? { conflicts: [] } : this.sched.checkCobertura(form);
    if (res.conflicts.length > 0) {
      this.confirm(`Choque de empenho: ${res.conflicts.join(' ')} Salvar mesmo assim?`, () => this.persistCobertura(form));
      return;
    }
    await this.persistCobertura(form);
  }

  async persistCobertura(form) {
    const old = this.cobEditId ? this.sched.coberturas[this.cobEditId] : null;
    const id = old ? old.id : makeId(`cob_${form.person.name || 'a_definir'}_${form.date}`);
    const cob = {
      id, postId: form.postId, date: form.date, turno: form.turno, vaga: form.vaga,
      qraId: form.person.qraId || null, qraName: form.person.name, pending: form.pending,
      folgaId: this.cobFolgaId || null, note: form.note,
      createdAt: old ? (old.createdAt || new Date().toISOString()) : new Date().toISOString(),
    };
    const where = `${this.sched.posts[form.postId].name} em ${slotLabel(form.date, shiftsOf(form.turno)[0])}`;
    this.hideModal('cobertura-modal');
    await this.write(this.firebase.set(`coberturas/${id}`, cob),
      form.pending ? `⏳ Alerta criado: cobertura a definir — ${where}` : `🔁 ${form.person.name} cobrindo ${where}`);
  }

  confirmDeleteCobertura(cobId) {
    const c = this.sched.coberturas[cobId];
    if (!c) return;
    this.confirm(`Excluir a cobertura ${c.pending ? 'a definir' : `de ${c.qraName}`} em ${dateLabel(c.date)}?`, () =>
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
    document.getElementById('new-post-alert-diurno').value = p ? (p.alertTimeDiurno || DEFAULT_ALERT.diurno) : DEFAULT_ALERT.diurno;
    document.getElementById('new-post-alert-noturno').value = p ? (p.alertTimeNoturno || DEFAULT_ALERT.noturno) : DEFAULT_ALERT.noturno;
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
    const qras = Object.values(this.sched.qras).filter(q => this.sched.qraVagas(q).some(v => v.postId === postId));
    this.confirm(`Excluir o posto "${p.name}"?${qras.length ? ` ${qras.length} QRA(s) perdem a vaga deste posto (os que ficarem sem vaga vão para a reserva).` : ''}`, () => {
      const updates = { [`posts/${postId}`]: null };
      qras.forEach(q => {
        const rest = this.sched.qraVagas(q).filter(v => v.postId !== postId);
        Object.entries(this.vagasToStore(rest)).forEach(([k, v]) => { updates[`qras/${q.id}/${k}`] = v; });
      });
      this.write(this.firebase.update('/', updates), `Posto ${p.name} excluído`);
    });
  }

  // ===== Sound =====

  updateSoundButton() {
    const btn = document.getElementById('sound-btn');
    if (!btn) return;
    btn.textContent = this.sound.ready ? '🔔' : '🔕';
    btn.dataset.tooltip = this.sound.ready ? 'Som dos alertas: ligado (toque para desligar)' : 'Som dos alertas: desligado (toque para ligar)';
  }

  toggleSound() {
    if (this.sound.ready) {
      this.sound.setWanted(false);
      this.showToast('🔕 Som dos alertas desligado neste aparelho', 'info');
    } else {
      this.sound.setWanted(true);
      this.sound.unlock();
      setTimeout(() => { this.sound.alarm(); this.updateSoundButton(); }, 100);
      this.showToast('🔔 Som dos alertas ligado neste aparelho', 'success');
    }
    this.updateSoundButton();
  }

  soundBlockedHint() {
    if (this.soundHintShown) return;
    this.soundHintShown = true;
    this.showToast('🔕 Alerta sem som: toque em 🔕 (canto da tela) para ativar o som neste aparelho.', 'error');
  }

  // ===== WhatsApp export (same style as the QTI app) =====

  // Report: only coberturas still to resolve and coberturas already scheduled
  buildWhatsAppMessage() {
    const s = this.sched;
    const now = new Date();
    const line = '━━━━━━━━━━━━━━━━━━━━━';
    let msg = `🛡️ *FRONT SECURITY - Coberturas*\n📅 ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n${line}\n\n`;

    const reasonTxt = { pedido: 'QRA a definir', folga: 'folga sem cobertura', fds: 'fim de semana vago' };
    const pend = this.allPendings();
    msg += `🔴 *COBERTURAS A RESOLVER* (${pend.length})\n`;
    msg += pend.length
      ? pend.map(u => `  🔴 ${slotLabel(u.date, u.shift)} — ${u.post.name} (${reasonTxt[u.kind] || 'sem cobertura'})`).join('\n')
      : '  ✅ Nenhuma';
    msg += `\n\n`;

    const agendadas = Object.values(s.coberturas)
      .filter(c => !c.pending && s.posts[c.postId] && !slotEnded(s.posts[c.postId], c.date, shiftsOf(c.turno).slice(-1)[0] || 'diurno'))
      .sort((a, b) => (a.date + a.turno).localeCompare(b.date + b.turno));
    msg += `🟢 *COBERTURAS AGENDADAS* (${agendadas.length})\n`;
    msg += agendadas.length
      ? agendadas.map(c => `  🟢 ${slotLabel(c.date, shiftsOf(c.turno)[0])}${c.turno === '24h' ? ' + noturno' : ''} — ${s.posts[c.postId].name}: ${c.qraName}${c.qraId ? '' : ' (temporário)'}`).join('\n')
      : '  Nenhuma';
    msg += `\n${line}`;
    return msg;
  }

  exportWhatsApp() {
    if (!this.loaded.posts) return this.showToast('Aguarde carregar os dados', 'error');
    window.open(`https://wa.me/?text=${encodeURIComponent(this.buildWhatsAppMessage())}`, '_blank');
  }

  showExportModal() {
    if (!this.loaded.posts) return this.showToast('Aguarde carregar os dados', 'error');
    document.getElementById('export-date').value = todayStr();
    this.updateExportRange();
    this.showModal('export-modal');
  }

  updateExportRange() {
    const d = document.getElementById('export-date').value;
    document.getElementById('export-range').textContent = d
      ? `🌙 Noturno ${dateLabel(d)} (19h) → ☀️ Diurno ${dateLabel(addDays(d, 1))} (07h–19h)`
      : '';
  }

  // Who is at the post in one shift, considering coberturas. Titulares whose vaga is covered by
  // someone else are replaced by the cover. Returns { dot, text }.
  dutyLine(post, date, shift) {
    const s = this.sched;
    const st = s.slotStatus(post, date, shift);
    const covers = st.coberturas.map(c => {
      const covered = st.titulares.filter(q => s.qraVagasOn(q, date, shift, post.id).some(v => s.releaseCover(q, v, date, shift) === c) || s.folgaOf(q.id, date));
      return `${c.qraName}${c.qraId ? '' : ' (temporário)'}${covered.length ? ` — cobrindo ${covered.map(q => q.name).join(', ')}` : ''}`;
    });
    const stay = st.presentes.filter(q => !s.qraVagasOn(q, date, shift, post.id).some(v => s.releaseCover(q, v, date, shift)));
    const names = [...stay.map(q => q.name), ...covers];
    if (st.descoberto > 0) return { dot: '🔴', text: `SEM COBERTURA (${st.ausentes.map(q => q.name).join(', ')} de folga)${names.length ? ` · ${names.join(' · ')}` : ''}` };
    if (!names.length && st.pedidos.length) return { dot: '🔴', text: 'cobertura A DEFINIR' };
    if (!names.length) return { dot: '⚪', text: 'ninguém escalado' };
    return { dot: covers.length ? '🟡' : '🟢', text: names.join(' · ') };
  }

  // Escala: night of `date` followed by the day shift of the next date
  buildEscalaMessage(date) {
    const s = this.sched;
    const next = addDays(date, 1);
    const line = '━━━━━━━━━━━━━━━━━━━━━';
    const fmt = d => d.split('-').reverse().slice(0, 2).join('/');
    const block = (shift, day) => this.postsByCategory().map(([cat, posts]) => {
      const rows = posts.filter(p => s.postWorks(p, day, shift)).map(p => {
        const { dot, text } = this.dutyLine(p, day, shift);
        const entra = shift === 'noturno' && shiftWindow(p, day, 'noturno').start.getHours() !== 19 ? ' (entra 17h)' : '';
        return `  ${dot} ${p.name}${entra}: ${text}`;
      });
      return rows.length ? `*${cat}*\n${rows.join('\n')}` : '';
    }).filter(Boolean).join('\n\n');
    const dn = d => DAY_NAMES[parseDate(d).getDay()];
    let msg = `🛡️ *FRONT SECURITY — ESCALA*\n${line}\n\n`;
    msg += `🌙 *NOTURNO — ${dn(date)} ${fmt(date)}* (19h → 07h de ${fmt(next)})\n\n${block('noturno', date) || '  (nenhum posto)'}\n\n${line}\n\n`;
    msg += `☀️ *DIURNO — ${dn(next)} ${fmt(next)}* (07h → 19h)\n\n${block('diurno', next) || '  (nenhum posto)'}\n\n${line}\n`;
    msg += '🟢 titular · 🟡 cobertura · 🔴 sem cobertura · ⚪ ninguém escalado';
    return msg;
  }

  exportEscala() {
    const date = document.getElementById('export-date').value;
    if (!date) return this.showToast('Escolha a data do noturno', 'error');
    this.hideModal('export-modal');
    window.open(`https://wa.me/?text=${encodeURIComponent(this.buildEscalaMessage(date))}`, '_blank');
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
    document.getElementById('confirm-yes').textContent = 'Confirmar';
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

    on('sound-btn', 'click', () => this.toggleSound());
    // any first tap unlocks audio if the user wants sound on this device
    const firstTap = () => { if (this.sound.wanted) { this.sound.unlock(); setTimeout(() => this.updateSoundButton(), 100); } };
    document.addEventListener('pointerdown', firstTap, { once: true });
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
    on('whatsapp-btn', 'click', () => this.showExportModal());
    on('export-date', 'change', () => this.updateExportRange());
    on('export-escala-btn', 'click', () => this.exportEscala());
    on('export-cob-btn', 'click', () => { this.hideModal('export-modal'); this.exportWhatsApp(); });
    on('qra-search', 'input', () => this.renderQraList());
    this.qraFilter = {};
    document.querySelectorAll('#qra-filters .filter-group').forEach(group => {
      group.querySelectorAll('.filter-chip').forEach(chip => chip.addEventListener('click', () => {
        group.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c === chip));
        const v = chip.dataset.value;
        if (group.dataset.group === 'shift') this.qraFilter.shift = v;
        else this.qraFilter.parity = v === '' ? undefined : Number(v);
        this.renderQraList();
      }));
    });
    on('post-search', 'input', () => this.renderPosts());
    on('agenda-search', 'input', () => this.applyAgendaFilter());

    on('add-folga-btn', 'click', () => this.showFolgaModal(null));
    on('save-folga', 'click', () => this.saveFolga());
    on('folga-qra', 'change', () => this.updateFolgaInfo());
    on('folga-date', 'change', () => this.updateFolgaInfo());

    on('add-cobertura-btn', 'click', () => this.showCoberturaModal());
    on('save-cobertura', 'click', () => this.saveCobertura());
    on('cob-post', 'change', () => this.refreshCobTurnoOptions());
    on('cob-date', 'change', () => this.refreshCobTurnoOptions());
    on('cob-turno', 'change', () => { this.fillCobQraSelect(); this.updateCobCheck(); });
    on('cob-qra', 'change', () => this.onCobQraChange());
    on('cob-temp-name', 'input', () => this.updateCobCheck());
  }
}

// Exposed for tests (Node) without touching the DOM
if (typeof module !== 'undefined') {
  module.exports = { Schedule, shiftsOf, prevSlot, nextSlot, addDays, toDateStr, currentSlot, shiftWindow, slotEnded, slotAlarmActive, postHoursLabel, alternationParity };
} else {
  const app = new CoberturasApp();
  window.app = app;
  document.addEventListener('DOMContentLoaded', () => app.init());
}
