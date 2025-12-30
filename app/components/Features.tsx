"use client";

import { motion } from "framer-motion";
import { Database, ShieldAlert, TrendingUp } from "lucide-react";

const features = [
    {
        title: "Dataset Ingestion",
        desc: "Upload and inspect datasets, track sample balance, and validate labels before training.",
        icon: Database,
    },
    {
        title: "Adversarial Eval",
        desc: "Measure evasion under attack and visualize how “threats” move across latent space.",
        icon: ShieldAlert,
    },
    {
        title: "Defense Iteration",
        desc: "Train against adversarial pressure and compare baseline vs defended performance.",
        icon: TrendingUp,
    },
];

export default function Features() {
    return (
        <section id="capabilities" className="section">
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        What SCAM-EVO demonstrates
                    </motion.h2>
                    <p className="section-subtitle">
                        A productized view of model robustness: data-in, attack pressure, measurable improvement.
                    </p>
                </div>

                <div className="grid-3">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="icon-box">
                                <f.icon size={24} />
                            </div>
                            <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 600 }}>{f.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
