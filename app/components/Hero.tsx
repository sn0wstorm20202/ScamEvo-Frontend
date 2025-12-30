"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero({ streamlitUrl }: { streamlitUrl: string }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <section className="hero-section">
            <div className="hero-bg-glow glow-1" />
            <div className="hero-bg-glow glow-2" />

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
                        <span className="badge">
                            <ShieldCheck size={16} />
                            <span>Adversarially-Robust Intelligence</span>
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="hero-title">
                        Detect scams. <br />
                        <span className="text-gradient">Evolve defenses.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="hero-desc">
                        SCAM-EVO is a security-first pipeline turning real datasets into measurable robustness.
                        Explore how adversarial pressure reshapes the decision boundary.
                    </motion.p>

                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={streamlitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Launch Simulation
                            <ArrowRight size={16} />
                        </motion.a>

                        <a href="#how" className="btn btn-secondary">
                            See the approach
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}
            >
                <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--border), transparent)' }}></div>
            </motion.div>
        </section>
    );
}
