import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader-container {
    width: 100vw;
    height: 100vh;
    position : relative;
    left: 650px;
    top: 350px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    background: transparent;
  }

  .spinner {
    position: relative;
    width: 6px;
    height: 6px;
  }

  .spinner div {
    position: absolute;
    width: 50%;
    height: 150%;
    background: #545451;
    border-radius: 999px;
    transform: rotate(calc(var(--rotation) * 1deg))
      translate(0, calc(var(--translation) * 1%));
    animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
  }

  .spinner div:nth-child(1) {
    --delay: 0.1;
    --rotation: 36;
    --translation: 150;
  }

  .spinner div:nth-child(2) {
    --delay: 0.2;
    --rotation: 72;
    --translation: 150;
  }

  .spinner div:nth-child(3) {
    --delay: 0.3;
    --rotation: 108;
    --translation: 150;
  }

  .spinner div:nth-child(4) {
    --delay: 0.4;
    --rotation: 144;
    --translation: 150;
  }

  .spinner div:nth-child(5) {
    --delay: 0.5;
    --rotation: 180;
    --translation: 150;
  }

  .spinner div:nth-child(6) {
    --delay: 0.6;
    --rotation: 216;
    --translation: 150;
  }

  .spinner div:nth-child(7) {
    --delay: 0.7;
    --rotation: 252;
    --translation: 150;
  }

  .spinner div:nth-child(8) {
    --delay: 0.8;
    --rotation: 288;
    --translation: 150;
  }

  .spinner div:nth-child(9) {
    --delay: 0.9;
    --rotation: 324;
    --translation: 150;
  }

  .spinner div:nth-child(10) {
    --delay: 1;
    --rotation: 360;
    --translation: 150;
  }

  @keyframes spinner-fzua35 {
    0%,
    10%,
    20%,
    30%,
    40%,
    50%,
    60%,
    70%,
    80%,
    90%,
    100% {
      transform: rotate(calc(var(--rotation) * 1deg))
        translate(0, calc(var(--translation) * 1%));
    }

    50% {
      transform: rotate(calc(var(--rotation) * 1deg))
        translate(0, calc(var(--translation) * 1.5%));
    }
  }
`;

export default Loading;