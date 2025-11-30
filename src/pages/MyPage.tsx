import styled from "styled-components";
import { useState, useEffect } from "react";

import SwitchTabs from "../components/MyPage/SwitchTabs";
import ProfileSummarySection from "../components/MyPage/ProfileSummarySection";
import SpendingSection from "../components/MyPage/SpendingSection";
import ChallengeListSection from "../components/MyPage/ChallengeListSection";

import { getMyPageSummary } from "../api/mypage";

const MyPage = () => {
    const [summary, setSummary] = useState<any | null>(null);
    const [activeTab, setActiveTab] = useState("소비 분석");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyPageSummary();
            setSummary(data);
        };
        fetchData();
    }, []);

    if (!summary) return <div>불러오는 중...</div>;

    return (
        <Wrapper>
            <ProfileSummarySection
                name={summary.name}
                savedThisMonth={summary.saved_amount}
                achievementRate={summary.achievement_rate}
                ongoingChallenges={summary.ongoing_challenges}
            />
            <SwitchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Content>
                {activeTab === "소비 분석" && <SpendingSection />}
                {/* {activeTab === "예산 관리" && <BudgetSection />} */}
                {activeTab === "챌린지" && <ChallengeListSection />}
            </Content>
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

const Content = styled.div`
    width: 100%;
`