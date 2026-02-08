'use client'

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .label {
    background-color: transparent;
    border: 2px solid rgb(91, 91, 240);
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 160px;
    cursor: pointer;
    transition: all 0.4s ease;
    padding: 5px;
    position: relative;
    color: #ffffff;
    user-select: none;
  }

  .label::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    width: 8px;
    height: 8px;
    transition: all 0.4s ease;
    border-radius: 100%;
    margin: auto;
    opacity: 0;
    visibility: hidden;
  }

  .input {
    display: none;
  }

  .title {
    font-size: 0.95rem;
    transition: all 0.4s ease;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-weight: 700;
    margin: 0;
  }

  .title:last-child {
    opacity: 0;
    visibility: hidden;
  }

  .circle {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: rgb(91, 91, 240);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    position: relative;
    box-shadow: 0 0 0 0 rgb(255, 255, 255);
    overflow: hidden;
  }

  .icon {
    color: #ffffff;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .square {
    aspect-ratio: 1;
    width: 15px;
    border-radius: 2px;
    background-color: #ffffff;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
  }

  .circle::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: #3333a8;
    width: 100%;
    height: 0;
    transition: all 0.4s ease;
  }

  .label:has(.input:checked) {
    width: 57px;
    animation: installed 0.4s ease 3.5s forwards;
  }

  .label:has(.input:checked)::before {
    animation: rotate 3s ease-in-out 0.4s forwards;
  }

  .input:checked + .circle {
    animation:
      pulse 1s forwards,
      circleDelete 0.2s ease 3.5s forwards;
    rotate: 180deg;
  }

  .input:checked + .circle::before {
    animation: installing 3s ease-in-out forwards;
  }

  .input:checked + .circle .icon {
    opacity: 0;
    visibility: hidden;
  }

  .input:checked ~ .circle .square {
    opacity: 1;
    visibility: visible;
  }

  .input:checked ~ .title {
    opacity: 0;
    visibility: hidden;
  }

  .input:checked ~ .title:last-child {
    animation: showInstalledMessage 0.4s ease 3.5s forwards;
  }

  @keyframes pulse {
    0% {
      scale: 0.95;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    70% {
      scale: 1;
      box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
    }
    100% {
      scale: 0.95;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }

  @keyframes installing {
    from {
      height: 0;
    }
    to {
      height: 100%;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-90deg) translate(27px) rotate(0);
      opacity: 1;
      visibility: visible;
    }
    99% {
      transform: rotate(270deg) translate(27px) rotate(270deg);
      opacity: 1;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes installed {
    100% {
      width: 150px;
      border-color: rgb(35, 174, 35);
    }
  }

  @keyframes circleDelete {
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes showInstalledMessage {
    100% {
      opacity: 1;
      visibility: visible;
      right: 56px;
    }
  }
`

const DOWNLOAD_URL =
  'https://drive.google.com/file/d/1_LvmLBLdMovB4ftwMyY59UbUDEbSv1sg/view?usp=sharing'
const OPEN_DELAY_MS = 3500
const RESET_DELAY_MS = 4200

export default function DownloadSwitch() {
  const [checked, setChecked] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (checked) {
      openTimer.current = setTimeout(() => {
        window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer')
        openTimer.current = null
      }, OPEN_DELAY_MS)

      resetTimer.current = setTimeout(() => {
        setChecked(false)
        resetTimer.current = null
      }, RESET_DELAY_MS)
    }

    return () => {
      if (openTimer.current) {
        clearTimeout(openTimer.current)
        openTimer.current = null
      }
      if (resetTimer.current) {
        clearTimeout(resetTimer.current)
        resetTimer.current = null
      }
    }
  }, [checked])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = event.target.checked

    if (openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
    }
    if (resetTimer.current) {
      clearTimeout(resetTimer.current)
      resetTimer.current = null
    }

    setChecked(nextChecked)
  }

  return (
    <StyledWrapper>
      <label className="label">
        <input
          className="input"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          aria-label="Open resume"
        />
        <span className="circle">
          <svg className="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </svg>
          <div className="square" />
        </span>
        <p className="title">Resume</p>
        <p className="title" aria-live="polite">
          Open
        </p>
      </label>
    </StyledWrapper>
  )
}
