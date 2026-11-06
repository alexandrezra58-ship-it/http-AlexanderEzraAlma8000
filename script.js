  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  items.forEach(i=>io.observe(i));
  /* ---------- EXTRAS: JavaScript ---------- */
  (function(){
    const $ = (s)=>document.querySelector(s);
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // footer year
    $('#year').textContent = new Date().getFullYear();

    // staggered reveal for cards in the same group
    document.querySelectorAll('.skills-grid, .accounts').forEach(g=>{
      g.querySelectorAll('.reveal').forEach((el,i)=>{ el.style.transitionDelay = (i*0.12)+'s'; });
    });

    // toast helper
    const toast = $('#toast'); let toastTimer;
    function showToast(msg){
      toast.textContent = msg; toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(()=>toast.classList.remove('show'), 2000);
    }

    // theme toggle (remembers choice when storage is available)
    const themeBtn = $('#themeBtn');
    function applyTheme(t){
      root.setAttribute('data-theme', t);
      themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
    }
    let saved = null;
    try{ saved = localStorage.getItem('theme'); }catch(e){}
    applyTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    themeBtn.addEventListener('click', ()=>{
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try{ localStorage.setItem('theme', next); }catch(e){}
    });

    // mobile menu
    const menuBtn = $('#menuBtn'), navLinks = $('#navLinks');
    menuBtn.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
      menuBtn.textContent = open ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      navLinks.classList.remove('open'); menuBtn.textContent = '☰'; menuBtn.setAttribute('aria-expanded','false');
    }));

    // scroll progress, back-to-top, active nav link
    const bar = $('#progress'), toTop = $('#toTop');
    const links = [...navLinks.querySelectorAll('a')];
    const sections = links.map(a=>document.querySelector(a.getAttribute('href')));
    function onScroll(){
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y/max)*100 : 0) + '%';
      toTop.classList.toggle('show', y > 500);
      let current = -1;
      sections.forEach((sec,i)=>{ if(sec && sec.getBoundingClientRect().top <= 120) current = i; });
      links.forEach((a,i)=>a.classList.toggle('active', i === current));
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    onScroll();
    toTop.addEventListener('click', ()=>window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}));

    // copy email
    $('#copyEmail').addEventListener('click', async ()=>{
      const email = 'alexanderalma43@gmail.com';
      try{
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard');
      }catch(e){
        showToast(email);
      }
    });

    // typing effect on the role
    const typed = $('#typed');
    if(typed && !reduce){
      const words = typed.dataset.words.split('|');
      let w = 0, c = words[0].length, deleting = true;
      setTimeout(function tick(){
        const word = words[w];
        typed.textContent = word.slice(0, c);
        let delay = deleting ? 45 : 85;
        if(!deleting && c === word.length){ deleting = true; delay = 1800; }
        else if(deleting && c === 0){ deleting = false; w = (w+1) % words.length; delay = 300; }
        else { c += deleting ? -1 : 1; }
        // start by pausing on the first word, then delete it
        setTimeout(tick, delay);
      }, 2200);
    }

    // photo fallback: show initials if the image file is missing
    const img = document.querySelector('.hero-photo img');
    function useFallback(){
      const div = document.createElement('div');
      div.className = 'photo-fallback'; div.textContent = 'AEA';
      div.setAttribute('role','img'); div.setAttribute('aria-label','Alexander Ezra Alma');
      img.replaceWith(div);
    }
    if(img){
      img.addEventListener('error', useFallback);
      if(img.complete && img.naturalWidth === 0) useFallback();
    }
  })();
