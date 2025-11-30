import styled from "styled-components";
import SectionCard from "./SectionCard";

type StatusType = "적정" | "과소비" | "여유";

type CategoryBudgetGroup = {
    groupName: string;
    groupAmount: number;
    items: {
        name: string;
        current: number;
        recommended: number;
        status: StatusType;
    }[];
}

type CategoryBudgetProps = {
    categoryBudgetGroups: CategoryBudgetGroup[];
};

const statusColors = {
    적정: {
        bg: "#CAF4D5",
        text: "#17803D",
        circle: "#17803D",
    },
    과소비: {
        bg: "#FEE2E1",
        text: "#EF4444",
        circle: "#EF4444",
    },
    여유: {
        bg: "#E7EDFF",
        text: "#1E4ED8",
        circle: "#1E4ED8",
    },
} as const;

export type BudgetGroupName = "필수 지출" | "선택 지출" | "저축/투자";

const CategoryBudgetSection = ({ categoryBudgetGroups }: CategoryBudgetProps) => {
    return (
        <Wrapper>
            <SectionCard
                title="카테고리 별 예산 추천"
            >
                <Content>
                    {categoryBudgetGroups.map(group => (
                        <CategoryBudgetGroup key={group.groupName}>
                            <TitleBox>
                                <GroupName>{group.groupName}</GroupName>
                                <GroupAmount>{group.groupAmount.toLocaleString()}원</GroupAmount>
                            </TitleBox>
                            <CategoryBudgetItems>
                                {group.items.map(item => (
                                    <CategoryBudgetCard key={item.name}>
                                        <Circle status={item.status} />
                                        <TextBox>
                                            <Label>{item.name}</Label>
                                            <Amount>현재: {item.current.toLocaleString()}원</Amount>
                                            <Amount>권장: {item.recommended.toLocaleString()}원</Amount>
                                        </TextBox>
                                        <Tag status={item.status}>{item.status}</Tag>
                                    </CategoryBudgetCard>
                                ))}
                            </CategoryBudgetItems>
                        </CategoryBudgetGroup>
                    ))}
                </Content>
            </SectionCard>
        </Wrapper>
    );
};

export default CategoryBudgetSection;

const Wrapper = styled.div`
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    gap: 25px;
`;

const CategoryBudgetGroup = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
`;

const GroupName = styled.p`
    font-size: 2.2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const GroupAmount = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const CategoryBudgetItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
`

const CategoryBudgetCard = styled.div`
    background: ${({ theme }) => theme.colors.background};
    padding: 20px 25px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
`;

const Circle = styled.div<{ status: "적정" | "과소비" | "여유" }>`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${({ status }) => statusColors[status].circle};
    flex-shrink: 0;
`;

const TextBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Label = styled.p`
    font-size: 1.7rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Amount = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Tag = styled.div<{ status: "적정" | "과소비" | "여유" }>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    border-radius: 40px;
    width: 70px;
    height: 33px;
    background: ${({ status }) => statusColors[status].bg};
    color: ${({ status }) => statusColors[status].text};
`