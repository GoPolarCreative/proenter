import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Check, Clock3, Menu, Phone, ShieldCheck, Sparkles, X } from 'lucide-react';
import './index.css';

type Division = 'home' | 'pressure' | 'lawn' | 'clean';
type Theme = 'gold' | 'blue' | 'green' | 'orange';

const logos = {
  home: '/10F7616B-291F-4681-8E03-FA52E7E20C26_-_corbyn_roberts.png',
  pressure: '/pressurelogo.png',
  lawn: '/IMG_1138_-_corbyn_roberts.png',
  clean: '/cleanprologo.png',
};

const content = {
  home: {
    name: 'Pro Enterprises', eyebrow: 'The parent company', theme: 'gold' as Theme,
    title: 'Your property,\nour pros.',
    intro: 'Locally owned property services for homes, businesses and rural properties across Canterbury. One trusted team, two specialist divisions, a better standard of care.',
    hero: '/pro-enterprises-hero.webp',
    description: 'Pro Enterprises brings together the practical expertise and dependable service Canterbury property owners need. Whether it is a fresh exterior or a property that needs bringing back to life, we show up ready to do it properly.',
    phone: '027 315 7559', serviceLabel: 'What can we help with?', services: ['Pressure Pro', 'Lawn Pro', 'Clean Pro', 'General enquiry'],
    stats: [['3', 'specialist divisions'], ['100%', 'locally owned'], ['Canterbury', 'our home']],
  },
  pressure: {
    name: 'Pressure Pro', eyebrow: 'Exterior cleaning specialists', theme: 'blue' as Theme,
    title: 'A cleaner\nstandard.',
    intro: 'Professional exterior cleaning for residential, commercial and rural properties throughout North Canterbury and Christchurch.',
    hero: '/ChatGPT_Image_Aug_14,_2026,_02_35_02_PM.png',
    description: 'The right equipment. The right method for every surface. From concrete and roofs to farm equipment and fleet washing, Pressure Pro delivers a sharper clean without the guesswork.',
    phone: '027 315 7559', serviceLabel: 'Which service do you need?', services: ['Concrete cleaning', 'Exterior soft wash', 'Roof and gutter cleaning', 'Decking and patio cleaning', 'Heavy equipment cleaning', 'Farm equipment', 'Truck and fleet washing', 'Council bin cleaning'],
    stats: [['08', 'ways to clean better'], ['Same day', 'service available'], ['Local', 'North Canterbury team']],
  },
  lawn: {
    name: 'Lawn Pro', eyebrow: 'Lawn and garden care', theme: 'green' as Theme,
    title: 'Make more room\nfor living.',
    intro: 'Reliable lawn mowing and garden maintenance that keeps residential and commercial properties tidy and presentable year round.',
    hero: '/michael-smith-bsld7GjQwjI-unsplash.jpg',
    description: 'Weekly, fortnightly or one off, Lawn Pro takes care of the work that keeps your property looking its best. Spend less time working on your property and more time enjoying it.',
    phone: '021 047 7013', serviceLabel: 'What do you need help with?', services: ['Lawn mowing', 'Garden maintenance', 'Property tidy ups', 'Dog waste removal'],
    stats: [['4', 'ways to care'], ['Year round', 'property care'], ['Local', 'Canterbury team']],
  },
  clean: {
    name: 'Clean Pro', eyebrow: 'Professional property cleaning', theme: 'orange' as Theme,
    title: 'Clean spaces.\nClear minds.',
    intro: 'Professional cleaning for homes, businesses and properties across Christchurch and Canterbury.',
    hero: '/clean-pro-hero-male.webp',
    description: 'From a detailed one off clean to the final polish before handover, Clean Pro brings a sharp eye and dependable finish to every space. Simple to book, thorough on the details, and ready when you are.',
    phone: '027 315 7559', serviceLabel: 'Which service do you need?', services: ['Move out cleans', 'Builders cleans', 'Oven cleaning', 'Window cleaning'],
    stats: [['04', 'ways to clean better'], ['Same day', 'service available'], ['Local', 'Canterbury team']],
  },
};

function getDivision(): Division {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('pressure')) return 'pressure';
  if (path.includes('lawn')) return 'lawn';
  if (path.includes('clean')) return 'clean';
  return 'home';
}

const areas = ['Christchurch', 'Rolleston', 'Rangiora', 'Kaiapoi', 'Woodend', 'Amberley', 'Canterbury'];

function injectSchema(division: Division) {
  const id = 'ld-schema';
  document.getElementById(id)?.remove();
  const base = { '@context': 'https://schema.org', name: 'Pro Enterprises', founder: 'Corbyn Roberts', email: 'info@proenterprises.co.nz', telephone: '+64 27 315 7559', address: { '@type': 'PostalAddress', addressRegion: 'Canterbury', addressCountry: 'NZ' }, areaServed: areas.map(a => ({ '@type': 'AdministrativeArea', name: a })) };
  let schema: object;
  if (division === 'home') {
    schema = { ...base, '@type': 'LocalBusiness', description: 'Family owned, owner operated property services company covering Christchurch, North Canterbury and Canterbury.', department: [{ '@type': 'HomeAndConstructionBusiness', name: 'Pressure Pro', telephone: '+64 27 315 7559', serviceType: 'Exterior cleaning' }, { '@type': 'HomeAndConstructionBusiness', name: 'Lawn Pro', telephone: '+64 21 047 7013', serviceType: 'Lawn and garden care' }, { '@type': 'HomeAndConstructionBusiness', name: 'Clean Pro', telephone: '+64 27 315 7559', serviceType: 'Property cleaning' }] };
  } else {
    const p = content[division];
    schema = { ...base, '@type': 'HomeAndConstructionBusiness', name: p.name, description: p.intro, telephone: `+64 ${p.phone.replace('0', '64 ')}`, serviceType: p.services.join(', '), provider: { '@type': 'LocalBusiness', name: 'Pro Enterprises' } };
  }
  const s = document.createElement('script');
  s.id = id; s.type = 'application/ld+json'; s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}

function App() {
  const [division, setDivision] = useState<Division>(getDivision);
  const page = content[division];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPop = () => setDivision(getDivision());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = `${page.name} | ${division === 'home' ? 'Property Services Canterbury' : page.eyebrow}`;
    document.documentElement.style.setProperty('--accent', `var(--${page.theme})`);
    document.documentElement.style.setProperty('--accent-soft', `var(--${page.theme}-soft)`);
    const description = division === 'home' ? 'Pro Enterprises is a family owned, owner operated property services company covering Christchurch, North Canterbury and Canterbury.' : `${page.name} provides reliable ${division === 'pressure' ? 'exterior cleaning' : division === 'lawn' ? 'lawn and garden care' : 'property cleaning'} across Christchurch, Rolleston, Rangiora, Kaiapoi, Woodend, Amberley and Canterbury.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    let og = document.querySelector('meta[property="og:image"]');
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', 'og:image'); document.head.appendChild(og); }
    og.setAttribute('content', `${window.location.origin}${logos.home}`);
    window.history.replaceState({}, '', division === 'home' ? '/' : `/${division}-pro`);
    setMenuOpen(false);
    injectSchema(division);
  }, [division, page, page.theme]);

  const navigate = (next: Division) => { setDivision(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <div className={`site theme-${page.theme}`}>
    <Header active={division} onNavigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main>
      <Hero page={page} division={division} />
      <TrustStrip theme={page.theme} />
      {division === 'home' ? <HomeBody onNavigate={navigate} /> : <DivisionBody page={page} division={division} />}
    </main>
    <Footer active={division} onNavigate={navigate} />
  </div>;
}

function Header({ active, onNavigate, menuOpen, setMenuOpen }: { active: Division; onNavigate: (division: Division) => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return <header className="header"><div className="shell header-inner"><button className="brand" onClick={() => onNavigate('home')} aria-label={`${content[active].name} home`}><img src={logos[active]} alt={content[active].name} /></button><nav className={menuOpen ? 'nav open' : 'nav'}><button className={active === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => onNavigate('home')}>Pro Enterprises</button><button className={active === 'pressure' ? 'nav-link blue active' : 'nav-link blue'} onClick={() => onNavigate('pressure')}>Pressure Pro</button><button className={active === 'lawn' ? 'nav-link green active' : 'nav-link green'} onClick={() => onNavigate('lawn')}>Lawn Pro</button><button className={active === 'clean' ? 'nav-link orange active' : 'nav-link orange'} onClick={() => onNavigate('clean')}>Clean Pro</button><a className="header-call" href="tel:0273157559"><Phone size={15} /> Call us</a></nav><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div></header>;
}

function Hero({ page, division }: { page: typeof content[Division]; division: Division }) {
  return <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,8,9,.98) 0%, rgba(7,8,9,.88) 42%, rgba(7,8,9,.28) 100%), url(${page.hero})` }}><div className="shell hero-grid"><div className="hero-copy"><div className="eyebrow"><span />{page.eyebrow}</div><h1>{page.title.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h1><p className="hero-intro">{page.intro}</p><div className="hero-actions"><a className="button primary" href="#enquire">Get a free quote <ArrowRight size={17} /></a><a className="button text-button" href={`tel:${page.phone.replaceAll(' ', '')}`}><Phone size={16} /> {page.phone}</a></div><div className="hero-note"><ShieldCheck size={17} /> Family owned. Owner operated. Locally trusted.</div></div><EnquiryForm page={page} division={division} /></div><div className="hero-cut" /></section>;
}

function EnquiryForm({ page, division }: { page: typeof content[Division]; division: Division }) {
  const [sent, setSent] = useState(false); const [sending, setSending] = useState(false); const [error, setError] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSending(true); setError(false); const form = event.currentTarget; const data = new FormData(form); data.append('access_key', '13230a01-adb6-4b5c-9c73-180d63ee4603'); data.append('subject', `${page.name} website enquiry`); data.append('from_name', 'Pro Enterprises website'); try { const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data }); if (!response.ok) throw new Error('Unable to send'); setSent(true); form.reset(); } catch { setError(true); } finally { setSending(false); } };
  return <div className="form-card" id="enquire"><div className="form-top"><div><span className="form-label">Start a conversation</span><h2>Let&apos;s talk<br />about your property.</h2></div><Sparkles className="form-spark" size={22} /></div>{sent ? <div className="success"><div className="success-icon"><Check /></div><h3>Thanks, we&apos;ve got it.</h3><p>Corbyn will be in touch shortly about your free quote.</p><button className="button secondary" onClick={() => setSent(false)}>Send another enquiry</button></div> : <form onSubmit={submit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required type="tel" placeholder="027 000 0000" /></label></div><div className="form-row"><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>Suburb<input name="suburb" required placeholder="Where are you based?" /></label></div>{division !== 'home' && <label>{page.serviceLabel}<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{page.services.map(service => <option key={service}>{service}</option>)}</select></label>}{division === 'home' && <label>{page.serviceLabel}<select name="service" required defaultValue=""><option value="" disabled>Choose a division</option>{page.services.map(service => <option key={service}>{service}</option>)}</select></label>}<label>Message<textarea name="message" required placeholder="Tell us a little about what you need..." rows={3} /></label><button className="button primary full" disabled={sending}>{sending ? 'Sending enquiry...' : 'Request a free quote'} <ArrowRight size={17} /></button>{error && <p className="form-error">Something went wrong. Please call us directly or try again.</p>}<p className="form-foot">Free quotes • Same day service available • Canterbury wide</p></form>}</div>;
}

function TrustStrip({ theme }: { theme: Theme }) { return <div className="trust-strip"><div className="shell trust-inner"><div><Clock3 size={19} /><span>Same day &amp; emergency services available</span></div><div><ShieldCheck size={19} /><span>Fully local, owner operated service</span></div><div><Sparkles size={19} /><span>Free, no obligation quotes</span></div></div></div>; }

function HomeBody({ onNavigate }: { onNavigate: (division: Division) => void }) { return <><section className="intro-section"><div className="shell split"><div className="section-heading"><div className="eyebrow"><span />One team. More ways to help.</div><h2>Property care,<br /><em>done properly.</em></h2></div><div className="section-copy"><p>Pro Enterprises is the home of Pressure Pro, Lawn Pro and Clean Pro. Three focused services, one standard of care, and a local team that understands what it takes to keep Canterbury properties looking their best.</p><a className="inline-link" href="#divisions">Explore our divisions <ArrowRight size={17} /></a></div></div></section><section className="owner-section"><div className="shell owner-inner"><img className="owner-photo" src="/headshot.jpg" alt="Corbyn Roberts, owner of Pro Enterprises" /><div><div className="eyebrow"><span />Meet the owner</div><h2>Local by nature.<br /><em>Professional by choice.</em></h2><p>Pro Enterprises is owned and operated by Corbyn Roberts. With a hands-on approach and pride in every job, Corbyn has built a local team that delivers dependable property care across Canterbury.</p></div></div></section><section className="divisions-section" id="divisions"><div className="shell"><div className="section-top"><div><div className="eyebrow"><span />Find your pro</div><h2>Specialists at work.</h2></div><p>From the first cut to the final rinse, we bring the right skills and equipment to every job.</p></div><div className="division-cards"><DivisionCard type="pressure" onNavigate={onNavigate} /><DivisionCard type="lawn" onNavigate={onNavigate} /><DivisionCard type="clean" onNavigate={onNavigate} /></div></div></section><section className="service-area"><div className="shell service-area-inner"><div><div className="eyebrow"><span />Proudly Canterbury</div><h2>Local knowledge.<br /><em>Professional results.</em></h2></div><p>Based in Canterbury and covering Christchurch, Rolleston, Rangiora, Kaiapoi, Woodend, Amberley and the wider region. When you call Pro Enterprises, you talk directly to the people doing the work.</p></div></section></>; }

function DivisionCard({ type, onNavigate }: { type: 'pressure' | 'lawn' | 'clean'; onNavigate: (division: Division) => void }) { const page = content[type]; return <button className={`division-card ${type}`} onClick={() => onNavigate(type)}><img src={logos[type]} alt={page.name} /><div className="card-overlay"><span>Explore division <ArrowRight size={16} /></span><h3>{page.name}</h3><p>{page.intro}</p></div></button>; }

function DivisionBody({ page, division }: { page: typeof content[Division]; division: Division }) { const heading = division === 'pressure' ? <>Clean lines.<br /><em>Clear results.</em></> : division === 'lawn' ? <>A better kept<br /><em>kind of day.</em></> : <>Clean spaces.<br /><em>Clear minds.</em></>; return <><section className="intro-section division-intro"><div className="shell split"><div className="section-heading"><div className="eyebrow"><span />The {page.name} difference</div><h2>{heading}</h2></div><div className="section-copy"><p>{page.description}</p><a className="inline-link" href="#services">See what we do <ArrowRight size={17} /></a></div></div></section><section className="services-section" id="services"><div className="shell"><div className="section-top"><div><div className="eyebrow"><span />Our services</div><h2>Built around<br />your property.</h2></div><p>Flexible service for residential, commercial and rural properties across Canterbury.</p></div><div className="service-list">{page.services.map((service, i) => <div className="service-item" key={service}><span>0{i + 1}</span><strong>{service}</strong><ArrowRight size={17} /></div>)}</div></div></section><section className="cta-band"><div className="shell cta-inner"><div><div className="eyebrow"><span />Ready when you are</div><h2>Let&apos;s make your<br /><em>property the proof.</em></h2></div><a className="button primary" href="#enquire">Get a free quote <ArrowRight size={17} /></a></div></section></>; }

function Footer({ active, onNavigate }: { active: Division; onNavigate: (division: Division) => void }) { return <footer className="footer"><div className="shell footer-grid"><div><img className="footer-logo" src={logos[active]} alt={content[active].name} /><p>Your property, our pros.<br />Property services across Canterbury.</p></div><div><span className="footer-label">Explore</span><button onClick={() => onNavigate('home')}>Pro Enterprises</button><button onClick={() => onNavigate('pressure')}>Pressure Pro</button><button onClick={() => onNavigate('lawn')}>Lawn Pro</button><button onClick={() => onNavigate('clean')}>Clean Pro</button></div><div><span className="footer-label">Get in touch</span><a href="tel:0273157559">027 315 7559</a><a href="tel:0210477013">021 047 7013</a><a href="mailto:info@proenterprises.co.nz">info@proenterprises.co.nz</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Pro Enterprises. Canterbury, New Zealand.</span><a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar</a></div></footer>; }

export default App;
