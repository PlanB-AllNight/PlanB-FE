import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";
import PercentBar from "./PercentBar";
import InsightCard from "./InsightCard";
import type { CategorySpending } from "../../types/analysis";
import TrophyIcon from "../../assets/svgs/trophy.svg?react";
import WarningIcon from "../../assets/svgs/warning.svg?react";
import BulbIcon from "../../assets/svgs/bulb.svg?react";

interface CategorySectionProps {
    categories: CategorySpending[];
    insights: {
        highestCategory: string;
        overspendingCategory: string;
        suggestions: string;
    };
}

const CategorySection = ({ categories, insights }: CategorySectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    /** 상위 5개 + 기타 묶기 */
    const getCondensedCategories = (list: CategorySpending[]) => {
        if (list.length <= 5) return list;

        const top5 = list.slice(0, 5);
        const rest = list.slice(5);

        const otherAmount = rest.reduce((sum, c) => sum + c.amount, 0);
        const otherCount = rest.reduce((sum, c) => sum + c.count, 0);
        const otherRatio = rest.reduce((sum, c) => sum + c.ratio, 0);

        return [
            ...top5,
            {
                name: "기타",
                ratio: otherRatio,
                amount: otherAmount,
                count: otherCount,
            },
        ];
    };

    const listToShow = isExpanded ? categories : getCondensedCategories(categories);

    return (
        <Wrapper>
            <Title>카테고리별 지출 분석</Title>

            <Content>
                <LeftSection>
                    <Top>
                        <SubTitle>지출 비중</SubTitle>
                        <Button
                            variant={isExpanded ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setIsExpanded(prev => !prev)}
                        >
                            {isExpanded ? "간략히 보기" : "자세히 보기"}
                        </Button>
                    </Top>
                    <Bottom>
                        {listToShow.map((cat) => (
                            <PercentBar
                                key={cat.name}
                                label={cat.name}
                                ratio={cat.ratio}
                                amount={cat.amount}
                                count={cat.count}
                            />
                        ))}
                    </Bottom>
                </LeftSection>
                <RightSection>
                    <SubTitle>한 눈에 보는 내 소비</SubTitle>
                    <InsightCard
                        icon={<TrophyIcon />}
                        title="가장 많이 쓴 카테고리"
                        description={insights.highestCategory}
                        color="blue"
                    />
                    <InsightCard
                        icon={<WarningIcon />}
                        title="과소비 주의 카테고리"
                        description={insights.overspendingCategory}
                        color="orange"
                    />
                    <InsightCard
                        icon={<BulbIcon />}
                        title="개선 제안"
                        description={insights.suggestions}
                        color="green"
                    />
                </RightSection>
            </Content>
        </Wrapper>
    );
};

export default CategorySection;

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
    flex: 5.5 1 0;
    display: flex;
    flex-direction: column;
    gap: 13px;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;

    > Button {
        height: 30px;
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.primary[500]};
        font-size: 1.6rem;
        padding: 6px 16px;
        width: 110px;
    }
`;

const SubTitle = styled.h3`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 19px;
`;

const RightSection = styled.div`
    flex: 4.5 1 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;