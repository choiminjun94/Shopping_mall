import React from "react";
import {CarOutlined} from "@ant-design/icons";
function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        {" "}
        {/* Footer <Icon type="SmileOutlined" /> */}
        Footer<CarOutlined />
      </p>
    </div>
  );
}

export default Footer;
