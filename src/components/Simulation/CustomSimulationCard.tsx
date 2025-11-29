import styled, { css } from "styled-components";
import Button from "../common/Button";

export interface PlanData {
    id: number;
    title: string;
    tags: string[];
    isRecommended?: boolean;
    strategy: string;
    expectedPeriod: number;
    monthlySaving: number;
    finalAsset: number;
    monthlyAdditionalIncome: number;
    comment: string;
    hashtags: string[];
}

interface CustomSimulationCardProps {
    plan: PlanData;
    isSelected: boolean;
    onSelect: () => void;
}

const CustomSimulationCard = ({
    plan,
    isSelected,
    onSelect,
}: CustomSimulationCardProps) => {
    const statusText = plan.isRecommended ? "추천" : "비추천";
    const isWarning = !plan.isRecommended;

    return (
        <Wrapper 
            isSelected={isSelected}
            onClick={onSelect}
        >
            <Header>
                <Title>{plan.title}</Title>
                <StatusTag isWarning={isWarning}>{statusText}</StatusTag>
            </Header>

            <Content>
                <Section>
                    <SectionTitle>전략:</SectionTitle>
                    <Description>{plan.strategy}</Description>
                </Section>

                <Container>
                    <DataRow>
                        <Label>예상 달성 기간:</Label>
                        <Value>{plan.expectedPeriod}개월</Value>
                    </DataRow>
                    <DataRow>
                        <Label>월 저축액:</Label>
                        <Value>₩{plan.monthlySaving.toLocaleString()}</Value>
                    </DataRow>
                    <DataRow>
                        <Label>최종 예상 자산:</Label>
                        <Value>₩{plan.finalAsset.toLocaleString()}</Value>
                    </DataRow>
                    <DataRow>
                        <Label>월 추가 필요액:</Label>
                        <Value>₩{plan.monthlyAdditionalIncome.toLocaleString()}</Value>
                    </DataRow>
                </Container>

                <Section>
                    <SectionTitle>추천:</SectionTitle>
                    <Description>{plan.comment}</Description>
                </Section>

                <HashTags>
                    {plan.hashtags.map((tag, idx) => (
                        <HashTag 
                            key={idx} 
                            isFirst={idx === 0} 
                            isWarning={isWarning}
                        >
                            {tag}
                        </HashTag>
                    ))}
                </HashTags>
            </Content>

            <Button
                variant={isSelected ? "primary" : "gray"}
                size="sm"
                fontSize="1.6rem"
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                }}
            >
                {isSelected ? "선택됨" : "플랜 선택하기"}
            </Button>
        </Wrapper>
    );
};

export default CustomSimulationCard;

const Wrapper = styled.div<{ isSelected: boolean }>`
    width: 100%;
    background: white;
    border: 2px solid ${({ isSelected, theme }) => 
        isSelected ? theme.colors.primary[500] : theme.colors.gray};
    border-radius: 13px;
    padding: 26px;
    display: flex;
    flex-direction: column;
    gap: 26px;
    transition: all 0.2s;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary[400]};
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h3`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary[500]};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    max-width: 450px;
    word-break: keep-all;
`;

const StatusTag = styled.span<{ isWarning: boolean }>`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    padding: 4px 8px;
    border-radius: 11px;

    ${({ isWarning, theme }) => isWarning ? css`
        background-color: #FEE2E1;
        color: #EF4444;
    ` : css`
        background-color: ${theme.colors.primary[200]};
        color: ${theme.colors.fontPrimary};
    `}
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
    margin-bottom: 3px;
`;

const Section = styled.div`
    min-height: 72.5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin-bottom: 24px;
`;

const SectionTitle = styled.span`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-right: 5px;
`;

const Description = styled.span`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.fontPrimary};
    line-height: 1.2;
`;

const DataRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
`;

const Label = styled.span`
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Value = styled.span`
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const HashTags = styled.div`
    display: flex;
    gap: 11px;
    flex-wrap: wrap;
    margin-top: 24px;
`;

const HashTag = styled.span<{ isFirst: boolean; isWarning: boolean }>`
    font-size: 1.6rem;
    padding: 4px 8px;
    border-radius: 11px;

    ${({ isFirst, isWarning, theme }) => {
        if (isFirst) {
            if (isWarning) {
                return css`
                    background-color: #FEE2E1;
                    color: #EF4444;
                `;
            } else {
                return css`
                    background-color: ${theme.colors.primary[200]}; /* 초록(민트) 배경 */
                    color: ${theme.colors.fontPrimary};             /* 검정(기본) 글씨 */
                `;
            }
        } else {
            return css`
                background-color: ${theme.colors.gray};
                color: ${theme.colors.fontPrimary};
            `;
        }
    }}
`;