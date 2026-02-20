import { Btn } from "@/Components/AbstractElements";
import { ISMODE } from "@/ReduxToolkit/Reducers/ThemeCustomizerReducer";
import { useState } from "react";
import { Moon, Sun } from "react-feather";
import { useDispatch } from "react-redux";

const DarkLight = () => {
  const [moonlight, setMoonlight] = useState(false);
  const dispatch = useDispatch();
  const MoonlightToggle = (light) => {
    const html = document.querySelector("html");
    if (light) {
      setMoonlight(!light);
      html.className = "light";
      dispatch(ISMODE("light"));
    } else {
      setMoonlight(!light);
      html.className = "dark";
      dispatch(ISMODE("dark"));
    }
  };
  return (
    <>
      <li onClick={() => MoonlightToggle(moonlight)}>
        <Btn
          attrBtn={{
            id: "darkButton",
            color: "transparent",
            className: "dark-buttton",
            size: "sm",
          }}
        >
          {moonlight ? <Sun size={"medium"} /> : <Moon size={""} />}
        </Btn>
      </li>
    </>
  );
};
export default DarkLight;
