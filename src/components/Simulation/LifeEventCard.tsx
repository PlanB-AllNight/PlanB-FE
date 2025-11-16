import styled from "styled-components";
import React from "react";

interface LifeEventCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    amount: string;
    period: string;
    isSelected: boolean;
    onClick: () => void;
}

const LifeEventCard = ({
    icon,
    title,
    description,
    amount,
    period,
    isSelected,
    onClick,
}: LifeEventCardProps) => {
    return (
        <Wrapper isSelected={isSelected} onClick={onClick}>
            <TitleRow>
                {icon}
                <Title>{title}</Title>
            </TitleRow>
            <Description>{description}</Description>
            <Box>
                <InfoRow>
                    <InfoLabel>예상 비용:</InfoLabel>
                    <InfoValue>{amount}</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>권장 기간:</InfoLabel>
                    <InfoValue>{period}</InfoValue>
                </InfoRow>
            </Box>
        </Wrapper>
    );
};

export default LifeEventCard;

const Wrapper = styled.div<{ isSelected: boolean }>`
    background: white;
    padding: 28px 26px;
    border-radius: 13px;
    border-width: ${({ isSelected }) => (isSelected ? "6px" : "2px")};
    border-style: solid;
    border-color: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.primary[400] : theme.colors.primary[300]};
    background: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary[100] : "white")};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 19px;
    transition: all 0.2s;

    &:hover {
        border-color: ${({ theme }) => (theme.colors.primary[400])};;
    }
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 17px;
`;

const Title = styled.h3`
    font-size: 2.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Description = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoLabel = styled.span`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const InfoValue = styled.span`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;