import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Cloud,
  Cpu,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  Network,
  Palette,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import './styles.css';

const CONFIG = {
  collegeName: 'Dr. D.Y. Patil Institute of Technology, Pimpri',
  chapterName: 'ACM Student Chapter',
  applicationStatus: 'ACM RECRUITMENT · Applications Open',
  applicationDeadline: '8 October 2026',
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const opportunities = [
  { title: 'Technical Workshops', text: 'Hands-on sessions that turn concepts into things you can actually use.', icon: Code2, span: 'wide' },
  { title: 'Expert Sessions', text: 'Learn from practitioners, researchers and people building in the real world.', icon: Sparkles, span: '' },
  { title: 'Hackathons', text: 'Team up, ship fast, solve real problems and learn by doing.', icon: Rocket, span: '' },
  { title: 'Projects', text: 'Build proof of work with people who are equally driven to create.', icon: Layers3, span: 'tall' },
  { title: 'Competitions', text: 'Challenge yourself through technical and creative problem solving.', icon: Trophy, span: '' },
  { title: 'Networking', text: 'Build genuine connections across students, professionals and communities.', icon: Network, span: '' },
  { title: 'Inter-college Events', text: 'Step outside your campus and discover a broader computing community.', icon: Globe2, span: 'wide' },
  { title: 'Leadership Opportunities', text: 'Own initiatives, coordinate teams and learn what leadership feels like in practice.', icon: Users, span: '' },
];

const profiles = [
  { name: 'The Builder', text: 'You like creating things and seeing an idea become real.', icon: Rocket },
  { name: 'The Explorer', text: 'You want to understand what is changing in technology.', icon: Search },
  { name: 'The Connector', text: 'You enjoy meeting people and creating meaningful networks.', icon: Network },
  { name: 'The Leader', text: 'You want responsibility, ownership and experience running initiatives.', icon: Zap },
  { name: 'The Creative', text: 'You care about design, communication, storytelling and experience.', icon: Palette },
  { name: 'The Researcher', text: 'You are curious about what comes next and why it matters.', icon: Cpu },
];

const domains = [
  { name: 'AI / ML', icon: Cpu },
  { name: 'Development', icon: Code2 },
  { name: 'Cybersecurity', icon: Shield },
  { name: 'Cloud', icon: Cloud },
  { name: 'Blockchain', icon: Layers3 },
  { name: 'Research', icon: Search },
  { name: 'UI / UX', icon: Palette },
  { name: 'Open Source', icon: Github },
  { name: 'Events', icon: Trophy },
  { name: 'Networking', icon: Network },
];

const faq = [
  { q: 'Do I need coding experience?', a: 'Not necessarily. ACM can be a place to learn, build, communicate, collaborate or lead. Add the chapter’s confirmed eligibility details here before launch.' },
  { q: 'Who can join?', a: 'Students currently in Second Year (SE) or Third Year (TE) at DIT can apply.' },
  { q: 'What can I do in ACM?', a: 'You can learn, build, connect, and lead. Depending on your interests, you can get involved in technical activities, workshops, projects, competitions, events, networking, content, design, and chapter initiatives.' },
  { q: 'Are there technical and non-technical opportunities?', a: 'Yes. ACM is built around more than just coding. Technical students can explore development, AI/ML, cybersecurity, cloud, research and other areas, while students interested in design, communication, events, networking, management and creative work can contribute in their own ways.' },
  { q: 'What happens after applying?', a: 'After submitting your application, the chapter team will review your application and shortlisted candidates will be contacted for the next stage of the selection process. Further details will be communicated to candidates through the official chapter channels.' },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  year: '',
  branch: '',
  interests: [],
  skills: '',
  experience: '',
  linkedin: '',
  github: '',
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState('idle');
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;
  const canUseBackend = !!supabase;

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleInterest = (value) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value],
    }));
  };

  const openJoin = () => {
    setJoinOpen(true);
    setStep(1);
    setSubmitState('idle');
    setError('');
    document.body.style.overflow = 'hidden';
  };

  const closeJoin = () => {
    setJoinOpen(false);
    document.body.style.overflow = '';
  };

  const validateStep = (currentStep) => {
    setError('');
    if (currentStep === 1) {
      if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
        setError('Please complete your name, email and phone number.');
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        setError('Enter a valid email address.');
        return false;
      }
    }
    if (currentStep === 2 && (!form.year || !form.branch)) {
      setError('Please select your year and branch.');
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateStep(3)) return;
    if (!canUseBackend) {
      setError('Backend is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the project environment.');
      return;
    }
    setSubmitState('submitting');
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      year: form.year,
      branch: form.branch,
      interests: form.interests,
      skills: form.skills.trim(),
      previous_experience: form.experience.trim(),
      linkedin: form.linkedin.trim() || null,
      github: form.github.trim() || null,
    };
    const { error: insertError } = await supabase.from('acm_applications').insert(payload);
    if (insertError) {
      setSubmitState('error');
      setError(insertError.message || 'Something went wrong while submitting your application.');
      return;
    }
    setSubmitState('success');
  };

  return (
    <div className="site-shell">
      <div className="noise" />
      <header className="nav-wrap">
        <nav className="nav container">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home">
            <span className="brand-mark">ACM</span>
            <span className="brand-copy"><strong>{CONFIG.collegeName}</strong><span>{CONFIG.chapterName}</span></span>
          </button>
          <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            <button onClick={() => scrollTo('why')}>Why ACM</button>
            <button onClick={() => scrollTo('opportunities')}>Opportunities</button>
            <button onClick={() => scrollTo('community')}>Community</button>
            <button onClick={() => scrollTo('faq')}>FAQ</button>
            <button className="mobile-join" onClick={openJoin}>JOIN ACM <ArrowRight size={15} /></button>
          </div>
          <button className="nav-cta" onClick={openJoin}>JOIN ACM <ArrowRight size={15} /></button>
          <button className="menu-btn" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-grid" />
          <div className="hero-orbit orbit-a" />
          <div className="hero-orbit orbit-b" />
          <div className="hero-content container">
            <div className="eyebrow"><span className="pulse" />{CONFIG.applicationStatus}</div>
            <h1>BUILD.<br /><span>CONNECT.</span><br />LEAD.</h1>
            <p className="hero-sub">Your college years should be more than lectures, assignments and exams.</p>
            <p className="hero-copy">ACM gives you an ecosystem to <strong>learn, build, network and lead</strong> — with people who are curious enough to make things happen.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={openJoin}>JOIN ACM <ArrowRight size={17} /></button>
              <button className="btn ghost" onClick={() => scrollTo('why')}>EXPLORE ACM <ArrowDown size={16} /></button>
            </div>
            <div className="hero-note">Built for students who want more from their college journey.</div>
          </div>
          <div className="hero-visual container" aria-hidden="true">
            <div className="signal-card card-a"><span>01</span><b>LEARN</b><small>Curiosity → capability</small></div>
            <div className="signal-card card-b"><span>02</span><b>BUILD</b><small>Idea → proof of work</small></div>
            <div className="signal-card card-c"><span>03</span><b>CONNECT</b><small>People → possibilities</small></div>
            <div className="signal-card card-d"><span>04</span><b>LEAD</b><small>Ownership → impact</small></div>
          </div>
        </section>

        <section id="why" className="section-pad section-border">
          <div className="container">
            <div className="section-kicker">01 / WHY ACM</div>
            <div className="headline-row">
              <h2>College gives you a degree.<br /><em>ACM gives you an ecosystem.</em></h2>
              <p>Make your time on campus count for something beyond attendance and grades. Build experience while you are still a student.</p>
            </div>
            <div className="pillar-grid">
              {[
                ['01', 'LEARN', 'Technical workshops, expert sessions, emerging technologies and peer learning.'],
                ['02', 'BUILD', 'Projects, hackathons, competitions and hands-on experiences.'],
                ['03', 'CONNECT', 'Meet ambitious students, professionals, researchers and other ACM communities.'],
                ['04', 'LEAD', 'Organize events, manage teams, take responsibility and develop leadership skills.'],
              ].map(([num, title, text]) => (
                <article className="pillar" key={title}>
                  <span>{num}</span><h3>{title}</h3><p>{text}</p><div className="pillar-line" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="opportunities" className="section-pad section-border">
          <div className="container">
            <div className="section-kicker">02 / OPPORTUNITIES</div>
            <div className="headline-row compact">
              <h2>What can you <em>do here?</em></h2>
              <p>Explore the kinds of experiences a strong student chapter can create. Keep the final list aligned with your chapter's actual calendar.</p>
            </div>
            <div className="bento-grid">
              {opportunities.map(({ title, text, icon: Icon, span }) => (
                <article className={`bento ${span}`} key={title}>
                  <div className="bento-icon"><Icon size={20} /></div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <ArrowRight className="bento-arrow" size={17} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad section-border">
          <div className="container">
            <div className="section-kicker">03 / FIND YOUR PLACE</div>
            <div className="identity-wrap">
              <div className="identity-title">
                <h2>ACM ISN'T<br /><em>ONLY FOR CODERS.</em></h2>
                <p>You do not have to arrive as an expert. You just need a reason to start.</p>
              </div>
              <div className="profile-grid">
                {profiles.map(({ name, text, icon: Icon }) => (
                  <article className="profile" key={name}>
                    <Icon size={19} />
                    <h3>{name}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad section-border">
          <div className="container">
            <div className="section-kicker">04 / POSSIBILITIES</div>
            <div className="headline-row compact">
              <h2>Choose the questions<br />you want to <em>explore.</em></h2>
              <p>Domains shown here are broad areas of interest — not claims about what this chapter currently offers.</p>
            </div>
            <div className="domain-cloud">
              {domains.map(({ name, icon: Icon }) => <div className="domain-chip" key={name}><Icon size={15} />{name}</div>)}
            </div>
          </div>
        </section>

        <section id="community" className="section-pad section-border">
          <div className="container">
            <div className="section-kicker">05 / COMMUNITY</div>
            <div className="community-head">
              <div><h2>Show, don't <em>tell.</em></h2><p>Replace the placeholders below with real chapter photos before launch. Authenticity beats stock imagery every time.</p></div>
              <div className="mini-tag"><Sparkles size={14} /> REAL CHAPTER MOMENTS</div>
            </div>
            <div className="gallery-grid">
              {[
                ['01', 'WORKSHOPS', 'Add a real workshop image here.'],
                ['02', 'HACKATHONS', 'Add a real hackathon image here.'],
                ['03', 'TECHNICAL EVENTS', 'Add a real event image here.'],
                ['04', 'TEAM ACTIVITIES', 'Add a real team photo here.'],
                ['05', 'NETWORKING', 'Add a real networking image here.'],
                ['06', 'LEADERSHIP', 'Add a real leadership image here.'],
              ].map(([n, title, text], i) => (
                <div className={`gallery-card gallery-${i + 1}`} key={title}>
                  <div className="gallery-faux-grid" />
                  <div className="gallery-overlay"><span>{n}</span><div><b>{title}</b><small>{text}</small></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="statement section-pad">
          <div className="container statement-inner">
            <div className="statement-top">06 / WHY JOIN</div>
            <h2>DON'T JUST<br />ATTEND COLLEGE.<br /><em>BUILD YOUR EXPERIENCE.</em></h2>
            <div className="flow"><span>LEARN</span><ArrowRight /><span>BUILD</span><ArrowRight /><span>CONNECT</span><ArrowRight /><span>LEAD</span><ArrowRight /><span>GROW</span></div>
          </div>
        </section>

        <section className="cta section-pad" id="join-cta">
          <div className="container cta-card">
            <div className="cta-glow" />
            <div className="section-kicker">07 / TAKE THE NEXT STEP</div>
            <h2>YOUR NEXT<br /><em>OPPORTUNITY</em><br />STARTS HERE.</h2>
            <p>Join a community where you can learn, build, connect and lead.</p>
            {CONFIG.applicationDeadline && <div className="deadline">APPLICATIONS CLOSE · {CONFIG.applicationDeadline}</div>}
            <button className="btn primary large" onClick={openJoin}>JOIN ACM <ArrowRight size={18} /></button>
          </div>
        </section>

        <section id="faq" className="section-pad section-border faq-section">
          <div className="container faq-layout">
            <div><div className="section-kicker">08 / FAQ</div><h2>Questions before<br /><em>you join?</em></h2></div>
            <div className="faq-list">
              {faq.map((item, idx) => (
                <button className={`faq-item ${openFaq === idx ? 'active' : ''}`} key={item.q} onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}>
                  <div><strong>{item.q}</strong>{openFaq === idx && <p>{item.a}</p>}</div>
                  <ChevronDown size={18} />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div><div className="brand-mark footer-mark">ACM</div><p>{CONFIG.chapterName} · {CONFIG.collegeName}</p></div>
          <div className="footer-right"><span>LEARN · BUILD · CONNECT · LEAD</span><button onClick={openJoin}>JOIN ACM <ArrowRight size={15} /></button></div>
        </div>
      </footer>

      {joinOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Join ACM">
          <div className="modal">
            <button className="close-modal" onClick={closeJoin} aria-label="Close"><X size={20} /></button>
            {submitState === 'success' ? (
              <div className="success-state"><div className="success-icon"><Check size={24} /></div><div className="section-kicker">APPLICATION RECEIVED</div><h2>You're on your way.</h2><p>Your application has been submitted successfully. Update this message with your chapter's actual next step before launch.</p><button className="btn ghost" onClick={closeJoin}>CLOSE</button></div>
            ) : (
              <form onSubmit={submit}>
                <div className="modal-top"><div><div className="section-kicker">JOIN ACM</div><h2>Start your application.</h2></div><div className="step-count">0{step} / 03</div></div>
                <div className="progress"><span style={{ width: `${progress}%` }} /></div>
                {error && <div className="form-error">{error}</div>}
                {step === 1 && <div className="form-grid">
                  <label>Full name<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" required /></label>
                  <label>Email<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" required /></label>
                  <label>Phone<input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 ..." required /></label>
                  <div className="field-note">Only information needed to process your application is collected.</div>
                </div>}
                {step === 2 && <div className="form-grid">
                  <label>Year<select value={form.year} onChange={(e) => update('year', e.target.value)} required><option value="">Select year</option><option>FE</option><option>SE</option><option>TE</option><option>BE</option></select></label>
                  <label>Branch<input value={form.branch} onChange={(e) => update('branch', e.target.value)} placeholder="Computer Engineering" required /></label>
                  <div className="full"><span className="label-title">Areas of interest</span><div className="interest-grid">{domains.map(({ name }) => <button type="button" className={`interest ${form.interests.includes(name) ? 'selected' : ''}`} key={name} onClick={() => toggleInterest(name)}>{name}{form.interests.includes(name) && <Check size={13} />}</button>)}</div></div>
                </div>}
                {step === 3 && <div className="form-grid">
                  <label className="full">Skills<input value={form.skills} onChange={(e) => update('skills', e.target.value)} placeholder="Java, React, Figma, public speaking..." /></label>
                  <label className="full">Previous experience<textarea value={form.experience} onChange={(e) => update('experience', e.target.value)} placeholder="Projects, events, clubs, competitions, volunteering..."></textarea></label>
                  <label>LinkedIn (optional)<input value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></label>
                  <label>GitHub (optional)<input value={form.github} onChange={(e) => update('github', e.target.value)} placeholder="https://github.com/..." /></label>
                </div>}
                <div className="form-actions">
                  <button type="button" className="btn ghost" onClick={() => step === 1 ? closeJoin() : setStep((s) => s - 1)}>{step === 1 ? 'CANCEL' : 'BACK'}</button>
                  {step < 3 ? <button type="button" className="btn primary" onClick={next}>CONTINUE <ArrowRight size={16} /></button> : <button type="submit" className="btn primary" disabled={submitState === 'submitting'}>{submitState === 'submitting' ? 'SUBMITTING…' : 'SUBMIT APPLICATION'} <ArrowRight size={16} /></button>}
                </div>
                {!canUseBackend && <div className="backend-note">Backend not configured in this build. Configure Supabase to enable real submissions.</div>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
