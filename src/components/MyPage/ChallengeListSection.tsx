import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyChallenge } from "../../api/mypage";
import { mapMyChallenge } from "../../utils/challengeMapper";

import SectionComponent from "./SectionComponent";
import ChallengeCard from "./ChallengeCard";

const ChallengeListSection = () => {
    const [challenges, setChallenges] = useState<any[]>([]);
    const navigate = useNavigate();
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getMyChallenge("IN_PROGRESS");
                setChallenges(Array.isArray(data) ? data : []);

                const completedData = await getMyChallenge("COMPLETED");
                setCompletedCount(completedData.length);
            } catch (err) {
                console.error("❌ 챌린지 조회 실패", err);
                setChallenges([]);
            } finally {
            }
        };

        fetchChallenges();
    }, []);

    const mappedChallenges = challenges.map((item) => mapMyChallenge(item));

    const ongoingChallengeCnt = challenges.length;


    return (
        <Wrapper>
            <SectionComponent
                title="마이 챌린지"
                description="당신의 라이프 이벤트와 재무 플랜에 맞는 챌린지를 확인해보세요"
                buttonText="새 챌린지 시작하기"
                onButtonClick={() => navigate("/simulate")}
            >
                <Stats>
                    <Card>
                        <Title>진행 중인 챌린지</Title>
                        <Count>{ongoingChallengeCnt}개</Count>
                    </Card>
                    <Card>
                        <Title>진행 완료한 챌린지</Title>
                        <Count>{completedCount}개</Count>
                    </Card>
                </Stats>

                <SectionTitle>진행 중인 챌린지</SectionTitle>
                <Grid>
                    {mappedChallenges.map((ch) => (
                        <ChallengeCard key={ch.id} {...ch} />
                    ))}
                </Grid>
            </SectionComponent>
        </Wrapper>
    );
};

export default ChallengeListSection;

const Wrapper = styled.div`
    width: 100%;
`;

const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 35px 30px;
    gap: 40px;

    background: white;
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 13px;
`;

const Title = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const Count = styled.p`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[400]};
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin: 26px 0;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;