// === ESTE MÓDULO CONFIGURA O MOTOR DE PARTÍCULAS (ESTRELAS E METEOROS) ===
export function inicializarParticulas() {
    window.tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
            number: { value: 60, density: { enable: true, area: 900 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
            opacity: { value: { min: 0.2, max: 0.6 } },
            move: {
                enable: true,
                speed: { min: 0.05, max: 0.2 },
                random: true,
                direction: "none",
                outModes: { default: "out" }
            }
        },
        // === EMITTERS: O SEGREDO DAS ESTRELAS CADENTES ===
        emitters: {
            direction: "top-right",
            life: {
                count: 0, 
                delay: 0.1,
                duration: 0.1
            },
            rate: {
                quantity: 1,
                delay: 5 
            },
            size: {
                width: 100, 
                height: 0
            },
            position: {
                x: -10, 
                y: 60
            },
            particles: {
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: {
                    value: { min: 0.4, max: 1 }
                },
                size: {
                    value: { min: 2, max: 4 }
                },
                move: {
                    speed: 40, 
                    direction: "top-right",
                    straight: true,
                    outModes: { default: "destroy" }
                },
                life: {
                    duration: { sync: true, value: 0.5 },
                    count: 1
                }
            }
        },
        detectRetina: true
    });
}