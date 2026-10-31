import React from "react";
import { Composition } from "remotion";
import { HuxIntroReel } from "./HuxIntroReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HuxIntroReel"
        component={HuxIntroReel}
        durationInFrames={1230}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
