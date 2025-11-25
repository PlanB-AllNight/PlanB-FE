import styled, { css } from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface HeroButton {
    label: string;
    link: string;
}

interface HeroSectionProps {
    title: string;
    highlight?: string;
    description: string;
    secondaryButton?: HeroButton;
    ghostButton?: HeroButton;
    variant?: 'dark' | 'light';
}

const HeroSection = ({
    title,
    highlight,
    description,
    secondaryButton,
    ghostButton,
    variant = 'dark',
}: HeroSectionProps) => {
    const navigate = useNavigate();

    const [before, after] = highlight
        ? title.split(highlight)
        : [title, ""];

    const hasButton = Boolean(secondaryButton || ghostButton);
    const sectionHeight = hasButton ? "495px" : "260px";

    return (
        <Wrapper height={sectionHeight} variant={variant}>
            <Title variant={variant}>
                {before}
                {highlight && <Highlight>{highlight}</Highlight>}
                {after}
            </Title>
            <Description variant={variant}>{description}</Description>

            {(secondaryButton || ghostButton) && (
                <ButtonRow>
                    {secondaryButton && (
                        <Button
                            onClick={() => navigate(secondaryButton.link)}
                            variant="secondary"
                            size="md"
                        >
                            {secondaryButton.label}
                        </Button>
                    )}

                    {ghostButton && (
                        <Button
                            onClick={() => navigate(ghostButton.link)}
                            variant="ghost"
                            size="md"
                        >
                            {ghostButton.label}
                        </Button>
                    )}
                </ButtonRow>
            )}
        </Wrapper>
    );
};

export default HeroSection;

const Wrapper = styled.div<{ height: string; variant: 'dark' | 'light' }>`
    width: 100%;
    height: ${({ height }) => height};
    ${({ variant, theme }) => variant === 'dark' 
        ? css`background: linear-gradient(90deg, #0F766E 40%, #05956A 100%);`
        : css`background-color: ${theme.colors.primary[100]};`
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Title = styled.h1<{ variant: 'dark' | 'light' }>`
    font-size: 3.6rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ variant, theme }) => 
        variant === 'dark' ? 'white' : theme.colors.fontPrimary
    };
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[200]};
`;

const Description = styled.p<{ variant: 'dark' | 'light' }>`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ variant, theme }) => 
        variant === 'dark' ? theme.colors.gray : theme.colors.fontSecondary
    };
    line-height: 1.4;
    white-space: pre-line;
    text-align: center;
`;

const ButtonRow = styled.div`
    margin-top: 80px;
    display: flex;
    gap: 40px;
    justify-content: center;
    
    > button {
        width: 206px;
    }
`;