import styled from "styled-components";

interface GoalSimulationCardProps {
    goalName: string;
    currentAmount: number;
    goalAmount: number;
    shortfallAmount: number;
    period: number;
}

const GoalSimulationCard = ({
    goalName,
    currentAmount,
    goalAmount,
    shortfallAmount,
    period,
}: GoalSimulationCardProps) => {
    return (
        <Wrapper>
            <Header>
                <Highlight>{goalName}</Highlight> 목표 달성 시뮬레이션
            </Header>
            <InfoGrid>
                <InfoItem>
                    <Label>현재 보유 금액</Label>
                    <Value>{currentAmount.toLocaleString()}원</Value>
                </InfoItem>
                <InfoItem>
                    <Label>목표 금액</Label>
                    <Value>{goalAmount.toLocaleString()}원</Value>
                </InfoItem>
                <InfoItem>
                    <Label>부족 금액</Label>
                    <Value highlight>{shortfallAmount.toLocaleString()}원</Value>
                </InfoItem>
                <InfoItem>
                    <Label>목표 기간</Label>
                    <Value>{period}개월</Value>
                </InfoItem>
            </InfoGrid>
        </Wrapper>
    );
};

export default GoalSimulationCard;

const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary[200]};
    border-radius: 18px;
    padding: 24px 36px 50px;
    text-align: center;
`;

const Header = styled.h3`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 26px;
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-right: 3px;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const InfoItem = styled.div`
    background: white;
    padding: 20px;
    border-radius: 13px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const Label = styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Value = styled.span<{ highlight?: boolean }>`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ highlight, theme }) =>
        highlight ? theme.colors.primary[500] : theme.colors.fontPrimary};
`;