'use client'

import type { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

type ViewProjectsButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

const StyledLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  border: none;
  border-radius: 15px;
  color: #212121;
  font-weight: 800;
  font-size: 17px;
  text-decoration: none;
  background: #e8e8e8;
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms ease;
  overflow: hidden;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 15px;
    background-color: #212121;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: width 250ms ease;
    z-index: -1;
  }

  &:hover {
    color: #e8e8e8;
  }

  &:hover::before {
    width: 100%;
  }

  &:focus-visible {
    outline: 2px solid #212121;
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(1px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      transition: none;
    }
  }
`

export default function ViewProjectsButton({ children, ...props }: ViewProjectsButtonProps) {
  return (
    <StyledLink {...props}>{children ?? 'View Projects'}</StyledLink>
  )
}
