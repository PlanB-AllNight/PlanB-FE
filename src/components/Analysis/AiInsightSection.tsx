import styled from "styled-components";
import InsightCard from "./InsightCard";
import BulbIcon from "../../assets/svgs/bulb.svg?react";
import PuzzleIcon from "../../assets/svgs/puzzle.svg?react";

interface AiInsightSectionProps {
    findings: string[];
    suggestions: string[];
}

const AiInsightSection = ({ findings, suggestions }: AiInsightSectionProps) => {
    return (
        <Wrapper>
            <Title>AI 분석 인사이트</Title>

            <Content>
                <LeftSection>
                    <SubTitle>주요 발견사항</SubTitle>

                    {findings.map((find, i) => (
                        <InsightCard
                            key={i}
                            icon={<BulbIcon />}
                            description={find}
                            size="sm"
                            color="yellow"
                            weight={500}
                        />
                    ))}
                </LeftSection>

                <RightSection>
                    <SubTitle>개선 제안</SubTitle>

                    {suggestions.map((suggest, i) => (
                        <InsightCard
                            key={i}
                            icon={<PuzzleIcon />}
                            description={suggest}
                            size="sm"
                            color="green"
                            weight={500}
                        />
                    ))}
                </RightSection>
            </Content>
        </Wrapper>
    );
};

export default AiInsightSection;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    padding: 50px 40px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    gap: 25px;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Content = styled.div`
    display: flex;
    gap: 40px;
`;

const LeftSection = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 13px;
`;

const RightSection = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 13px;
`;

const SubTitle = styled.h3`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    margin-bottom: 7px;
`;