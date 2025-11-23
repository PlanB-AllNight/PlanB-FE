import styled from "styled-components";

interface ChallengeCardProps {
    eventName: string;
    planType: "수입 증대 플랜" | "현상 유지 플랜" | "STO 투자 플랜";
    description: string;
    goalAmount: number;
    goalPeriod: number;
    monthlySavings: number;
    startDate: string;
    endDate: string;
}

const planColors = {
    "수입 증대 플랜": { bg: "#FFF7ED", text: "#C3420D" },
    "현상 유지 플랜": { bg: "#FEE2E1", text: "#EF4444" },
    "STO 투자 플랜": { bg: "#E7EDFF", text: "#1E4ED8" },
};

const ChallengeCard = ({
    eventName,
    planType,
    description,
    goalAmount,
    goalPeriod,
    monthlySavings,
    startDate,
    endDate,
}: ChallengeCardProps) => {
    return (
        <Wrapper>
            <Header>
                <EventName>{eventName}</EventName>
                <PlanTag planType={planType}>{planType}</PlanTag>
            </Header>
            <Description>{description}</Description>
            <Content>
                <Row>
                    <Label>목표 금액</Label>
                    <Value>{goalAmount.toLocaleString()}원</Value>
                </Row>

                <Row>
                    <Label>목표 기간</Label>
                    <Value>{goalPeriod}개월</Value>
                </Row>

                <Row>
                    <Label>월 저축액</Label>
                    <Value>{monthlySavings.toLocaleString()}원</Value>
                </Row>

                <Row>
                    <Label>시작일</Label>
                    <Value>{startDate}</Value>
                </Row>

                <Row>
                    <Label>예상 종료일</Label>
                    <Value>{endDate}</Value>
                </Row>
            </Content>
        </Wrapper>
    );
};

export default ChallengeCard;

const Wrapper = styled.div`
    width: 100%;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 13px;
    padding: 20px 26px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PlanTag = styled.div<{ planType: ChallengeCardProps["planType"] }>`
    align-self: flex-start;
    font-size: 1.4rem;
    padding: 5px 12px;
    border-radius: 30px;

    background: ${({ planType }) => planColors[planType].bg};
    color: ${({ planType }) => planColors[planType].text};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const EventName = styled.h3`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const Description = styled.p`
    font-size: 1.3rem;
    line-height: 1.4;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    gap: 15px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Label = styled.div`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Value = styled.div`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[400]};
`;