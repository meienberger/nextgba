import React from "react";

type IframeProps = {
  title: string;
  src: string;
  saveStateToLoad: string;
};

const Iframe = React.memo(
  (props: IframeProps) => {
    return (
      <iframe
        title={props.title}
        allowFullScreen
        seamless
        className="h-full absolute inset-0 z-10 "
        srcDoc={props.src}
        style={{ minWidth: "100%", width: "1px" }}
      />
    );
  },
  (prev, next) => {
    if (prev.saveStateToLoad === next.saveStateToLoad) {
      return true;
    }

    console.log("re-rendering iframe");

    return false;
  },
);

export default Iframe;
