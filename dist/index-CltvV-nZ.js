import { toRefs as Ft, ref as W, watch as Rr, onMounted as Fr, createElementBlock as j, openBlock as N, createElementVNode as C, withDirectives as jr, createCommentVNode as tt, vShow as Nr, renderSlot as jt, defineComponent as _r, getCurrentInstance as kr, h as Br, Transition as Mr, reactive as Lr, normalizeStyle as Dr, normalizeClass as oe, unref as L, createVNode as ie, toDisplayString as zr, mergeProps as Wr, withCtx as Gr } from "vue";
const Kr = (e, t) => e.map((r, n, o) => t(r, n, o) ? n : null).filter((r) => r != null), Ge = (e, t) => [-1, ...t, e.length].reduce(({ xs: r, a: n }, o) => ({ xs: r?.concat([e.slice(n + 1, o)]) ?? [], a: o }), {}).xs, Vr = (e, t) => e.slice(0, -1).concat([e[e.length - 1].concat(t[0])]).concat(t.slice(1)), gt = /\d/, ct = /^epubcfi\((.*)\)$/, se = (e) => e.replace(/[\^[\](),;=]/g, "^$&"), Ke = (e) => ct.test(e) ? e : `epubcfi(${e})`, Ur = (e) => e.match(ct)?.[1] ?? e, Hr = (e) => (...t) => `epubcfi(${e(...t.map((r) => r.match(ct)?.[1] ?? r))})`, qr = Hr((...e) => e.join("!")), Yr = (e) => {
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
}, Ve = (e, t) => Kr(e, ([r]) => r === t), Zr = (e) => {
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
}, ae = (e) => Ge(e, Ve(e, "!")).map(Zr), k = (e) => {
  const t = Yr(Ur(e)), r = Ve(t, ",");
  if (!r.length) return ae(t);
  const [n, o, s] = Ge(t, r).map(ae);
  return { parent: n, start: o, end: s };
}, Jr = ({ index: e, id: t, offset: r, temporal: n, spatial: o, text: s, side: i }) => {
  const a = i ? `;s=${i}` : "";
  return `/${e}` + (t ? `[${se(t)}${a}]` : "") + (r != null && e % 2 ? `:${r}` : "") + (n ? `~${n}` : "") + (o ? `@${o.join(":")}` : "") + (s || !t && i ? "[" + (s?.map(se)?.join(",") ?? "") + a + "]" : "");
}, Ue = (e) => e.parent ? [e.parent, e.start, e.end].map(Ue).join(",") : e.map((t) => t.map(Jr).join("")).join("!"), lt = (e) => Ke(Ue(e)), E = (e, t) => typeof e == "string" ? lt(E(k(e), t)) : e.parent ? Vr(e.parent, e[t ? "end" : "start"]) : e, Xr = (e, t) => {
  typeof e == "string" && (e = k(e)), typeof t == "string" && (t = k(t)), e = E(e), t = E(t, !0);
  const r = e[e.length - 1], n = t[t.length - 1], o = [], s = [], i = [];
  let a = !0;
  const l = Math.max(r.length, n.length);
  for (let u = 0; u < l; u++) {
    const f = r[u], d = n[u];
    a &&= f?.index === d?.index && !f?.offset && !d?.offset, a ? o.push(f) : (f && s.push(f), d && i.push(d));
  }
  const c = e.slice(0, -1).concat([o]);
  return lt({ parent: c, start: [s], end: [i] });
}, Nt = (e, t) => {
  if (typeof e == "string" && (e = k(e)), typeof t == "string" && (t = k(t)), e.start || t.start) return Nt(E(e), E(t)) || Nt(E(e, !0), E(t, !0));
  for (let r = 0; r < Math.max(e.length, t.length); r++) {
    const n = e[r] ?? [], o = t[r] ?? [], s = Math.max(n.length, o.length) - 1;
    for (let i = 0; i <= s; i++) {
      const a = n[i], l = o[i];
      if (!a) return -1;
      if (!l || a.index > l.index) return 1;
      if (a.index < l.index) return -1;
      if (i === s) {
        if (a.offset > l.offset) return 1;
        if (a.offset < l.offset) return -1;
      }
    }
  }
  return 0;
}, _t = ({ nodeType: e }) => e === 3 || e === 4, et = ({ nodeType: e }) => e === 1, He = (e, t) => {
  const r = Array.from(e.childNodes).filter((n) => _t(n) || et(n));
  return t ? r.map((n) => {
    const o = t(n);
    return o === NodeFilter.FILTER_REJECT ? null : o === NodeFilter.FILTER_SKIP ? He(n, t) : n;
  }).flat().filter((n) => n) : r;
}, Kt = (e, t) => {
  const r = He(e, t).reduce((n, o) => {
    let s = n[n.length - 1];
    return s ? _t(o) ? Array.isArray(s) ? s.push(o) : _t(s) ? n[n.length - 1] = [s, o] : n.push(o) : et(s) ? n.push(null, o) : n.push(o) : n.push(o), n;
  }, []);
  return et(r[0]) && r.unshift("first"), et(r[r.length - 1]) && r.push("last"), r.unshift("before"), r.push("after"), r;
}, kt = (e, t, r) => {
  const { id: n } = t[t.length - 1];
  if (n) {
    const i = e.ownerDocument.getElementById(n);
    if (i) return { node: i, offset: 0 };
  }
  for (const { index: i } of t) {
    const a = e ? Kt(e, r)[i] : null;
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
}, it = (e, t, r) => {
  const { parentNode: n, id: o } = e, s = Kt(n, r), i = s.findIndex((c) => Array.isArray(c) ? c.some((u) => u === e) : c === e), a = s[i];
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
  return (n !== e.ownerDocument.documentElement ? it(n, null, r).concat(l) : [l]).filter((c) => c.index !== -1);
}, qe = (e, t) => {
  const { startContainer: r, startOffset: n, endContainer: o, endOffset: s } = e, i = it(r, n, t);
  if (e.collapsed) return lt([i]);
  const a = it(o, s, t);
  return Xr([i], [a]);
}, Ye = (e, t, r) => {
  const n = E(t), o = E(t, !0), s = e.documentElement, i = kt(s, n[0], r), a = kt(s, o[0], r), l = e.createRange();
  return i.before ? l.setStartBefore(i.node) : i.after ? l.setStartAfter(i.node) : l.setStart(i.node, i.offset), a.before ? l.setEndBefore(a.node) : a.after ? l.setEndAfter(a.node) : l.setEnd(a.node, a.offset), l;
}, $c = (e) => {
  const t = [], { parentNode: r } = e[0], n = it(r);
  for (const [o, s] of Kt(r).entries()) {
    const i = e[t.length];
    s === i && t.push(lt([n.concat({ id: i.id, index: o })]));
  }
  return t;
}, Tc = (e, t) => kt(e.documentElement, E(t)).node, ce = {
  fromIndex: (e) => Ke(`/6/${(e + 1) * 2}`),
  toIndex: (e) => e?.at(-1).index / 2 - 1
}, Qr = (e) => {
  let t = 0;
  const r = (n) => {
    if (n.id = t++, n.subitems) for (const o of n.subitems) r(o);
  };
  for (const n of e) r(n);
  return e;
}, Ze = (e) => e.map((t) => t.subitems?.length ? [t, Ze(t.subitems)].flat() : t).flat();
class le {
  async init({ toc: t, ids: r, splitHref: n, getFragment: o }) {
    Qr(t);
    const s = Ze(t), i = /* @__PURE__ */ new Map();
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
class tn {
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
const b = (e) => document.createElementNS("http://www.w3.org/2000/svg", e);
class ue {
  #e = b("svg");
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
    const { color: n = "red", width: o = 2, writingMode: s } = r, i = b("g");
    if (i.setAttribute("fill", n), s === "vertical-rl" || s === "vertical-lr")
      for (const { right: a, top: l, height: c } of t) {
        const u = b("rect");
        u.setAttribute("x", a - o), u.setAttribute("y", l), u.setAttribute("height", c), u.setAttribute("width", o), i.append(u);
      }
    else for (const { left: a, bottom: l, width: c } of t) {
      const u = b("rect");
      u.setAttribute("x", a), u.setAttribute("y", l - o), u.setAttribute("height", o), u.setAttribute("width", c), i.append(u);
    }
    return i;
  }
  static strikethrough(t, r = {}) {
    const { color: n = "red", width: o = 2, writingMode: s } = r, i = b("g");
    if (i.setAttribute("fill", n), s === "vertical-rl" || s === "vertical-lr")
      for (const { right: a, left: l, top: c, height: u } of t) {
        const f = b("rect");
        f.setAttribute("x", (a + l) / 2), f.setAttribute("y", c), f.setAttribute("height", u), f.setAttribute("width", o), i.append(f);
      }
    else for (const { left: a, top: l, bottom: c, width: u } of t) {
      const f = b("rect");
      f.setAttribute("x", a), f.setAttribute("y", (l + c) / 2), f.setAttribute("height", o), f.setAttribute("width", u), i.append(f);
    }
    return i;
  }
  static squiggly(t, r = {}) {
    const { color: n = "red", width: o = 2, writingMode: s } = r, i = b("g");
    i.setAttribute("fill", "none"), i.setAttribute("stroke", n), i.setAttribute("stroke-width", o);
    const a = o * 1.5;
    if (s === "vertical-rl" || s === "vertical-lr")
      for (const { right: l, top: c, height: u } of t) {
        const f = b("path"), d = Math.round(u / a / 1.5), h = u / d, g = Array.from(
          { length: d },
          ($, v) => `l${v % 2 ? -a : a} ${h}`
        ).join("");
        f.setAttribute("d", `M${l} ${c}${g}`), i.append(f);
      }
    else for (const { left: l, bottom: c, width: u } of t) {
      const f = b("path"), d = Math.round(u / a / 1.5), h = u / d, g = Array.from(
        { length: d },
        ($, v) => `l${h} ${v % 2 ? a : -a}`
      ).join("");
      f.setAttribute("d", `M${l} ${c}${g}`), i.append(f);
    }
    return i;
  }
  static highlight(t, r = {}) {
    const { color: n = "red" } = r, o = b("g");
    o.setAttribute("fill", n), o.style.opacity = "var(--overlayer-highlight-opacity, .3)", o.style.mixBlendMode = "var(--overlayer-highlight-blend-mode, normal)";
    for (const { left: s, top: i, height: a, width: l } of t) {
      const c = b("rect");
      c.setAttribute("x", s), c.setAttribute("y", i), c.setAttribute("height", a), c.setAttribute("width", l), o.append(c);
    }
    return o;
  }
  static outline(t, r = {}) {
    const { color: n = "red", width: o = 3, radius: s = 3 } = r, i = b("g");
    i.setAttribute("fill", "none"), i.setAttribute("stroke", n), i.setAttribute("stroke-width", o);
    for (const { left: a, top: l, height: c, width: u } of t) {
      const f = b("rect");
      f.setAttribute("x", a), f.setAttribute("y", l), f.setAttribute("height", c), f.setAttribute("width", u), f.setAttribute("rx", s), i.append(f);
    }
    return i;
  }
  // make an exact copy of an image in the overlay
  // one can then apply filters to the entire element, without affecting them;
  // it's a bit silly and probably better to just invert images twice
  // (though the color will be off in that case if you do heu-rotate)
  static copyImage([t], r = {}) {
    const { src: n } = r, o = b("image"), { left: s, top: i, height: a, width: l } = t;
    return o.setAttribute("href", n), o.setAttribute("x", s), o.setAttribute("y", i), o.setAttribute("height", a), o.setAttribute("width", l), o;
  }
}
const en = (e, t) => {
  const r = [];
  for (let n = t.currentNode; n; n = t.nextNode()) {
    const o = e.comparePoint(n, 0);
    if (o === 0) r.push(n);
    else if (o > 0) break;
  }
  return r;
}, rn = (e, t) => {
  const r = [];
  for (let n = t.nextNode(); n; n = t.nextNode())
    r.push(n);
  return r;
}, nn = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_CDATA_SECTION, on = (e) => {
  if (e.nodeType === 1) {
    const t = e.tagName.toLowerCase();
    return t === "script" || t === "style" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
  }
  return NodeFilter.FILTER_ACCEPT;
}, fe = function* (e, t, r) {
  const n = e.commonAncestorContainer ?? e.body ?? e, o = document.createTreeWalker(n, nn, { acceptNode: r || on }), i = (e.commonAncestorContainer ? en : rn)(e, o), a = i.map((c) => c.nodeValue), l = (c, u, f, d) => {
    const h = document.createRange();
    return h.setStart(i[c], u), h.setEnd(i[f], d), h;
  };
  for (const c of t(a, l)) yield c;
}, D = "foliate-search:", sn = async (e) => {
  const t = new Uint8Array(await e.slice(0, 4).arrayBuffer());
  return t[0] === 80 && t[1] === 75 && t[2] === 3 && t[3] === 4;
}, an = async (e) => {
  const t = new Uint8Array(await e.slice(0, 5).arrayBuffer());
  return t[0] === 37 && t[1] === 80 && t[2] === 68 && t[3] === 70 && t[4] === 45;
}, cn = ({ name: e, type: t }) => t === "application/vnd.comicbook+zip" || e.endsWith(".cbz"), ln = ({ name: e, type: t }) => t === "application/x-fictionbook+xml" || e.endsWith(".fb2"), un = ({ name: e, type: t }) => t === "application/x-zip-compressed-fb2" || e.endsWith(".fb2.zip") || e.endsWith(".fbz"), fn = async (e) => {
  const { configure: t, ZipReader: r, BlobReader: n, TextWriter: o, BlobWriter: s } = await import("./zip-B9RiG7Pn.js");
  t({ useWebWorkers: !1 });
  const a = await new r(new n(e)).getEntries(), l = new Map(a.map((h) => [h.filename, h])), c = (h) => (g, ...$) => l.has(g) ? h(l.get(g), ...$) : null, u = c((h) => h.getData(new o())), f = c((h, g) => h.getData(new s(g)));
  return { entries: a, loadText: u, loadBlob: f, getSize: (h) => l.get(h)?.uncompressedSize ?? 0 };
}, Je = async (e) => e.isFile ? e : (await Promise.all(Array.from(
  await new Promise((t, r) => e.createReader().readEntries((n) => t(n), (n) => r(n))),
  Je
))).flat(), hn = async (e) => {
  const t = await Je(e), r = await Promise.all(
    t.map((u) => new Promise((f, d) => u.file(
      (h) => f([h, u.fullPath]),
      (h) => d(h)
    )))
  ), n = new Map(r.map(([u, f]) => [f.replace(e.fullPath + "/", ""), u])), o = new TextDecoder(), s = (u) => u ? o.decode(u) : null, i = (u) => n.get(u)?.arrayBuffer() ?? null;
  return { loadText: async (u) => s(await i(u)), loadBlob: (u) => n.get(u), getSize: (u) => n.get(u)?.size ?? 0 };
};
class dn extends Error {
}
class vn extends Error {
}
class pn extends Error {
}
const gn = async (e) => {
  const t = await fetch(e);
  if (!t.ok) throw new dn(
    `${t.status} ${t.statusText}`,
    { cause: t }
  );
  return new File([await t.blob()], new URL(t.url).pathname);
}, yn = async (e) => {
  typeof e == "string" && (e = await gn(e));
  let t;
  if (e.isDirectory) {
    const r = await hn(e), { EPUB: n } = await import("./epub-kXG-7wEO.js");
    t = await new n(r).init();
  } else if (e.size) if (await sn(e)) {
    const r = await fn(e);
    if (cn(e)) {
      const { makeComicBook: n } = await import("./comic-book-D8f_Cc7Q.js");
      t = n(r, e);
    } else if (un(e)) {
      const { makeFB2: n } = await import("./fb2-DCqZtzQ5.js"), { entries: o } = r, s = o.find((a) => a.filename.endsWith(".fb2")), i = await r.loadBlob((s ?? o[0]).filename);
      t = await n(i);
    } else {
      const { EPUB: n } = await import("./epub-kXG-7wEO.js");
      t = await new n(r).init();
    }
  } else if (await an(e)) {
    const { makePDF: r } = await import("./pdf-CPKoEzBn.js");
    t = await r(e);
  } else {
    const { isMOBI: r, MOBI: n } = await import("./mobi-B7fof60X.js");
    if (await r(e)) {
      const o = await import("./fflate-D9v8asEo.js");
      t = await new n({ unzlib: o.unzlibSync }).open(e);
    } else if (ln(e)) {
      const { makeFB2: o } = await import("./fb2-DCqZtzQ5.js");
      t = await o(e);
    }
  }
  else throw new vn("File not found");
  if (!t) throw new pn("File type not supported");
  return t;
};
class Vt {
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
    return new Vt(t, this.#n, this.#r);
  }
  hide() {
    this.#t.style.cursor = "none", this.#r.hidden = !0;
  }
  show() {
    this.#t.style.removeProperty("cursor"), this.#r.hidden = !1;
  }
}
class mn extends EventTarget {
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
const bn = (e) => {
  if (!e) return {};
  try {
    const t = Intl.getCanonicalLocales(e)[0], r = new Intl.Locale(t), n = ["zh", "ja", "kr"].includes(r.language), o = (r.getTextInfo?.() ?? r.textInfo)?.direction;
    return { canonical: t, locale: r, isCJK: n, direction: o };
  } catch (t) {
    return console.warn(t), {};
  }
};
class wn extends HTMLElement {
  #e = this.attachShadow({ mode: "closed" });
  #t;
  #n;
  #r;
  #i = /* @__PURE__ */ new Map();
  #a = new Vt(this, () => this.hasAttribute("autohide-cursor"));
  isFixedLayout = !1;
  lastLocation;
  history = new mn();
  constructor() {
    super(), this.history.addEventListener("popstate", ({ detail: t }) => {
      const r = this.resolveNavigation(t.state);
      this.renderer.goTo(r);
    });
  }
  async open(t) {
    if ((typeof t == "string" || typeof t.arrayBuffer == "function" || t.isDirectory) && (t = await yn(t)), this.book = t, this.language = bn(t.metadata?.language), t.splitTOCHref && t.getTOCFragment) {
      const r = t.sections.map((s) => s.id);
      this.#t = new tn(t.sections, 1500, 1600);
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
    if (n.startsWith(D)) {
      const l = n.replace(D, ""), { index: c, anchor: u } = await this.resolveNavigation(l), f = this.#s(c);
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
      i && !i.startsWith(D) && this.#o("show-annotation", { value: i, index: r, range: a });
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
    return r ? qr(n, qe(r)) : n;
  }
  resolveCFI(t) {
    if (this.book.resolveCFI)
      return this.book.resolveCFI(t);
    {
      const r = k(t);
      return { index: ce.toIndex((r.parent ?? r).shift()), anchor: (s) => Ye(s, r) };
    }
  }
  resolveNavigation(t) {
    try {
      if (typeof t == "number") return { index: t };
      if (typeof t.fraction == "number") {
        const [r, n] = this.#t.getSection(t.fraction);
        return { index: r, anchor: n };
      }
      return ct.test(t) ? this.resolveCFI(t) : this.book.resolveHref(t);
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
        const c = l.subitems.map(({ cfi: u }) => ({ value: D + u }));
        this.#i.set(l.index, c);
        for (const u of c) this.addAnnotation(u);
        yield {
          label: this.#n.getProgress(l.index)?.label ?? "",
          subitems: l.subitems
        };
      } else {
        if (l.cfi) {
          const c = { value: D + l.cfi };
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
customElements.define("foliate-view", wn);
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, z = function(e) {
  return e && e.Math === Math && e;
}, O = (
  // eslint-disable-next-line es/no-global-this -- safe
  z(typeof globalThis == "object" && globalThis) || z(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  z(typeof self == "object" && self) || z(typeof H == "object" && H) || z(typeof H == "object" && H) || // eslint-disable-next-line no-new-func -- fallback
  /* @__PURE__ */ function() {
    return this;
  }() || Function("return this")()
), Ut = {}, x = function(e) {
  try {
    return !!e();
  } catch {
    return !0;
  }
}, $n = x, A = !$n(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), Tn = x, Ht = !Tn(function() {
  var e = function() {
  }.bind();
  return typeof e != "function" || e.hasOwnProperty("prototype");
}), Sn = Ht, q = Function.prototype.call, B = Sn ? q.bind(q) : function() {
  return q.apply(q, arguments);
}, Xe = {}, Qe = {}.propertyIsEnumerable, tr = Object.getOwnPropertyDescriptor, En = tr && !Qe.call({ 1: 2 }, 1);
Xe.f = En ? function(t) {
  var r = tr(this, t);
  return !!r && r.enumerable;
} : Qe;
var er = function(e, t) {
  return {
    enumerable: !(e & 1),
    configurable: !(e & 2),
    writable: !(e & 4),
    value: t
  };
}, rr = Ht, nr = Function.prototype, Bt = nr.call, On = rr && nr.bind.bind(Bt, Bt), w = rr ? On : function(e) {
  return function() {
    return Bt.apply(e, arguments);
  };
}, or = w, In = or({}.toString), Pn = or("".slice), qt = function(e) {
  return Pn(In(e), 8, -1);
}, Cn = w, xn = x, An = qt, yt = Object, Rn = Cn("".split), Fn = xn(function() {
  return !yt("z").propertyIsEnumerable(0);
}) ? function(e) {
  return An(e) === "String" ? Rn(e, "") : yt(e);
} : yt, Yt = function(e) {
  return e == null;
}, jn = Yt, Nn = TypeError, ut = function(e) {
  if (jn(e)) throw new Nn("Can't call method on " + e);
  return e;
}, _n = Fn, kn = ut, Zt = function(e) {
  return _n(kn(e));
}, mt = typeof document == "object" && document.all, I = typeof mt > "u" && mt !== void 0 ? function(e) {
  return typeof e == "function" || e === mt;
} : function(e) {
  return typeof e == "function";
}, Bn = I, ft = function(e) {
  return typeof e == "object" ? e !== null : Bn(e);
}, bt = O, Mn = I, Ln = function(e) {
  return Mn(e) ? e : void 0;
}, Jt = function(e, t) {
  return arguments.length < 2 ? Ln(bt[e]) : bt[e] && bt[e][t];
}, Dn = w, ir = Dn({}.isPrototypeOf), zn = O, he = zn.navigator, de = he && he.userAgent, Wn = de ? String(de) : "", sr = O, wt = Wn, ve = sr.process, pe = sr.Deno, ge = ve && ve.versions || pe && pe.version, ye = ge && ge.v8, S, st;
ye && (S = ye.split("."), st = S[0] > 0 && S[0] < 4 ? 1 : +(S[0] + S[1]));
!st && wt && (S = wt.match(/Edge\/(\d+)/), (!S || S[1] >= 74) && (S = wt.match(/Chrome\/(\d+)/), S && (st = +S[1])));
var Gn = st, me = Gn, Kn = x, Vn = O, Un = Vn.String, ar = !!Object.getOwnPropertySymbols && !Kn(function() {
  var e = Symbol("symbol detection");
  return !Un(e) || !(Object(e) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && me && me < 41;
}), Hn = ar, cr = Hn && !Symbol.sham && typeof Symbol.iterator == "symbol", qn = Jt, Yn = I, Zn = ir, Jn = cr, Xn = Object, lr = Jn ? function(e) {
  return typeof e == "symbol";
} : function(e) {
  var t = qn("Symbol");
  return Yn(t) && Zn(t.prototype, Xn(e));
}, Qn = String, Xt = function(e) {
  try {
    return Qn(e);
  } catch {
    return "Object";
  }
}, to = I, eo = Xt, ro = TypeError, G = function(e) {
  if (to(e)) return e;
  throw new ro(eo(e) + " is not a function");
}, no = G, oo = Yt, Qt = function(e, t) {
  var r = e[t];
  return oo(r) ? void 0 : no(r);
}, $t = B, Tt = I, St = ft, io = TypeError, so = function(e, t) {
  var r, n;
  if (t === "string" && Tt(r = e.toString) && !St(n = $t(r, e)) || Tt(r = e.valueOf) && !St(n = $t(r, e)) || t !== "string" && Tt(r = e.toString) && !St(n = $t(r, e))) return n;
  throw new io("Can't convert object to primitive value");
}, ur = { exports: {} }, be = O, ao = Object.defineProperty, te = function(e, t) {
  try {
    ao(be, e, { value: t, configurable: !0, writable: !0 });
  } catch {
    be[e] = t;
  }
  return t;
}, co = O, lo = te, we = "__core-js_shared__", $e = ur.exports = co[we] || lo(we, {});
($e.versions || ($e.versions = [])).push({
  version: "3.45.1",
  mode: "global",
  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.45.1/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var ee = ur.exports, Te = ee, fr = function(e, t) {
  return Te[e] || (Te[e] = t || {});
}, uo = ut, fo = Object, ho = function(e) {
  return fo(uo(e));
}, vo = w, po = ho, go = vo({}.hasOwnProperty), R = Object.hasOwn || function(t, r) {
  return go(po(t), r);
}, yo = w, mo = 0, bo = Math.random(), wo = yo(1.1.toString), hr = function(e) {
  return "Symbol(" + (e === void 0 ? "" : e) + ")_" + wo(++mo + bo, 36);
}, $o = O, To = fr, Se = R, So = hr, Eo = ar, Oo = cr, _ = $o.Symbol, Et = To("wks"), Io = Oo ? _.for || _ : _ && _.withoutSetter || So, K = function(e) {
  return Se(Et, e) || (Et[e] = Eo && Se(_, e) ? _[e] : Io("Symbol." + e)), Et[e];
}, Po = B, Ee = ft, Oe = lr, Co = Qt, xo = so, Ao = K, Ro = TypeError, Fo = Ao("toPrimitive"), jo = function(e, t) {
  if (!Ee(e) || Oe(e)) return e;
  var r = Co(e, Fo), n;
  if (r) {
    if (t === void 0 && (t = "default"), n = Po(r, e, t), !Ee(n) || Oe(n)) return n;
    throw new Ro("Can't convert object to primitive value");
  }
  return t === void 0 && (t = "number"), xo(e, t);
}, No = jo, _o = lr, re = function(e) {
  var t = No(e, "string");
  return _o(t) ? t : t + "";
}, ko = O, Ie = ft, Mt = ko.document, Bo = Ie(Mt) && Ie(Mt.createElement), Mo = function(e) {
  return Bo ? Mt.createElement(e) : {};
}, Lo = A, Do = x, zo = Mo, dr = !Lo && !Do(function() {
  return Object.defineProperty(zo("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), Wo = A, Go = B, Ko = Xe, Vo = er, Uo = Zt, Ho = re, qo = R, Yo = dr, Pe = Object.getOwnPropertyDescriptor;
Ut.f = Wo ? Pe : function(t, r) {
  if (t = Uo(t), r = Ho(r), Yo) try {
    return Pe(t, r);
  } catch {
  }
  if (qo(t, r)) return Vo(!Go(Ko.f, t, r), t[r]);
};
var ht = {}, Zo = A, Jo = x, Xo = Zo && Jo(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), Qo = ft, ti = String, ei = TypeError, V = function(e) {
  if (Qo(e)) return e;
  throw new ei(ti(e) + " is not an object");
}, ri = A, ni = dr, oi = Xo, Y = V, Ce = re, ii = TypeError, Ot = Object.defineProperty, si = Object.getOwnPropertyDescriptor, It = "enumerable", Pt = "configurable", Ct = "writable";
ht.f = ri ? oi ? function(t, r, n) {
  if (Y(t), r = Ce(r), Y(n), typeof t == "function" && r === "prototype" && "value" in n && Ct in n && !n[Ct]) {
    var o = si(t, r);
    o && o[Ct] && (t[r] = n.value, n = {
      configurable: Pt in n ? n[Pt] : o[Pt],
      enumerable: It in n ? n[It] : o[It],
      writable: !1
    });
  }
  return Ot(t, r, n);
} : Ot : function(t, r, n) {
  if (Y(t), r = Ce(r), Y(n), ni) try {
    return Ot(t, r, n);
  } catch {
  }
  if ("get" in n || "set" in n) throw new ii("Accessors not supported");
  return "value" in n && (t[r] = n.value), t;
};
var ai = A, ci = ht, li = er, vr = ai ? function(e, t, r) {
  return ci.f(e, t, li(1, r));
} : function(e, t, r) {
  return e[t] = r, e;
}, pr = { exports: {} }, Lt = A, ui = R, gr = Function.prototype, fi = Lt && Object.getOwnPropertyDescriptor, hi = ui(gr, "name"), di = hi && (!Lt || Lt && fi(gr, "name").configurable), vi = {
  CONFIGURABLE: di
}, pi = w, gi = I, Dt = ee, yi = pi(Function.toString);
gi(Dt.inspectSource) || (Dt.inspectSource = function(e) {
  return yi(e);
});
var mi = Dt.inspectSource, bi = O, wi = I, xe = bi.WeakMap, $i = wi(xe) && /native code/.test(String(xe)), Ti = fr, Si = hr, Ae = Ti("keys"), Ei = function(e) {
  return Ae[e] || (Ae[e] = Si(e));
}, yr = {}, Oi = $i, mr = O, Ii = vr, xt = R, At = ee, Pi = Ei, Ci = yr, Re = "Object already initialized", Fe = mr.TypeError, xi = mr.WeakMap, zt, at, Wt, Ai = function(e) {
  return Wt(e) ? at(e) : zt(e, {});
};
if (Oi || At.state) {
  var P = At.state || (At.state = new xi());
  P.get = P.get, P.has = P.has, P.set = P.set, zt = function(e, t) {
    if (P.has(e)) throw new Fe(Re);
    return t.facade = e, P.set(e, t), t;
  }, at = function(e) {
    return P.get(e) || {};
  }, Wt = function(e) {
    return P.has(e);
  };
} else {
  var F = Pi("state");
  Ci[F] = !0, zt = function(e, t) {
    if (xt(e, F)) throw new Fe(Re);
    return t.facade = e, Ii(e, F, t), t;
  }, at = function(e) {
    return xt(e, F) ? e[F] : {};
  }, Wt = function(e) {
    return xt(e, F);
  };
}
var Ri = {
  get: at,
  enforce: Ai
}, ne = w, Fi = x, ji = I, Z = R, Gt = A, Ni = vi.CONFIGURABLE, _i = mi, br = Ri, ki = br.enforce, Bi = br.get, je = String, rt = Object.defineProperty, Mi = ne("".slice), Li = ne("".replace), Di = ne([].join), zi = Gt && !Fi(function() {
  return rt(function() {
  }, "length", { value: 8 }).length !== 8;
}), Wi = String(String).split("String"), Gi = pr.exports = function(e, t, r) {
  Mi(je(t), 0, 7) === "Symbol(" && (t = "[" + Li(je(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), r && r.getter && (t = "get " + t), r && r.setter && (t = "set " + t), (!Z(e, "name") || Ni && e.name !== t) && (Gt ? rt(e, "name", { value: t, configurable: !0 }) : e.name = t), zi && r && Z(r, "arity") && e.length !== r.arity && rt(e, "length", { value: r.arity });
  try {
    r && Z(r, "constructor") && r.constructor ? Gt && rt(e, "prototype", { writable: !1 }) : e.prototype && (e.prototype = void 0);
  } catch {
  }
  var n = ki(e);
  return Z(n, "source") || (n.source = Di(Wi, typeof t == "string" ? t : "")), e;
};
Function.prototype.toString = Gi(function() {
  return ji(this) && Bi(this).source || _i(this);
}, "toString");
var Ki = pr.exports, Vi = I, Ui = ht, Hi = Ki, qi = te, Yi = function(e, t, r, n) {
  n || (n = {});
  var o = n.enumerable, s = n.name !== void 0 ? n.name : t;
  if (Vi(r) && Hi(r, s, n), n.global)
    o ? e[t] = r : qi(t, r);
  else {
    try {
      n.unsafe ? e[t] && (o = !0) : delete e[t];
    } catch {
    }
    o ? e[t] = r : Ui.f(e, t, {
      value: r,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return e;
}, wr = {}, Zi = Math.ceil, Ji = Math.floor, Xi = Math.trunc || function(t) {
  var r = +t;
  return (r > 0 ? Ji : Zi)(r);
}, Qi = Xi, $r = function(e) {
  var t = +e;
  return t !== t || t === 0 ? 0 : Qi(t);
}, ts = $r, es = Math.max, rs = Math.min, ns = function(e, t) {
  var r = ts(e);
  return r < 0 ? es(r + t, 0) : rs(r, t);
}, os = $r, is = Math.min, ss = function(e) {
  var t = os(e);
  return t > 0 ? is(t, 9007199254740991) : 0;
}, as = ss, Tr = function(e) {
  return as(e.length);
}, cs = Zt, ls = ns, us = Tr, fs = function(e) {
  return function(t, r, n) {
    var o = cs(t), s = us(o);
    if (s === 0) return !e && -1;
    var i = ls(n, s), a;
    if (e && r !== r) {
      for (; s > i; )
        if (a = o[i++], a !== a) return !0;
    } else for (; s > i; i++)
      if ((e || i in o) && o[i] === r) return e || i || 0;
    return !e && -1;
  };
}, hs = {
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: fs(!1)
}, ds = w, Rt = R, vs = Zt, ps = hs.indexOf, gs = yr, Ne = ds([].push), ys = function(e, t) {
  var r = vs(e), n = 0, o = [], s;
  for (s in r) !Rt(gs, s) && Rt(r, s) && Ne(o, s);
  for (; t.length > n; ) Rt(r, s = t[n++]) && (~ps(o, s) || Ne(o, s));
  return o;
}, ms = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], bs = ys, ws = ms, $s = ws.concat("length", "prototype");
wr.f = Object.getOwnPropertyNames || function(t) {
  return bs(t, $s);
};
var Sr = {};
Sr.f = Object.getOwnPropertySymbols;
var Ts = Jt, Ss = w, Es = wr, Os = Sr, Is = V, Ps = Ss([].concat), Cs = Ts("Reflect", "ownKeys") || function(t) {
  var r = Es.f(Is(t)), n = Os.f;
  return n ? Ps(r, n(t)) : r;
}, _e = R, xs = Cs, As = Ut, Rs = ht, Fs = function(e, t, r) {
  for (var n = xs(t), o = Rs.f, s = As.f, i = 0; i < n.length; i++) {
    var a = n[i];
    !_e(e, a) && !(r && _e(r, a)) && o(e, a, s(t, a));
  }
}, js = x, Ns = I, _s = /#|\.prototype\./, U = function(e, t) {
  var r = Bs[ks(e)];
  return r === Ls ? !0 : r === Ms ? !1 : Ns(t) ? js(t) : !!t;
}, ks = U.normalize = function(e) {
  return String(e).replace(_s, ".").toLowerCase();
}, Bs = U.data = {}, Ms = U.NATIVE = "N", Ls = U.POLYFILL = "P", Ds = U, J = O, zs = Ut.f, Ws = vr, Gs = Yi, Ks = te, Vs = Fs, Us = Ds, Er = function(e, t) {
  var r = e.target, n = e.global, o = e.stat, s, i, a, l, c, u;
  if (n ? i = J : o ? i = J[r] || Ks(r, {}) : i = J[r] && J[r].prototype, i) for (a in t) {
    if (c = t[a], e.dontCallGetSet ? (u = zs(i, a), l = u && u.value) : l = i[a], s = Us(n ? a : r + (o ? "." : "#") + a, e.forced), !s && l !== void 0) {
      if (typeof c == typeof l) continue;
      Vs(c, l);
    }
    (e.sham || l && l.sham) && Ws(c, "sham", !0), Gs(i, a, c, e);
  }
}, Hs = qt, qs = w, Ys = function(e) {
  if (Hs(e) === "Function") return qs(e);
}, ke = Ys, Zs = G, Js = Ht, Xs = ke(ke.bind), Qs = function(e, t) {
  return Zs(e), t === void 0 ? e : Js ? Xs(e, t) : function() {
    return e.apply(t, arguments);
  };
}, Or = {}, ta = K, ea = Or, ra = ta("iterator"), na = Array.prototype, oa = function(e) {
  return e !== void 0 && (ea.Array === e || na[ra] === e);
}, ia = K, sa = ia("toStringTag"), Ir = {};
Ir[sa] = "z";
var aa = String(Ir) === "[object z]", ca = aa, la = I, nt = qt, ua = K, fa = ua("toStringTag"), ha = Object, da = nt(/* @__PURE__ */ function() {
  return arguments;
}()) === "Arguments", va = function(e, t) {
  try {
    return e[t];
  } catch {
  }
}, pa = ca ? nt : function(e) {
  var t, r, n;
  return e === void 0 ? "Undefined" : e === null ? "Null" : typeof (r = va(t = ha(e), fa)) == "string" ? r : da ? nt(t) : (n = nt(t)) === "Object" && la(t.callee) ? "Arguments" : n;
}, ga = pa, Be = Qt, ya = Yt, ma = Or, ba = K, wa = ba("iterator"), Pr = function(e) {
  if (!ya(e)) return Be(e, wa) || Be(e, "@@iterator") || ma[ga(e)];
}, $a = B, Ta = G, Sa = V, Ea = Xt, Oa = Pr, Ia = TypeError, Pa = function(e, t) {
  var r = arguments.length < 2 ? Oa(e) : t;
  if (Ta(r)) return Sa($a(r, e));
  throw new Ia(Ea(e) + " is not iterable");
}, Ca = B, Me = V, xa = Qt, Aa = function(e, t, r) {
  var n, o;
  Me(e);
  try {
    if (n = xa(e, "return"), !n) {
      if (t === "throw") throw r;
      return r;
    }
    n = Ca(n, e);
  } catch (s) {
    o = !0, n = s;
  }
  if (t === "throw") throw r;
  if (o) throw n;
  return Me(n), r;
}, Ra = Qs, Fa = B, ja = V, Na = Xt, _a = oa, ka = Tr, Le = ir, Ba = Pa, Ma = Pr, De = Aa, La = TypeError, ot = function(e, t) {
  this.stopped = e, this.result = t;
}, ze = ot.prototype, Cr = function(e, t, r) {
  var n = r && r.that, o = !!(r && r.AS_ENTRIES), s = !!(r && r.IS_RECORD), i = !!(r && r.IS_ITERATOR), a = !!(r && r.INTERRUPTED), l = Ra(t, n), c, u, f, d, h, g, $, v = function(p) {
    return c && De(c, "normal"), new ot(!0, p);
  }, m = function(p) {
    return o ? (ja(p), a ? l(p[0], p[1], v) : l(p[0], p[1])) : a ? l(p, v) : l(p);
  };
  if (s)
    c = e.iterator;
  else if (i)
    c = e;
  else {
    if (u = Ma(e), !u) throw new La(Na(e) + " is not iterable");
    if (_a(u)) {
      for (f = 0, d = ka(e); d > f; f++)
        if (h = m(e[f]), h && Le(ze, h)) return h;
      return new ot(!1);
    }
    c = Ba(e, u);
  }
  for (g = s ? e.next : c.next; !($ = Fa(g, c)).done; ) {
    try {
      h = m($.value);
    } catch (p) {
      De(c, "throw", p);
    }
    if (typeof h == "object" && h && Le(ze, h)) return h;
  }
  return new ot(!1);
}, X = w, Q = Map.prototype, Da = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: X(Q.set),
  get: X(Q.get),
  has: X(Q.has),
  remove: X(Q.delete)
}, za = Er, Wa = w, Ga = G, Ka = ut, Va = Cr, dt = Da, Ua = x, xr = dt.Map, Ha = dt.has, qa = dt.get, Ya = dt.set, Za = Wa([].push), Ja = Ua(function() {
  return xr.groupBy("ab", function(e) {
    return e;
  }).get("a").length !== 1;
});
za({ target: "Map", stat: !0, forced: Ja }, {
  groupBy: function(t, r) {
    Ka(t), Ga(r);
    var n = new xr(), o = 0;
    return Va(t, function(s) {
      var i = r(s, o++);
      Ha(n, i) ? Za(qa(n, i), s) : Ya(n, i, [s]);
    }), n;
  }
});
var Xa = Er, Qa = Jt, tc = w, ec = G, rc = ut, nc = re, oc = Cr, ic = x, We = Object.groupBy, sc = Qa("Object", "create"), ac = tc([].push), cc = !We || ic(function() {
  return We("ab", function(e) {
    return e;
  }).a.length !== 1;
});
Xa({ target: "Object", stat: !0, forced: cc }, {
  groupBy: function(t, r) {
    rc(t), ec(r);
    var n = sc(null), o = 0;
    return oc(t, function(s) {
      var i = nc(r(s, o++));
      i in n ? ac(n[i], s) : n[i] = [s];
    }), n;
  }
});
const lc = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, uc = { class: "reader" }, fc = { class: "viewHolder" }, hc = { key: 0 }, dc = {
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
    const u = W(null), f = W(!1), d = ({ spacing: T, justify: vt, hyphenate: pt }) => `
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
        line-height: ${T};
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
      const { book: T } = c;
      c.renderer.setStyles?.(
        d({
          spacing: 1.4,
          justify: !0,
          hyphenate: !0
        })
      ), $(), s(c), o && o(T.toc), a.value ? c?.goTo(a.value) : c.renderer.next();
    }, $ = () => {
      c.addEventListener("relocate", v);
    }, v = ({ detail: T }) => {
      l("update:location", T);
    }, m = () => c?.next(), p = () => c?.prev(), M = (T) => c?.goTo(T);
    return Rr(i, () => {
      h();
    }), Fr(() => {
      h();
    }), t({
      nextPage: m,
      prevPage: p,
      setLocation: M
    }), (T, vt) => (N(), j("div", uc, [
      C("div", fc, [
        jr(C("div", {
          ref_key: "viewer",
          ref: u,
          id: "viewer"
        }, null, 512), [
          [Nr, f.value]
        ]),
        f.value ? tt("", !0) : (N(), j("div", hc, [
          jt(T.$slots, "loadingView", {}, void 0, !0)
        ]))
      ])
    ]));
  }
}, vc = /* @__PURE__ */ lc(dc, [["__scopeId", "data-v-9ec259e4"]]), pc = { class: "container" }, gc = ["title"], yc = { key: 0 }, mc = { class: "tocArea" }, Sc = {
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
    const t = _r({
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
        const m = kr(), p = Br.bind(m), { setLocation: M, isSubmenu: T } = v, { toc: vt, current: pt } = Ft(v);
        return () => vt.value.map((y, Ar) => p("div", { key: Ar }, [
          p(
            "button",
            {
              class: [
                "tocAreaButton",
                y.href === pt.value ? "active" : ""
              ],
              onClick: () => {
                y.subitems && y.subitems.length > 0 ? (y.expansion = !y.expansion, M(y.href, !1)) : M(y.href);
              }
            },
            [
              T ? " ".repeat(4) + y.label : y.label,
              // 展开
              y.subitems && y.subitems.length > 0 && p("div", {
                class: `${y.expansion ? "open" : ""} expansion`
              })
            ]
          ),
          //多级目录
          y.subitems && y.subitems.length > 0 && p(
            Mr,
            { name: "collapse-transition" },
            {
              default: () => p(
                "div",
                {
                  style: {
                    display: y.expansion ? void 0 : "none"
                  }
                },
                [
                  p(t, {
                    toc: y.subitems,
                    current: pt.value,
                    setLocation: M,
                    isSubmenu: !0
                  })
                ]
              )
            }
          )
        ]));
      }
    }), r = e, n = Lr({
      toc: [],
      //目录
      expandedToc: !1
      //目录展开
    }), { getRendition: o } = r, { toc: s, expandedToc: i } = Ft(n), a = W(null), l = W(null), c = W(""), u = (v) => {
      o && o(v);
      const { book: m } = v, p = m.metadata?.title;
      c.value = p || "";
    }, f = (v) => {
      s.value = v;
    }, d = () => {
      i.value = !i.value;
    }, h = () => {
      a.value?.nextPage();
    }, g = () => {
      a.value?.prevPage();
    }, $ = (v, m = !0) => {
      a.value.setLocation(v), i.value = !1, i.value = !m;
    };
    return (v, m) => (N(), j("div", pc, [
      C("div", {
        class: oe(["readerArea", { containerExpanded: L(i) }]),
        style: Dr({ backgroundColor: e.backgroundColor })
      }, [
        e.showToc ? (N(), j("button", {
          key: 0,
          class: oe(["tocButton", { tocButtonExpanded: L(i) }]),
          type: "button",
          onClick: d
        }, [...m[0] || (m[0] = [
          C("span", {
            class: "tocButtonBar",
            style: { top: "35%" }
          }, null, -1),
          C("span", {
            class: "tocButtonBar",
            style: { top: "66%" }
          }, null, -1)
        ])], 2)) : tt("", !0),
        jt(v.$slots, "title", {}, () => [
          C("div", {
            class: "titleArea",
            title: e.title || c.value
          }, zr(e.title || c.value), 9, gc)
        ]),
        ie(vc, Wr({
          ref_key: "bookRef",
          ref: a
        }, v.$attrs, {
          tocChanged: f,
          getRendition: u
        }), {
          loadingView: Gr(() => [
            jt(v.$slots, "loadingView", {}, () => [
              m[1] || (m[1] = C("div", { class: "loadingView" }, "Loading…", -1))
            ])
          ]),
          _: 3
        }, 16),
        C("button", {
          class: "arrow pre",
          onClick: g
        }, "‹"),
        C("button", {
          class: "arrow next",
          onClick: h
        }, "›")
      ], 6),
      e.showToc ? (N(), j("div", yc, [
        C("div", mc, [
          ie(L(t), {
            toc: L(s),
            current: l.value,
            setLocation: $
          }, null, 8, ["toc", "current"])
        ]),
        L(i) ? (N(), j("div", {
          key: 0,
          class: "tocBackground",
          onClick: d
        })) : tt("", !0)
      ])) : tt("", !0)
    ]));
  }
}, bc = {
  toRange: Ye,
  fromRange: qe,
  compare: Nt,
  collapse: E
}, Ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CFI: bc
}, Symbol.toStringTag, { value: "Module" }));
export {
  vc as B,
  Sc as _,
  Ye as a,
  $c as f,
  Ec as i,
  k as p,
  Tc as t
};
