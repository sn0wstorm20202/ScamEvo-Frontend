"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Zap, Shield } from "lucide-react";

export default function ProblemSolution() {
    return (
        <section className="section">
            <div className="container">
                <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}>
                    {/* Problem Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="card"
                        style={{ borderColor: "rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.03)" }}
                    >
                        <div className="icon-box" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171" }}>
                            <AlertTriangle size={24} />
                        </div>
                        <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>The Problem: Reactive</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ color: '#f87171' }}>✖</span> Trained on past patterns only
                            </li>
                            <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ color: '#f87171' }}>✖</span> Scammers evolve faster than data pipelines
                            </li>
                            <li style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#f87171' }}>✖</span> 40-60% evasion rate for new tactics
                            </li>
                        </ul>
                    </motion.div>

                    {/* Solution Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="card"
                        style={{ borderColor: "rgba(99, 102, 241, 0.4)", background: "rgba(99, 102, 241, 0.05)" }}
                    >
                        <div className="icon-box" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#818cf8" }}>
                            <Zap size={24} />
                        </div>
                        <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 600 }}>The Solution: Evolutionary</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ color: '#818cf8' }}>✔</span> Proactive mutation generation
                            </li>
                            <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ color: '#818cf8' }}>✔</span> Adversarial training loop
                            </li>
                            <li style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#818cf8' }}>✔</span> 0% evasion after defense
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
