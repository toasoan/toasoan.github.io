/* Đọc nội dung từ thư mục /content (do trang quản trị /admin chỉnh sửa) và đổ vào trang chủ.
   Nếu không tải được nội dung, trang vẫn hiển thị nội dung có sẵn trong index.html. */
(function () {
  var FILES = ['dau-trang', 'su-menh', 'hanh-trinh', 'ban-bien-tap', 'giai-thuong', 'he-sinh-thai', 'quy-trinh', 'cong-nghe', 'tuyen-ngon', 'dong-hanh', 'chan-trang'];
  var started = false;
  function start() {
    if (started) return; started = true;
    document.documentElement.classList.remove('cms-wait');
    try { window.SITE_MAIN && window.SITE_MAIN(); } catch (e) { console.error(e); }
  }
  setTimeout(start, 4000); // an toàn: mạng chậm thì vẫn mở trang

  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  // **đậm**, *nhấn mạnh*, xuống dòng
  var md = function (t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>'); };
  var $ = function (q) { return document.querySelector(q); };
  var set = function (q, h) { var e = $(q); if (e != null && h != null) e.innerHTML = h; };
  var ext = function (u) { return /^https?:/i.test(u || '') ? ' target="_blank" rel="noopener"' : ''; };
  var arr = function (a) { return Array.isArray(a) ? a : []; };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function heads(id, d) { // tiêu đề mục + mô tả
    if (d.tieu_de) set('#' + id + ' .sec-head h2', md(d.tieu_de));
    if (d.mo_ta != null) set('#' + id + ' .sec-head > p', md(d.mo_ta));
  }

  var R = {};
  R['dau-trang'] = function (d) {
    if (d.tieu_de_dong_1) set('.hero h1 .line:nth-child(1) > span', esc(d.tieu_de_dong_1));
    if (d.tieu_de_dong_2) { var g = $('.hero h1 .glitch'); if (g) { g.textContent = d.tieu_de_dong_2; g.setAttribute('data-t', d.tieu_de_dong_2); } }
    if (d.khau_hieu) set('.hero .slogan-pill', arr(d.khau_hieu).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(''));
    if (d.gioi_thieu) set('.hero .lead', md(d.gioi_thieu) + ' <span class="typed" id="typed"></span>');
    if (d.chu_chay) window.CMS.typed = arr(d.chu_chay);
    var b = document.querySelectorAll('.hero .cta a');
    [d.nut_1, d.nut_2].forEach(function (n, i) { if (n && b[i]) { b[i].textContent = n.chu; b[i].href = n.link; if (ext(n.link)) { b[i].target = '_blank'; b[i].rel = 'noopener'; } else b[i].removeAttribute('target'); } });
    if (d.dai_chu_chay) { var t = arr(d.dai_chu_chay).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(''); set('#track', t + t + t); }
    var o = d.trung_tam || {};
    if (o.tieu_de) set('.ops-title', esc(o.tieu_de));
    if (o.dong_ho_chu) set('.ops-face small', esc(o.dong_ho_chu));
    if (o.chi_so) set('.ops-metrics', arr(o.chi_so).map(function (m) {
      return '<div class="mt"><div class="mt-n"><span data-count="' + (parseInt(m.so, 10) || 0) + '">0</span></div><div class="mt-t"><b>' + esc(m.ten) + '</b><span>' + esc(m.mo_ta) + '</span></div><div class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
    }).join(''));
    if (o.trang_thai) set('.ops-status', arr(o.trang_thai).map(function (x) { return '<span><i></i>' + esc(x) + '</span>'; }).join(''));
    if (d.logo_thuong_hieu) set('.wall', arr(d.logo_thuong_hieu).map(function (l) {
      var cls = l.nen === 'sang' ? 't light reveal' : l.nen === 'do' ? 't red reveal' : 't reveal';
      return '<a class="' + cls + '" href="' + esc(l.link) + '"' + ext(l.link) + '><img' + (l.nen === 'sang' ? ' class="bp"' : '') + ' src="' + esc(l.anh) + '" alt="' + esc(l.ten) + '"></a>';
    }).join(''));
  };
  R['su-menh'] = function (d) {
    if (d.tieu_de) set('#slogan h2', md(d.tieu_de));
    if (d.cam_ket) set('#slogan .pillars', arr(d.cam_ket).map(function (c) {
      return '<div class="pillar reveal"><span class="k">' + esc(c.nhan) + '</span><span class="big">' + esc(c.ten) + '</span><p>' + md(c.mo_ta) + '</p>' +
        (c.nut_chu ? '<a class="go-dh" href="' + esc(c.nut_link || '#') + '"' + ext(c.nut_link) + '>' + esc(c.nut_chu) + '</a>' : '') + '</div>';
    }).join(''));
  };
  R['hanh-trinh'] = function (d) {
    heads('hanh-trinh', d);
    if (d.giai_doan) window.CMS.eras = arr(d.giai_doan).map(function (e) { return { id: e.ma, from: +e.tu_nam, to: +e.den_nam, name: e.ten }; });
    if (d.moc) window.CMS.ms = arr(d.moc).map(function (m) {
      var o = { era: m.giai_doan, y: String(m.nam), d: m.thoi_gian || '', t: m.tieu_de || '', p: m.noi_dung || '', s: arr(m.thong_tin).map(function (x) { return [x.nhan, x.gia_tri]; }) };
      if (m.nhan_noi_bat) o.star = m.nhan_noi_bat; return o;
    });
    if (window.CMS.eras) { var ax = window.CMS.eras.map(function (e) { return '<span>' + e.from + '</span>'; }).join('') + '<span>NAY</span>'; set('#hanh-trinh .axis', ax); }
    var v = d.so_sanh;
    if (v) {
      set('#vs .past h5', esc(v.cot_xua)); set('#vs .now h5', esc(v.cot_nay));
      set('#vs .past ul', arr(v.dong).map(function (r) { return '<li><small>' + esc(r.nhan) + '</small><b>' + esc(r.xua) + '</b></li>'; }).join(''));
      set('#vs .now ul', arr(v.dong).map(function (r) { return '<li><small>' + esc(r.nhan) + '</small><b data-scr>' + esc(r.nay) + '</b></li>'; }).join(''));
    }
  };
  R['ban-bien-tap'] = function (d) {
    heads('ban-bien-tap', d);
    var t = d.tong_bien_tap;
    if (t) {
      var im = $('#ban-bien-tap .ed .ph img'); if (im && t.anh) { im.src = t.anh; im.alt = (t.danh_xung ? t.danh_xung + ' ' : '') + t.ho_ten + ', ' + t.chuc_vu; }
      set('#ban-bien-tap .ed .role', esc(t.chuc_vu));
      set('#ban-bien-tap .ed h3', (t.danh_xung ? '<small>' + esc(t.danh_xung) + '</small>' : '') + esc(t.ho_ten));
    }
    if (d.pho_tong_bien_tap) set('#ban-bien-tap .deps', arr(d.pho_tong_bien_tap).map(function (p) {
      return '<article class="dep reveal"><div class="mono"><span class="ph"><img src="' + esc(p.anh) + '" alt="' + esc((p.danh_xung ? p.danh_xung + ' ' : '') + p.ho_ten + ', ' + p.chuc_vu) + '" loading="lazy"></span></div><div class="role">' + esc(p.chuc_vu) + '</div><h4>' + (p.danh_xung ? '<small>' + esc(p.danh_xung) + '</small>' : '') + esc(p.ho_ten) + '</h4></article>';
    }).join(''));
  };
  R['giai-thuong'] = function (d) {
    heads('vinh-danh', d);
    var a = d.anh_tac_gia;
    if (a) {
      var im = $('#vinh-danh .hl-ph img'); if (im && a.anh) { im.src = a.anh; im.alt = a.mo_ta_anh || a.ten; }
      set('#vinh-danh .hl-ph figcaption', '<span class="hl-k">' + esc(a.nhan) + '</span><b>' + esc(a.ten) + '</b><small>' + esc(a.dong_phu) + '</small>');
    }
    var k = d.khung;
    if (k) {
      set('#vinh-danh .hl-l .hl-k', esc(k.nhan));
      set('#vinh-danh .hl-l h3', '<b>' + esc(k.so) + '</b>' + esc(k.dong_1) + '<br><em>' + esc(k.dong_2) + '</em>');
      set('#vinh-danh .hl-l p', md(k.mo_ta));
    }
    if (d.cac_nam) set('#vinh-danh .hl-r', arr(d.cac_nam).map(function (y) {
      var lv = esc(y.hang_giai || '');
      var links = '';
      if (y.link_tac_pham) links += '<a href="' + esc(y.link_tac_pham) + '" target="_blank" rel="noopener">Đọc tác phẩm ↗</a>';
      if (y.link_tin) links += '<a href="' + esc(y.link_tin) + '" target="_blank" rel="noopener" class="alt">Đọc tin vinh danh ↗</a>';
      return '<div class="hm' + (/^A$/i.test(y.hang_giai) ? ' gold' : '') + '"><div class="medal lg' + (lv.length > 1 ? ' sm' : '') + '"><span>' + lv + '</span></div><b>' + esc(y.nam) + '</b><small>Lần thứ ' + esc(y.lan) + ' · Giải ' + lv + '</small><p>' + esc(y.tac_pham) + '</p><i>' + esc(y.tac_gia) + '</i><div class="hm-go">' + links + '</div></div>';
    }).join(''));
  };
  var KIEU = {
    'bao-dien-tu': ['card wide hero-card', '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4"/></svg>'],
    'doanh-nhan': ['card dn', '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 20h18M6 20V10M10 20V6M14 20v-8M18 20V4"/></svg>'],
    'chuyen-trang': ['card', '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></svg>'],
    'media': ['card wide new', '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></svg>'],
    'video': ['card half', '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3z"/></svg>'],
    'hoi-tu': ['card half', '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7z"/></svg>', 'background:linear-gradient(140deg,var(--gold2),#fff 70%)'],
    'youtube': ['card social c-yt', '<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5-3-5-3z"/></svg>'],
    'tiktok': ['card social c-tt', ''],
    'facebook': ['card social c-fb', '']
  };
  R['he-sinh-thai'] = function (d) {
    heads('he-sinh-thai', d);
    if (d.the) set('#he-sinh-thai .grid', arr(d.the).map(function (c) {
      var k = KIEU[c.kieu] || KIEU['chuyen-trang'];
      var social = /social/.test(k[0]);
      var body = '<div class="inner"><div class="tag"><span>' + esc(c.nhan_1) + '</span><span>' + esc(c.nhan_2) + '</span></div>' +
        (c.logo ? '<img class="logo" src="' + esc(c.logo) + '" alt="' + esc(c.nhan_2) + '">' : '') +
        (c.tieu_de ? '<h3>' + esc(c.tieu_de) + '</h3>' : '') + '<p>' + md(c.mo_ta) + '</p></div>';
      return '<a class="' + k[0] + ' reveal tilt" href="' + esc(c.link || '#') + '"' + ext(c.link) + (k[2] ? ' style="' + k[2] + '"' : '') + '>' + k[1] + body +
        '<span class="go inner">' + esc(c.nut || 'Truy cập') + (social ? '' : ' ' + ARROW) + '</span></a>';
    }).join(''));
  };
  R['quy-trinh'] = function (d) {
    heads('quy-trinh', d);
    if (d.buoc) set('#quy-trinh .pipe', '<div class="beam"></div>' + arr(d.buoc).map(function (b, i) {
      return '<div class="step"><div class="dot">' + pad(i + 1) + '</div><h4>' + esc(b.ten) + '</h4><p>' + md(b.mo_ta) + '</p></div>';
    }).join(''));
    var p = $('#quy-trinh .pipe'); if (p && d.buoc) p.style.gridTemplateColumns = 'repeat(' + Math.max(1, d.buoc.length) + ',1fr)';
  };
  var ICONS = ['<path d="M4 6h16M4 12h16M4 18h10"/>', '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>', '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/>',
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'];
  R['cong-nghe'] = function (d) {
    heads('cong-nghe', d);
    if (d.man_hinh_lenh) window.CMS.terminal = arr(d.man_hinh_lenh).map(function (l) {
      var t = esc(l);
      return t.replace(/^\$/, '<span class="k">$</span>').replace(/^✔/, '<span class="ok">✔</span>').replace(/^→/, '<span class="c">→</span>');
    });
    if (d.tinh_nang) set('#cong-nghe .feat', arr(d.tinh_nang).map(function (f, i) {
      return '<div class="reveal"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + ICONS[i % ICONS.length] + '</svg><div><h5>' + esc(f.ten) + '</h5><p>' + md(f.mo_ta) + '</p></div></div>';
    }).join(''));
  };
  R['tuyen-ngon'] = function (d) {
    if (d.noi_dung) set('#manifest', esc(d.noi_dung).replace(/\*(.+?)\*/g, '<span class="g">$1</span>'));
  };
  R['dong-hanh'] = function (d) {
    if (d.tieu_de) set('#dong-hanh h2', md(d.tieu_de));
    if (d.mo_ta) set('#dong-hanh > div:not(.fx):not(.stack) > p', md(d.mo_ta));
    var b = $('#dong-hanh .dh-btn');
    if (b && d.nut_chu) { b.innerHTML = esc(d.nut_chu) + ' <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'; b.href = d.nut_link || 'bao-gia.html'; }
    if (d.the_nho) set('#dong-hanh .mini', arr(d.the_nho).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(''));
  };
  R['chan-trang'] = function (d) {
    if (d.khau_hieu) set('footer .f-slogan', md(d.khau_hieu));
    var cols = document.querySelectorAll('footer .f-grid > div');
    [d.cot_bao, d.cot_mxh].forEach(function (c, i) {
      if (c && cols[i]) cols[i].innerHTML = '<h6>' + esc(c.tieu_de) + '</h6>' + arr(c.lien_ket).map(function (l) { return '<a href="' + esc(l.link) + '"' + ext(l.link) + '>' + esc(l.chu) + '</a>'; }).join('');
    });
    var v = d.ve_chung_toi, pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
    if (v) set('footer .f-about', '<h6>VỀ CHÚNG TÔI</h6><p class="f-name"><b>' + esc(v.ten) + '</b><span>' + esc(v.mo_ta) + '</span></p><p class="f-lbl">' + esc(v.nhan_dia_chi) + '</p><ul class="f-addr">' + arr(v.dia_chi).map(function (a) { return '<li>' + pin + esc(a) + '</li>'; }).join('') + '</ul>');
    var bt = document.querySelectorAll('footer .f-bottom span');
    if (bt[0] && d.ban_quyen) bt[0].textContent = d.ban_quyen;
    if (bt[1] && d.dong_cuoi != null) bt[1].textContent = d.dong_cuoi;
  };

  window.CMS = {};
  Promise.all(FILES.map(function (f) {
    return fetch('/content/' + f + '.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  })).then(function (list) {
    if (started) return;
    list.forEach(function (d, i) {
      if (!d) return;
      try { R[FILES[i]](d); } catch (e) { console.error('CMS', FILES[i], e); }
    });
    start();
  });
})();
