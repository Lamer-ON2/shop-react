export const SvgViewMore = ({ fill = "white", width, height }) => {
  return (
    <svg
      className="card-size-btn_svg"
      width={width}
      height={width}
      aria-hidden="true"
      viewBox="0 0 15 15"
      id="icon-view-more"
    >
      <g fill={fill}>
        <circle cx="1.5" cy="1.5" r="1.5"></circle>
        <circle cx="1.5" cy="5.5" r="1.5"></circle>
        <circle cx="1.5" cy="9.5" r="1.5"></circle>
        <circle cx="5.5" cy="9.5" r="1.5"></circle>
        <circle cx="9.5" cy="9.5" r="1.5"></circle>
        <circle cx="13.5" cy="9.5" r="1.5"></circle>
        <circle cx="13.5" cy="13.5" r="1.5"></circle>
        <circle cx="9.5" cy="13.5" r="1.5"></circle>
        <circle cx="5.5" cy="13.5" r="1.5"></circle>
        <circle cx="1.5" cy="13.5" r="1.5"></circle>
        <circle cx="5.5" cy="1.5" r="1.5"></circle>
        <circle cx="5.5" cy="5.5" r="1.5"></circle>
        <circle cx="9.5" cy="5.5" r="1.5"></circle>
        <circle cx="13.5" cy="5.5" r="1.5"></circle>
        <circle cx="9.5" cy="1.5" r="1.5"></circle>
        <circle cx="13.5" cy="1.5" r="1.5"></circle>
      </g>
    </svg>
  );
};
