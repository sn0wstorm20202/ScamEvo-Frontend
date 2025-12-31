"use client";

import { motion } from "framer-motion";

const metrics = [
    { label: "Robustness Improvement", value: "85%", sub: "Baseline vs Defended" },
    { label: "Evasion Rate", value: "< 7%", sub: "Reduced from 40%" },
    { label: "False Negatives", value: "Reduced", sub: "By 82% in holdout set" },
];

export default function Results() {
    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Measurable Impact</h2>
                    <p className="section-subtitle">
                        Proving the system can proactively learn from simulated attacks without waiting for real-world victims.
                    </p>
                </div>

                <div className="grid-3">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            className="card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{ textAlign: "center", padding: "40px 20px" }}
                        >
                            <div style={{ fontSize: "56px", fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: "8px" }}>
                                {m.value}
                            </div>
                            <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>{m.label}</div>
                            <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{m.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
