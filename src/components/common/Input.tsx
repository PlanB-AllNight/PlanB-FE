import React from "react";
import styled, { css } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelPosition?: "top" | "left";
    variant?: "primary" | "gray";
    error?: string;
    height?: string;
}

const Input = ({
    label,
    labelPosition = "top",
    variant = "primary",
    error,
    height,
    ...rest
}: InputProps) => {
    return (
        <Wrapper labelPosition={labelPosition}>
            {label && <StyledLabel labelPosition={labelPosition} variant={variant}>{label}</StyledLabel>}
            <InputBox>
                <StyledInput
                    variant={variant}
                    hasError={!!error}
                    height={height}
                    {...rest}
                />
                {error && <Error>{error}</Error>}
            </InputBox>
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


const InputBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.input<{
    variant: "primary" | "gray";
    hasError: boolean;
    height?: string;
}>`
    width: 100%;
    height: ${({ height }) => height || "67px"};
    padding: 0 26px;
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
        border-color: ${({ hasError }) => (hasError ? "#0D9488" : "")};
    }

    // 에러일 때 border 컬러 변경
    border-color: ${({ hasError }) => (hasError ? "#0D9488" : "")};

    /* autofill 스타일 제거 */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.colors.fontPrimary} !important;
        transition: background-color 5000s ease-in-out 0s;
    }
`;

const Error = styled.p`
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-top: 7px;
    margin-left: 10px;
    font-size: 1.5rem;
`;