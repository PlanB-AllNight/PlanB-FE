import styled from "styled-components";
import ProfileSummarySection from "../components/MyPage/ProfileSummarySection";
import ChallengeListSection from "../components/MyPage/ChallengeListSection";
import type { UserProfileSummary } from "../components/MyPage/ProfileSummarySection";

const mockProfileSummary: UserProfileSummary = {
    name: "장지요",
    birth: "2003-04-30",
    phone: "01071628842",
    savedThisMonth: 250000,
    activeChallengeCount: 3,
    completedChallengeCount: 12,
};

const mockChallenges: MyChallenge[] = [
    {
        id: 1,
        eventName: "교환학생",
        planType: "수입 증대 플랜",
        description: "현재 소비를 유지하고, 근로장학금 등 외부 수입 11만원 확보",
        goalAmount: 8000000,
        goalPeriod: 12,
        monthlySavings: 800000,
        startDate: "2025-05-10",
        endDate: "2026-05-10",
    },
    {
        id: 2,
        eventName: "해외여행",
        planType: "현상 유지 플랜",
        description: "아무런 절약/투자 없이, 현재 월 저축액(30만원) 유지",
        goalAmount: 8000000,
        goalPeriod: 12,
        monthlySavings: 800000,
        startDate: "2025-05-10",
        endDate: "2026-05-10",
    },
    {
        id: 3,
        eventName: "노트북 구매",
        planType: "STO 투자 플랜",
        description: "현재 월 저축액(30만원)을 KOSCOM STO에 투자 (연 7% 복리 적용)",
        goalAmount: 8000000,
        goalPeriod: 12,
        monthlySavings: 800000,
        startDate: "2025-05-10",
        endDate: "2026-05-10",
    },
];

const MyPage = () => {
    return (
        <Wrapper>
            <ProfileSummarySection userProfileSummary={mockProfileSummary} />
            <SectionTitle>마이 챌린지</SectionTitle>
            <ChallengeListSection challenges={mockChallenges} />
        </Wrapper>
    );
};

export default MyPage;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
`;

const SectionTitle = styled.h2`
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;