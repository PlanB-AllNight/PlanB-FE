import styled from "styled-components";
import { useState } from "react";

import BookmarkIcon from "../../assets/svgs/bookmark.svg?react";
import InterestsIcon from "../../assets/svgs/interests.svg?react";
import BalanceIcon from "../../assets/svgs/bookmark.svg?react";
import PigIcon from "../../assets/svgs/pig.svg?react";

import type { BudgetSummary } from "../../types/budget";

interface BudgetRuleSectionProps {
    selectedPlan: string; // ex) "50/30/20"
    totalIncome: number;
    budgetSummary: BudgetSummary;
}

const BudgetRuleSection = ({
    selectedPlan,
    totalIncome,
    budgetSummary
}: BudgetRuleSectionProps) => {

    return (
        <Wrapper>
            <IncomeBox>
                <IncomeLeft>
                    <PigIcon />
                    <IncomeSummary>
                        <IncomeTitle>이번 달 총 수입</IncomeTitle>
                        <IncomeAmount>{totalIncome.toLocaleString()}원</IncomeAmount>
                    </IncomeSummary>
                </IncomeLeft>

                <IncomeDescription>이 금액을 기준으로 예산을 추천합니다</IncomeDescription>
            </IncomeBox>

            <SummaryBox>
                <SummaryTitle>{selectedPlan} 기반 예산안</SummaryTitle>
                <SummaryDescription>
                    필수 {budgetSummary.needs.percent}% | 선택 {budgetSummary.wants.percent}% | 저축 {budgetSummary.savings.percent}%
                </SummaryDescription>
                <SummaryItems>
                    <SummaryItem>
                        <Icon> <BookmarkIcon /></Icon>
                        <ItemDesc>필수 지출 ({budgetSummary.needs.percent}%)</ItemDesc>
                        <ItemAmount>{budgetSummary.needs.amount.toLocaleString()}원</ItemAmount>
                        <ItemExample>주거, 식비, 교통비 등</ItemExample>
                    </SummaryItem>
                    <SummaryItem>
                        <Icon><InterestsIcon /></Icon>
                        <ItemDesc>선택 지출 ({budgetSummary.wants.percent}%)</ItemDesc>
                        <ItemAmount>{budgetSummary.wants.amount.toLocaleString()}원</ItemAmount>
                        <ItemExample>취미, 외식, 쇼핑 등</ItemExample>
                    </SummaryItem>
                    <SummaryItem>
                        <Icon><BalanceIcon /></Icon>
                        <ItemDesc>저축/투자 ({budgetSummary.savings.percent}%)</ItemDesc>
                        <ItemAmount>{budgetSummary.savings.amount.toLocaleString()}원</ItemAmount>
                        <ItemExample>비상금, 투자, 목표 저축</ItemExample>
                    </SummaryItem>
                </SummaryItems>
            </SummaryBox>
        </Wrapper>
    );
};

export default BudgetRuleSection;

const Wrapper = styled.div`
    width: 100%;
`;

const SummaryBox = styled.div`
    margin-top: 70px;
    text-align: center;
    padding: 0 40px;
`;

const SummaryTitle = styled.h4`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 10px;
`;

const SummaryDescription = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 50px;
`;

const SummaryItems = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const SummaryItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.primary[400]};
    border-radius: 13px;
    padding: 45px 0;
`;

const Icon = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary[200]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
`;

const ItemDesc = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    margin-bottom: 13px;
`;

const ItemAmount = styled.p`
    font-size: 2.7rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
    margin-bottom: 7px;
`;

const ItemExample = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

// IncomeBox
const IncomeBox = styled.div`
    width: 100%;
    padding: 40px 35px;
    background: #EAF8F6;
    border: 2px solid ${({ theme }) => theme.colors.primary[200]};
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
`;

const IncomeLeft = styled.div`
    display: flex;
    gap: 35px;
`;

const IncomeSummary = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const IncomeTitle = styled.p`
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const IncomeAmount = styled.p`
    font-size: 3.6rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const IncomeDescription = styled.p`
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

