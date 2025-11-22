import styled from "styled-components";
import { useState } from "react";
import SectionCard from "./SectionCard";
import WalletIcon from "../../assets/svgs/wallet.svg?react";
import BookmarkIcon from "../../assets/svgs/bookmark.svg?react";
import InterestsIcon from "../../assets/svgs/interests.svg?react";
import BalanceIcon from "../../assets/svgs/bookmark.svg?react";

const ruleOptions: {
    id: RuleId;
    title: string;
    description: string;
    detail: string;
    recommended?: boolean;
}[] = [
        {
            id: "50-30-20",
            title: "50/30/20 룰",
            description: "저축(20%)과 현재의 즐거움(30%)을 모두 잡는 황금 비율",
            detail: "가장 표준적이고 균형 잡힌 예산안을 추천받고 싶을 때 선택하세요",
        },
        {
            id: "60-20-20",
            title: "60/20/20 룰",
            description: "고정 지출(60%)이 높아도, 저축(20%)을 포기하지 않는 플랜",
            detail: "고정비가 많은 경우 안정적으로 저축하고 싶을 때",
        },
        {
            id: "40-30-30",
            title: "40/30/30 룰",
            description: "저축(30%) 비중을 최대로 높여 목표 달성을 앞당기는 플랜",
            detail: "빠르게 돈을 모으고 싶을 때",
            recommended: true,
        },
    ];

type RuleId = "50-30-20" | "60-20-20" | "40-30-30";

const budgetSummary: Record<RuleId, {
    fixed: number;
    variable: number;
    saving: number
}> = {
    "50-30-20": {
        fixed: 50,
        variable: 30,
        saving: 20,
    },
    "60-20-20": {
        fixed: 60,
        variable: 20,
        saving: 20,
    },
    "40-30-30": {
        fixed: 40,
        variable: 30,
        saving: 30,
    },
};

const BudgetRuleSection = () => {
    const [selectedRule, setSelectedRule] = useState<RuleId>("50-30-20");
    const summary = budgetSummary[selectedRule];
    const selectedRuleData = ruleOptions.find(r => r.id === selectedRule);

    return (
        <Wrapper>
            <SectionCard
                icon={<WalletIcon />}
                title="예산 관리 방식 선택 (필수/선택/저축)"
                subtitle="AI가 당신의 예산 관리를 도와줄게요! 나의 라이프스타일에 맞는 예산 규칙을 선택해 주세요"
            >
                <RuleList>
                    {ruleOptions.map((rule) => {
                        return (
                            <RuleCard
                                key={rule.id}
                                $active={selectedRule === rule.id}
                                onClick={() => setSelectedRule(rule.id)}
                            >
                                <RuleTitle>{rule.title}</RuleTitle>
                                <RuleDescription>{rule.description}</RuleDescription>
                                <RuleDetail>{rule.detail}</RuleDetail>

                                {rule.recommended && <Tag>추천</Tag>}
                            </RuleCard>
                        );
                    })}
                </RuleList>
            </SectionCard>
            <SummaryBox>
                <SummaryTitle>{selectedRuleData?.title} 기반 예산안</SummaryTitle>
                <SummaryDescription>
                    필수 {summary.fixed}% | 선택 {summary.variable}% | 저축 {summary.saving}%
                </SummaryDescription>
                <SummaryItems>
                    <SummaryItem>
                        <Icon> <BookmarkIcon /></Icon>
                        <ItemDesc>필수 지출 ({summary.fixed}%)</ItemDesc>
                        <ItemAmount>750,000원</ItemAmount>
                        <ItemExample>주거, 식비, 교통비 등</ItemExample>
                    </SummaryItem>
                    <SummaryItem>
                        <Icon><InterestsIcon /></Icon>
                        <ItemDesc>선택 지출 ({summary.variable}%)</ItemDesc>
                        <ItemAmount>450,000원</ItemAmount>
                        <ItemExample>취미, 외식, 쇼핑 등</ItemExample>
                    </SummaryItem>
                    <SummaryItem>
                        <Icon><BalanceIcon /></Icon>
                        <ItemDesc>저축/투자 ({summary.saving}%)</ItemDesc>
                        <ItemAmount>300,000원</ItemAmount>
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

const RuleList = styled.div`
    display: flex;
    gap: 24px;
`;

const RuleCard = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 25px 22px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background: ${({ $active }) => ($active ? "#F0FDFA" : "white")};
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    border-radius: 13px;
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: 0.2s ease;

    outline: ${({ theme, $active }) =>
        $active ? `4px solid ${theme.colors.primary[400]}` : "none"};
    outline-offset: -3px;

    &:hover {
        background: #F0FDFA;
    }
`;

const RuleTitle = styled.h4`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 20px;
`;

const RuleDescription = styled.p`
    font-size: 1.7rem;
    margin-bottom: 12px;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 1.3;
`;

const RuleDetail = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 1.3;
`;

const Tag = styled.span`
    position: absolute;
    top: 24px;
    right: 20px;
    background: #E7EDFF;
    color: ${({ theme }) => theme.colors.blue};
    padding: 4px 18px;
    border: 1px solid ${({ theme }) => theme.colors.blue};
    border-radius: 40px;
    font-size: 1.rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
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