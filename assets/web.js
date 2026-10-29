// Site motion: the scattered pieces (with the opening animation on Home), and
// on Home the dotted lines beside the section titles and the scroll reveal.
// Pages are complete without this file; it only adds to them.
(function () {
  "use strict";

  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var table = document.querySelector(".table");
  var nav = document.querySelector(".nav");

  // ---------- Pieces ----------

  // Web/PuzzlePiece, the six shapes from Figma (320 body), drawn at 0.15 (48 body).
  var SCALE = 0.15;
  var SHAPES = [
    { w: 416, h: 416, d: "M160 0C186.51 0 208 21.4903 208 48V80C208 88.8366 215.163 96 224 96H272C298.51 96 320 117.49 320 144V192C320 200.837 327.163 208 336 208H368C394.51 208 416 229.49 416 256C416 282.51 394.51 304 368 304H336C327.163 304 320 311.163 320 320V368C320 394.51 298.51 416 272 416H224C215.163 416 208 408.837 208 400V368C208 341.49 186.51 320 160 320C133.49 320 112 341.49 112 368V400C112 408.837 104.837 416 96 416H48C21.4903 416 0 394.51 0 368V320C0 311.163 7.16344 304 16 304H48C74.5097 304 96 282.51 96 256C96 229.49 74.5097 208 48 208H16C7.16344 208 0 200.837 0 192V144C0 117.49 21.4903 96 48 96H96C104.837 96 112 88.8366 112 80V48C112 21.4903 133.49 0 160 0Z" },
    { w: 320, h: 512, d: "M160 0C186.51 0 208 21.4903 208 48V80C208 88.8366 215.163 96 224 96H272C298.51 96 320 117.49 320 144V192C320 200.837 312.837 208 304 208H272C245.49 208 224 229.49 224 256C224 282.51 245.49 304 272 304H304C312.837 304 320 311.163 320 320V368C320 394.51 298.51 416 272 416H224C215.163 416 208 423.163 208 432V464C208 490.51 186.51 512 160 512C133.49 512 112 490.51 112 464V432C112 423.163 104.837 416 96 416H48C21.4903 416 0 394.51 0 368V320C0 311.163 7.16344 304 16 304H48C74.5097 304 96 282.51 96 256C96 229.49 74.5097 208 48 208H16C7.16344 208 0 200.837 0 192V144C0 117.49 21.4903 96 48 96H96C104.837 96 112 88.8366 112 80V48C112 21.4903 133.49 0 160 0Z" },
    { w: 416, h: 416, d: "M96 0C104.837 0 112 7.16344 112 16V48C112 74.5097 133.49 96 160 96C186.51 96 208 74.5097 208 48V16C208 7.16344 215.163 0 224 0H272C298.51 0 320 21.4903 320 48V96C320 104.837 327.163 112 336 112H368C394.51 112 416 133.49 416 160C416 186.51 394.51 208 368 208H336C327.163 208 320 215.163 320 224V272C320 298.51 298.51 320 272 320H224C215.163 320 208 327.163 208 336V368C208 394.51 186.51 416 160 416C133.49 416 112 394.51 112 368V336C112 327.163 104.837 320 96 320H48C21.4903 320 0 298.51 0 272V48C0 21.4903 21.4903 0 48 0H96Z" },
    { w: 320, h: 416, d: "M272 0C298.51 0 320 21.4903 320 48V272C320 298.51 298.51 320 272 320H224C215.163 320 208 327.163 208 336V368C208 394.51 186.51 416 160 416C133.49 416 112 394.51 112 368V336C112 327.163 104.837 320 96 320H48C21.4903 320 0 298.51 0 272V224C0 215.163 7.16344 208 16 208H48C74.5097 208 96 186.51 96 160C96 133.49 74.5097 112 48 112H16C7.16344 112 0 104.837 0 96V48C0 21.4903 21.4903 0 48 0H272Z" },
    { w: 416, h: 512, d: "M160 0C186.51 0 208 21.4903 208 48V80C208 88.8366 215.163 96 224 96H272C298.51 96 320 117.49 320 144V192C320 200.837 327.163 208 336 208H368C394.51 208 416 229.49 416 256C416 282.51 394.51 304 368 304H336C327.163 304 320 311.163 320 320V368C320 394.51 298.51 416 272 416H224C215.163 416 208 423.163 208 432V464C208 490.51 186.51 512 160 512C133.49 512 112 490.51 112 464V432C112 423.163 104.837 416 96 416H48C21.4903 416 0 394.51 0 368V320C0 311.163 7.16344 304 16 304H48C74.5097 304 96 282.51 96 256C96 229.49 74.5097 208 48 208H16C7.16344 208 0 200.837 0 192V144C0 117.49 21.4903 96 48 96H96C104.837 96 112 88.8366 112 80V48C112 21.4903 133.49 0 160 0Z" },
    { w: 416, h: 320, d: "M192 0C200.837 0 208 7.16344 208 16V48C208 74.5097 229.49 96 256 96C282.51 96 304 74.5097 304 48V16C304 7.16344 311.163 0 320 0H368C394.51 0 416 21.4903 416 48V96C416 104.837 408.837 112 400 112H368C341.49 112 320 133.49 320 160C320 186.51 341.49 208 368 208H400C408.837 208 416 215.163 416 224V272C416 298.51 394.51 320 368 320H320C311.163 320 304 312.837 304 304V272C304 245.49 282.51 224 256 224C229.49 224 208 245.49 208 272V304C208 312.837 200.837 320 192 320H144C117.49 320 96 298.51 96 272V224C96 215.163 88.8366 208 80 208H48C21.4903 208 0 186.51 0 160C0 133.49 21.4903 112 48 112H80C88.8366 112 96 104.837 96 96V48C96 21.4903 117.49 0 144 0H192Z" }
  ];
  var COLORS = ["blush", "apricot", "sand", "honey", "melon", "roseClay", "lavender", "sage"];

  // Opening (handoff, Oct 29 10:15): the pile holds, then each piece hops to
  // its spot in 8 stop-motion poses, 125 ms apart, starting 0–2 frames late.
  var HOLD = 700;
  var FRAMES = 8;
  var FRAME = 125;
  var NAV_FADE = 300;
  var HERO_STEP = 80;     // hero lines fade in and rise 8, this far apart
  var HERO_RISE = 400;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function isPhone() { return window.innerWidth < 768; }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // Rectangles (in table coordinates) the pieces stay clear of. On phones the
  // cards and sheets are nearly full width, so pieces may sit behind them
  // (peeking out at the table edge) but skip the rows with section titles and
  // the closing line.
  function keepOut(phone) {
    var t = table.getBoundingClientRect();
    var W = table.clientWidth;
    var rects = [];
    function add(r, margin, fullRow) {
      if (!r.width || !r.height) return;
      rects.push({
        l: fullRow ? -Infinity : r.left - t.left - margin,
        r: fullRow ? Infinity : r.right - t.left + margin,
        t: r.top - t.top - margin,
        b: r.bottom - t.top + margin
      });
    }
    function lines(el, margin) {
      var range = document.createRange();
      range.selectNodeContents(el);
      Array.prototype.forEach.call(range.getClientRects(), function (r) { add(r, margin); });
    }
    add(nav.getBoundingClientRect(), 40);
    document.querySelectorAll(".hero > *").forEach(function (el) {
      if (el.matches(".button")) add(el.getBoundingClientRect(), 40); else lines(el, 40);
    });
    document.querySelectorAll(".screens-row").forEach(function (el) { add(el.getBoundingClientRect(), phone ? 16 : 40); });
    document.querySelectorAll(".section-head, .closing > *").forEach(function (el) { add(el.getBoundingClientRect(), 40, phone); });
    if (!phone) document.querySelectorAll(".sheet-card, .sheet").forEach(function (el) { add(el.getBoundingClientRect(), 40); });
    return rects;
  }

  function firstScreenHeight() {
    return Math.min(table.clientHeight, window.innerHeight - table.getBoundingClientRect().top - window.scrollY);
  }

  // A random scatter: along the left, right and top edges in the first screen,
  // then down both side edges to the bottom of the table (handoff, Oct 29 10:16).
  function scatter() {
    var phone = isPhone();
    var gap = phone ? 54 : 62;
    var depth = phone ? 20 : 44;     // how far in from the edge a piece's center may sit
    var W = table.clientWidth;
    var H = table.clientHeight;
    var first = firstScreenHeight();
    var avoid = keepOut(phone);
    var half = 31;                   // half of a piece's 62 box
    var spots = [];

    function fits(x, y) {
      return spots.every(function (s) { return Math.hypot(s.x - x, s.y - y) >= gap; }) &&
        avoid.every(function (r) { return x + half < r.l || x - half > r.r || y + half < r.t || y - half > r.b; });
    }
    function turn() { return rand(-35, 35); }

    // First screen: up to 36 (20 on phones), the ones that come from the pile.
    var count = phone ? 20 : 36;
    for (var tries = 0; tries < 4000 && spots.length < count; tries++) {
      var edge = Math.random() < (phone ? 0.15 : 0.3) ? "top" : (Math.random() < 0.5 ? "left" : "right");
      var x, y;
      if (edge === "top") { x = rand(0, W); y = rand(-12, depth); }
      else { x = edge === "left" ? rand(-12, depth) : rand(W - depth, W + 12); y = rand(0, first - half); }
      if (fits(x, y)) spots.push({ x: x, y: y, turn: turn(), first: true });
    }

    // Further down: each side edge, about 70–110 apart, to the bottom.
    ["left", "right"].forEach(function (side) {
      for (var y = first + rand(0, 40); y < H - half; y += rand(70, 110)) {
        for (var k = 0; k < 6; k++) {
          var x = side === "left" ? rand(-12, depth) : rand(W - depth, W + 12);
          var yy = y + rand(-12, 12);
          if (fits(x, yy)) { spots.push({ x: x, y: yy, turn: turn(), first: false }); break; }
        }
      }
    });
    return spots;
  }

  var layer, pieces = [], timers = [];

  function makePieces(spots) {
    if (timers.length) finishOpening();  // a resize mid-opening skips the rest of it
    timers.forEach(clearTimeout);
    timers = [];
    if (layer) layer.remove();
    layer = document.createElement("div");
    layer.className = "pieces";
    layer.setAttribute("aria-hidden", "true");
    pieces = spots.map(function (spot) {
      var shape = pick(SHAPES);
      var w = shape.w * SCALE, h = shape.h * SCALE;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "piece");
      svg.setAttribute("width", w);
      svg.setAttribute("height", h);
      svg.setAttribute("viewBox", "0 0 " + shape.w + " " + shape.h);
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", shape.d);
      path.setAttribute("fill", "var(--piece-" + pick(COLORS) + ")");
      svg.appendChild(path);
      layer.appendChild(svg);
      return { el: svg, w: w, h: h, spot: spot };
    });
    table.insertBefore(layer, table.firstChild);   // under the page content
  }

  function place(p, x, y, turn) {
    p.el.style.transform = "translate(" + (x - p.w / 2) + "px," + (y - p.h / 2) + "px) rotate(" + turn + "deg)";
  }

  function settle() {
    pieces.forEach(function (p) { place(p, p.spot.x, p.spot.y, p.spot.turn); });
  }

  // The first-screen pieces start piled in the middle of the first screen and
  // hop out; pieces further down are already in place. When the last one
  // lands the nav fades in, then the hero lines one after another.
  function clearTable() {
    var cx = table.clientWidth / 2, cy = firstScreenHeight() / 2;
    var movers = pieces.filter(function (p) { return p.spot.first; });
    var lastDelay = 0;
    pieces.forEach(function (p) {
      if (!p.spot.first) { place(p, p.spot.x, p.spot.y, p.spot.turn); return; }
      p.pile = { x: cx + rand(-56, 56), y: cy + rand(-40, 40), turn: rand(0, 360) };
      p.delay = Math.floor(rand(0, 3));
      lastDelay = Math.max(lastDelay, p.delay);
      place(p, p.pile.x, p.pile.y, p.pile.turn);
    });
    for (var f = 1; f <= FRAMES + lastDelay; f++) {
      (function (f) {
        timers.push(setTimeout(function () {
          movers.forEach(function (p) {
            var k = f - p.delay;
            if (k < 1 || k > FRAMES) return;
            if (k === FRAMES) { place(p, p.spot.x, p.spot.y, p.spot.turn); return; }
            var e = easeOutCubic(k / FRAMES);
            place(p,
              p.pile.x + (p.spot.x - p.pile.x) * e + rand(-3, 3),
              p.pile.y + (p.spot.y - p.pile.y) * e + rand(-3, 3),
              p.pile.turn + (p.spot.turn - p.pile.turn) * e + rand(-4, 4));
          });
        }, HOLD + (f - 1) * FRAME));
      })(f);
    }
    var landed = HOLD + (FRAMES + lastDelay - 1) * FRAME;
    timers.push(setTimeout(function () { root.classList.add("show-nav"); }, landed));
    timers.push(setTimeout(function () { root.classList.add("show-page"); }, landed + NAV_FADE));
    timers.push(setTimeout(finishOpening, landed + NAV_FADE + HERO_RISE + 3 * HERO_STEP));
  }

  function finishOpening() {
    timers = [];
    root.classList.remove("intro", "show-nav", "show-page");
    if (scrolled) showScreens(false);
  }

  // ---------- App screens and first scroll ----------

  // The app screens wait for the visitor's first scroll, then fade in and rise
  // 16, the middle phone first, then the side phones. If the page loads
  // already scrolled, they show.
  var scrolled = window.scrollY > 0;
  var firstScrollHooks = [];

  function showScreens(animate) {
    if (!root.classList.contains("screens-wait")) return;
    if (!animate) root.classList.add("no-anim");
    root.classList.remove("screens-wait");
    if (!animate) requestAnimationFrame(function () { root.classList.remove("no-anim"); });
  }

  function onFirstScroll() {
    if (scrolled) return;
    scrolled = true;
    window.removeEventListener("scroll", onFirstScroll);
    if (!root.classList.contains("intro")) showScreens(true);   // else when the opening ends
    firstScrollHooks.forEach(function (fn) { fn(); });
  }

  // ---------- Dotted lines ----------

  // Each line runs from 24 beside the title (16 on phones) to the card's edge,
  // trimmed to 6n - 3 so both ends are whole dashes (3 on, 3 off).
  function sizeDots() {
    document.querySelectorAll(".section-head").forEach(function (head) {
      var title = head.querySelector(".section-title");
      var gap = parseFloat(getComputedStyle(head).columnGap) || 24;
      var room = (head.clientWidth - title.offsetWidth) / 2 - gap;
      var n = Math.max(0, Math.floor((room + 3) / 6));
      head.querySelectorAll(".dots").forEach(function (line) {
        line.classList.add("sized");
        line.style.setProperty("--w", (6 * n - 3) + "px");
        line.style.setProperty("--n", n);
      });
    });
  }

  // ---------- Scroll reveal ----------

  // Once per visit, when a section is about a third in view: lines draw out
  // from the title a dash at a time as the title rises, then the card, then
  // its features. The closing call to action steps in after that (headline,
  // button, line), once it's in view and the last section's features are in.
  // Never before the first scroll.
  var FEATURES_IN = 200 + 2 * 80 + 400;   // from the lines finishing to the last feature landing
  var sections = [], closing = null, closingInView = false;

  function setUpReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    sections = Array.prototype.slice.call(document.querySelectorAll(".section"));
    if (!sections.length) return;
    sections.forEach(function (section) {
      section.querySelectorAll(".feature").forEach(function (f, i) { f.style.setProperty("--i", i); });
      section.classList.add("reveal");
    });
    closing = document.querySelector(".closing");
    if (closing) closing.classList.add("reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (e.target === closing) { closingInView = true; revealClosing(); return; }
        e.target.classList.add("revealed");
        drawLines(e.target);
      });
    }, { threshold: 0.33 });
    function observe() {
      sections.forEach(function (s) { io.observe(s); });
      if (closing) io.observe(closing);
    }
    if (scrolled) observe(); else firstScrollHooks.push(observe);
  }

  // Waits for the last section's features if that section is still coming in.
  // (If someone jumped straight past it, the closing doesn't wait for it.)
  function revealClosing() {
    if (!closing || !closingInView || closing.classList.contains("revealed")) return;
    var last = sections[sections.length - 1];
    if (last && last.classList.contains("revealed") && !last.classList.contains("features-done")) return;
    closing.classList.add("revealed");
  }

  // The two lines grow outward from the title over 600 ms, one whole dash
  // (6 px: 3 on, 3 off) at a time, by moving their clip edge in dash steps.
  function drawLines(section) {
    var lines = section.querySelectorAll(".dots.sized");
    if (!lines.length) { linesDone(section); return; }
    var n = parseInt(lines[0].style.getPropertyValue("--n"), 10) || 0;
    var started = null;
    function frame(now) {
      if (started === null) started = now;
      var k = Math.min(n, Math.floor((now - started) / 600 * n) + 1);
      var hidden = (n - k) * 6 + "px";
      lines.forEach(function (line) {
        line.style.clipPath = k >= n ? "none" :
          line.classList.contains("left") ? "inset(0 0 0 " + hidden + ")" : "inset(0 " + hidden + " 0 0)";
      });
      if (k < n) requestAnimationFrame(frame);
      else linesDone(section);
    }
    requestAnimationFrame(frame);
  }

  function linesDone(section) {
    section.classList.add("lines-done");   // the card and its features follow
    setTimeout(function () {
      section.classList.add("features-done");
      revealClosing();
    }, FEATURES_IN);
  }

  // ---------- Start ----------

  var lastWidth = window.innerWidth;

  function start() {
    clearTimeout(window.introSafety);   // the opening is running, so it decides when the page shows
    sizeDots();
    setUpReveal();
    window.addEventListener("scroll", onFirstScroll, { passive: true });
    if (scrolled) showScreens(false);
    makePieces(scatter());
    // On a very slow load the safety timer may already have shown the page;
    // then the table is simply cleared, so the pieces never fly over text.
    if (reduceMotion || !root.classList.contains("intro")) {
      settle();
      finishOpening();
    } else {
      clearTable();
    }

    var timer;
    window.addEventListener("resize", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        sizeDots();
        if (window.innerWidth === lastWidth) return;   // phone toolbars change only the height
        lastWidth = window.innerWidth;
        makePieces(scatter());
        settle();
      }, 150);
    });
  }

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
})();
