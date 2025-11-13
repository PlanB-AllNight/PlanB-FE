import styled from "styled-components";

interface HeroSectionProps {
    title: string;
    highlight?: string;
    description: string;
}

const HeroSection = ({ title, highlight, description }: HeroSectionProps) => {
    const [before, after] = highlight
        ? title.split(highlight)
        : [title, ""];

    return (
        <Wrapper>
            <Title>
                {before}
                {highlight && <Highlight>{highlight}</Highlight>}
                {after}
            </Title>
            <Description>{description}</Description>
        </Wrapper>
    );
};

export default HeroSection;

const Wrapper = styled.div`
    width: 100%;
    height: 260px;
    background: linear-gradient(90deg, #0F766E 40%, #05956A 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: white;
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[200]};
`;

const Description = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray};
    line-height: 1.4;
    white-space: pre-line;
    text-align: center;
`