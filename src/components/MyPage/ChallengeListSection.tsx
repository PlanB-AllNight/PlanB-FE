import styled from "styled-components";
import ChallengeCard from "./ChallengeCard";

interface MyChallenge {
    id: number;
    eventName: string;
    planType: "수입 증대 플랜" | "현상 유지 플랜" | "STO 투자 플랜";
    description: string;
    goalAmount: number;
    goalPeriod: number;
    monthlySavings: number;
    startDate: string;
    endDate: string;
}

interface ChallengeListSectionProps {
    challenges: MyChallenge[];
}

const ChallengeListSection = ({ challenges }: ChallengeListSectionProps) => {
    return (
        <Wrapper>
            <Grid>
                {challenges.map(ch => (
                    <ChallengeCard key={ch.id} {...ch} />
                ))}
            </Grid>
        </Wrapper>
    );
};

export default ChallengeListSection;

const Wrapper = styled.div`
    width: 100%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
`;