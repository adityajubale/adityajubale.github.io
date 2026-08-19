import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Droplets,
  Leaf,
  Menu,
  Minus,
  Plus,
  X,
  Wine,
} from 'lucide-react';
import heroImage from '@/assets/lp-23-hero.png';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [savedMember, setSavedMember] = useState<{ name: string; box: string } | null>(null);
  const [journalReady, setJournalReady] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.title = 'Cellar. — Living wine, bottled poetry.';
    const description = 'Cellar is a thoughtful natural wine club, bringing expressive bottles chosen by people to curious drinkers.';
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag); }
    tag.setAttribute('content', description);
    const existing = localStorage.getItem('cellar-membership');
    if (existing) {
      try { setSavedMember(JSON.parse(existing)); } catch { localStorage.removeItem('cellar-membership'); }
    }
    const timer = window.setTimeout(() => setJournalReady(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  const closeNav = () => setMenuOpen(false);
  const openJoin = () => { setShowJoin(true); closeNav(); };
  const showPastBoxes = () => {
    setShowPast(true);
    window.setTimeout(() => document.getElementById('past-boxes')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };

  return (
    <div className="cellar-page">
      <header className="site-header">
        <a className="wordmark" href="#top" data-testid="link-wordmark" onClick={closeNav}>CELLAR.</a>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          <a href="#curations" data-testid="link-curations" onClick={closeNav}>Curations</a>
          <a href="#vignerons" data-testid="link-vignerons" onClick={closeNav}>Vignerons</a>
          <a href="#journal" data-testid="link-journal" onClick={closeNav}>Journal</a>
          <a href="#faq" data-testid="link-faq" onClick={closeNav}>Details</a>
        </nav>
        <button className="header-join" onClick={openJoin} data-testid="button-header-join">Join the Club</button>
        <button className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation" data-testid="button-mobile-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow reveal"><span style={{ display: 'inline-block', width: 38, borderTop: '1px solid currentColor', verticalAlign: 'middle', marginRight: 10 }} />Limited allocation</div>
            <h1 className="serif reveal reveal-delay">Living wine,<br /><em>bottled poetry.</em></h1>
            <p className="intro reveal reveal-delay">Discover the world's most expressive low-intervention wines. Sourced directly from independent cellars, delivered to your door every month.</p>
            <div className="hero-actions reveal reveal-delay">
              <button className="btn-primary" onClick={openJoin} data-testid="button-start-journey">Start your journey <ArrowRight size={17} /></button>
              <button className="text-button" onClick={showPastBoxes} data-testid="button-view-past-boxes">View past boxes</button>
            </div>
            <div className="hero-line" aria-label="Our standards">
              <div className="hero-feature" data-testid="feature-organic"><Leaf size={20} /><strong>Organic</strong><span>Farmed without chemicals</span></div>
              <div className="hero-feature" data-testid="feature-unfined"><Droplets size={20} /><strong>Unfined</strong><span>Bottled with its soul</span></div>
              <div className="hero-feature" data-testid="feature-curated"><Wine size={20} /><strong>Curated</strong><span>Sommelier selected</span></div>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="A bottle of red wine poured into a glass beside grapes and candlelight" data-testid="img-hero-wine" />
            <div className="quote-card" data-testid="card-quote">
              <span aria-hidden="true" className="quote-mark">“</span>
              <p>The best curation of natural wine available online.</p>
              <cite>— The Wine Journal</cite>
            </div>
          </div>
        </section>

        <section className="manifesto section-shell" id="about">
          <div>
            <div className="eyebrow">A different kind of club</div>
            <h2>For bottles with a <em>point of view.</em></h2>
          </div>
          <div className="manifesto-copy">
            <p>Wine is an act of attention. It holds the weather of a season, the stubbornness of a grower, the place where a vine met the sun. Cellar is a monthly invitation to pay attention.</p>
            <p>We taste hundreds of bottles to find the few that say something true. No scores, no algorithms — just the quiet confidence of a good recommendation from someone who knows your table.</p>
            <div className="signature">Selected with feeling, in small quantities.</div>
          </div>
        </section>

        <section className="curations" id="curations">
          <div className="section-shell">
            <div className="section-heading">
              <div><div className="eyebrow">The current allocation · Spring 2025</div><h2>Open a box. <em>Find a story.</em></h2></div>
              <button className="text-button" style={{ color: '#e8dcd1' }} onClick={openJoin} data-testid="button-curations-join">Reserve this allocation <ArrowRight size={15} style={{ verticalAlign: 'middle', marginLeft: 7 }} /></button>
            </div>
            <div className="box-grid">
              <article className="wine-box large" data-testid="card-box-field-notes">
                <div className="box-art"><span>FIELD NOTES</span></div>
                <div className="wine-box-content">
                  <div className="eyebrow">Our signature box · 3 bottles</div>
                  <h3>Field Notes</h3>
                  <p>Three bright, earthy bottles for getting acquainted: a mineral Loire white, a peppery Sicilian red, and something lightly sparkling for the walk home.</p>
                  <div className="box-meta"><span>From $78 / month</span><span>Most loved</span></div>
                </div>
              </article>
              <article className="wine-box" data-testid="card-box-deep-cut">
                <div className="box-art" style={{ background: 'radial-gradient(circle at 50% 25%, #8b6b4c, #433227 45%, #241514)' }}><span>DEEP CUTS</span></div>
                <div className="wine-box-content">
                  <div className="eyebrow">For the curious · 2 bottles</div>
                  <h3>Deep Cuts</h3>
                  <p>Uncommon grapes and cellar surprises, always selected with a little mischief.</p>
                  <div className="box-meta"><span>From $59 / month</span></div>
                </div>
              </article>
            </div>
            {showPast && <div className="past-boxes reveal" id="past-boxes" data-testid="section-past-boxes">
              <div className="eyebrow">From the archive</div>
              <div className="past-boxes-grid">
                <div className="past-box" data-testid="past-box-1"><span>02 / 25</span><br />The Volcanic Issue</div>
                <div className="past-box" data-testid="past-box-2"><span>01 / 25</span><br />A Little Bit Wild</div>
                <div className="past-box" data-testid="past-box-3"><span>12 / 24</span><br />Winter Reds</div>
              </div>
            </div>}
          </div>
        </section>

        <section className="vignerons section-shell" id="vignerons">
          <div className="vignerons-layout">
            <figure className="vigneron-image" data-testid="figure-vigneron">
              <img src={heroImage} alt="Wine bottles and candlelight in a small cellar" />
              <figcaption>Somewhere between the vineyard and your table</figcaption>
            </figure>
            <div className="vigneron-copy">
              <div className="eyebrow">The people behind the bottle</div>
              <h2>Small hands. <em>Big character.</em></h2>
              <p>We work with growers who farm in conversation with their land. The ones who keep old vines, native yeasts and a healthy disregard for the easy way.</p>
              <div className="maker-list">
                <div className="maker-row" data-testid="maker-row-amelie"><span>01</span><strong>Amélie &amp; Charles</strong><small>Loire Valley · France</small></div>
                <div className="maker-row" data-testid="maker-row-matteo"><span>02</span><strong>Matteo Sferlazzo</strong><small>Etna · Sicily</small></div>
                <div className="maker-row" data-testid="maker-row-nina"><span>03</span><strong>Nina &amp; the vines</strong><small>Styria · Austria</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="journal" id="journal">
          <div className="section-shell">
            <div className="section-heading">
              <div><div className="eyebrow">From the journal</div><h2>Pour something <em>interesting.</em></h2></div>
              <button className="text-button" onClick={() => setToast('You are already reading the latest dispatches.')} data-testid="button-read-journal">Read the journal <ArrowRight size={15} style={{ verticalAlign: 'middle', marginLeft: 7 }} /></button>
            </div>
            {!journalReady ? <div className="journal-loading" data-testid="status-journal-loading">Gathering the latest dispatches…</div> :
              <div className="journal-grid" data-testid="grid-journal">
                <article className="journal-card featured" data-testid="card-journal-gamay"><span className="journal-number">01</span><h3>Why Gamay is having a quiet renaissance</h3><p>A grape with a reputation for being easy-going is showing us its serious side. We follow it from granite soils to the late-night table.</p><time>12 min read · Field notes</time></article>
                <article className="journal-card" data-testid="card-journal-cellar"><span className="journal-number">02</span><h3>Notes from a candlelit cellar</h3><p>On the pleasure of tasting slowly, with fewer opinions in the room.</p><time>6 min read</time></article>
                <article className="journal-card" data-testid="card-journal-serve"><span className="journal-number">03</span><h3>The right temperature is a feeling</h3><p>A short guide to serving your bottles just a little cooler.</p><time>4 min read</time></article>
              </div>}
          </div>
        </section>

        <section className="join-section" id="join">
          <div className="section-shell join-layout">
            <div className="join-copy">
              <div className="eyebrow">Your place at the table</div>
              <h2>Make room for a little <em>wonder.</em></h2>
              <p>Tell us how you like to drink and we’ll save a place for you in our next allocation. No payment today — just a thoughtful beginning.</p>
            </div>
            <MembershipForm savedMember={savedMember} setSavedMember={setSavedMember} />
          </div>
        </section>

        <section className="faq section-shell" id="faq">
          <div className="faq-layout">
            <div><div className="eyebrow">The fine print, made friendly</div><h2>Good to<br /><em>know.</em></h2></div>
            <FaqList />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section-shell">
          <div className="footer-top"><a className="wordmark" href="#top" data-testid="link-footer-wordmark">CELLAR.</a><p>Expressive bottles for curious drinkers. Chosen by people, never algorithms.</p><nav className="footer-nav"><a href="#curations" data-testid="link-footer-curations">Curations</a><a href="#vignerons" data-testid="link-footer-vignerons">Vignerons</a><a href="#journal" data-testid="link-footer-journal">Journal</a><a href="#join" data-testid="link-footer-join">Join</a></nav></div>
          <div className="footer-bottom"><span>© 2025 Cellar Wine Club</span><span>Made for slow evenings and good company</span></div>
        </div>
      </footer>
      {showJoin && <JoinModal onClose={() => setShowJoin(false)} savedMember={savedMember} setSavedMember={setSavedMember} />}
      {toast && <div className="toast-note" role="status" data-testid="status-toast">{toast}<button onClick={() => setToast('')} aria-label="Dismiss notification" data-testid="button-dismiss-toast" style={{ border: 0, background: 'transparent', marginLeft: 12, color: 'inherit' }}><X size={13} /></button></div>}
    </div>
  );
}

type Member = { name: string; box: string };
type MembershipProps = { savedMember: Member | null; setSavedMember: (member: Member) => void };

function MembershipForm({ savedMember, setSavedMember }: MembershipProps) {
  const [cadence, setCadence] = useState('monthly');
  const [preference, setPreference] = useState('surprise');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (savedMember) setSubmitted(true);
  }, [savedMember]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.includes('@')) { setError('Please share your name and a valid email so we know where to send the invitation.'); return; }
    const member = { name: name.trim(), box: cadence === 'monthly' ? 'Field Notes, monthly' : 'Field Notes, every other month' };
    localStorage.setItem('cellar-membership', JSON.stringify(member));
    setSavedMember(member);
    setSubmitted(true);
    setError('');
  };
  if (submitted && savedMember) return <div className="join-form-panel" data-testid="status-membership-confirmation"><div className="confirmation"><div className="confirmation-icon"><Check size={22} /></div><h3>You’re on the list.</h3><p>Thank you, {savedMember.name}. We’ve saved your spot for <strong>{savedMember.box}</strong>. We’ll be in touch when the next allocation is ready.</p><div className="member-note">Reservation saved on this device</div></div></div>;
  return <form className="join-form-panel" onSubmit={submit} data-testid="form-membership">
    <div className="form-header"><h3>Reserve your place</h3><span className="form-step">1 / 1 · No payment today</span></div>
    <label className="form-label">How often would you like a parcel?</label>
    <div className="choice-grid">
      <button type="button" className={`choice${cadence === 'monthly' ? ' selected' : ''}`} onClick={() => setCadence('monthly')} aria-pressed={cadence === 'monthly'} data-testid="choice-cadence-monthly"><strong>Monthly</strong><small>Three bottles · $78</small></button>
      <button type="button" className={`choice${cadence === 'bimonthly' ? ' selected' : ''}`} onClick={() => setCadence('bimonthly')} aria-pressed={cadence === 'bimonthly'} data-testid="choice-cadence-bimonthly"><strong>Every other month</strong><small>Three bottles · $84</small></button>
      <button type="button" className={`choice${cadence === 'deep' ? ' selected' : ''}`} onClick={() => setCadence('deep')} aria-pressed={cadence === 'deep'} data-testid="choice-cadence-deep"><strong>Deep Cuts</strong><small>Two rare bottles · $59</small></button>
    </div>
    <label className="form-label">What sounds good?</label>
    <div className="choice-grid">
      <button type="button" className={`choice${preference === 'surprise' ? ' selected' : ''}`} onClick={() => setPreference('surprise')} aria-pressed={preference === 'surprise'} data-testid="choice-preference-surprise"><strong>Surprise me</strong><small>Trust the cellar</small></button>
      <button type="button" className={`choice${preference === 'red' ? ' selected' : ''}`} onClick={() => setPreference('red')} aria-pressed={preference === 'red'} data-testid="choice-preference-red"><strong>Mostly red</strong><small>Earthy, bright, alive</small></button>
      <button type="button" className={`choice${preference === 'mixed' ? ' selected' : ''}`} onClick={() => setPreference('mixed')} aria-pressed={preference === 'mixed'} data-testid="choice-preference-mixed"><strong>A little of everything</strong><small>Keep me curious</small></button>
    </div>
    <div className="form-fields"><div><label className="form-label" htmlFor="member-name">Your name</label><input className="field" id="member-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="First and last" data-testid="input-member-name" /></div><div><label className="form-label" htmlFor="member-email">Email address</label><input className="field" id="member-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" data-testid="input-member-email" /></div></div>
    {error && <p className="form-error" role="alert" data-testid="status-form-error">{error}</p>}
    <button className="btn-primary form-submit" type="submit" data-testid="button-submit-membership">Save my place <ArrowRight size={16} /></button>
  </form>;
}

function JoinModal({ onClose, savedMember, setSavedMember }: MembershipProps & { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="join-modal-title" data-testid="dialog-join"><button className="modal-close" onClick={onClose} aria-label="Close membership form" data-testid="button-close-membership"><X size={19} /></button><div className="eyebrow">Limited allocation</div><h2 id="join-modal-title">A place at your table.</h2><p>Choose your rhythm and leave the rest to us. This is a reservation, not a charge.</p><MembershipForm savedMember={savedMember} setSavedMember={setSavedMember} /></div></div>;
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const questions = [
    ['What exactly arrives in a box?', 'Each allocation includes a small tasting note for every bottle, a story from the grower, and serving ideas from our cellar team. The bottles change with every parcel.'],
    ['Can I pause or skip an allocation?', 'Of course. Members can pause, skip or change their rhythm before the next allocation is prepared. We will always remind you first.'],
    ['Do you ship everywhere?', 'We currently ship to most states where wine delivery is permitted. Your exact address and local requirements are confirmed before any future payment setup.'],
    ['What does natural wine mean to Cellar?', 'It means a starting point, not a strict rulebook: healthy soil, thoughtful farming, native fermentation where possible, and as little interference in the cellar as the wine allows.'],
  ];
  return <div>{questions.map(([question, answer], index) => <div className="faq-item" key={question}><button className="faq-question" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)} data-testid={`button-faq-${index}`}><span>{question}</span>{open === index ? <Minus size={17} /> : <Plus size={17} />}</button>{open === index && <div className="faq-answer" data-testid={`answer-faq-${index}`}>{answer}</div>}</div>)}</div>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
