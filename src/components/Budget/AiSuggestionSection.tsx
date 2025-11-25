import styled from "styled-components";
import SectionCard from "./SectionCard";
import AIIcon from "../../assets/svgs/ai.svg?react";

interface AiSuggestionProps {
    aiSuggestions: {
        summary: string;
        highlight: string;
        improveEffect: string;
    }
}

const AiSuggestionSection = ({ aiSuggestions }: AiSuggestionProps) => {
    return (
        <Wrapper>
            <SectionCard
                icon={<AIIcon />}
                title="AI의 핵심 제안"
                subtitle="새로운 예산안을 실제로 달성할 수 있도록, AI가 당신의 과거 소비 습관 중 가장 효과가 큰 개선 행동을 추천합니다"
            >
                <TextBox>
                    <Summary>{aiSuggestions.summary}</Summary>
                    <Highlight>{aiSuggestions.highlight}</Highlight>
                    <ImproveBox>
                        <Tag>예상 효과</Tag>
                        <ImproveEffect>{aiSuggestions.improveEffect}</ImproveEffect>
                    </ImproveBox>
                </TextBox>

            </SectionCard>
        </Wrapper>
    );
};

export default AiSuggestionSection;

const Wrapper = styled.div`
    width: 100%;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Summary = styled.p`
    font-size: 2.2rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
`;

const Highlight = styled.p`
    font-size: 2.6rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const ImproveBox = styled.div`
    display: flex;
    gap: 15px;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    width: 120px;
    height: 33px;

    color: #CA8A03;
    background: #FEFCE8;
    
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const ImproveEffect = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 1.3;
`