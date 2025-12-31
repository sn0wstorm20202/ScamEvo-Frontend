"use client";

import { motion } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "Baseline Detection",
        desc: "Establish F1/Precision benchmarks on known scam datasets like SMS Spam Collection.",
    },
    {
        id: "02",
        title: "Attack Simulation",
        desc: "The Generator creates mutations that preserve meaning but bypass the current detector.",
    },
    {
        id: "03",
        title: "Adversarial Defense",
        desc: "Retrain on these 'hard examples' to achieve 0% evasion and improved robustness.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">How it works</h2>
                    <p className="section-subtitle">
                        The simulation gives you an intuitive view of what the pipeline is doing behind the scenes.
                    </p>
                </div>

                <div className="grid-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                        >
                            <span style={{
                                fontSize: '48px',
                                fontWeight: 800,
                                color: 'var(--border)',
                                lineHeight: 1
                            }}>
                                {step.id}
                            </span>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
