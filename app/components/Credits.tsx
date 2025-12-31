"use client";

export default function Credits() {
    return (
        <div
            style={{
                position: "fixed",
                bottom: "12px",
                right: "24px",
                fontSize: "12px",
                color: "var(--text-primary)",
                opacity: 0.8,
                zIndex: 50,
                pointerEvents: "none",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.5px",
                fontWeight: 500
            }}
        >
            Built by sn0wstorm & prayas
        </div>
    );
}
