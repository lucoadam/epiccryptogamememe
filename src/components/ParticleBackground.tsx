import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import dogShape from '@/icons/CommAI.webp'
import dShape from "@/icons/logo.png"

const ParticlesBackgroud = () => {
    const particlesInit = useCallback(async (engine: Engine) => {

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                // background: {
                //     color: {
                //         value: "#000000",
                //     },
                // },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 20,
                    },
                    collisions: {
                        enable: false,
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                          "enable": false,
                          "rotateX": 0,
                          "rotateY": 4
                        },
                        "angle": 90,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1200,
                        },
                        value: 10,
                    },
                    opacity: {
                        value: 0.1,
                    },
                    "shape": {
                        "type": "image",
                        "image": {
                          "src": dShape.src,
                          "width": 100,
                          "height": 100
                        }
                      },
                    size: {
                        value: { min: 80, max: 100 },
                    },
                    "push": {
                        "particles_nb": 4
                      },
                      "remove": {
                        "particles_nb": 2
                      }
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackgroud;