import styled from "styled-components";

interface ChallengeCardProps {
    id: number;
    title: string;
    planType: string;
    description: string;
    startDate: string;
    endDate: string;
    goalAmount: number;
    goalPeriod: number;
    monthlySavings: number;
}

const ChallengeCard = ({
    id,
    title,
    planType,
    description,
    startDate,
    endDate,
    goalAmount,
    goalPeriod,
    monthlySavings
}: ChallengeCardProps) => {
    return (
        <Wrapper>
            <Header>
                <EventName>{title}</EventName>
                <Description>{description}</Description>

            </Header>
            <PlanTag>#{planType}</PlanTag>

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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
`;

const PlanTag = styled.div`
    align-self: flex-start;
    font-size: 1.3rem;
    padding: 5px 12px;
    border-radius: 30px;

    background: ${({ theme }) => theme.colors.primary[200]};
    /* color: white; */
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const EventName = styled.h3`
    font-size: 1.8rem;
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