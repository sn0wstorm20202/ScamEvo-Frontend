"use client";

import { motion } from "framer-motion";

const techs = [
    "FastAPI", "Python 3.12", "PyTorch", "Transformers",
    "Scikit-learn", "Pandas", "NLTK", "OpenAI GPT-4",
    "SQLite", "Docker"
];

export default function TechStack() {
    return (
        <section className="section" style={{ padding: "60px 0", borderTop: "1px solid var(--border)" }}>
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ marginBottom: "24px", color: "var(--text-secondary)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Built with Modern Architecture
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
                    {techs.map((tech, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid var(--border)",
                                fontSize: "14px",
                                color: "var(--text-secondary)"
                            }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
