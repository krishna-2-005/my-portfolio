'use client'

import React from "react"
import { useState } from 'react'
import styled from 'styled-components'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const presetMessages = [
    'I would like to collaborate on a project.',
    'I have a freelance opportunity for you.',
    'I just wanted to say hello!',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to a backend service
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      label: 'Email',
      value: 'kuchurusaikrishnareddy@gmail.com',
      href: 'mailto:kuchurusaikrishnareddy@gmail.com',
    },
    {
      label: 'Phone',
      value: '+91-9392123577',
      href: 'tel:+919392123577',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-primary/10 text-primary text-sm font-medium">
              <span className="text-base">✨</span> Available for collaborations & roles
            </div>

            <p className="text-lg text-foreground leading-relaxed">
              Let&apos;s build something bold. Whether it&apos;s a data-driven product, a full-stack launch, or a quick brainstorm, I reply fast and ship faster.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Product-ready builds', 'ML + full-stack', 'Quick turnarounds'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-muted/20 text-sm text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative overflow-hidden p-4 rounded-xl border border-border bg-card/60 hover:bg-card/80 transition-all flex flex-col gap-1 shadow-sm"
                >
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">{info.label}</p>
                  <p className="text-foreground font-semibold group-hover:text-primary break-words">{info.value}</p>
                  <p className="text-xs text-muted-foreground">Tap to {info.label.toLowerCase()}</p>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/10 to-accent/10 transition-opacity" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <StyledWrapper>
            <form onSubmit={handleSubmit} className="container_chat_bot" suppressHydrationWarning>
              <div className="container-chat-options">
                <div className="chat">
                  <div className="chat-bot">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="chat-bot">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="chat-bot">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="options">
                    <button type="submit" className="btn-submit" aria-label="Send message" suppressHydrationWarning>
                      <i>
                        <svg viewBox="0 0 512 512">
                          <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05" />
                        </svg>
                      </i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="tags">
                {presetMessages.map((text) => (
                  <span
                    key={text}
                    onClick={() => setFormData((prev) => ({ ...prev, message: text }))}
                  >
                    {text}
                  </span>
                ))}
              </div>

              {submitted && (
                <div className="success-banner">
                  Thank you! I&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </StyledWrapper>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-border">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            © 2026 Kuchuru Sai Krishna Reddy. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/krishna-2-005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kuchuru-sai-krishna-reddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:kuchurusaikrishnareddy@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledWrapper = styled.div`
  .container_chat_bot {
    display: flex;
    flex-direction: column;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
  }

  .container_chat_bot .container-chat-options {
    position: relative;
    display: flex;
    background: linear-gradient(
      to bottom right,
      #7e7e7e,
      #363636,
      #363636,
      #363636,
      #363636
    );
    border-radius: 16px;
    padding: 1.5px;
    overflow: hidden;

    &::after {
      position: absolute;
      content: "";
      top: -10px;
      left: -10px;
      background: radial-gradient(
        ellipse at center,
        #ffffff,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.1),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0)
      );
      width: 30px;
      height: 30px;
      filter: blur(1px);
    }
  }

  .container_chat_bot .container-chat-options .chat {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    width: 100%;
    overflow: hidden;
    gap: 8px;
  }

  .container_chat_bot .container-chat-options .chat .chat-bot {
    position: relative;
    display: flex;
  }

  .container_chat_bot .chat .chat-bot textarea,
  .container_chat_bot .chat .chat-bot input {
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid #2d2d2d;
    width: 100%;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 400;
    padding: 12px 12px;
    resize: none;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      cursor: pointer;
    }

    &::placeholder {
      color: #f3f6fd;
      transition: all 0.3s ease;
    }
    &:focus::placeholder {
      color: #363636;
    }

    &:focus {
      border-color: #7e7e7e;
      box-shadow: 0 0 0 1px #7e7e7e;
    }
  }

  .container_chat_bot .chat .chat-bot textarea {
    min-height: 140px;
  }

  .container_chat_bot .chat .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 6px 10px 10px;
  }

  .container_chat_bot .chat .options .btn-submit {
    display: flex;
    padding: 2px;
    background-image: linear-gradient(to top, #292929, #555555, #292929);
    border-radius: 10px;
    box-shadow: inset 0 6px 2px -4px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.15s ease;

    & i {
      width: 32px;
      height: 32px;
      padding: 6px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      backdrop-filter: blur(3px);
      color: #8b8b8b;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    & svg {
      transition: all 0.3s ease;
    }
    &:hover svg {
      color: #f3f6fd;
      filter: drop-shadow(0 0 5px #ffffff);
    }

    &:focus svg {
      color: #f3f6fd;
      filter: drop-shadow(0 0 5px #ffffff);
      transform: scale(1.2) rotate(45deg) translateX(-2px) translateY(1px);
    }

    &:active {
      transform: scale(0.92);
    }
  }

  .container_chat_bot .tags {
    padding: 14px 0 0;
    display: flex;
    color: #ffffff;
    font-size: 10px;
    gap: 6px;
    flex-wrap: wrap;

    & span {
      padding: 6px 10px;
      background-color: #1b1b1b;
      border: 1.5px solid #363636;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;

      &:hover {
        border-color: #7e7e7e;
        color: #f3f6fd;
      }
    }
  }

  .success-banner {
    margin-top: 10px;
    padding: 12px 14px;
    background: rgba(126, 126, 126, 0.15);
    border: 1.5px solid #7e7e7e;
    border-radius: 12px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
  }
`;
