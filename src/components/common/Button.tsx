import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gray' | 'light' | 'outline' | 'neutral';
  size?: 'xl' | 'lg' | 'md' | 'sm';
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  ...rest
}: ButtonProps) {
  return (
    <StyledButton variant={variant} size={size} {...rest}>
      {children}
    </StyledButton>
  );
}


const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[500]}; /* 0F766E */
    color: #ffffff;
    border: none;
    &:hover:not(:disabled) {
      background-color: #00000024; /* 0F766E */
    }
  `,
  secondary: css`
    background-color: #ffffff;
    color: ${({ theme }) => theme.colors.primary[500]}; /* 0F766E */
    border: none;
    &:hover:not(:disabled) {
      background-color: #00000024; /* (임의의 hover 색상) */
    }
  `,
  outline: css`
    background-color: #ffffff;
    color: ${({ theme }) => theme.colors.primary[500]}; /* 0F766E */
    border: 2px solid ${({ theme }) => theme.colors.primary[500]}; /* 0F766E */
    &:hover:not(:disabled) {
      background-color: #00000024; /* (임의의 hover 색상) */
    }
  `,
  ghost: css`
    background-color: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;
    &:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `,
  neutral: css`
    background-color: ${({ theme }) => theme.colors.gray}; /* E5E7EB */
    color: ${({ theme }) => theme.colors.fontPrimary}; /* 1E1E1E */
    border: none;
  `,
  gray: css`
    background-color: ${({ theme }) => theme.colors.gray}; /* E5E7EB */
    color: ${({ theme }) => theme.colors.fontSecondary}; /* 6B7280 */
    border: none;
  `,
  light: css`
    background-color: ${({ theme }) => theme.colors.primary[200]}; /* 86E7D4 */
    color: ${({ theme }) => theme.colors.fontSecondary}; /* 6B7280 */
    border: none;
  `,
};

const sizeStyles = {
  xl: css`
    height: 80px;
    font-size: 2.9rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    padding: 2.5rem 4.6rem;
  `,
  lg: css`
    height: 70px;
    font-size: 2.9rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    padding: 3.7rem 2rem;
  `,
  md: css`
    height: 65px;
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    padding: 2rem 2.5rem;
  `,
  sm: css`
    height: 50px;
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    padding: 1rem 2.8rem;
  `,
};

type StyledButtonProps = Required<Pick<ButtonProps, 'variant' | 'size'>>;

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  border-radius: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}

  /* 비활성화 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.fontSecondary};
    border: none;
    cursor: not-allowed;
  }
`;

export default Button;