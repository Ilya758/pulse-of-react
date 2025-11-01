import React from 'react';

export const Logo: React.FC<{
  onClick?: () => void;
  size?: number;
  color: string;
  style?: React.CSSProperties;
}> = ({ color, size = 60, onClick, style }) => (
  <svg
    className="logo-svg"
    height={size}
    onClick={onClick}
    style={{ color, cursor: 'pointer', ...style }}
    viewBox="-100 -100 200 200"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="indigoStrandGradient1" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="indigoStrandGradient2" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <filter height="300%" id="indigoCoreFlareEffect" width="300%" x="-100%" y="-100%">
        <feGaussianBlur in="SourceAlpha" result="glowBlurOuter" stdDeviation="8" />
        <feFlood floodColor="currentColor" floodOpacity="0.5" result="glowColorOuter" />
        <feComposite
          in="glowColorOuter"
          in2="glowBlurOuter"
          operator="in"
          result="coloredGlowOuter"
        />
        <feGaussianBlur in="SourceAlpha" result="glowBlurInner" stdDeviation="2" />
        <feFlood floodColor="#EDF2FF" floodOpacity="0.7" result="glowColorInner" />
        <feComposite
          in="glowColorInner"
          in2="glowBlurInner"
          operator="in"
          result="coloredGlowInner"
        />
        <feMerge>
          <feMergeNode in="coloredGlowOuter" />
          <feMergeNode in="coloredGlowInner" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g id="orbital-strands" strokeLinecap="round" strokeWidth={3.5}>
      <path
        d="M0,-60 A60,60 0 1,0 0,60 A60,60 0 1,0 0,-60 Z"
        fill="none"
        id="strand1"
        stroke="url(#indigoStrandGradient1)"
        strokeDasharray="15 360"
        strokeDashoffset={0}
      >
        <animate
          attributeName="stroke-dashoffset"
          calcMode="spline"
          dur="8s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          keyTimes="0; 0.5; 1"
          repeatCount="indefinite"
          values="0; -377; -754"
        />
        <animateTransform
          attributeName="transform"
          begin="-1s"
          dur="10s"
          repeatCount="indefinite"
          type="rotate"
          values="0 0 0; 30 0 0; 0 0 0"
        />
      </path>
      <path
        d="M-55,15 A55,55 0 1,1 55,15 A55,55 0 1,1 -55,15 Z"
        fill="none"
        id="strand2"
        stroke="url(#indigoStrandGradient2)"
        strokeDasharray="20 330"
        strokeDashoffset={50}
        transform="rotate(30 0 0)"
      >
        <animate
          attributeName="stroke-dashoffset"
          begin="-1.5s"
          calcMode="spline"
          dur="8s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          keyTimes="0; 0.5; 1"
          repeatCount="indefinite"
          values="50; -290; -630"
        />
        <animateTransform
          additive="sum"
          attributeName="transform"
          begin="-2s"
          dur="12s"
          repeatCount="indefinite"
          type="rotate"
          values="0 0 0; -45 0 0; 0 0 0"
        />
      </path>
      <path
        d="M15,-50 A50,50 0 1,0 15,50 A50,50 0 1,0 15,-50 Z"
        fill="none"
        id="strand3"
        opacity="0.6"
        stroke="currentColor"
        strokeDasharray="10 298"
        strokeDashoffset={-30}
        transform="rotate(-40 0 0)"
      >
        <animate
          attributeName="stroke-dashoffset"
          begin="-3s"
          calcMode="spline"
          dur="8s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          keyTimes="0; 0.5; 1"
          repeatCount="indefinite"
          values="-30; 278; 586"
        />
        <animateTransform
          additive="sum"
          attributeName="transform"
          begin="-3s"
          dur="9s"
          repeatCount="indefinite"
          type="rotate"
          values="0 0 0; 20 0 0; 0 0 0"
        />
      </path>
    </g>
    <g id="core">
      <circle
        cx={0}
        cy={0}
        fill="currentColor"
        filter="url(#indigoCoreFlareEffect)"
        opacity={0.3}
        r={12}
      >
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="6s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          repeatCount="indefinite"
          values="10; 18; 10"
        />
        <animate
          attributeName="opacity"
          begin="0s"
          calcMode="spline"
          dur="6s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          repeatCount="indefinite"
          values="0.2; 0.5; 0.2"
        />
      </circle>
      <circle cx={0} cy={0} fill="currentColor" filter="url(#indigoCoreFlareEffect)" r={8}>
        <animate
          attributeName="r"
          begin="-0.2s"
          calcMode="spline"
          dur="6s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          repeatCount="indefinite"
          values="7; 9; 7"
        />
      </circle>
      <circle cx={0} cy={0} fill="#EDF2FF" opacity={0} r={3}>
        <animate
          attributeName="r"
          begin="-1s"
          calcMode="spline"
          dur="3s"
          keySplines="0.1 0.8 0.2 1; 0.1 0.8 0.2 1"
          repeatCount="indefinite"
          values="0; 5; 0"
        />
        <animate
          attributeName="opacity"
          begin="-1s"
          calcMode="spline"
          dur="3s"
          keySplines="0.1 0.8 0.2 1; 0.3 0.1 0.1 0.9; 0.42 0 0.58 1"
          keyTimes="0; 0.2; 0.4; 1"
          repeatCount="indefinite"
          values="0; 1; 0.8; 0"
        />
      </circle>
    </g>
  </svg>
);
