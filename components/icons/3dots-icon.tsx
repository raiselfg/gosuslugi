import { SVGProps } from "react";

export const DotsShareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="#848A9A"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#848A9A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 12h.01M12 6h.01M12 18h.01m.99-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
);
