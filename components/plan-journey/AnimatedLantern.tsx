'use client'

import Image from 'next/image'

export default function AnimatedLantern() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden">
        <div className="lantern-page-light absolute inset-0" />
        <div className="lantern-parchment-wash absolute left-[3%] top-[10%] h-[86%] w-[78%]" />
      </div>

      <div className="pointer-events-none absolute bottom-[-11.5%] left-[-21%] z-[15]">
        <div className="relative">
          <div className="lantern-room-glow absolute bottom-[11%] left-[44%] h-[650px] w-[860px] rounded-full" />
          <div className="lantern-glass-glow absolute bottom-[38%] left-[55%] z-[12] h-[120px] w-[80px] -translate-x-1/2 rounded-[46%]" />

          <Image
            src="/assets/props/antique-lantern.png"
            alt="Antique Lantern"
            width={600}
            height={600}
            priority
            className="relative z-10 h-auto w-[680px] contrast-[0.9] saturate-[0.82] brightness-[0.84]"
          />

          
        </div>
      </div>

      <style jsx global>{`
        .lantern-page-light {
          background:
            radial-gradient(
              ellipse at 4% 69%,
              rgba(255, 170, 72, 0.2) 0%,
              rgba(235, 119, 34, 0.11) 25%,
              rgba(162, 67, 20, 0.035) 46%,
              transparent 68%
            ),
            linear-gradient(
              90deg,
              rgba(255, 148, 53, 0.075) 0%,
              rgba(255, 171, 78, 0.035) 28%,
              transparent 58%
            );
          mix-blend-mode: screen;
          animation: lantern-page-flicker 2.7s steps(1, end) infinite;
        }

        .lantern-parchment-wash {
          background: radial-gradient(
            ellipse at 12% 58%,
            rgba(255, 203, 126, 0.16) 0%,
            rgba(255, 171, 72, 0.08) 32%,
            transparent 70%
          );
          filter: blur(34px);
          mix-blend-mode: screen;
          transform-origin: 12% 58%;
          animation: lantern-wash-flicker 3.1s ease-in-out infinite;
        }

        .lantern-room-glow {
          background: radial-gradient(
            ellipse at 25% 66%,
            rgba(255, 184, 82, 0.24) 0%,
            rgba(235, 120, 35, 0.11) 35%,
            rgba(170, 70, 20, 0.035) 58%,
            transparent 76%
          );
          filter: blur(68px);
          transform-origin: 25% 66%;
          animation: lantern-room-glow 2.9s ease-in-out infinite;
        }

        .lantern-glass-glow {
          background: radial-gradient(
            ellipse,
            rgba(255, 252, 220, 0.92) 0%,
            rgba(255, 196, 82, 0.72) 34%,
            rgba(224, 92, 18, 0.17) 66%,
            transparent 68%
          );
          filter: blur(5px);
          mix-blend-mode: screen;
          animation: lantern-glass-flicker 2.8s ease-in-out infinite;
        }

        .lantern-flame-outer,
        .lantern-flame-inner {
          display: block;
          transform-origin: 50% 100%;
          border-radius: 54% 46% 52% 48% / 74% 72% 28% 26%;
        }

        .lantern-flame-outer {
          background: linear-gradient(
            to top,
            rgba(239, 79, 11, 0.78) 0%,
            rgba(255, 149, 31, 0.96) 36%,
            rgba(255, 220, 132, 0.98) 68%,
            rgba(255, 251, 220, 0.98) 100%
          );
          filter: blur(0.45px) drop-shadow(0 0 12px rgba(255, 143, 39, 0.9));
          animation: lantern-flame-dance 820ms cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        .lantern-flame-inner {
          background: linear-gradient(
            to top,
            rgba(87, 121, 196, 0.68) 0%,
            rgba(255, 218, 129, 0.95) 38%,
            rgba(255, 252, 224, 1) 100%
          );
          filter: blur(0.2px);
          animation: lantern-flame-core 610ms ease-in-out infinite;
        }

        .parchment-breathe {
          transform-origin: 50% 52%;
          animation: parchment-breathe 11s ease-in-out infinite;
          will-change: transform, filter;
        }

        @keyframes lantern-flame-dance {
          0%, 100% {
            transform: translateX(-50%) rotate(-2deg) scaleX(0.94) scaleY(1);
          }
          22% {
            transform: translateX(-47%) rotate(4deg) scaleX(1.02) scaleY(1.1);
          }
          48% {
            transform: translateX(-53%) rotate(-5deg) scaleX(0.9) scaleY(0.93);
          }
          72% {
            transform: translateX(-49%) rotate(2deg) scaleX(1.06) scaleY(1.04);
          }
        }

        @keyframes lantern-flame-core {
          0%, 100% {
            transform: translateX(-50%) scaleX(0.92) scaleY(0.98);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-50%) scaleX(1.04) scaleY(1.12);
            opacity: 1;
          }
        }

        @keyframes lantern-glass-flicker {
  0%,
  100% {
    opacity: 0.58;
    transform: translateX(-50%) scale(0.97);
  }

  28% {
    opacity: 0.74;
    transform: translateX(-49%) scale(1.01);
  }

  47% {
    opacity: 0.66;
    transform: translateX(-51%) scale(0.99);
  }

  71% {
    opacity: 0.82;
    transform: translateX(-50%) scale(1.035);
  }
}

        @keyframes lantern-room-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.97);
          }
          33% {
            opacity: 0.73;
            transform: scale(1.035);
          }
          68% {
            opacity: 0.58;
            transform: scale(1);
          }
        }

        @keyframes lantern-wash-flicker {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.98);
          }
          46% {
            opacity: 0.84;
            transform: scale(1.035);
          }
          73% {
            opacity: 0.62;
            transform: scale(1.005);
          }
        }

        @keyframes lantern-page-flicker {
          0%, 100% { opacity: 0.7; }
          18% { opacity: 0.82; }
          21% { opacity: 0.68; }
          43% { opacity: 0.88; }
          47% { opacity: 0.74; }
          72% { opacity: 0.84; }
          76% { opacity: 0.71; }
        }

        @keyframes parchment-breathe {
          0%, 100% {
            transform: perspective(1400px) rotateX(0deg) rotateZ(0deg) scale(1);
            filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
          }
          32% {
            transform: perspective(1400px) rotateX(0.18deg) rotateZ(-0.08deg) scale(1.0015);
          }
          58% {
            transform: perspective(1400px) rotateX(-0.14deg) rotateZ(0.06deg) scale(1.0022);
            filter: drop-shadow(0 32px 64px rgba(0, 0, 0, 0.52));
          }
          82% {
            transform: perspective(1400px) rotateX(0.1deg) rotateZ(-0.04deg) scale(1.0008);
          }
        }

  to {
    background-position: -900px 30px, -760px 5px, -620px 28px;
    transform: translateX(-28%);
  }
}

        @media (prefers-reduced-motion: reduce) {
          .lantern-page-light,
          .lantern-parchment-wash,
          .lantern-room-glow,
          .lantern-glass-glow,
          .lantern-flame-outer,
          .lantern-flame-inner,
          .parchment-breathe {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}
