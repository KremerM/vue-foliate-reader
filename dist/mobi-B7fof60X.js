const T = (i) => {
  if (!i) return "";
  const t = document.createElement("textarea");
  return t.innerHTML = i, t.value;
}, E = {
  XML: "application/xml",
  XHTML: "application/xhtml+xml",
  HTML: "text/html",
  CSS: "text/css",
  SVG: "image/svg+xml"
}, J = {
  name: [0, 32, "string"],
  type: [60, 4, "string"],
  creator: [64, 4, "string"],
  numRecords: [76, 2, "uint"]
}, Q = {
  compression: [0, 2, "uint"],
  numTextRecords: [8, 2, "uint"],
  recordSize: [10, 2, "uint"],
  encryption: [12, 2, "uint"]
}, tt = {
  magic: [16, 4, "string"],
  length: [20, 4, "uint"],
  type: [24, 4, "uint"],
  encoding: [28, 4, "uint"],
  uid: [32, 4, "uint"],
  version: [36, 4, "uint"],
  titleOffset: [84, 4, "uint"],
  titleLength: [88, 4, "uint"],
  localeRegion: [94, 1, "uint"],
  localeLanguage: [95, 1, "uint"],
  resourceStart: [108, 4, "uint"],
  huffcdic: [112, 4, "uint"],
  numHuffcdic: [116, 4, "uint"],
  exthFlag: [128, 4, "uint"],
  trailingFlags: [240, 4, "uint"],
  indx: [244, 4, "uint"]
}, et = {
  resourceStart: [108, 4, "uint"],
  fdst: [192, 4, "uint"],
  numFdst: [196, 4, "uint"],
  frag: [248, 4, "uint"],
  skel: [252, 4, "uint"],
  guide: [260, 4, "uint"]
}, st = {
  magic: [0, 4, "string"],
  length: [4, 4, "uint"],
  count: [8, 4, "uint"]
}, G = {
  magic: [0, 4, "string"],
  length: [4, 4, "uint"],
  type: [8, 4, "uint"],
  idxt: [20, 4, "uint"],
  numRecords: [24, 4, "uint"],
  encoding: [28, 4, "uint"],
  language: [32, 4, "uint"],
  total: [36, 4, "uint"],
  ordt: [40, 4, "uint"],
  ligt: [44, 4, "uint"],
  numLigt: [48, 4, "uint"],
  numCncx: [52, 4, "uint"]
}, nt = {
  magic: [0, 4, "string"],
  length: [4, 4, "uint"],
  numControlBytes: [8, 4, "uint"]
}, rt = {
  magic: [0, 4, "string"],
  offset1: [8, 4, "uint"],
  offset2: [12, 4, "uint"]
}, it = {
  magic: [0, 4, "string"],
  length: [4, 4, "uint"],
  numEntries: [8, 4, "uint"],
  codeLength: [12, 4, "uint"]
}, ot = {
  magic: [0, 4, "string"],
  numEntries: [8, 4, "uint"]
}, at = {
  flags: [8, 4, "uint"],
  dataStart: [12, 4, "uint"],
  keyLength: [16, 4, "uint"],
  keyStart: [20, 4, "uint"]
}, ct = {
  1252: "windows-1252",
  65001: "utf-8"
}, j = {
  100: ["creator", "string", !0],
  101: ["publisher"],
  103: ["description"],
  104: ["isbn"],
  105: ["subject", "string", !0],
  106: ["date"],
  108: ["contributor", "string", !0],
  109: ["rights"],
  110: ["subjectCode", "string", !0],
  112: ["source", "string", !0],
  113: ["asin"],
  121: ["boundary", "uint"],
  122: ["fixedLayout"],
  125: ["numResources", "uint"],
  126: ["originalResolution"],
  127: ["zeroGutter"],
  128: ["zeroMargin"],
  129: ["coverURI"],
  132: ["regionMagnification"],
  201: ["coverOffset", "uint"],
  202: ["thumbnailOffset", "uint"],
  503: ["title"],
  524: ["language", "string", !0],
  527: ["pageProgressionDirection"]
}, lt = {
  1: [
    "ar",
    "ar-SA",
    "ar-IQ",
    "ar-EG",
    "ar-LY",
    "ar-DZ",
    "ar-MA",
    "ar-TN",
    "ar-OM",
    "ar-YE",
    "ar-SY",
    "ar-JO",
    "ar-LB",
    "ar-KW",
    "ar-AE",
    "ar-BH",
    "ar-QA"
  ],
  2: ["bg"],
  3: ["ca"],
  4: ["zh", "zh-TW", "zh-CN", "zh-HK", "zh-SG"],
  5: ["cs"],
  6: ["da"],
  7: ["de", "de-DE", "de-CH", "de-AT", "de-LU", "de-LI"],
  8: ["el"],
  9: [
    "en",
    "en-US",
    "en-GB",
    "en-AU",
    "en-CA",
    "en-NZ",
    "en-IE",
    "en-ZA",
    "en-JM",
    null,
    "en-BZ",
    "en-TT",
    "en-ZW",
    "en-PH"
  ],
  10: [
    "es",
    "es-ES",
    "es-MX",
    null,
    "es-GT",
    "es-CR",
    "es-PA",
    "es-DO",
    "es-VE",
    "es-CO",
    "es-PE",
    "es-AR",
    "es-EC",
    "es-CL",
    "es-UY",
    "es-PY",
    "es-BO",
    "es-SV",
    "es-HN",
    "es-NI",
    "es-PR"
  ],
  11: ["fi"],
  12: ["fr", "fr-FR", "fr-BE", "fr-CA", "fr-CH", "fr-LU", "fr-MC"],
  13: ["he"],
  14: ["hu"],
  15: ["is"],
  16: ["it", "it-IT", "it-CH"],
  17: ["ja"],
  18: ["ko"],
  19: ["nl", "nl-NL", "nl-BE"],
  20: ["no", "nb", "nn"],
  21: ["pl"],
  22: ["pt", "pt-BR", "pt-PT"],
  23: ["rm"],
  24: ["ro"],
  25: ["ru"],
  26: ["hr", null, "sr"],
  27: ["sk"],
  28: ["sq"],
  29: ["sv", "sv-SE", "sv-FI"],
  30: ["th"],
  31: ["tr"],
  32: ["ur"],
  33: ["id"],
  34: ["uk"],
  35: ["be"],
  36: ["sl"],
  37: ["et"],
  38: ["lv"],
  39: ["lt"],
  41: ["fa"],
  42: ["vi"],
  43: ["hy"],
  44: ["az"],
  45: ["eu"],
  46: ["hsb"],
  47: ["mk"],
  48: ["st"],
  49: ["ts"],
  50: ["tn"],
  52: ["xh"],
  53: ["zu"],
  54: ["af"],
  55: ["ka"],
  56: ["fo"],
  57: ["hi"],
  58: ["mt"],
  59: ["se"],
  62: ["ms"],
  63: ["kk"],
  65: ["sw"],
  67: ["uz", null, "uz-UZ"],
  68: ["tt"],
  69: ["bn"],
  70: ["pa"],
  71: ["gu"],
  72: ["or"],
  73: ["ta"],
  74: ["te"],
  75: ["kn"],
  76: ["ml"],
  77: ["as"],
  78: ["mr"],
  79: ["sa"],
  82: ["cy", "cy-GB"],
  83: ["gl", "gl-ES"],
  87: ["kok"],
  97: ["ne"],
  98: ["fy"]
}, _ = (i, t) => {
  const e = new i.constructor(i.length + t.length);
  return e.set(i), e.set(t, i.length), e;
}, Y = (i, t, e) => {
  const s = new i.constructor(i.length + t.length + e.length);
  return s.set(i), s.set(t, i.length), s.set(e, i.length + t.length), s;
}, ut = new TextDecoder(), O = (i) => ut.decode(i), y = (i) => {
  if (!i) return;
  const t = i.byteLength, e = t === 4 ? "getUint32" : t === 2 ? "getUint16" : "getUint8";
  return new DataView(i)[e](0);
}, R = (i, t) => Object.fromEntries(Array.from(Object.entries(i)).map(([e, [s, o, n]]) => [
  e,
  (n === "string" ? O : y)(t.slice(s, s + o))
])), N = (i) => new TextDecoder(ct[i]), M = (i, t = 0) => {
  let e = 0, s = 0;
  for (const o of i.subarray(t, t + 4))
    if (e = e << 7 | (o & 127) >>> 0, s++, o & 128) break;
  return { value: e, length: s };
}, ht = (i) => {
  let t = 0;
  for (const e of i.subarray(-4))
    e & 128 && (t = 0), t = t << 7 | e & 127;
  return t;
}, Z = (i) => {
  let t = 0;
  for (; i > 0; i = i >> 1) (i & 1) === 1 && t++;
  return t;
}, ft = (i) => {
  let t = 0;
  for (; !(i & 1); ) i = i >> 1, t++;
  return t;
}, dt = (i) => {
  let t = [];
  for (let e = 0; e < i.length; e++) {
    const s = i[e];
    if (s === 0) t.push(0);
    else if (s <= 8)
      for (const o of i.subarray(e + 1, (e += s) + 1))
        t.push(o);
    else if (s <= 127) t.push(s);
    else if (s <= 191) {
      const o = s << 8 | i[e++ + 1], n = (o & 16383) >>> 3, r = (o & 7) + 3;
      for (let c = 0; c < r; c++)
        t.push(t[t.length - n]);
    } else t.push(32, s ^ 128);
  }
  return Uint8Array.from(t);
}, gt = (i, t) => {
  const e = t >> 3, s = t + 32, o = s >> 3;
  let n = 0n;
  for (let r = e; r <= o; r++)
    n = n << 8n | BigInt(i[r] ?? 0);
  return n >> 8n - BigInt(s & 7) & 0xffffffffn;
}, mt = async (i, t) => {
  const e = await t(i.huffcdic), { magic: s, offset1: o, offset2: n } = R(rt, e);
  if (s !== "HUFF") throw new Error("Invalid HUFF record");
  const r = Array.from({ length: 256 }, (a, f) => o + f * 4).map((a) => y(e.slice(a, a + 4))).map((a) => [a & 128, a & 31, a >>> 8]), c = [null].concat(Array.from({ length: 32 }, (a, f) => n + f * 8).map((a) => [
    y(e.slice(a, a + 4)),
    y(e.slice(a + 4, a + 8))
  ])), u = [];
  for (let a = 1; a < i.numHuffcdic; a++) {
    const f = await t(i.huffcdic + a), h = R(it, f);
    if (h.magic !== "CDIC") throw new Error("Invalid CDIC record");
    const g = Math.min(1 << h.codeLength, h.numEntries - u.length), d = f.slice(h.length);
    for (let m = 0; m < g; m++) {
      const p = y(d.slice(m * 2, m * 2 + 2)), b = y(d.slice(p, p + 2)), w = b & 32767, x = b & 32768, C = new Uint8Array(
        d.slice(p + 2, p + 2 + w)
      );
      u.push([C, x]);
    }
  }
  const l = (a) => {
    let f = new Uint8Array();
    const h = a.byteLength * 8;
    for (let g = 0; g < h; ) {
      const d = Number(gt(a, g));
      let [m, p, b] = r[d >>> 24];
      if (!m) {
        for (; d >>> 32 - p < c[p][0]; )
          p += 1;
        b = c[p][1];
      }
      if ((g += p) > h) break;
      const w = b - (d >>> 32 - p);
      let [x, C] = u[w];
      C || (x = l(x), u[w] = [x, !0]), f = _(f, x);
    }
    return f;
  };
  return l;
}, H = async (i, t) => {
  const e = await t(i), s = R(G, e);
  if (s.magic !== "INDX") throw new Error("Invalid INDX record");
  const o = N(s.encoding), n = e.slice(s.length), r = R(nt, n);
  if (r.magic !== "TAGX") throw new Error("Invalid TAGX section");
  const c = (r.length - 12) / 4, u = Array.from({ length: c }, (h, g) => new Uint8Array(n.slice(12 + g * 4, 12 + g * 4 + 4))), l = {};
  let a = 0;
  for (let h = 0; h < s.numCncx; h++) {
    const g = await t(i + s.numRecords + h + 1), d = new Uint8Array(g);
    for (let m = 0; m < d.byteLength; ) {
      const p = m, { value: b, length: w } = M(d, m);
      m += w;
      const x = g.slice(m, m + b);
      m += b, l[a + p] = o.decode(x);
    }
    a += 65536;
  }
  const f = [];
  for (let h = 0; h < s.numRecords; h++) {
    const g = await t(i + 1 + h), d = new Uint8Array(g), m = R(G, g);
    if (m.magic !== "INDX") throw new Error("Invalid INDX record");
    for (let p = 0; p < m.numRecords; p++) {
      const b = m.idxt + 4 + 2 * p, w = y(g.slice(b, b + 2)), x = y(g.slice(w, w + 1)), C = O(g.slice(w + 1, w + 1 + x)), U = [], z = w + 1 + x;
      let X = 0, A = z + r.numControlBytes;
      for (const [D, L, v, F] of u) {
        if (F & 1) {
          X++;
          continue;
        }
        const I = z + X, S = y(g.slice(I, I + 1)) & v;
        if (S === v)
          if (Z(v) > 1) {
            const { value: k, length: B } = M(d, A);
            U.push([D, null, k, L]), A += B;
          } else U.push([D, 1, null, L]);
        else U.push([D, S >> ft(v), null, L]);
      }
      const P = {};
      for (const [D, L, v, F] of U) {
        const I = [];
        if (L != null)
          for (let S = 0; S < L * F; S++) {
            const { value: k, length: B } = M(d, A);
            I.push(k), A += B;
          }
        else {
          let S = 0;
          for (; S < v; ) {
            const { value: k, length: B } = M(d, A);
            I.push(k), A += B, S += B;
          }
        }
        P[D] = I;
      }
      f.push({ name: C, tagMap: P });
    }
  }
  return { table: f, cncx: l };
}, pt = async (i, t) => {
  const { table: e, cncx: s } = await H(i, t), o = e.map(({ tagMap: r }, c) => ({
    index: c,
    offset: r[1]?.[0],
    size: r[2]?.[0],
    label: s[r[3]] ?? "",
    headingLevel: r[4]?.[0],
    pos: r[6],
    parent: r[21]?.[0],
    firstChild: r[22]?.[0],
    lastChild: r[23]?.[0]
  })), n = (r) => (r.firstChild == null || (r.children = o.filter((c) => c.parent === r.index).map(n)), r);
  return o.filter((r) => r.headingLevel === 0).map(n);
}, bt = (i, t) => {
  const { magic: e, count: s } = R(st, i);
  if (e !== "EXTH") throw new Error("Invalid EXTH header");
  const o = N(t), n = {};
  let r = 12;
  for (let c = 0; c < s; c++) {
    const u = y(i.slice(r, r + 4)), l = y(i.slice(r + 4, r + 8));
    if (u in j) {
      const [a, f, h] = j[u], g = i.slice(r + 8, r + l), d = f === "uint" ? y(g) : o.decode(g);
      h ? (n[a] ??= [], n[a].push(d)) : n[a] = d;
    }
    r += l;
  }
  return n;
}, wt = async (i, t) => {
  const { flags: e, dataStart: s, keyLength: o, keyStart: n } = R(at, i), r = new Uint8Array(i.slice(s));
  if (e & 2) {
    const u = o === 16 ? 1024 : 1040, l = new Uint8Array(i.slice(n, n + o)), a = Math.min(u, r.length);
    for (var c = 0; c < a; c++) r[c] = r[c] ^ l[c % l.length];
  }
  if (e & 1) try {
    return await t(r);
  } catch (u) {
    console.warn(u), console.warn("Failed to decompress font");
  }
  return r;
}, Bt = async (i) => O(await i.slice(60, 68).arrayBuffer()) === "BOOKMOBI";
class yt {
  #t;
  #e;
  pdb;
  async open(t) {
    this.#t = t;
    const e = R(J, await t.slice(0, 78).arrayBuffer());
    this.pdb = e;
    const s = await t.slice(78, 78 + e.numRecords * 8).arrayBuffer();
    this.#e = Array.from(
      { length: e.numRecords },
      (o, n) => y(s.slice(n * 8, n * 8 + 4))
    ).map((o, n, r) => [o, r[n + 1]]);
  }
  loadRecord(t) {
    const e = this.#e[t];
    if (!e) throw new RangeError("Record index out of bounds");
    return this.#t.slice(...e).arrayBuffer();
  }
  async loadMagic(t) {
    const e = this.#e[t][0];
    return O(await this.#t.slice(e, e + 4).arrayBuffer());
  }
}
class Ct extends yt {
  #t = 0;
  #e;
  #n;
  #s;
  #r;
  #i;
  constructor({ unzlib: t }) {
    super(), this.unzlib = t;
  }
  async open(t) {
    await super.open(t), this.headers = this.#o(await super.loadRecord(0)), this.#e = this.headers.mobi.resourceStart;
    let e = this.headers.mobi.version >= 8;
    if (!e) {
      const s = this.headers.exth?.boundary;
      if (s < 4294967295) try {
        this.headers = this.#o(await super.loadRecord(s)), this.#t = s, e = !0;
      } catch (o) {
        console.warn(o), console.warn("Failed to open KF8; falling back to MOBI");
      }
    }
    return await this.#a(), e ? new It(this).init() : new St(this).init();
  }
  #o(t) {
    const e = R(Q, t), s = R(tt, t);
    if (s.magic !== "MOBI") throw new Error("Missing MOBI header");
    const { titleOffset: o, titleLength: n, localeLanguage: r, localeRegion: c } = s;
    s.title = t.slice(o, o + n);
    const u = lt[r];
    s.language = u?.[c >> 2] ?? u?.[0];
    const l = s.exthFlag & 64 ? bt(t.slice(s.length + 16), s.encoding) : null, a = s.version >= 8 ? R(et, t) : null;
    return { palmdoc: e, mobi: s, exth: l, kf8: a };
  }
  async #a() {
    const { palmdoc: t, mobi: e } = this.headers;
    this.#n = N(e.encoding), this.#s = new TextEncoder();
    const { compression: s } = t;
    if (this.#r = s === 1 ? (c) => c : s === 2 ? dt : s === 17480 ? await mt(e, this.loadRecord.bind(this)) : null, !this.#r) throw new Error("Unknown compression type");
    const { trailingFlags: o } = e, n = o & 1, r = Z(o >>> 1);
    this.#i = (c) => {
      for (let u = 0; u < r; u++) {
        const l = ht(c);
        c = c.subarray(0, -l);
      }
      if (n) {
        const u = (c[c.length - 1] & 3) + 1;
        c = c.subarray(0, -u);
      }
      return c;
    };
  }
  decode(...t) {
    return this.#n.decode(...t);
  }
  encode(...t) {
    return this.#s.encode(...t);
  }
  loadRecord(t) {
    return super.loadRecord(this.#t + t);
  }
  loadMagic(t) {
    return super.loadMagic(this.#t + t);
  }
  loadText(t) {
    return this.loadRecord(t + 1).then((e) => new Uint8Array(e)).then(this.#i).then(this.#r);
  }
  async loadResource(t) {
    const e = await super.loadRecord(this.#e + t), s = O(e.slice(0, 4));
    return s === "FONT" ? wt(e, this.unzlib) : s === "VIDE" || s === "AUDI" ? e.slice(12) : e;
  }
  getNCX() {
    const t = this.headers.mobi.indx;
    if (t < 4294967295) return pt(t, this.loadRecord.bind(this));
  }
  getMetadata() {
    const { mobi: t, exth: e } = this.headers;
    return {
      identifier: t.uid.toString(),
      title: T(e?.title || this.decode(t.title)),
      author: e?.creator?.map(T),
      publisher: T(e?.publisher),
      language: e?.language ?? t.language,
      published: e?.date,
      description: T(e?.description),
      subject: e?.subject?.map(T),
      rights: T(e?.rights),
      contributor: e?.contributor
    };
  }
  async getCover() {
    const { exth: t } = this.headers, e = t?.coverOffset < 4294967295 ? t?.coverOffset : t?.thumbnailOffset < 4294967295 ? t?.thumbnailOffset : null;
    if (e != null) {
      const s = await this.loadResource(e);
      return new Blob([s]);
    }
  }
}
const $ = /<\s*(?:mbp:)?pagebreak[^>]*>/gi, Rt = /<[^<>]+filepos=['"]{0,1}(\d+)[^<>]*>/gi, xt = (i) => {
  let t = 0;
  for (; i; ) {
    const e = i.parentElement;
    if (e) {
      const s = e.tagName.toLowerCase();
      s === "p" ? t += 1.5 : s === "blockquote" && (t += 2);
    }
    i = e;
  }
  return t;
};
function Et(i) {
  let e = "";
  for (let s = 0; s < i.length; s += 32768)
    e += String.fromCharCode.apply(null, i.subarray(s, s + 32768));
  return e;
}
class St {
  parser = new DOMParser();
  serializer = new XMLSerializer();
  #t = /* @__PURE__ */ new Map();
  #e = /* @__PURE__ */ new Map();
  #n = /* @__PURE__ */ new Map();
  #s;
  #r = [];
  #i = E.HTML;
  constructor(t) {
    this.mobi = t;
  }
  async init() {
    const t = [];
    for (let n = 0; n < this.mobi.headers.palmdoc.numTextRecords; n++) {
      const r = await this.mobi.loadText(n);
      t.push(r);
    }
    const e = t.reduce((n, r) => n + r.byteLength, 0), s = new Uint8Array(e);
    t.reduce((n, r) => (s.set(new Uint8Array(r), n), n + r.byteLength), 0);
    const o = Et(s);
    this.#s = [0].concat(Array.from(o.matchAll($), (n) => n.index)).map((n, r, c) => {
      const u = c[r + 1] ?? s.length;
      return { book: this, raw: s.subarray(n, u) };
    }).map((n, r, c) => (n.start = c[r - 1]?.end ?? 0, n.end = n.start + n.raw.byteLength, n)), this.sections = this.#s.map((n, r) => ({
      id: r,
      load: () => this.loadSection(n),
      createDocument: () => this.createDocument(n),
      size: n.end - n.start
    }));
    try {
      this.landmarks = await this.getGuide();
      const n = this.landmarks.find(({ type: r }) => r?.includes("toc"))?.href;
      if (n) {
        const { index: r } = this.resolveHref(n), c = await this.sections[r].createDocument();
        let u, l = 0, a = 0;
        const f = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
        this.toc = Array.from(c.querySelectorAll("a[filepos]")).reduce((g, d) => {
          const m = xt(d), p = {
            label: d.innerText?.trim() ?? "",
            href: `filepos:${d.getAttribute("filepos")}`
          }, b = m > a ? l + 1 : m === a ? l : f.get(m) ?? Math.max(0, l - 1);
          if (b > l)
            u ? (u.subitems ??= [], u.subitems.push(p), h.set(b, u)) : g.push(p);
          else {
            const w = h.get(b);
            w ? w.subitems.push(p) : g.push(p);
          }
          return u = p, l = b, a = m, f.set(m, b), g;
        }, []);
      }
    } catch (n) {
      console.warn(n);
    }
    return this.#r = [...new Set(
      Array.from(o.matchAll(Rt), (n) => n[1])
    )].map((n) => ({ filepos: n, number: Number(n) })).sort((n, r) => n.number - r.number), this.metadata = this.mobi.getMetadata(), this.getCover = this.mobi.getCover.bind(this.mobi), this;
  }
  async getGuide() {
    const t = await this.createDocument(this.#s[0]);
    return Array.from(t.getElementsByTagName("reference"), (e) => ({
      label: e.getAttribute("title"),
      type: e.getAttribute("type")?.split(/\s/),
      href: `filepos:${e.getAttribute("filepos")}`
    }));
  }
  async loadResource(t) {
    if (this.#t.has(t)) return this.#t.get(t);
    const e = await this.mobi.loadResource(t), s = URL.createObjectURL(new Blob([e]));
    return this.#t.set(t, s), s;
  }
  async loadRecindex(t) {
    return this.loadResource(Number(t) - 1);
  }
  async replaceResources(t) {
    for (const e of t.querySelectorAll("img[recindex]")) {
      const s = e.getAttribute("recindex");
      try {
        e.src = await this.loadRecindex(s);
      } catch {
        console.warn(`Failed to load image ${s}`);
      }
    }
    for (const e of t.querySelectorAll("[mediarecindex]")) {
      const s = e.getAttribute("mediarecindex"), o = e.getAttribute("recindex");
      try {
        e.src = await this.loadRecindex(s), o && (e.poster = await this.loadRecindex(o));
      } catch {
        console.warn(`Failed to load media ${s}`);
      }
    }
    for (const e of t.querySelectorAll("[filepos]")) {
      const s = e.getAttribute("filepos");
      e.href = `filepos:${s}`;
    }
  }
  async loadText(t) {
    if (this.#e.has(t)) return this.#e.get(t);
    const { raw: e } = t, s = this.#r.filter(({ number: r }) => r >= t.start && r < t.end).map((r) => ({ ...r, offset: r.number - t.start }));
    let o = e;
    s.length && (o = e.subarray(0, s[0].offset), s.forEach(({ filepos: r, offset: c }, u) => {
      const l = s[u + 1], a = this.mobi.encode(`<a id="filepos${r}"></a>`);
      o = Y(o, a, e.subarray(c, l?.offset));
    }));
    const n = this.mobi.decode(o).replaceAll($, "");
    return this.#e.set(t, n), n;
  }
  async createDocument(t) {
    const e = await this.loadText(t);
    return this.parser.parseFromString(e, this.#i);
  }
  async loadSection(t) {
    if (this.#n.has(t)) return this.#n.get(t);
    const e = await this.createDocument(t), s = e.createElement("style");
    e.head.append(s), s.append(e.createTextNode(`blockquote {
            margin-block-start: 0;
            margin-block-end: 0;
            margin-inline-start: 1em;
            margin-inline-end: 0;
        }`)), await this.replaceResources(e);
    const o = this.serializer.serializeToString(e), n = URL.createObjectURL(new Blob([o], { type: this.#i }));
    return this.#n.set(t, n), n;
  }
  resolveHref(t) {
    const e = t.match(/filepos:(.*)/)[1], s = Number(e);
    return { index: this.#s.findIndex((r) => r.end > s), anchor: (r) => r.getElementById(`filepos${e}`) };
  }
  splitTOCHref(t) {
    const e = t.match(/filepos:(.*)/)[1], s = Number(e);
    return [this.#s.findIndex((n) => n.end > s), `filepos${e}`];
  }
  getTOCFragment(t, e) {
    return t.getElementById(e);
  }
  isExternal(t) {
    return /^(?!blob|filepos)\w+:/i.test(t);
  }
  destroy() {
    for (const t of this.#t.values()) URL.revokeObjectURL(t);
    for (const t of this.#n.values()) URL.revokeObjectURL(t);
  }
}
const W = /kindle:(flow|embed):(\w+)(?:\?mime=(\w+\/[-+.\w]+))?/, Tt = /kindle:pos:fid:(\w+):off:(\w+)/, At = (i) => {
  const [t, e, s] = i.match(W).slice(1);
  return { resourceType: t, id: parseInt(e, 32), type: s };
}, q = (i) => {
  const [t, e] = i.match(Tt).slice(1);
  return { fid: parseInt(t, 32), off: parseInt(e, 32) };
}, V = (i = 0, t = 0) => `kindle:pos:fid:${i.toString(32).toUpperCase().padStart(4, "0")}:off:${t.toString(32).toUpperCase().padStart(10, "0")}`, K = (i) => {
  const t = i.match(/\s(id|name|aid)\s*=\s*['"]([^'"]*)['"]/i);
  if (!t) return;
  const [, e, s] = t;
  return `[${e}="${CSS.escape(s)}"]`;
}, Lt = async (i, t, e) => {
  const s = [];
  i.replace(t, (...n) => (s.push(n), null));
  const o = [];
  for (const n of s) o.push(await e(...n));
  return i.replace(t, () => o.shift());
}, vt = (i) => {
  for (const t of i) {
    if (t === "page-spread-left" || t === "rendition:page-spread-left")
      return "left";
    if (t === "page-spread-right" || t === "rendition:page-spread-right")
      return "right";
    if (t === "rendition:page-spread-center") return "center";
  }
};
class It {
  parser = new DOMParser();
  serializer = new XMLSerializer();
  transformTarget = new EventTarget();
  #t = /* @__PURE__ */ new Map();
  #e = /* @__PURE__ */ new Map();
  #n = /* @__PURE__ */ new Map();
  #s = {};
  #r;
  #i;
  #o = new Uint8Array();
  #a = new Uint8Array();
  #h = -1;
  #f = -1;
  #c = E.XHTML;
  #l = /* @__PURE__ */ new Map();
  constructor(t) {
    this.mobi = t;
  }
  async init() {
    const t = this.mobi.loadRecord.bind(this.mobi), { kf8: e } = this.mobi.headers;
    try {
      const l = await t(e.fdst), a = R(ot, l);
      if (a.magic !== "FDST") throw new Error("Missing FDST record");
      const f = Array.from(
        { length: a.numEntries },
        (h, g) => 12 + g * 8
      ).map((h) => [
        y(l.slice(h, h + 4)),
        y(l.slice(h + 4, h + 8))
      ]);
      this.#s.fdstTable = f, this.#i = f[f.length - 1][1];
    } catch {
    }
    const s = (await H(e.skel, t)).table.map(({ name: l, tagMap: a }, f) => ({
      index: f,
      name: l,
      numFrag: a[1][0],
      offset: a[6][0],
      length: a[6][1]
    })), o = await H(e.frag, t), n = o.table.map(({ name: l, tagMap: a }) => ({
      insertOffset: parseInt(l),
      selector: o.cncx[a[2][0]],
      index: a[4][0],
      offset: a[6][0],
      length: a[6][1]
    }));
    this.#s.skelTable = s, this.#s.fragTable = n, this.#r = s.reduce((l, a) => {
      const f = l[l.length - 1], h = f?.fragEnd ?? 0, g = h + a.numFrag, d = n.slice(h, g), m = a.length + d.map((b) => b.length).reduce((b, w) => b + w), p = (f?.totalLength ?? 0) + m;
      return l.concat({ skel: a, frags: d, fragEnd: g, length: m, totalLength: p });
    }, []);
    const r = await this.getResourcesByMagic(["RESC", "PAGE"]), c = /* @__PURE__ */ new Map();
    if (r.RESC) {
      const l = await this.mobi.loadRecord(r.RESC), a = this.mobi.decode(l.slice(16)).replace(/\0/g, ""), f = a.search(/\?>/), h = `<package>${a.slice(f)}</package>`, g = this.parser.parseFromString(h, E.XML);
      for (const d of g.querySelectorAll("spine > itemref")) {
        const m = parseInt(d.getAttribute("skelid"));
        c.set(m, vt(
          d.getAttribute("properties")?.split(" ") ?? []
        ));
      }
    }
    this.sections = this.#r.map((l, a) => l.frags.length ? {
      id: a,
      load: () => this.loadSection(l),
      createDocument: () => this.createDocument(l),
      size: l.length,
      pageSpread: c.get(a)
    } : { linear: "no" });
    try {
      const l = await this.mobi.getNCX(), a = ({ label: f, pos: h, children: g }) => {
        const [d, m] = h, p = V(d, m), b = this.#e.get(d);
        return b ? b.push(m) : this.#e.set(d, [m]), { label: T(f), href: p, subitems: g?.map(a) };
      };
      this.toc = l?.map(a), this.landmarks = await this.getGuide();
    } catch (l) {
      console.warn(l);
    }
    const { exth: u } = this.mobi.headers;
    return this.dir = u.pageProgressionDirection, this.rendition = {
      layout: u.fixedLayout === "true" ? "pre-paginated" : "reflowable",
      viewport: Object.fromEntries(u.originalResolution?.split("x")?.slice(0, 2)?.map((l, a) => [a ? "height" : "width", l]) ?? [])
    }, this.metadata = this.mobi.getMetadata(), this.getCover = this.mobi.getCover.bind(this.mobi), this;
  }
  // is this really the only way of getting to RESC, PAGE, etc.?
  async getResourcesByMagic(t) {
    const e = {}, s = this.mobi.headers.kf8.resourceStart, o = this.mobi.pdb.numRecords;
    for (let n = s; n < o; n++)
      try {
        const r = await this.mobi.loadMagic(n), c = t.find((u) => u === r);
        c && (e[c] = n);
      } catch {
      }
    return e;
  }
  async getGuide() {
    const t = this.mobi.headers.kf8.guide;
    if (t < 4294967295) {
      const e = this.mobi.loadRecord.bind(this.mobi), { table: s, cncx: o } = await H(t, e);
      return s.map(({ name: n, tagMap: r }) => ({
        label: o[r[1][0]] ?? "",
        type: n?.split(/\s/),
        href: V(r[6]?.[0] ?? r[3]?.[0])
      }));
    }
  }
  async loadResourceBlob(t) {
    const { resourceType: e, id: s, type: o } = At(t), n = e === "flow" ? await this.loadFlow(s) : await this.mobi.loadResource(s - 1), c = { data: [E.XHTML, E.HTML, E.CSS, E.SVG].includes(o) ? await this.replaceResources(this.mobi.decode(n)) : n, type: o }, u = new CustomEvent("data", { detail: c });
    this.transformTarget.dispatchEvent(u);
    const l = await u.detail.data, a = await u.detail.type, f = a === E.SVG ? this.parser.parseFromString(l, a) : null;
    return [
      new Blob([l], { newType: a }),
      // SVG wrappers need to be inlined
      // as browsers don't allow external resources when loading SVG as an image
      f?.getElementsByTagNameNS("http://www.w3.org/2000/svg", "image")?.length ? f.documentElement : null
    ];
  }
  async loadResource(t) {
    if (this.#t.has(t)) return this.#t.get(t);
    const [e, s] = await this.loadResourceBlob(t), o = s ? t : URL.createObjectURL(e);
    return s && this.#l.set(o, s), this.#t.set(t, o), o;
  }
  replaceResources(t) {
    const e = new RegExp(W, "g");
    return Lt(t, e, this.loadResource.bind(this));
  }
  // NOTE: there doesn't seem to be a way to access text randomly?
  // how to know the decompressed size of the records without decompressing?
  // 4096 is just the maximum size
  async loadRaw(t, e) {
    const s = e - this.#o.length, o = this.#i == null ? 1 / 0 : this.#i - this.#a.length - t;
    if (s < 0 || s < o) {
      for (; this.#o.length < e; ) {
        const r = ++this.#h, c = await this.mobi.loadText(r);
        this.#o = _(this.#o, c);
      }
      return this.#o.slice(t, e);
    }
    for (; this.#i - this.#a.length > t; ) {
      const r = this.mobi.headers.palmdoc.numTextRecords - 1 - ++this.#f, c = await this.mobi.loadText(r);
      this.#a = _(c, this.#a);
    }
    const n = this.#i - this.#a.length;
    return this.#a.slice(t - n, e - n);
  }
  loadFlow(t) {
    if (t < 4294967295)
      return this.loadRaw(...this.#s.fdstTable[t]);
  }
  async loadText(t) {
    const { skel: e, frags: s, length: o } = t, n = await this.loadRaw(e.offset, e.offset + o);
    let r = n.slice(0, e.length);
    for (const c of s) {
      const u = c.insertOffset - e.offset, l = e.length + c.offset, a = n.slice(l, l + c.length);
      r = Y(
        r.slice(0, u),
        a,
        r.slice(u)
      );
      const f = this.#e.get(c.index);
      if (f) for (const h of f) {
        const g = this.mobi.decode(a.slice(h)), d = K(g);
        this.#u(c.index, h, d);
      }
    }
    return this.mobi.decode(r);
  }
  async createDocument(t) {
    const e = await this.loadText(t);
    return this.parser.parseFromString(e, this.#c);
  }
  async loadSection(t) {
    if (this.#t.has(t)) return this.#t.get(t);
    const e = await this.loadText(t), s = await this.replaceResources(e);
    let o = this.parser.parseFromString(s, this.#c);
    (o.querySelector("parsererror") || !o.documentElement?.namespaceURI) && (this.#c = E.HTML, o = this.parser.parseFromString(s, this.#c));
    for (const [r, c] of this.#l)
      for (const u of o.querySelectorAll(`img[src="${r}"]`))
        u.replaceWith(c);
    const n = URL.createObjectURL(
      new Blob([this.serializer.serializeToString(o)], { type: this.#c })
    );
    return this.#t.set(t, n), n;
  }
  getIndexByFID(t) {
    return this.#r.findIndex((e) => e.frags.some((s) => s.index === t));
  }
  #u(t, e, s) {
    const o = this.#n.get(t);
    if (o) o.set(e, s);
    else {
      const n = /* @__PURE__ */ new Map();
      this.#n.set(t, n), n.set(e, s);
    }
  }
  async resolveHref(t) {
    const { fid: e, off: s } = q(t), o = this.getIndexByFID(e);
    if (o < 0) return;
    const n = this.#n.get(e)?.get(s);
    if (n) return { index: o, anchor: (d) => d.querySelector(n) };
    const { skel: r, frags: c } = this.#r[o], u = c.find((d) => d.index === e), l = r.offset + r.length + u.offset, a = await this.loadRaw(l, l + u.length), f = this.mobi.decode(a).slice(s), h = K(f);
    return this.#u(e, s, h), { index: o, anchor: (d) => d.querySelector(h) };
  }
  splitTOCHref(t) {
    const e = q(t);
    return [this.getIndexByFID(e.fid), e];
  }
  getTOCFragment(t, { fid: e, off: s }) {
    const o = this.#n.get(e)?.get(s);
    return t.querySelector(o);
  }
  isExternal(t) {
    return /^(?!blob|kindle)\w+:/i.test(t);
  }
  destroy() {
    for (const t of this.#t.values()) URL.revokeObjectURL(t);
  }
}
export {
  Ct as MOBI,
  Bt as isMOBI
};
