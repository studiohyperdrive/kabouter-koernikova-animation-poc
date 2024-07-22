import { FC, useEffect, useState } from "react";
import {
  IconButton,
  PinkButtonIcon,
  PlayBubbleIcon,
} from "../../../shared/components";
import { BaseCarousel } from "../baseCarousel";
import { Modal } from "../modal";
import cx from "classnames/bind";
import styles from "./LanguageSelect.module.scss";
import { ELanguage, ILanguage } from "../../types";
import { swap } from "ramda";

const cxBind = cx.bind(styles);

interface ILanguageSelectProps {
  languages: ILanguage[];
  onSelectLanguage: (languageId: ELanguage) => void;
  currentLanguageId: ELanguage;
  className?: string;
}

export const LanguageSelect: FC<ILanguageSelectProps> = ({
  currentLanguageId,
  languages,
  onSelectLanguage,
  className,
}) => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const currenLanguage = languages.find(
    (language) => language.id === currentLanguageId
  );
  const currentLanguageIndex = languages.findIndex(
    (language) => language.id === currentLanguageId
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [orderedLanguages, setOrderedLanguages] =
    useState<ILanguage[]>(languages);

  const onSelect = (lngId: ELanguage) => {
    onSelectLanguage(lngId);
    setPopupIsOpen(false);
  };

  useEffect(() => {
    console.log(currentSlideIndex);
    if (popupIsOpen) {
      setCurrentSlideIndex(0);
      setOrderedLanguages(swap(0, currentSlideIndex, languages));

      console.log(languages);
    }
  }, [popupIsOpen]);

  return (
    <>
      <div
        className={cxBind("language-select-container", className)}
        onClick={() => setPopupIsOpen(!popupIsOpen)}
      >
        <IconButton icon={<PinkButtonIcon />} />

        <div className={cxBind("image-container")}>
          <img src={currenLanguage?.asset} alt={currenLanguage?.name} />
        </div>
      </div>

      <Modal
        isOpen={popupIsOpen}
        onClose={() => setPopupIsOpen(false)}
        className={cxBind("modal")}
      >
        <BaseCarousel
          className={cxBind("carousel-container")}
          onSlideChange={setCurrentSlideIndex}
          dataLength={languages.length}
        >
          {orderedLanguages.map((language, index) => (
            <div
              className={cxBind("language-container")}
              key={`language-option-${index}`}
              data-index={index}
            >
              <h2>{language.name}</h2>
              <img src={language.asset} alt={language.name} />

              {index === currentSlideIndex && (
                <div
                  className={`react-multi-carousel-item-button ${cxBind(
                    "icon-container"
                  )}`}
                  onClick={() => onSelect(language.id)}
                >
                  <PlayBubbleIcon />
                </div>
              )}
            </div>
          ))}
        </BaseCarousel>
      </Modal>
    </>
  );
};
