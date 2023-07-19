import { Icon } from "@chakra-ui/react";
export function CustomCheckboxIcon(props) {
  const { icon, isIndeterminate, isChecked, ...rest } = props;

  // prop. "d" in icon path, depending on icon-name, ICONS are from: https://tablericons.com
  // it is an array to hold data for icons with more than one path
  let d = "";
  switch (icon) {
    case "heart":
      d = [
        "M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572",
      ];
      break;
    case "heart-off":
      d = [
        "M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572",
        "M3 3l18 18",
      ];
      break;
    case "heart-broken":
      d = [
        "M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572",
        "M12 6l-2 4l4 3l-2 4v3",
      ];
      break;
    default:
      d = "";
      break;
  }

  isIndeterminate
    ? [
        "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z",
      ]
    : d;

  return (
    <>
      {isChecked ? (
        <Icon viewBox="0 0 24 24" {...rest}>
          <path fill="none" stroke="currentColor" strokeWidth={"2"} d={d[0]} />
          {icon !== "heart" && (
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth={"2"}
              d={d[1]}
            />
          )}
        </Icon>
      ) : null}
    </>
  );
}
