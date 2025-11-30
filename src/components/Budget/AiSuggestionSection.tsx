import styled from "styled-components";
import SectionCard from "./SectionCard";
import AIIcon from "../../assets/svgs/ai.svg?react";

interface AiSuggestionSectionProps {
    aiSuggestions: string[];
}

const AiSuggestionSection = ({ aiSuggestions }: AiSuggestionSectionProps) => {
    if (!Array.isArray(aiSuggestions)) {
        console.error("❌ aiSuggestions is not array:", aiSuggestions);
        return null;
    }

    return (
        <Wrapper>
            <StyledSectionCard
                icon={<AIIcon />}
                title="AI의 핵심 제안"
                subtitle="새로운 예산안을 실제로 달성할 수 있도록, AI가 당신의 과거 소비 습관 중 가장 효과가 큰 개선 행동을 추천합니다"
            >
                <SuggestionList>
                    {aiSuggestions.map((text, index) => (
                        <SuggestionItem key={index}>• {text}</SuggestionItem>
                    ))}
                </SuggestionList>

            </StyledSectionCard>
        </Wrapper>
    );
};

export default AiSuggestionSection;

const Wrapper = styled.div`
    width: 100%;
`;

const StyledSectionCard = styled(SectionCard)`
    background: #EAF8F6;
    border: 2px solid ${({ theme }) => theme.colors.primary[200]};
    padding: 40px 35px;
    gap: 20px;
`;

const SuggestionList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-left: 60px;
`;

const SuggestionItem = styled.li`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontPrimary};
    line-height: 1.5;
    list-style: none; /* 기존 점 제거 */
`;