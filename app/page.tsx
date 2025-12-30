"use client";

const STREAMLIT_URL = "https://scam-evo-frontend-vercel-app.streamlit.app/";

export default function Page() {
  return (
    <main className="landing">
      <div className="landingBg" aria-hidden="true" />
      <div className="container landingContainer">
        <header className="landingHeader">
          <div className="brand">
            <div className="brandMark">SCAM-EVO</div>
            <div className="brandSub muted">Adversarially-robust scam intelligence</div>
          </div>

          <nav className="landingNav">
            <a href="#about">About</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#how">How it works</a>
          </nav>
        </header>

        <section className="hero" id="about">
          <div className="heroCopy">
            <div className="heroBadgeRow">
              <span className="badge ok">Live Simulation</span>
              <span className="badge">FastAPI + ML Pipeline</span>
              <span className="badge">Adversarial Defense</span>
            </div>

            <h1 className="heroTitle">
              Detect scams.
              <span className="heroTitleAccent"> Evolve defenses.</span>
            </h1>

            <p className="heroLead muted">
              SCAM-EVO is a security-first pipeline that turns real datasets into measurable robustness.
              Explore how adversarial pressure reshapes the decision boundary and reduces evasion.
            </p>

            <div className="ctaRow">
              <a
                className="btn primary"
                href={STREAMLIT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Launch Simulation
              </a>
              <a className="btn secondary" href="#how">
                See the approach
              </a>
            </div>

            <div className="heroStats" aria-label="Product highlights">
              <div className="statCard">
                <div className="statK">Threat Modeling</div>
                <div className="statV">Adversarial + Holdout</div>
              </div>
              <div className="statCard">
                <div className="statK">Metrics</div>
                <div className="statV">F1 / Evasion</div>
              </div>
              <div className="statCard">
                <div className="statK">Experience</div>
                <div className="statV">Interactive 3D</div>
              </div>
            </div>
          </div>

          <div className="heroVisual" aria-hidden="true">
            <div className="orb" />
            <div className="scanLine" />
            <div className="hud">
              <div className="hudLine" />
              <div className="hudLine" />
              <div className="hudLine" />
              <div className="hudLine" />
            </div>
          </div>
        </section>

        <section className="section" id="capabilities">
          <div className="sectionHeader">
            <h2 className="sectionTitle">What SCAM-EVO demonstrates</h2>
            <p className="muted sectionSubtitle">
              A productized view of model robustness: data-in, attack pressure, measurable improvement.
            </p>
          </div>

          <div className="featureGrid">
            <div className="featureCard">
              <h3 className="featureTitle">Dataset ingestion</h3>
              <p className="muted">
                Upload and inspect datasets, track sample balance, and validate labels before training.
              </p>
            </div>
            <div className="featureCard">
              <h3 className="featureTitle">Adversarial evaluation</h3>
              <p className="muted">
                Measure evasion under attack and visualize how “threats” move across latent space.
              </p>
            </div>
            <div className="featureCard">
              <h3 className="featureTitle">Defense iteration</h3>
              <p className="muted">
                Train against adversarial pressure and compare baseline vs defended performance.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="sectionHeader">
            <h2 className="sectionTitle">How it works</h2>
            <p className="muted sectionSubtitle">
              The simulation gives you an intuitive view of what the pipeline is doing behind the scenes.
            </p>
          </div>

          <div className="steps">
            <div className="stepCard">
              <div className="stepIdx">01</div>
              <div>
                <div className="stepTitle">Ingest + split</div>
                <div className="muted">
                  Curate data, split into train/eval/holdout, and establish baseline metrics.
                </div>
              </div>
            </div>
            <div className="stepCard">
              <div className="stepIdx">02</div>
              <div>
                <div className="stepTitle">Attack + measure evasion</div>
                <div className="muted">
                  Stress test the model and quantify how often an attacker can slip through.
                </div>
              </div>
            </div>
            <div className="stepCard">
              <div className="stepIdx">03</div>
              <div>
                <div className="stepTitle">Retrain + compare</div>
                <div className="muted">
                  Retrain with adversarial examples and compare F1 and evasion side-by-side.
                </div>
              </div>
            </div>
          </div>

          <div className="ctaPanel">
            <div>
              <div className="ctaPanelTitle">Ready to see it live?</div>
              <div className="muted">
                Open the Streamlit simulation dashboard in a new tab.
              </div>
            </div>
            <a
              className="btn primary"
              href={STREAMLIT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Simulation Dashboard
            </a>
          </div>
        </section>

        <footer className="landingFooter">
          <div className="muted small">© {new Date().getFullYear()} SCAM-EVO</div>
          <div className="muted small">Built to visualize adversarial robustness.</div>
        </footer>
      </div>
    </main>
  );
}
