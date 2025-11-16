import React from "react";
import styled, { css } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelPosition?: "top" | "left";
    variant?: "primary" | "gray";
}

const Input = ({
    label,
    labelPosition = "top",
    variant = "primary",
    ...rest
}: InputProps) => {
    return (
        <Wrapper labelPosition={labelPosition}>
            {label && <StyledLabel labelPosition={labelPosition} variant={variant}>{label}</StyledLabel>}
            <StyledInput variant={variant} {...rest} />
        </Wrapper>
    );
};

export default Input;

const labelPositionStyles = {
    top: css`
        flex-direction: column;
        gap: 15px;
    `,
    left: css`
        flex-direction: row;
        align-items: center;
        gap: 55px;
    `
};

const variantStyles = {
    primary: {
        label: css`
            color: ${({ theme }) => theme.colors.fontPrimary};
            font-size: 2rem;
        `,
        input: css`
            background-color: white;
            border: 1.5px solid #6B7280;
        `,
    },
    gray: {
        label: css`
            color: ${({ theme }) => theme.colors.fontSecondary};
            font-size: 1.6rem;
        `,
        input: css`
            background-color: white;
            border: 2px solid ${({ theme }) => theme.colors.gray};
        `
    },
};

const Wrapper = styled.div<{ labelPosition: "top" | "left" }>`
    display: flex;
    ${({ labelPosition }) => labelPositionStyles[labelPosition]};
`;

const StyledLabel = styled.label<{ labelPosition: "top" | "left"; variant: "primary" | "gray" }>`
    width: ${({ labelPosition }) =>
        labelPosition === "left" ? "150px" : "auto"};
    margin-left: ${({ labelPosition }) =>
        labelPosition === "top" ? "11px" : "0px"};

    ${({ variant }) => variantStyles[variant].label}
`;

const StyledInput = styled.input<{ variant: "primary" | "gray" }>`
    width: 100%;
    height: 65px;
    padding: 22px 26px;
    border-radius: 13px;
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};

    ${({ variant }) => variantStyles[variant].input};

    &::placeholder {
        color: ${({ theme }) => theme.colors.fontSecondary};
    }

    &:hover,
    &:focus,
    &:active {
        outline: none;
        border: ${({ variant }) => variantStyles[variant].input};
        background-color: #ffffff;
        box-shadow: none;
    }
`;