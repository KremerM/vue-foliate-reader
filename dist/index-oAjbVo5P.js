import { toRefs as Ft, ref as z, watch as Cr, onMounted as Ar, createElementBlock as N, openBlock as j, createElementVNode as P, withDirectives as xr, createCommentVNode as tt, vShow as Rr, renderSlot as Nt, defineComponent as Fr, getCurrentInstance as Nr, h as jr, Transition as kr, reactive as Br, normalizeStyle as Mr, normalizeClass as oe, unref as _, createVNode as ie, toDisplayString as _r, mergeProps as Lr, withCtx as Dr } from "vue";
const zr = (e, t) => e.map((r, n, o) => t(r, n, o) ? n : null).filter((r) => r != null), Ve = (e, t) => [-1, ...t, e.length].reduce(({ xs: r, a: n }, o) => ({ xs: r?.concat([e.slice(n + 1, o)]) ?? [], a: o }), {}).xs, Wr = (e, t) => e.slice(0, -1).concat([e[e.length - 1].concat(t[0])]).concat(t.slice(1)), gt = /\d/, lt = /^epubcfi\((.*)\)$/, se = (e) => e.replace(/[\^[\](),;=]/g, "^$&"), Ge = (e) => lt.test(e) ? e : `epubcfi(${e})`, Vr = (e) => e.match(lt)?.[1] ?? e, Gr = (e) => (...t) => `epubcfi(${e(...t.map((r) => r.match(lt)?.[1] ?? r))})`, Kr = Gr((...e) => e.join("!")), Ur = (e) => {
  const t = [];
  let r, n, o = "";
  const s = (a) => (t.push(a), r = null, o = ""), i = (a) => (o += a, n = !1);
  for (const a of Array.from(e.trim()).concat("")) {
    if (a === "^" && !n) {
      n = !0;
      continue;
    }
    if (r === "!") s(["!"]);
    else if (r === ",") s([","]);
    else if (r === "/" || r === ":")
      if (gt.test(a)) {
        i(a);
        continue;
      } else s([r, parseInt(o)]);
    else if (r === "~")
      if (gt.test(a) || a === ".") {
        i(a);
        continue;
      } else s(["~", parseFloat(o)]);
    else if (r === "@") {
      if (a === ":") {
        s(["@", parseFloat(o)]), r = "@";
        continue;
      }
      if (gt.test(a) || a === ".") {
        i(a);
        continue;
      } else s(["@", parseFloat(o)]);
    } else if (r === "[") {
      a === ";" && !n ? (s(["[", o]), r = ";") : a === "," && !n ? (s(["[", o]), r = "[") : a === "]" && !n ? s(["[", o]) : i(a);
      continue;
    } else if (r?.startsWith(";")) {
      a === "=" && !n ? (r = `;${o}`, o = "") : a === ";" && !n ? (s([r, o]), r = ";") : a === "]" && !n ? s([r, o]) : i(a);
      continue;
    }
    (a === "/" || a === ":" || a === "~" || a === "@" || a === "[" || a === "!" || a === ",") && (r = a);
  }
  return t;
}, Ke = (e, t) => zr(e, ([r]) => r === t), Hr = (e) => {
  const t = [];
  let r;
  for (const [n, o] of e) {
    if (n === "/") t.push({ index: o });
    else {
      const s = t[t.length - 1];
      if (n === ":") s.offset = o;
      else if (n === "~") s.temporal = o;
      else if (n === "@") s.spatial = (s.spatial ?? []).concat(o);
      else if (n === ";s") s.side = o;
      else if (n === "[")
        if (r === "/" && o) s.id = o;
        else {
          s.text = (s.text ?? []).concat(o);
          continue;
        }
    }
    r = n;
  }
  return t;
}, ae = (e) => Ve(e, Ke(e, "!")).map(Hr), it = (e) => {
  const t = Ur(Vr(e)), r = Ke(t, ",");
  if (!r.length) return ae(t);
  const [n, o, s] = Ve(t, r).map(ae);
  return { parent: n, start: o, end: s };
}, Yr = ({ index: e, id: t, offset: r, temporal: n, spatial: o, text: s, side: i }) => {
  const a = i ? `;s=${i}` : "";
  return `/${e}` + (t ? `[${se(t)}${a}]` : "") + (r != null && e % 2 ? `:${r}` : "") + (n ? `~${n}` : "") + (o ? `@${o.join(":")}` : "") + (s || !t && i ? "[" + (s?.map(se)?.join(",") ?? "") + a + "]" : "");
}, Ue = (e) => e.parent ? [e.parent, e.start, e.end].map(Ue).join(",") : e.map((t) => t.map(Yr).join("")).join("!"), ut = (e) => Ge(Ue(e)), B = (e, t) => typeof e == "string" ? ut(B(it(e), t)) : e.parent ? Wr(e.parent, e[t ? "end" : "start"]) : e, qr = (e, t) => {
  typeof e == "string" && (e = it(e)), typeof t == "string" && (t = it(t)), e = B(e), t = B(t, !0);
  const r = e[e.length - 1], n = t[t.length - 1], o = [], s = [], i = [];
  let a = !0;
  const l = Math.max(r.length, n.length);
  for (let u = 0; u < l; u++) {
    const f = r[u], d = n[u];
    a &&= f?.index === d?.index && !f?.offset && !d?.offset, a ? o.push(f) : (f && s.push(f), d && i.push(d));
  }
  const c = e.slice(0, -1).concat([o]);
  return ut({ parent: c, start: [s], end: [i] });
}, jt = ({ nodeType: e }) => e === 3 || e === 4, et = ({ nodeType: e }) => e === 1, He = (e, t) => {
  const r = Array.from(e.childNodes).filter((n) => jt(n) || et(n));
  return t ? r.map((n) => {
    const o = t(n);
    return o === NodeFilter.FILTER_REJECT ? null : o === NodeFilter.FILTER_SKIP ? He(n, t) : n;
  }).flat().filter((n) => n) : r;
}, Vt = (e, t) => {
  const r = He(e, t).reduce((n, o) => {
    let s = n[n.length - 1];
    return s ? jt(o) ? Array.isArray(s) ? s.push(o) : jt(s) ? n[n.length - 1] = [s, o] : n.push(o) : et(s) ? n.push(null, o) : n.push(o) : n.push(o), n;
  }, []);
  return et(r[0]) && r.unshift("first"), et(r[r.length - 1]) && r.push("last"), r.unshift("before"), r.push("after"), r;
}, kt = (e, t, r) => {
  const { id: n } = t[t.length - 1];
  if (n) {
    const i = e.ownerDocument.getElementById(n);
    if (i) return { node: i, offset: 0 };
  }
  for (const { index: i } of t) {
    const a = e ? Vt(e, r)[i] : null;
    if (a === "first") return { node: e.firstChild ?? e };
    if (a === "last") return { node: e.lastChild ?? e };
    if (a === "before") return { node: e, before: !0 };
    if (a === "after") return { node: e, after: !0 };
    e = a;
  }
  const { offset: o } = t[t.length - 1];
  if (!Array.isArray(e)) return { node: e, offset: o };
  let s = 0;
  for (const i of e) {
    const { length: a } = i.nodeValue;
    if (s + a >= o) return { node: i, offset: o - s };
    s += a;
  }
}, st = (e, t, r) => {
  const { parentNode: n, id: o } = e, s = Vt(n, r), i = s.findIndex((c) => Array.isArray(c) ? c.some((u) => u === e) : c === e), a = s[i];
  if (Array.isArray(a)) {
    let c = 0;
    for (const u of a)
      if (u === e) {
        c += t;
        break;
      } else c += u.nodeValue.length;
    t = c;
  }
  const l = { id: o, index: i, offset: t };
  return (n !== e.ownerDocument.documentElement ? st(n, null, r).concat(l) : [l]).filter((c) => c.index !== -1);
}, Xr = (e, t) => {
  const { startContainer: r, startOffset: n, endContainer: o, endOffset: s } = e, i = st(r, n, t);
  if (e.collapsed) return ut([i]);
  const a = st(o, s, t);
  return qr([i], [a]);
}, Zr = (e, t, r) => {
  const n = B(t), o = B(t, !0), s = e.documentElement, i = kt(s, n[0], r), a = kt(s, o[0], r), l = e.createRange();
  return i.before ? l.setStartBefore(i.node) : i.after ? l.setStartAfter(i.node) : l.setStart(i.node, i.offset), a.before ? l.setEndBefore(a.node) : a.after ? l.setEndAfter(a.node) : l.setEnd(a.node, a.offset), l;
}, Tc = (e) => {
  const t = [], { parentNode: r } = e[0], n = st(r);
  for (const [o, s] of Vt(r).entries()) {
    const i = e[t.length];
    s === i && t.push(ut([n.concat({ id: i.id, index: o })]));
  }
  return t;
}, Ec = (e, t) => kt(e.documentElement, B(t)).node, ce = {
  fromIndex: (e) => Ge(`/6/${(e + 1) * 2}`),
  toIndex: (e) => e?.at(-1).index / 2 - 1
}, Jr = (e) => {
  let t = 0;
  const r = (n) => {
    if (n.id = t++, n.subitems) for (const o of n.subitems) r(o);
  };
  for (const n of e) r(n);
  return e;
}, Ye = (e) => e.map((t) => t.subitems?.length ? [t, Ye(t.subitems)].flat() : t).flat();
class le {
  async init({ toc: t, ids: r, splitHref: n, getFragment: o }) {
    Jr(t);
    const s = Ye(t), i = /* @__PURE__ */ new Map();
    for (const [l, c] of s.entries()) {
      const [u, f] = await n(c?.href) ?? [], d = { fragment: f, item: c };
      i.has(u) ? i.get(u).items.push(d) : i.set(u, { prev: s[l - 1], items: [d] });
    }
    const a = /* @__PURE__ */ new Map();
    for (const [l, c] of r.entries())
      i.has(c) ? a.set(c, i.get(c)) : a.set(c, a.get(r[l - 1]));
    this.ids = r, this.map = a, this.getFragment = o;
  }
  getProgress(t, r) {
    if (!this.ids) return;
    const n = this.ids[t], o = this.map.get(n);
    if (!o) return null;
    const { prev: s, items: i } = o;
    if (!i) return s;
    if (!r || i.length === 1 && !i[0].fragment) return i[0].item;
    const a = r.startContainer.getRootNode();
    for (const [l, { fragment: c }] of i.entries()) {
      const u = this.getFragment(a, c);
      if (u && r.comparePoint(u, 0) > 0)
        return i[l - 1]?.item ?? s;
    }
    return i[i.length - 1].item;
  }
}
class Qr {
  constructor(t, r, n) {
    this.sizes = t.map((o) => o.linear != "no" && o.size > 0 ? o.size : 0), this.sizePerLoc = r, this.sizePerTimeUnit = n, this.sizeTotal = this.sizes.reduce((o, s) => o + s, 0), this.sectionFractions = this.#e();
  }
  #e() {
    const { sizeTotal: t } = this, r = [0];
    let n = 0;
    for (const o of this.sizes) r.push((n += o) / t);
    return r;
  }
  // get progress given index of and fractions within a section
  getProgress(t, r, n = 0) {
    const { sizes: o, sizePerLoc: s, sizePerTimeUnit: i, sizeTotal: a } = this, l = o[t] ?? 0, u = o.slice(0, t).reduce((g, $) => g + $, 0) + r * l, f = u + n * l, d = a - u, h = (1 - r) * l;
    return {
      fraction: f / a,
      section: {
        current: t,
        total: o.length
      },
      location: {
        current: Math.floor(u / s),
        next: Math.floor(f / s),
        total: Math.ceil(a / s)
      },
      time: {
        section: h / i,
        total: d / i
      }
    };
  }
  // the inverse of `getProgress`
  // get index of and fraction in section based on total fraction
  getSection(t) {
    if (t <= 0) return [0, 0];
    if (t >= 1) return [this.sizes.length - 1, 1];
    t = t + Number.EPSILON;
    const { sizeTotal: r } = this;
    let n = this.sectionFractions.findIndex((s) => s > t) - 1;
    if (n < 0) return [0, 0];
    for (; !this.sizes[n]; ) n++;
    const o = (t - this.sectionFractions[n]) / (this.sizes[n] / r);
    return [n, o];
  }
}
const w = (e) => document.createElementNS("http://www.w3.org/2000/svg", e);
class ue {
  #e = w("svg");
  #t = /* @__PURE__ */ new Map();
  constructor() {
    Object.assign(this.#e.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    });
  }
  get element() {
    return this.#e;
  }
  add(t, r, n, o) {
    this.#t.has(t) && this.remove(t), typeof r == "function" && (r = r(this.#e.getRootNode()));
    const s = r.getClientRects(), i = n(s, o);
    this.#e.append(i), this.#t.set(t, { range: r, draw: n, options: o, element: i, rects: s });
  }
  remove(t) {
    this.#t.has(t) && (this.#e.removeChild(this.#t.get(t).element), this.#t.delete(t));
  }
  redraw() {
    for (const t of this.#t.values()) {
      const { range: r, draw: n, options: o, element: s } = t;
      this.#e.removeChild(s);
      const i = r.getClientRects(), a = n(i, o);
      this.#e.append(a), t.element = a, t.rects = i;
    }
  }
  hitTest({ x: t, y: r }) {
    const n = Array.from(this.#t.entries());
    for (let o = n.length - 1; o >= 0; o--) {
      const [s, i] = n[o];
      for (const { left: a, top: l, right: c, bottom: u } of i.rects)
        if (l <= r && a <= t && u > r && c > t)
          return [s, i.range];
    }
    return [];
  }
  static underline(t, r = {}) {
    const { color: n = "red", width: o = 2, writingMode: s } = r, i = w("g");
    if (i.setAttribute("fill", n), s === "vertical-rl" || s === "vertical-lr")
      for (const { right: a, top: l, height: c } of t) {
        const u = w("rect");
        u.setAttribute("x", a - o), u.setAttribute("y", l), u.setAttribute("height", c), u.setAttribute("width", o), i.append(u);
      }
    else for (const { left: a, bottom: l, width: c } of t) {
      const u = w("rect");
      u.setAttribute("x", a), u.setAttribute("y", l - o), u.setAttribute("height", o), u.setAttribute("width", c), i.append(u);
    }
    return i;
  }
  static strikethrough(t, r = {}) {
    const { color: n = "red", width: o = 2, writingMode: s } = r, i = w("g");
    if (i.setAttribute("fill", n), s === "vertical-rl" || s === "vertical-lr")
      for (const { right: a, left: l, top: c, height: u } of t) {
        const f = w("rect");
        f.setAttribute("x", (a + l) / 2), f.setAttribute("y", c), f.setAttribute("height", u), f.setAttribute("width", o), i.append(f);
      }
    else for (const { left: a, top: l, bottom: c, width: u } of t) {
      const f = w("rect");
      f.setAttribute("x", a), f.setAttribute("y", (l + c) / 2), f.setAttribute("height", o), f.setAttribute("width", u), i.append(f);
    }
    return i;
  }
  static squiggly(t, r = {}) {
    const { color: n = "red", width: o = 2, writingMode: s } = r, i = w("g");
    i.setAttribute("fill", "none"), i.setAttribute("stroke", n), i.setAttribute("stroke-width", o);
    const a = o * 1.5;
    if (s === "vertical-rl" || s === "vertical-lr")
      for (const { right: l, top: c, height: u } of t) {
        const f = w("path"), d = Math.round(u / a / 1.5), h = u / d, g = Array.from(
          { length: d },
          ($, v) => `l${v % 2 ? -a : a} ${h}`
        ).join("");
        f.setAttribute("d", `M${l} ${c}${g}`), i.append(f);
      }
    else for (const { left: l, bottom: c, width: u } of t) {
      const f = w("path"), d = Math.round(u / a / 1.5), h = u / d, g = Array.from(
        { length: d },
        ($, v) => `l${h} ${v % 2 ? a : -a}`
      ).join("");
      f.setAttribute("d", `M${l} ${c}${g}`), i.append(f);
    }
    return i;
  }
  static highlight(t, r = {}) {
    const { color: n = "red" } = r, o = w("g");
    o.setAttribute("fill", n), o.style.opacity = "var(--overlayer-highlight-opacity, .3)", o.style.mixBlendMode = "var(--overlayer-highlight-blend-mode, normal)";
    for (const { left: s, top: i, height: a, width: l } of t) {
      const c = w("rect");
      c.setAttribute("x", s), c.setAttribute("y", i), c.setAttribute("height", a), c.setAttribute("width", l), o.append(c);
    }
    return o;
  }
  static outline(t, r = {}) {
    const { color: n = "red", width: o = 3, radius: s = 3 } = r, i = w("g");
    i.setAttribute("fill", "none"), i.setAttribute("stroke", n), i.setAttribute("stroke-width", o);
    for (const { left: a, top: l, height: c, width: u } of t) {
      const f = w("rect");
      f.setAttribute("x", a), f.setAttribute("y", l), f.setAttribute("height", c), f.setAttribute("width", u), f.setAttribute("rx", s), i.append(f);
    }
    return i;
  }
  // make an exact copy of an image in the overlay
  // one can then apply filters to the entire element, without affecting them;
  // it's a bit silly and probably better to just invert images twice
  // (though the color will be off in that case if you do heu-rotate)
  static copyImage([t], r = {}) {
    const { src: n } = r, o = w("image"), { left: s, top: i, height: a, width: l } = t;
    return o.setAttribute("href", n), o.setAttribute("x", s), o.setAttribute("y", i), o.setAttribute("height", a), o.setAttribute("width", l), o;
  }
}
const tn = (e, t) => {
  const r = [];
  for (let n = t.currentNode; n; n = t.nextNode()) {
    const o = e.comparePoint(n, 0);
    if (o === 0) r.push(n);
    else if (o > 0) break;
  }
  return r;
}, en = (e, t) => {
  const r = [];
  for (let n = t.nextNode(); n; n = t.nextNode())
    r.push(n);
  return r;
}, rn = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_CDATA_SECTION, nn = (e) => {
  if (e.nodeType === 1) {
    const t = e.tagName.toLowerCase();
    return t === "script" || t === "style" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
  }
  return NodeFilter.FILTER_ACCEPT;
}, fe = function* (e, t, r) {
  const n = e.commonAncestorContainer ?? e.body ?? e, o = document.createTreeWalker(n, rn, { acceptNode: r || nn }), i = (e.commonAncestorContainer ? tn : en)(e, o), a = i.map((c) => c.nodeValue), l = (c, u, f, d) => {
    const h = document.createRange();
    return h.setStart(i[c], u), h.setEnd(i[f], d), h;
  };
  for (const c of t(a, l)) yield c;
}, L = "foliate-search:", on = async (e) => {
  const t = new Uint8Array(await e.slice(0, 4).arrayBuffer());
  return t[0] === 80 && t[1] === 75 && t[2] === 3 && t[3] === 4;
}, sn = async (e) => {
  const t = new Uint8Array(await e.slice(0, 5).arrayBuffer());
  return t[0] === 37 && t[1] === 80 && t[2] === 68 && t[3] === 70 && t[4] === 45;
}, an = ({ name: e, type: t }) => t === "application/vnd.comicbook+zip" || e.endsWith(".cbz"), cn = ({ name: e, type: t }) => t === "application/x-fictionbook+xml" || e.endsWith(".fb2"), ln = ({ name: e, type: t }) => t === "application/x-zip-compressed-fb2" || e.endsWith(".fb2.zip") || e.endsWith(".fbz"), un = async (e) => {
  const { configure: t, ZipReader: r, BlobReader: n, TextWriter: o, BlobWriter: s } = await import("./zip-B9RiG7Pn.js");
  t({ useWebWorkers: !1 });
  const a = await new r(new n(e)).getEntries(), l = new Map(a.map((h) => [h.filename, h])), c = (h) => (g, ...$) => l.has(g) ? h(l.get(g), ...$) : null, u = c((h) => h.getData(new o())), f = c((h, g) => h.getData(new s(g)));
  return { entries: a, loadText: u, loadBlob: f, getSize: (h) => l.get(h)?.uncompressedSize ?? 0 };
}, qe = async (e) => e.isFile ? e : (await Promise.all(Array.from(
  await new Promise((t, r) => e.createReader().readEntries((n) => t(n), (n) => r(n))),
  qe
))).flat(), fn = async (e) => {
  const t = await qe(e), r = await Promise.all(
    t.map((u) => new Promise((f, d) => u.file(
      (h) => f([h, u.fullPath]),
      (h) => d(h)
    )))
  ), n = new Map(r.map(([u, f]) => [f.replace(e.fullPath + "/", ""), u])), o = new TextDecoder(), s = (u) => u ? o.decode(u) : null, i = (u) => n.get(u)?.arrayBuffer() ?? null;
  return { loadText: async (u) => s(await i(u)), loadBlob: (u) => n.get(u), getSize: (u) => n.get(u)?.size ?? 0 };
};
class hn extends Error {
}
class dn extends Error {
}
class vn extends Error {
}
const pn = async (e) => {
  const t = await fetch(e);
  if (!t.ok) throw new hn(
    `${t.status} ${t.statusText}`,
    { cause: t }
  );
  return new File([await t.blob()], new URL(t.url).pathname);
}, gn = async (e) => {
  typeof e == "string" && (e = await pn(e));
  let t;
  if (e.isDirectory) {
    const r = await fn(e), { EPUB: n } = await import("./epub-Bl-PUJ-s.js");
    t = await new n(r).init();
  } else if (e.size) if (await on(e)) {
    const r = await un(e);
    if (an(e)) {
      const { makeComicBook: n } = await import("./comic-book-D8f_Cc7Q.js");
      t = n(r, e);
    } else if (ln(e)) {
      const { makeFB2: n } = await import("./fb2-DCqZtzQ5.js"), { entries: o } = r, s = o.find((a) => a.filename.endsWith(".fb2")), i = await r.loadBlob((s ?? o[0]).filename);
      t = await n(i);
    } else {
      const { EPUB: n } = await import("./epub-Bl-PUJ-s.js");
      t = await new n(r).init();
    }
  } else if (await sn(e)) {
    const { makePDF: r } = await import("./pdf-CPKoEzBn.js");
    t = await r(e);
  } else {
    const { isMOBI: r, MOBI: n } = await import("./mobi-B7fof60X.js");
    if (await r(e)) {
      const o = await import("./fflate-D9v8asEo.js");
      t = await new n({ unzlib: o.unzlibSync }).open(e);
    } else if (cn(e)) {
      const { makeFB2: o } = await import("./fb2-DCqZtzQ5.js");
      t = await o(e);
    }
  }
  else throw new dn("File not found");
  if (!t) throw new vn("File type not supported");
  return t;
};
class Gt {
  #e;
  #t;
  #n;
  #r;
  constructor(t, r, n = {}) {
    this.#t = t, this.#n = r, this.#r = n, this.#r.hidden && this.hide(), this.#t.addEventListener("mousemove", ({ screenX: o, screenY: s }) => {
      o === this.#r.x && s === this.#r.y || (this.#r.x = o, this.#r.y = s, this.show(), this.#e && clearTimeout(this.#e), r() && (this.#e = setTimeout(this.hide.bind(this), 1e3)));
    }, !1);
  }
  cloneFor(t) {
    return new Gt(t, this.#n, this.#r);
  }
  hide() {
    this.#t.style.cursor = "none", this.#r.hidden = !0;
  }
  show() {
    this.#t.style.removeProperty("cursor"), this.#r.hidden = !1;
  }
}
class yn extends EventTarget {
  #e = [];
  #t = -1;
  pushState(t) {
    const r = this.#e[this.#t];
    r === t || r?.fraction && r.fraction === t.fraction || (this.#e[++this.#t] = t, this.#e.length = this.#t + 1, this.dispatchEvent(new Event("index-change")));
  }
  replaceState(t) {
    const r = this.#t;
    this.#e[r] = t;
  }
  back() {
    const t = this.#t;
    if (t <= 0) return;
    const r = { state: this.#e[t - 1] };
    this.#t = t - 1, this.dispatchEvent(new CustomEvent("popstate", { detail: r })), this.dispatchEvent(new Event("index-change"));
  }
  forward() {
    const t = this.#t;
    if (t >= this.#e.length - 1) return;
    const r = { state: this.#e[t + 1] };
    this.#t = t + 1, this.dispatchEvent(new CustomEvent("popstate", { detail: r })), this.dispatchEvent(new Event("index-change"));
  }
  get canGoBack() {
    return this.#t > 0;
  }
  get canGoForward() {
    return this.#t < this.#e.length - 1;
  }
  clear() {
    this.#e = [], this.#t = -1;
  }
}
const mn = (e) => {
  if (!e) return {};
  try {
    const t = Intl.getCanonicalLocales(e)[0], r = new Intl.Locale(t), n = ["zh", "ja", "kr"].includes(r.language), o = (r.getTextInfo?.() ?? r.textInfo)?.direction;
    return { canonical: t, locale: r, isCJK: n, direction: o };
  } catch (t) {
    return console.warn(t), {};
  }
};
class bn extends HTMLElement {
  #e = this.attachShadow({ mode: "closed" });
  #t;
  #n;
  #r;
  #i = /* @__PURE__ */ new Map();
  #a = new Gt(this, () => this.hasAttribute("autohide-cursor"));
  isFixedLayout = !1;
  lastLocation;
  history = new yn();
  constructor() {
    super(), this.history.addEventListener("popstate", ({ detail: t }) => {
      const r = this.resolveNavigation(t.state);
      this.renderer.goTo(r);
    });
  }
  async open(t) {
    if ((typeof t == "string" || typeof t.arrayBuffer == "function" || t.isDirectory) && (t = await gn(t)), this.book = t, this.language = mn(t.metadata?.language), t.splitTOCHref && t.getTOCFragment) {
      const r = t.sections.map((s) => s.id);
      this.#t = new Qr(t.sections, 1500, 1600);
      const n = t.splitTOCHref.bind(t), o = t.getTOCFragment.bind(t);
      this.#n = new le(), await this.#n.init({
        toc: t.toc ?? [],
        ids: r,
        splitHref: n,
        getFragment: o
      }), this.#r = new le(), await this.#r.init({
        toc: t.pageList ?? [],
        ids: r,
        splitHref: n,
        getFragment: o
      });
    }
    if (this.isFixedLayout = this.book.rendition?.layout === "pre-paginated", this.isFixedLayout ? (await import("./fixed-layout-BXYhp9ET.js"), this.renderer = document.createElement("foliate-fxl")) : (await import("./paginator-Bcg1l0qq.js"), this.renderer = document.createElement("foliate-paginator")), this.renderer.setAttribute("exportparts", "head,foot,filter"), this.renderer.addEventListener("load", (r) => this.#l(r.detail)), this.renderer.addEventListener("relocate", (r) => this.#c(r.detail)), this.renderer.addEventListener("create-overlayer", (r) => r.detail.attach(this.#f(r.detail))), this.renderer.open(t), this.#e.append(this.renderer), t.sections.some((r) => r.mediaOverlay)) {
      const r = t.media.activeClass, n = t.media.playbackActiveClass;
      this.mediaOverlay = t.getMediaOverlay();
      let o;
      this.mediaOverlay.addEventListener("highlight", (s) => {
        const i = this.resolveNavigation(s.detail.text);
        this.renderer.goTo(i).then(() => {
          const { doc: a } = this.renderer.getContents().find((c) => c.index = i.index), l = i.anchor(a);
          l.classList.add(r), n && l.ownerDocument.documentElement.classList.add(n), o = new WeakRef(l);
        });
      }), this.mediaOverlay.addEventListener("unhighlight", () => {
        const s = o?.deref();
        s && (s.classList.remove(r), n && s.ownerDocument.documentElement.classList.remove(n));
      });
    }
  }
  close() {
    this.renderer?.destroy(), this.renderer?.remove(), this.#t = null, this.#n = null, this.#r = null, this.#i = /* @__PURE__ */ new Map(), this.lastLocation = null, this.history.clear(), this.tts = null, this.mediaOverlay = null;
  }
  goToTextStart() {
    return this.goTo(this.book.landmarks?.find((t) => t.type.includes("bodymatter") || t.type.includes("text"))?.href ?? this.book.sections.findIndex((t) => t.linear !== "no"));
  }
  async init({ lastLocation: t, showTextStart: r }) {
    const n = t ? this.resolveNavigation(t) : null;
    n ? (await this.renderer.goTo(n), this.history.pushState(t)) : r ? await this.goToTextStart() : (this.history.pushState(0), await this.next());
  }
  #o(t, r, n) {
    return this.dispatchEvent(new CustomEvent(t, { detail: r, cancelable: n }));
  }
  #c({ reason: t, range: r, index: n, fraction: o, size: s }) {
    const i = this.#t?.getProgress(n, o, s) ?? {}, a = this.#n?.getProgress(n, r), l = this.#r?.getProgress(n, r), c = this.getCFI(n, r);
    this.lastLocation = { ...i, tocItem: a, pageItem: l, cfi: c, range: r }, (t === "snap" || t === "page" || t === "scroll") && this.history.replaceState(c), this.#o("relocate", this.lastLocation);
  }
  #l({ doc: t, index: r }) {
    t.documentElement.lang ||= this.language.canonical ?? "", this.language.isCJK || (t.documentElement.dir ||= this.language.direction ?? ""), this.#u(t, r), this.#a.cloneFor(t.documentElement), this.#o("load", { doc: t, index: r });
  }
  #u(t, r) {
    const { book: n } = this, o = n.sections[r];
    t.addEventListener("click", (s) => {
      const i = s.target.closest("a[href]");
      if (!i) return;
      s.preventDefault();
      const a = i.getAttribute("href"), l = o?.resolveHref?.(a) ?? a;
      n?.isExternal?.(l) ? Promise.resolve(this.#o("external-link", { a: i, href: l }, !0)).then((c) => c ? globalThis.open(l, "_blank") : null).catch((c) => console.error(c)) : Promise.resolve(this.#o("link", { a: i, href: l }, !0)).then((c) => c ? this.goTo(l) : null).catch((c) => console.error(c));
    });
  }
  async addAnnotation(t, r) {
    const { value: n } = t;
    if (n.startsWith(L)) {
      const l = n.replace(L, ""), { index: c, anchor: u } = await this.resolveNavigation(l), f = this.#s(c);
      if (f) {
        const { overlayer: d, doc: h } = f;
        if (r) {
          d.remove(n);
          return;
        }
        const g = h ? u(h) : u;
        d.add(n, g, ue.outline);
      }
      return;
    }
    const { index: o, anchor: s } = await this.resolveNavigation(n), i = this.#s(o);
    if (i) {
      const { overlayer: l, doc: c } = i;
      if (l.remove(n), !r) {
        const u = c ? s(c) : s, f = (d, h) => l.add(n, u, d, h);
        this.#o("draw-annotation", { draw: f, annotation: t, doc: c, range: u });
      }
    }
    const a = this.#n.getProgress(o)?.label ?? "";
    return { index: o, label: a };
  }
  deleteAnnotation(t) {
    return this.addAnnotation(t, !0);
  }
  #s(t) {
    return this.renderer.getContents().find((r) => r.index === t && r.overlayer);
  }
  #f({ doc: t, index: r }) {
    const n = new ue();
    t.addEventListener("click", (s) => {
      const [i, a] = n.hitTest(s);
      i && !i.startsWith(L) && this.#o("show-annotation", { value: i, index: r, range: a });
    }, !1);
    const o = this.#i.get(r);
    if (o) for (const s of o) this.addAnnotation(s);
    return this.#o("create-overlay", { index: r }), n;
  }
  async showAnnotation(t) {
    const { value: r } = t, n = await this.goTo(r);
    if (n) {
      const { index: o, anchor: s } = n, { doc: i } = this.#s(o), a = s(i);
      this.#o("show-annotation", { value: r, index: o, range: a });
    }
  }
  getCFI(t, r) {
    const n = this.book.sections[t].cfi ?? ce.fromIndex(t);
    return r ? Kr(n, Xr(r)) : n;
  }
  resolveCFI(t) {
    if (this.book.resolveCFI)
      return this.book.resolveCFI(t);
    {
      const r = it(t);
      return { index: ce.toIndex((r.parent ?? r).shift()), anchor: (s) => Zr(s, r) };
    }
  }
  resolveNavigation(t) {
    try {
      if (typeof t == "number") return { index: t };
      if (typeof t.fraction == "number") {
        const [r, n] = this.#t.getSection(t.fraction);
        return { index: r, anchor: n };
      }
      return lt.test(t) ? this.resolveCFI(t) : this.book.resolveHref(t);
    } catch (r) {
      console.error(r), console.error(`Could not resolve target ${t}`);
    }
  }
  async goTo(t) {
    const r = this.resolveNavigation(t);
    try {
      return await this.renderer.goTo(r), this.history.pushState(t), r;
    } catch (n) {
      console.error(n), console.error(`Could not go to ${t}`);
    }
  }
  async goToFraction(t) {
    const [r, n] = this.#t.getSection(t);
    await this.renderer.goTo({ index: r, anchor: n }), this.history.pushState({ fraction: t });
  }
  async select(t) {
    try {
      const r = await this.resolveNavigation(t);
      await this.renderer.goTo({ ...r, select: !0 }), this.history.pushState(t);
    } catch (r) {
      console.error(r), console.error(`Could not go to ${t}`);
    }
  }
  deselect() {
    for (const { doc: t } of this.renderer.getContents())
      t.defaultView.getSelection().removeAllRanges();
  }
  getSectionFractions() {
    return (this.#t?.sectionFractions ?? []).map((t) => t + Number.EPSILON);
  }
  getProgressOf(t, r) {
    const n = this.#n?.getProgress(t, r), o = this.#r?.getProgress(t, r);
    return { tocItem: n, pageItem: o };
  }
  async getTOCItemOf(t) {
    try {
      const { index: r, anchor: n } = await this.resolveNavigation(t), o = await this.book.sections[r].createDocument(), s = n(o), i = s instanceof Range, a = i ? s : o.createRange();
      return i || a.selectNodeContents(s), this.#n.getProgress(r, a);
    } catch (r) {
      console.error(r), console.error(`Could not get ${t}`);
    }
  }
  async prev(t) {
    await this.renderer.prev(t);
  }
  async next(t) {
    await this.renderer.next(t);
  }
  goLeft() {
    return this.book.dir === "rtl" ? this.next() : this.prev();
  }
  goRight() {
    return this.book.dir === "rtl" ? this.prev() : this.next();
  }
  async *#h(t, r, n) {
    const o = await this.book.sections[n].createDocument();
    for (const { range: s, excerpt: i } of t(o, r))
      yield { cfi: this.getCFI(n, s), excerpt: i };
  }
  async *#d(t, r) {
    const { sections: n } = this.book;
    for (const [o, { createDocument: s }] of n.entries()) {
      if (!s) continue;
      const i = await s(), a = Array.from(t(i, r), ({ range: c, excerpt: u }) => ({ cfi: this.getCFI(o, c), excerpt: u }));
      yield { progress: (o + 1) / n.length }, a.length && (yield { index: o, subitems: a });
    }
  }
  async *search(t) {
    this.clearSearch();
    const { searchMatcher: r } = await import("./search-aqQXTfxz.js"), { query: n, index: o } = t, s = r(
      fe,
      { defaultLocale: this.language, ...t }
    ), i = o != null ? this.#h(s, n, o) : this.#d(s, n), a = [];
    this.#i.set(o, a);
    for await (const l of i)
      if (l.subitems) {
        const c = l.subitems.map(({ cfi: u }) => ({ value: L + u }));
        this.#i.set(l.index, c);
        for (const u of c) this.addAnnotation(u);
        yield {
          label: this.#n.getProgress(l.index)?.label ?? "",
          subitems: l.subitems
        };
      } else {
        if (l.cfi) {
          const c = { value: L + l.cfi };
          a.push(c), this.addAnnotation(c);
        }
        yield l;
      }
    yield "done";
  }
  clearSearch() {
    for (const t of this.#i.values())
      for (const r of t) this.deleteAnnotation(r);
    this.#i.clear();
  }
  async initTTS(t = "word", r) {
    const n = this.renderer.getContents()[0].doc;
    if (this.tts && this.tts.doc === n) return;
    const { TTS: o } = await import("./tts-UQB-k9b_.js");
    this.tts = new o(n, fe, r || ((s) => this.renderer.scrollToAnchor(s, !0)), t);
  }
  startMediaOverlay() {
    const { index: t } = this.renderer.getContents()[0];
    return this.mediaOverlay.start(t);
  }
}
customElements.define("foliate-view", bn);
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, D = function(e) {
  return e && e.Math === Math && e;
}, S = (
  // eslint-disable-next-line es/no-global-this -- safe
  D(typeof globalThis == "object" && globalThis) || D(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  D(typeof self == "object" && self) || D(typeof H == "object" && H) || D(typeof H == "object" && H) || // eslint-disable-next-line no-new-func -- fallback
  /* @__PURE__ */ function() {
    return this;
  }() || Function("return this")()
), Kt = {}, C = function(e) {
  try {
    return !!e();
  } catch {
    return !0;
  }
}, wn = C, A = !wn(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), $n = C, Ut = !$n(function() {
  var e = function() {
  }.bind();
  return typeof e != "function" || e.hasOwnProperty("prototype");
}), Tn = Ut, Y = Function.prototype.call, M = Tn ? Y.bind(Y) : function() {
  return Y.apply(Y, arguments);
}, Xe = {}, Ze = {}.propertyIsEnumerable, Je = Object.getOwnPropertyDescriptor, En = Je && !Ze.call({ 1: 2 }, 1);
Xe.f = En ? function(t) {
  var r = Je(this, t);
  return !!r && r.enumerable;
} : Ze;
var Qe = function(e, t) {
  return {
    enumerable: !(e & 1),
    configurable: !(e & 2),
    writable: !(e & 4),
    value: t
  };
}, tr = Ut, er = Function.prototype, Bt = er.call, Sn = tr && er.bind.bind(Bt, Bt), T = tr ? Sn : function(e) {
  return function() {
    return Bt.apply(e, arguments);
  };
}, rr = T, On = rr({}.toString), In = rr("".slice), Ht = function(e) {
  return In(On(e), 8, -1);
}, Pn = T, Cn = C, An = Ht, yt = Object, xn = Pn("".split), Rn = Cn(function() {
  return !yt("z").propertyIsEnumerable(0);
}) ? function(e) {
  return An(e) === "String" ? xn(e, "") : yt(e);
} : yt, Yt = function(e) {
  return e == null;
}, Fn = Yt, Nn = TypeError, ft = function(e) {
  if (Fn(e)) throw new Nn("Can't call method on " + e);
  return e;
}, jn = Rn, kn = ft, qt = function(e) {
  return jn(kn(e));
}, mt = typeof document == "object" && document.all, O = typeof mt > "u" && mt !== void 0 ? function(e) {
  return typeof e == "function" || e === mt;
} : function(e) {
  return typeof e == "function";
}, Bn = O, ht = function(e) {
  return typeof e == "object" ? e !== null : Bn(e);
}, bt = S, Mn = O, _n = function(e) {
  return Mn(e) ? e : void 0;
}, Xt = function(e, t) {
  return arguments.length < 2 ? _n(bt[e]) : bt[e] && bt[e][t];
}, Ln = T, nr = Ln({}.isPrototypeOf), Dn = S, he = Dn.navigator, de = he && he.userAgent, zn = de ? String(de) : "", or = S, wt = zn, ve = or.process, pe = or.Deno, ge = ve && ve.versions || pe && pe.version, ye = ge && ge.v8, E, at;
ye && (E = ye.split("."), at = E[0] > 0 && E[0] < 4 ? 1 : +(E[0] + E[1]));
!at && wt && (E = wt.match(/Edge\/(\d+)/), (!E || E[1] >= 74) && (E = wt.match(/Chrome\/(\d+)/), E && (at = +E[1])));
var Wn = at, me = Wn, Vn = C, Gn = S, Kn = Gn.String, ir = !!Object.getOwnPropertySymbols && !Vn(function() {
  var e = Symbol("symbol detection");
  return !Kn(e) || !(Object(e) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && me && me < 41;
}), Un = ir, sr = Un && !Symbol.sham && typeof Symbol.iterator == "symbol", Hn = Xt, Yn = O, qn = nr, Xn = sr, Zn = Object, ar = Xn ? function(e) {
  return typeof e == "symbol";
} : function(e) {
  var t = Hn("Symbol");
  return Yn(t) && qn(t.prototype, Zn(e));
}, Jn = String, Zt = function(e) {
  try {
    return Jn(e);
  } catch {
    return "Object";
  }
}, Qn = O, to = Zt, eo = TypeError, W = function(e) {
  if (Qn(e)) return e;
  throw new eo(to(e) + " is not a function");
}, ro = W, no = Yt, Jt = function(e, t) {
  var r = e[t];
  return no(r) ? void 0 : ro(r);
}, $t = M, Tt = O, Et = ht, oo = TypeError, io = function(e, t) {
  var r, n;
  if (t === "string" && Tt(r = e.toString) && !Et(n = $t(r, e)) || Tt(r = e.valueOf) && !Et(n = $t(r, e)) || t !== "string" && Tt(r = e.toString) && !Et(n = $t(r, e))) return n;
  throw new oo("Can't convert object to primitive value");
}, cr = { exports: {} }, be = S, so = Object.defineProperty, Qt = function(e, t) {
  try {
    so(be, e, { value: t, configurable: !0, writable: !0 });
  } catch {
    be[e] = t;
  }
  return t;
}, ao = S, co = Qt, we = "__core-js_shared__", $e = cr.exports = ao[we] || co(we, {});
($e.versions || ($e.versions = [])).push({
  version: "3.45.1",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.45.1/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var te = cr.exports, Te = te, lr = function(e, t) {
  return Te[e] || (Te[e] = t || {});
}, lo = ft, uo = Object, fo = function(e) {
  return uo(lo(e));
}, ho = T, vo = fo, po = ho({}.hasOwnProperty), x = Object.hasOwn || function(t, r) {
  return po(vo(t), r);
}, go = T, yo = 0, mo = Math.random(), bo = go(1.1.toString), ur = function(e) {
  return "Symbol(" + (e === void 0 ? "" : e) + ")_" + bo(++yo + mo, 36);
}, wo = S, $o = lr, Ee = x, To = ur, Eo = ir, So = sr, k = wo.Symbol, St = $o("wks"), Oo = So ? k.for || k : k && k.withoutSetter || To, V = function(e) {
  return Ee(St, e) || (St[e] = Eo && Ee(k, e) ? k[e] : Oo("Symbol." + e)), St[e];
}, Io = M, Se = ht, Oe = ar, Po = Jt, Co = io, Ao = V, xo = TypeError, Ro = Ao("toPrimitive"), Fo = function(e, t) {
  if (!Se(e) || Oe(e)) return e;
  var r = Po(e, Ro), n;
  if (r) {
    if (t === void 0 && (t = "default"), n = Io(r, e, t), !Se(n) || Oe(n)) return n;
    throw new xo("Can't convert object to primitive value");
  }
  return t === void 0 && (t = "number"), Co(e, t);
}, No = Fo, jo = ar, ee = function(e) {
  var t = No(e, "string");
  return jo(t) ? t : t + "";
}, ko = S, Ie = ht, Mt = ko.document, Bo = Ie(Mt) && Ie(Mt.createElement), Mo = function(e) {
  return Bo ? Mt.createElement(e) : {};
}, _o = A, Lo = C, Do = Mo, fr = !_o && !Lo(function() {
  return Object.defineProperty(Do("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), zo = A, Wo = M, Vo = Xe, Go = Qe, Ko = qt, Uo = ee, Ho = x, Yo = fr, Pe = Object.getOwnPropertyDescriptor;
Kt.f = zo ? Pe : function(t, r) {
  if (t = Ko(t), r = Uo(r), Yo) try {
    return Pe(t, r);
  } catch {
  }
  if (Ho(t, r)) return Go(!Wo(Vo.f, t, r), t[r]);
};
var dt = {}, qo = A, Xo = C, Zo = qo && Xo(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), Jo = ht, Qo = String, ti = TypeError, G = function(e) {
  if (Jo(e)) return e;
  throw new ti(Qo(e) + " is not an object");
}, ei = A, ri = fr, ni = Zo, q = G, Ce = ee, oi = TypeError, Ot = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, It = "enumerable", Pt = "configurable", Ct = "writable";
dt.f = ei ? ni ? function(t, r, n) {
  if (q(t), r = Ce(r), q(n), typeof t == "function" && r === "prototype" && "value" in n && Ct in n && !n[Ct]) {
    var o = ii(t, r);
    o && o[Ct] && (t[r] = n.value, n = {
      configurable: Pt in n ? n[Pt] : o[Pt],
      enumerable: It in n ? n[It] : o[It],
      writable: !1
    });
  }
  return Ot(t, r, n);
} : Ot : function(t, r, n) {
  if (q(t), r = Ce(r), q(n), ri) try {
    return Ot(t, r, n);
  } catch {
  }
  if ("get" in n || "set" in n) throw new oi("Accessors not supported");
  return "value" in n && (t[r] = n.value), t;
};
var si = A, ai = dt, ci = Qe, hr = si ? function(e, t, r) {
  return ai.f(e, t, ci(1, r));
} : function(e, t, r) {
  return e[t] = r, e;
}, dr = { exports: {} }, _t = A, li = x, vr = Function.prototype, ui = _t && Object.getOwnPropertyDescriptor, fi = li(vr, "name"), hi = fi && (!_t || _t && ui(vr, "name").configurable), di = {
  CONFIGURABLE: hi
}, vi = T, pi = O, Lt = te, gi = vi(Function.toString);
pi(Lt.inspectSource) || (Lt.inspectSource = function(e) {
  return gi(e);
});
var yi = Lt.inspectSource, mi = S, bi = O, Ae = mi.WeakMap, wi = bi(Ae) && /native code/.test(String(Ae)), $i = lr, Ti = ur, xe = $i("keys"), Ei = function(e) {
  return xe[e] || (xe[e] = Ti(e));
}, pr = {}, Si = wi, gr = S, Oi = hr, At = x, xt = te, Ii = Ei, Pi = pr, Re = "Object already initialized", Fe = gr.TypeError, Ci = gr.WeakMap, Dt, ct, zt, Ai = function(e) {
  return zt(e) ? ct(e) : Dt(e, {});
};
if (Si || xt.state) {
  var I = xt.state || (xt.state = new Ci());
  I.get = I.get, I.has = I.has, I.set = I.set, Dt = function(e, t) {
    if (I.has(e)) throw new Fe(Re);
    return t.facade = e, I.set(e, t), t;
  }, ct = function(e) {
    return I.get(e) || {};
  }, zt = function(e) {
    return I.has(e);
  };
} else {
  var F = Ii("state");
  Pi[F] = !0, Dt = function(e, t) {
    if (At(e, F)) throw new Fe(Re);
    return t.facade = e, Oi(e, F, t), t;
  }, ct = function(e) {
    return At(e, F) ? e[F] : {};
  }, zt = function(e) {
    return At(e, F);
  };
}
var xi = {
  get: ct,
  enforce: Ai
}, re = T, Ri = C, Fi = O, X = x, Wt = A, Ni = di.CONFIGURABLE, ji = yi, yr = xi, ki = yr.enforce, Bi = yr.get, Ne = String, rt = Object.defineProperty, Mi = re("".slice), _i = re("".replace), Li = re([].join), Di = Wt && !Ri(function() {
  return rt(function() {
  }, "length", { value: 8 }).length !== 8;
}), zi = String(String).split("String"), Wi = dr.exports = function(e, t, r) {
  Mi(Ne(t), 0, 7) === "Symbol(" && (t = "[" + _i(Ne(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), r && r.getter && (t = "get " + t), r && r.setter && (t = "set " + t), (!X(e, "name") || Ni && e.name !== t) && (Wt ? rt(e, "name", { value: t, configurable: !0 }) : e.name = t), Di && r && X(r, "arity") && e.length !== r.arity && rt(e, "length", { value: r.arity });
  try {
    r && X(r, "constructor") && r.constructor ? Wt && rt(e, "prototype", { writable: !1 }) : e.prototype && (e.prototype = void 0);
  } catch {
  }
  var n = ki(e);
  return X(n, "source") || (n.source = Li(zi, typeof t == "string" ? t : "")), e;
};
Function.prototype.toString = Wi(function() {
  return Fi(this) && Bi(this).source || ji(this);
}, "toString");
var Vi = dr.exports, Gi = O, Ki = dt, Ui = Vi, Hi = Qt, Yi = function(e, t, r, n) {
  n || (n = {});
  var o = n.enumerable, s = n.name !== void 0 ? n.name : t;
  if (Gi(r) && Ui(r, s, n), n.global)
    o ? e[t] = r : Hi(t, r);
  else {
    try {
      n.unsafe ? e[t] && (o = !0) : delete e[t];
    } catch {
    }
    o ? e[t] = r : Ki.f(e, t, {
      value: r,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return e;
}, mr = {}, qi = Math.ceil, Xi = Math.floor, Zi = Math.trunc || function(t) {
  var r = +t;
  return (r > 0 ? Xi : qi)(r);
}, Ji = Zi, br = function(e) {
  var t = +e;
  return t !== t || t === 0 ? 0 : Ji(t);
}, Qi = br, ts = Math.max, es = Math.min, rs = function(e, t) {
  var r = Qi(e);
  return r < 0 ? ts(r + t, 0) : es(r, t);
}, ns = br, os = Math.min, is = function(e) {
  var t = ns(e);
  return t > 0 ? os(t, 9007199254740991) : 0;
}, ss = is, wr = function(e) {
  return ss(e.length);
}, as = qt, cs = rs, ls = wr, us = function(e) {
  return function(t, r, n) {
    var o = as(t), s = ls(o);
    if (s === 0) return !e && -1;
    var i = cs(n, s), a;
    if (e && r !== r) {
      for (; s > i; )
        if (a = o[i++], a !== a) return !0;
    } else for (; s > i; i++)
      if ((e || i in o) && o[i] === r) return e || i || 0;
    return !e && -1;
  };
}, fs = {
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: us(!1)
}, hs = T, Rt = x, ds = qt, vs = fs.indexOf, ps = pr, je = hs([].push), gs = function(e, t) {
  var r = ds(e), n = 0, o = [], s;
  for (s in r) !Rt(ps, s) && Rt(r, s) && je(o, s);
  for (; t.length > n; ) Rt(r, s = t[n++]) && (~vs(o, s) || je(o, s));
  return o;
}, ys = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], ms = gs, bs = ys, ws = bs.concat("length", "prototype");
mr.f = Object.getOwnPropertyNames || function(t) {
  return ms(t, ws);
};
var $r = {};
$r.f = Object.getOwnPropertySymbols;
var $s = Xt, Ts = T, Es = mr, Ss = $r, Os = G, Is = Ts([].concat), Ps = $s("Reflect", "ownKeys") || function(t) {
  var r = Es.f(Os(t)), n = Ss.f;
  return n ? Is(r, n(t)) : r;
}, ke = x, Cs = Ps, As = Kt, xs = dt, Rs = function(e, t, r) {
  for (var n = Cs(t), o = xs.f, s = As.f, i = 0; i < n.length; i++) {
    var a = n[i];
    !ke(e, a) && !(r && ke(r, a)) && o(e, a, s(t, a));
  }
}, Fs = C, Ns = O, js = /#|\.prototype\./, K = function(e, t) {
  var r = Bs[ks(e)];
  return r === _s ? !0 : r === Ms ? !1 : Ns(t) ? Fs(t) : !!t;
}, ks = K.normalize = function(e) {
  return String(e).replace(js, ".").toLowerCase();
}, Bs = K.data = {}, Ms = K.NATIVE = "N", _s = K.POLYFILL = "P", Ls = K, Z = S, Ds = Kt.f, zs = hr, Ws = Yi, Vs = Qt, Gs = Rs, Ks = Ls, Tr = function(e, t) {
  var r = e.target, n = e.global, o = e.stat, s, i, a, l, c, u;
  if (n ? i = Z : o ? i = Z[r] || Vs(r, {}) : i = Z[r] && Z[r].prototype, i) for (a in t) {
    if (c = t[a], e.dontCallGetSet ? (u = Ds(i, a), l = u && u.value) : l = i[a], s = Ks(n ? a : r + (o ? "." : "#") + a, e.forced), !s && l !== void 0) {
      if (typeof c == typeof l) continue;
      Gs(c, l);
    }
    (e.sham || l && l.sham) && zs(c, "sham", !0), Ws(i, a, c, e);
  }
}, Us = Ht, Hs = T, Ys = function(e) {
  if (Us(e) === "Function") return Hs(e);
}, Be = Ys, qs = W, Xs = Ut, Zs = Be(Be.bind), Js = function(e, t) {
  return qs(e), t === void 0 ? e : Xs ? Zs(e, t) : function() {
    return e.apply(t, arguments);
  };
}, Er = {}, Qs = V, ta = Er, ea = Qs("iterator"), ra = Array.prototype, na = function(e) {
  return e !== void 0 && (ta.Array === e || ra[ea] === e);
}, oa = V, ia = oa("toStringTag"), Sr = {};
Sr[ia] = "z";
var sa = String(Sr) === "[object z]", aa = sa, ca = O, nt = Ht, la = V, ua = la("toStringTag"), fa = Object, ha = nt(/* @__PURE__ */ function() {
  return arguments;
}()) === "Arguments", da = function(e, t) {
  try {
    return e[t];
  } catch {
  }
}, va = aa ? nt : function(e) {
  var t, r, n;
  return e === void 0 ? "Undefined" : e === null ? "Null" : typeof (r = da(t = fa(e), ua)) == "string" ? r : ha ? nt(t) : (n = nt(t)) === "Object" && ca(t.callee) ? "Arguments" : n;
}, pa = va, Me = Jt, ga = Yt, ya = Er, ma = V, ba = ma("iterator"), Or = function(e) {
  if (!ga(e)) return Me(e, ba) || Me(e, "@@iterator") || ya[pa(e)];
}, wa = M, $a = W, Ta = G, Ea = Zt, Sa = Or, Oa = TypeError, Ia = function(e, t) {
  var r = arguments.length < 2 ? Sa(e) : t;
  if ($a(r)) return Ta(wa(r, e));
  throw new Oa(Ea(e) + " is not iterable");
}, Pa = M, _e = G, Ca = Jt, Aa = function(e, t, r) {
  var n, o;
  _e(e);
  try {
    if (n = Ca(e, "return"), !n) {
      if (t === "throw") throw r;
      return r;
    }
    n = Pa(n, e);
  } catch (s) {
    o = !0, n = s;
  }
  if (t === "throw") throw r;
  if (o) throw n;
  return _e(n), r;
}, xa = Js, Ra = M, Fa = G, Na = Zt, ja = na, ka = wr, Le = nr, Ba = Ia, Ma = Or, De = Aa, _a = TypeError, ot = function(e, t) {
  this.stopped = e, this.result = t;
}, ze = ot.prototype, Ir = function(e, t, r) {
  var n = r && r.that, o = !!(r && r.AS_ENTRIES), s = !!(r && r.IS_RECORD), i = !!(r && r.IS_ITERATOR), a = !!(r && r.INTERRUPTED), l = xa(t, n), c, u, f, d, h, g, $, v = function(p) {
    return c && De(c, "normal"), new ot(!0, p);
  }, b = function(p) {
    return o ? (Fa(p), a ? l(p[0], p[1], v) : l(p[0], p[1])) : a ? l(p, v) : l(p);
  };
  if (s)
    c = e.iterator;
  else if (i)
    c = e;
  else {
    if (u = Ma(e), !u) throw new _a(Na(e) + " is not iterable");
    if (ja(u)) {
      for (f = 0, d = ka(e); d > f; f++)
        if (h = b(e[f]), h && Le(ze, h)) return h;
      return new ot(!1);
    }
    c = Ba(e, u);
  }
  for (g = s ? e.next : c.next; !($ = Ra(g, c)).done; ) {
    try {
      h = b($.value);
    } catch (p) {
      De(c, "throw", p);
    }
    if (typeof h == "object" && h && Le(ze, h)) return h;
  }
  return new ot(!1);
}, J = T, Q = Map.prototype, La = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: J(Q.set),
  get: J(Q.get),
  has: J(Q.has),
  remove: J(Q.delete)
}, Da = Tr, za = T, Wa = W, Va = ft, Ga = Ir, vt = La, Ka = C, Pr = vt.Map, Ua = vt.has, Ha = vt.get, Ya = vt.set, qa = za([].push), Xa = Ka(function() {
  return Pr.groupBy("ab", function(e) {
    return e;
  }).get("a").length !== 1;
});
Da({ target: "Map", stat: !0, forced: Xa }, {
  groupBy: function(t, r) {
    Va(t), Wa(r);
    var n = new Pr(), o = 0;
    return Ga(t, function(s) {
      var i = r(s, o++);
      Ua(n, i) ? qa(Ha(n, i), s) : Ya(n, i, [s]);
    }), n;
  }
});
var Za = Tr, Ja = Xt, Qa = T, tc = W, ec = ft, rc = ee, nc = Ir, oc = C, We = Object.groupBy, ic = Ja("Object", "create"), sc = Qa([].push), ac = !We || oc(function() {
  return We("ab", function(e) {
    return e;
  }).a.length !== 1;
});
Za({ target: "Object", stat: !0, forced: ac }, {
  groupBy: function(t, r) {
    ec(t), tc(r);
    var n = ic(null), o = 0;
    return nc(t, function(s) {
      var i = rc(r(s, o++));
      i in n ? sc(n[i], s) : n[i] = [s];
    }), n;
  }
});
function cc(e, t) {
  e.addEventListener(
    "keyup",
    (r) => {
      r.key === "ArrowUp" || r.key === "ArrowRight" ? t("next") : (r.key === "ArrowDown" || r.key === "ArrowLeft") && t("prev");
    },
    !1
  );
}
function lc(e, t) {
  let o = 0, s;
  e.addEventListener("wheel", (i) => {
    i.ignore || (i.ignore = !0, clearTimeout(s), o += i.deltaY, s = setTimeout(() => {
      if (Math.abs(o) >= 750) {
        let a = Math.sign(o) > 0 ? "next" : "prev";
        t(a), o = 0;
      }
      o = 0;
    }, 50));
  });
}
function uc(e, t) {
  let s, i, a;
  e.addEventListener(
    "touchstart",
    (l) => {
      l.ignore || (l.ignore = !0, s = l.changedTouches[0].pageX, i = l.changedTouches[0].pageY, a = Date.now());
    },
    !1
  ), e.addEventListener(
    "touchend",
    (l) => {
      if (l.ignore) return;
      l.ignore = !0;
      const c = l.changedTouches[0].pageX - s, u = l.changedTouches[0].pageY - i;
      Date.now() - a <= 500 && (Math.abs(c) >= 50 && Math.abs(u) <= 200 ? t(c < 0 ? "next" : "prev") : Math.abs(u) >= 50 && Math.abs(c) <= 200 ? t(u < 0 ? "up" : "down") : (e?.defaultView?.getSelection()?.removeAllRanges(), e.dispatchEvent(
        new MouseEvent("click", {
          clientX: s,
          clientY: i
        })
      ), l.preventDefault()));
    },
    !1
  );
}
const fc = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, hc = { class: "reader" }, dc = { class: "viewHolder" }, vc = { key: 0 }, pc = {
  __name: "BookView",
  props: {
    url: {
      type: [String, File]
    },
    location: {
      type: [String, Number]
    },
    tocChanged: Function,
    getRendition: Function
  },
  emits: ["update:location"],
  setup(e, { expose: t, emit: r }) {
    const n = e, { tocChanged: o, getRendition: s } = n, { url: i, location: a } = Ft(n), l = r;
    let c = null;
    const u = z(null), f = z(!1), d = ({ spacing: y, justify: m, hyphenate: ne }) => `
    @namespace epub "http://www.idpf.org/2007/ops";
    html {
        color-scheme: light dark;
    }
    /* https://github.com/whatwg/html/issues/5426 */
    @media (prefers-color-scheme: dark) {
        a:link {
            color: lightblue;
        }
    }
    p, li, blockquote, dd {
        line-height: ${y};
        text-align: justify;
        -webkit-hyphens: auto;
        hyphens: auto;
        -webkit-hyphenate-limit-before: 3;
        -webkit-hyphenate-limit-after: 2;
        -webkit-hyphenate-limit-lines: 2;
        hanging-punctuation: allow-end last;
        widows: 2;
    }
    /* prevent the above from overriding the align attribute */
    [align="left"] { text-align: left; }
    [align="right"] { text-align: right; }
    [align="center"] { text-align: center; }
    [align="justify"] { text-align: justify; }

    pre {
        white-space: pre-wrap !important;
    }
    aside[epub|type~="endnote"],
    aside[epub|type~="footnote"],
    aside[epub|type~="note"],
    aside[epub|type~="rearnote"] {
        display: none;
    }
`, h = async () => {
      c = document.createElement("foliate-view"), u.value.append(c), i.value && (c && c.close(), typeof i.value == "string" ? (await c.open(i.value), g()) : (c = await getView(i.value, u.value), g()));
    }, g = () => {
      f.value = !0;
      const { book: y } = c;
      c.renderer.setStyles?.(
        d({
          spacing: 1.4,
          justify: !0,
          hyphenate: !0
        })
      ), v(), s(c), o && o(y.toc), a.value ? c?.goTo(a.value) : c.renderer.next();
    }, $ = (y) => {
      y === "next" ? R() : y === "prev" && U();
    }, v = () => {
      c.addEventListener("load", b), c.addEventListener("relocate", p);
    }, b = ({ detail: { doc: y } }) => {
      lc(y, $), uc(y, $), cc(y, $);
    }, p = ({ detail: y }) => {
      l("update:location", y);
    }, R = () => c?.next(), U = () => c?.prev(), pt = (y) => c?.goTo(y);
    return Cr(i, () => {
      h();
    }), Ar(() => {
      h();
    }), t({
      nextPage: R,
      prevPage: U,
      setLocation: pt
    }), (y, m) => (j(), N("div", hc, [
      P("div", dc, [
        xr(P("div", {
          ref_key: "viewer",
          ref: u,
          id: "viewer"
        }, null, 512), [
          [Rr, f.value]
        ]),
        f.value ? tt("", !0) : (j(), N("div", vc, [
          Nt(y.$slots, "loadingView", {}, void 0, !0)
        ]))
      ])
    ]));
  }
}, gc = /* @__PURE__ */ fc(pc, [["__scopeId", "data-v-69257aa4"]]), yc = { class: "container" }, mc = ["title"], bc = { key: 0 }, wc = { class: "tocArea" }, Sc = {
  __name: "VueReader",
  props: {
    title: {
      type: String
    },
    showToc: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String,
      default: ""
    },
    getRendition: {
      type: Function
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    }
  },
  setup(e) {
    const t = Fr({
      name: "TocComponent",
      props: {
        toc: {
          type: Array,
          default: () => []
        },
        current: {
          type: [String, Number],
          default: ""
        },
        setLocation: {
          type: Function,
          required: !0
        },
        isSubmenu: {
          type: Boolean,
          default: !1,
          required: !1
        }
      },
      setup(v) {
        const b = Nr(), p = jr.bind(b), { setLocation: R, isSubmenu: U } = v, { toc: pt, current: y } = Ft(v);
        return () => pt.value.map((m, ne) => p("div", { key: ne }, [
          p(
            "button",
            {
              class: [
                "tocAreaButton",
                m.href === y.value ? "active" : ""
              ],
              onClick: () => {
                m.subitems && m.subitems.length > 0 ? (m.expansion = !m.expansion, R(m.href, !1)) : R(m.href);
              }
            },
            [
              U ? " ".repeat(4) + m.label : m.label,
              // 展开
              m.subitems && m.subitems.length > 0 && p("div", {
                class: `${m.expansion ? "open" : ""} expansion`
              })
            ]
          ),
          //多级目录
          m.subitems && m.subitems.length > 0 && p(
            kr,
            { name: "collapse-transition" },
            {
              default: () => p(
                "div",
                {
                  style: {
                    display: m.expansion ? void 0 : "none"
                  }
                },
                [
                  p(t, {
                    toc: m.subitems,
                    current: y.value,
                    setLocation: R,
                    isSubmenu: !0
                  })
                ]
              )
            }
          )
        ]));
      }
    }), r = e, n = Br({
      toc: [],
      //目录
      expandedToc: !1
      //目录展开
    }), { getRendition: o } = r, { toc: s, expandedToc: i } = Ft(n), a = z(null), l = z(null), c = z(""), u = (v) => {
      o && o(v);
      const { book: b } = v, p = b.metadata?.title;
      c.value = p || "";
    }, f = (v) => {
      s.value = v;
    }, d = () => {
      i.value = !i.value;
    }, h = () => {
      a.value?.nextPage();
    }, g = () => {
      a.value?.prevPage();
    }, $ = (v, b = !0) => {
      a.value.setLocation(v), i.value = !1, i.value = !b;
    };
    return (v, b) => (j(), N("div", yc, [
      P("div", {
        class: oe(["readerArea", { containerExpanded: _(i) }]),
        style: Mr({ backgroundColor: e.backgroundColor })
      }, [
        e.showToc ? (j(), N("button", {
          key: 0,
          class: oe(["tocButton", { tocButtonExpanded: _(i) }]),
          type: "button",
          onClick: d
        }, [...b[0] || (b[0] = [
          P("span", {
            class: "tocButtonBar",
            style: { top: "35%" }
          }, null, -1),
          P("span", {
            class: "tocButtonBar",
            style: { top: "66%" }
          }, null, -1)
        ])], 2)) : tt("", !0),
        Nt(v.$slots, "title", {}, () => [
          P("div", {
            class: "titleArea",
            title: e.title || c.value
          }, _r(e.title || c.value), 9, mc)
        ]),
        ie(gc, Lr({
          ref_key: "bookRef",
          ref: a
        }, v.$attrs, {
          tocChanged: f,
          getRendition: u
        }), {
          loadingView: Dr(() => [
            Nt(v.$slots, "loadingView", {}, () => [
              b[1] || (b[1] = P("div", { class: "loadingView" }, "Loading…", -1))
            ])
          ]),
          _: 3
        }, 16),
        P("button", {
          class: "arrow pre",
          onClick: g
        }, "‹"),
        P("button", {
          class: "arrow next",
          onClick: h
        }, "›")
      ], 6),
      e.showToc ? (j(), N("div", bc, [
        P("div", wc, [
          ie(_(t), {
            toc: _(s),
            current: l.value,
            setLocation: $
          }, null, 8, ["toc", "current"])
        ]),
        _(i) ? (j(), N("div", {
          key: 0,
          class: "tocBackground",
          onClick: d
        })) : tt("", !0)
      ])) : tt("", !0)
    ]));
  }
};
export {
  gc as B,
  Sc as _,
  Zr as a,
  Tc as f,
  it as p,
  Ec as t
};
