export const ShakerLoader = () => (
  <div className="flex h-96 w-full items-center justify-center">
    <div className="rotate-20 animate-shaker">
      <ShakerIcon />
    </div>
  </div>
);

const ShakerIcon = (): JSX.Element => {
  return (
    <svg
      width="87"
      height="219"
      viewBox="0 0 87 219"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_350_51)">
        <path
          d="M43.7904 217.48C74.2104 217.65 73.6804 211.67 73.6804 211.67C73.6804 211.67 83.4504 62.2698 84.1604 61.8898C84.8704 61.5098 85.3304 61.1298 82.9804 58.2498C76.1504 49.8898 63.0504 41.8998 63.0504 41.8998C63.3104 40.6198 62.0504 37.9698 62.0504 37.9698L62.8704 37.7298C63.0304 27.8598 61.1504 10.5398 61.4104 5.82983C61.6704 1.11983 43.7904 1.50983 43.7904 1.50983C43.7904 1.50983 24.8904 1.19983 25.1504 5.90983C25.4104 10.6198 23.0004 27.6598 23.1504 37.5298H24.0004C24.0004 37.5298 22.9204 40.8598 23.1804 42.1398C23.1804 42.1398 9.77042 49.7898 2.94042 58.1398C0.560421 60.9998 1.70042 61.0798 2.40042 61.4698C3.10042 61.8598 13.9004 211.67 13.9004 211.67C13.9004 211.67 13.3704 217.65 43.7904 217.48Z"
          stroke="#F85E00"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M24 37.5298C36.6578 36.1911 49.4292 36.3489 62.05 37.9998"
          stroke="#F85E00"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M23.1504 42.1399C23.1504 42.1399 44.0604 44.5099 63.0504 41.8999"
          stroke="#F85E00"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M2.40039 61.4697C2.40039 61.4697 43.6404 55.0497 84.1604 61.8897"
          stroke="#F85E00"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M73.6804 211.67C73.6804 211.67 43.7904 200.82 13.9004 211.67"
          stroke="#F85E00"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M68.3403 78.2397L62.8203 194.88"
          stroke="#F85E00"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_350_51">
          <rect width="86.23" height="218.99" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
