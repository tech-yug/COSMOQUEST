// ── STARFIELD ──
(function() {
  const sf = document.getElementById('starfield');
  const W = window.innerWidth, H = window.innerHeight;
  const count = 280;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() < 0.7 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 4 + 2).toFixed(1);
    const minOp = (Math.random() * 0.2 + 0.1).toFixed(2);
    const maxOp = (Math.random() * 0.5 + 0.5).toFixed(2);
    const delay = (Math.random() * 4).toFixed(1);
    s.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${x}%; top: ${y}%;
      --dur: ${dur}s;
      --min-op: ${minOp};
      --max-op: ${maxOp};
      animation-delay: -${delay}s;
      ${size > 2 ? `box-shadow: 0 0 ${size*2}px rgba(255,255,255,0.6);` : ''}
    `;
    sf.appendChild(s);
  }
  // Parallax on mouse
  document.addEventListener('mousemove', e => {
    const xf = (e.clientX / W - 0.5) * 20;
    const yf = (e.clientY / H - 0.5) * 20;
    sf.style.transform = `translate(${xf}px, ${yf}px)`;
  });
})();

// ── SCROLL REVEAL ──
const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
revEls.forEach(el => obs.observe(el));

// ── PLANET DATA ──
const planets = {
  mercury: {
    name: 'Mercury', nick: 'THE SWIFT PLANET',
    cls: 'mercury-sphere',
    stats: [
      ['Distance from Sun','57.9M km'],['Diameter','4,879 km'],
      ['Surface Temp','-180°C to 430°C'],['Moons','0'],
      ['Orbital Period','88 Earth days'],['Gravity','3.7 m/s²']
    ],
    fact: 'Mercury is the smallest planet in our solar system. Despite being closest to the Sun, Venus is actually hotter — Mercury lacks an atmosphere to trap heat.',
    ring: false
  },
  venus: {
    name: 'Venus', nick: 'THE SCORCHED TWIN',
    cls: 'venus-sphere',
    stats: [
      ['Distance from Sun','108.2M km'],['Diameter','12,104 km'],
      ['Surface Temp','465°C avg'],['Moons','0'],
      ['Orbital Period','225 Earth days'],['Gravity','8.87 m/s²']
    ],
    fact: 'Venus is the hottest planet in the solar system. Its thick CO₂ atmosphere creates a runaway greenhouse effect, making it hotter than Mercury despite being farther from the Sun.',
    ring: false
  },
  earth: {
    name: 'Earth', nick: 'THE PALE BLUE DOT',
    cls: 'earth-sphere',
    stats: [
      ['Distance from Sun','149.6M km'],['Diameter','12,742 km'],
      ['Surface Temp','-89°C to 58°C'],['Moons','1'],
      ['Orbital Period','365.25 days'],['Gravity','9.81 m/s²']
    ],
    fact: 'The only known planet to harbor life. Earth\'s magnetic field shields it from solar radiation, and its liquid water oceans make it uniquely habitable in the solar system.',
    ring: false
  },
  mars: {
    name: 'Mars', nick: 'THE RED PLANET',
    cls: 'mars-sphere',
    stats: [
      ['Distance from Sun','227.9M km'],['Diameter','6,779 km'],
      ['Surface Temp','-125°C to 20°C'],['Moons','2 (Phobos & Deimos)'],
      ['Orbital Period','687 Earth days'],['Gravity','3.72 m/s²']
    ],
    fact: 'Mars hosts Olympus Mons, the largest volcano in the solar system — three times the height of Mount Everest. Its two small moons, Phobos and Deimos, may be captured asteroids.',
    ring: false
  },
  jupiter: {
    name: 'Jupiter', nick: 'THE GAS GIANT',
    cls: 'jupiter-sphere',
    stats: [
      ['Distance from Sun','778.5M km'],['Diameter','139,820 km'],
      ['Temperature','-108°C (cloud top)'],['Moons','95+'],
      ['Orbital Period','11.86 Earth years'],['Gravity','24.79 m/s²']
    ],
    fact: 'Jupiter\'s Great Red Spot is a storm that has raged for at least 400 years, larger than Earth itself. Jupiter acts as the solar system\'s shield, pulling many asteroids away from inner planets.',
    ring: false
  },
  saturn: {
    name: 'Saturn', nick: 'THE RINGED WONDER',
    cls: 'saturn-sphere',
    stats: [
      ['Distance from Sun','1.43B km'],['Diameter','116,460 km'],
      ['Temperature','-139°C (cloud top)'],['Moons','146+'],
      ['Orbital Period','29.5 Earth years'],['Gravity','10.44 m/s²']
    ],
    fact: 'Saturn\'s rings are made of ice and rock particles ranging from tiny grains to house-sized boulders. The rings span 282,000 km but are only about 100 meters thick.',
    ring: true
  },
  uranus: {
    name: 'Uranus', nick: 'THE ICE GIANT',
    cls: 'uranus-sphere',
    stats: [
      ['Distance from Sun','2.87B km'],['Diameter','50,724 km'],
      ['Temperature','-197°C (cloud top)'],['Moons','27'],
      ['Orbital Period','84 Earth years'],['Gravity','8.87 m/s²']
    ],
    fact: 'Uranus rotates on its side with an axial tilt of 98°, likely caused by a massive collision long ago. Its rings and moons orbit vertically, making it unique in the solar system.',
    ring: false
  },
  neptune: {
    name: 'Neptune', nick: 'THE WINDY WORLD',
    cls: 'neptune-sphere',
    stats: [
      ['Distance from Sun','4.5B km'],['Diameter','49,244 km'],
      ['Temperature','-201°C (cloud top)'],['Moons','16'],
      ['Orbital Period','165 Earth years'],['Gravity','11.15 m/s²']
    ],
    fact: 'Neptune has the strongest winds in the solar system, reaching 2,100 km/h. Its largest moon Triton orbits backwards and is slowly spiraling inward — it will eventually break apart.',
    ring: false
  }
};

function showPlanet(key, btn) {
  const p = planets[key];
  if (!p) return;

  // update tabs
  document.querySelectorAll('.planet-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // update sphere
  const sphere = document.getElementById('planetSphere');
  sphere.className = 'planet-sphere ' + p.cls;

  // remove old ring if any
  const oldRing = sphere.querySelector('.saturn-ring');
  if (oldRing) oldRing.remove();
  if (p.ring) {
    const ring = document.createElement('div');
    ring.className = 'saturn-ring';
    sphere.appendChild(ring);
  }

  // update info
  document.getElementById('planetName').textContent = p.name;
  document.getElementById('planetNick').textContent = p.nick;
  document.getElementById('planetFact').textContent = p.fact;

  const statsEl = document.getElementById('planetStats');
  statsEl.innerHTML = p.stats.map(([k,v]) =>
    `<div class="pstat"><div class="pstat-label">${k}</div><div class="pstat-val">${v}</div></div>`
  ).join('');
}
const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;

    successMessage.innerHTML =
        `Thank you ${name}! 🚀 Your feedback (${rating}) has been received.`;

    form.reset();
});