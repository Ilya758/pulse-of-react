import React from 'react';

export const Logo: React.FC<{
  color: string;
  onClick?: () => void;
  size?: number;
  style?: React.CSSProperties;
}> = ({ color, size = 60, onClick, style }) => (
  <svg
    className="logo-svg"
    width={size}
    height={size}
    viewBox="-100 -100 200 200"
    style={{ color, cursor: 'pointer', ...style }}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="indigoStrandGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="indigoStrandGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <filter id="indigoCoreFlareEffect" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="glowBlurOuter" />
        <feFlood floodColor="currentColor" floodOpacity="0.5" result="glowColorOuter" />
        <feComposite
          in="glowColorOuter"
          in2="glowBlurOuter"
          operator="in"
          result="coloredGlowOuter"
        />
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="glowBlurInner" />
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
        id="strand1"
        d="M0,-60 A60,60 0 1,0 0,60 A60,60 0 1,0 0,-60 Z"
        fill="none"
        stroke="url(#indigoStrandGradient1)"
        strokeDasharray="15 360"
        strokeDashoffset={0}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0; -377; -754"
          dur="8s"
          calcMode="spline"
          keyTimes="0; 0.5; 1"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 0 0; 30 0 0; 0 0 0"
          dur="10s"
          repeatCount="indefinite"
          begin="-1s"
        />
      </path>
      <path
        id="strand2"
        d="M-55,15 A55,55 0 1,1 55,15 A55,55 0 1,1 -55,15 Z"
        fill="none"
        stroke="url(#indigoStrandGradient2)"
        transform="rotate(30 0 0)"
        strokeDasharray="20 330"
        strokeDashoffset={50}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="50; -290; -630"
          dur="8s"
          calcMode="spline"
          keyTimes="0; 0.5; 1"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          repeatCount="indefinite"
          begin="-1.5s"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values="0 0 0; -45 0 0; 0 0 0"
          dur="12s"
          repeatCount="indefinite"
          begin="-2s"
        />
      </path>
      <path
        id="strand3"
        d="M15,-50 A50,50 0 1,0 15,50 A50,50 0 1,0 15,-50 Z"
        fill="none"
        stroke="currentColor"
        opacity="0.6"
        transform="rotate(-40 0 0)"
        strokeDasharray="10 298"
        strokeDashoffset={-30}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="-30; 278; 586"
          dur="8s"
          calcMode="spline"
          keyTimes="0; 0.5; 1"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          repeatCount="indefinite"
          begin="-3s"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values="0 0 0; 20 0 0; 0 0 0"
          dur="9s"
          repeatCount="indefinite"
          begin="-3s"
        />
      </path>
    </g>
    <g id="core">
      <circle
        cx={0}
        cy={0}
        r={12}
        fill="currentColor"
        opacity={0.3}
        filter="url(#indigoCoreFlareEffect)"
      >
        <animate
          attributeName="r"
          values="10; 18; 10"
          dur="6s"
          repeatCount="indefinite"
          begin="0s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          calcMode="spline"
        />
        <animate
          attributeName="opacity"
          values="0.2; 0.5; 0.2"
          dur="6s"
          repeatCount="indefinite"
          begin="0s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          calcMode="spline"
        />
      </circle>
      <circle cx={0} cy={0} r={8} fill="currentColor" filter="url(#indigoCoreFlareEffect)">
        <animate
          attributeName="r"
          values="7; 9; 7"
          dur="6s"
          repeatCount="indefinite"
          begin="-0.2s"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          calcMode="spline"
        />
      </circle>
      <circle cx={0} cy={0} r={3} fill="#EDF2FF" opacity={0}>
        <animate
          attributeName="r"
          values="0; 5; 0"
          dur="3s"
          repeatCount="indefinite"
          begin="-1s"
          keySplines="0.1 0.8 0.2 1; 0.1 0.8 0.2 1"
          calcMode="spline"
        />
        <animate
          attributeName="opacity"
          values="0; 1; 0.8; 0"
          dur="3s"
          repeatCount="indefinite"
          begin="-1s"
          keyTimes="0; 0.2; 0.4; 1"
          keySplines="0.1 0.8 0.2 1; 0.3 0.1 0.1 0.9; 0.42 0 0.58 1"
          calcMode="spline"
        />
      </circle>
    </g>
  </svg>
);

