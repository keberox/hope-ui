import { JSX } from "solid-js";

export function IconSelector(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 3a1 1 0 0 1 .707.293l3 3a1 1 0 0 1-1.414 1.414L10 5.414L7.707 7.707a1 1 0 0 1-1.414-1.414l3-3A1 1 0 0 1 10 3zm-3.707 9.293a1 1 0 0 1 1.414 0L10 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
