import { FC, useState } from "react";
import { PlayButtonIcon, IconButton } from "../../../shared/components";
import styles from "./SceneSelect.module.scss";
import cx from "classnames/bind";
import Popup from "reactjs-popup";
import { IScene } from "../../types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TilesIcon } from "../../../shared/components/icons/tilesIcon";

interface ISceneSelectProps {
  onSelectScene: (sceneIndex: number) => void;
  scenes: IScene[];
  className?: string;
}

const cxBind = cx.bind(styles);

export const SceneSelect: FC<ISceneSelectProps> = ({
  onSelectScene,
  scenes,
  className,
}) => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  const onSelect = (sceneIndex: number) => {
    onSelectScene(sceneIndex);
    setPopupIsOpen(false);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className={cxBind("scene-select-container", className)}>
        <IconButton
          icon={<TilesIcon />}
          onClick={() => setPopupIsOpen(!popupIsOpen)}
          className={cxBind("button")}
        />
      </div>

      <Popup
        open={popupIsOpen}
        position="center center"
        className="my-popup"
        closeOnDocumentClick
        onClose={() => setPopupIsOpen(false)}
      >
        <div className={cxBind("modal")}>
          <h2>Kies een hoofstuk</h2>

          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            infinite
            centerMode
            containerClass={cxBind("carousel-container")}
            focusOnSelect={true}
            itemClass={cxBind("carousel-item")}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={responsive}
            rewindWithAnimation={true}
            shouldResetAutoplay
            showDots={false}
            slidesToSlide={1}
            draggable
            swipeable
            transitionDuration={1000}
          >
            {scenes.map((scene, index) => (
              <div className={cxBind("scene")} key={index}>
                <div
                  className={cxBind("icon-container")}
                  onClick={() => onSelect(index)}
                >
                  <PlayButtonIcon />
                </div>

                <div className={cxBind("scene-thumbnail-container")}>
                  <img src={scene.thumbnail} alt={scene.name} />
                </div>

                <div className={cxBind("scene-index")}>{index + 1}</div>
              </div>
            ))}
          </Carousel>
        </div>
      </Popup>
    </>
  );
};
