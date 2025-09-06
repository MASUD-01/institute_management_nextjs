import React from "react";
import { Divider } from "antd";
import CustomizeTheme from "./CustomizeTheme";
import CustomizePrimaryColor from "./CustomizePrimaryColor";

const Themes = () => {
  return (
    <div>
      <React.Fragment>
        <CustomizeTheme />
        <Divider />
        <CustomizePrimaryColor />
        {/* <Divider />
        <CustomizeFontSizeAndFontFamily /> */}
      </React.Fragment>
    </div>
  );
};

export default Themes;
