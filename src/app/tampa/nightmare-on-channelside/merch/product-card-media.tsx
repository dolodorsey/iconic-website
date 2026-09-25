"use client";

import { useState } from "react";

type Props = {
  front: string | null;
  back: string | null;
  title: string;
};

export default function ProductCardMedia({ front, back, title }: Props) {
  const [frontFailed, setFrontFailed] = useState(false);
  const [backFailed, setBackFailed] = useState(false);

  const usableFront = Boolean(front) && !frontFailed;
  const usableBack = Boolean(back) && !backFailed;

  return (
    <div className="noc-product-swap" data-has-back={usableBack ? "true" : "false"}>
      {usableFront ? (
        <img
          className="noc-product-swap__image noc-product-swap__image--front"
          src={front || undefined}
          alt={`${title} front view`}
          loading="lazy"
          decoding="async"
          onError={() => setFrontFailed(true)}
        />
      ) : (
        <div className="noc-product-swap__fallback" role="img" aria-label={`${title} image unavailable`}>
          <span>NIGHTMARE ON CHANNELSIDE</span>
          <strong>IMAGE RELOADING</strong>
        </div>
      )}

      {usableBack ? (
        <img
          className="noc-product-swap__image noc-product-swap__image--back"
          src={back || undefined}
          alt={`${title} back view`}
          loading="lazy"
          decoding="async"
          onError={() => setBackFailed(true)}
        />
      ) : null}

      {usableBack && usableFront ? <span className="noc-product-swap__hint">HOVER FOR BACK</span> : null}
    </div>
  );
}
