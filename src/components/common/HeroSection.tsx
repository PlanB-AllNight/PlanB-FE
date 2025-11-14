import styled from "styled-components";
import Button from "./Button";

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
}

const HeroSection = ({
    title,
    highlight,
    description,
    secondaryButton,
    ghostButton,
}: HeroSectionProps) => {
    const [before, after] = highlight
        ? title.split(highlight)
        : [title, ""];

    const hasButton = Boolean(secondaryButton || ghostButton);
    const sectionHeight = hasButton ? "495px" : "260px";

    return (
        <Wrapper height={sectionHeight}>
            <Title>
                {before}
                {highlight && <Highlight>{highlight}</Highlight>}
                {after}
            </Title>
            <Description>{description}</Description>

            {(secondaryButton || ghostButton) && (
                <ButtonRow>
                    {secondaryButton && (
                        <Button
                            onClick={() => (window.location.href = secondaryButton.link)}
                            variant="secondary"
                            size="xl"
                        >
                            {secondaryButton.label}
                        </Button>
                    )}

                    {ghostButton && (
                        <Button
                            onClick={() => (window.location.href = ghostButton.link)}
                            variant="ghost"
                            size="xl"
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

const Wrapper = styled.div<{ height: string }>`
    width: 100%;
    height: ${({ height }) => height};
    background: linear-gradient(90deg, #0F766E 40%, #05956A 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 3.6rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: white;
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[200]};
`;

const Description = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.gray};
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
        width: auto;
    }
`;