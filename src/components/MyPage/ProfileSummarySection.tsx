import styled from "styled-components";
import ProfileIcon from "../../assets/svgs/account.svg?react";

interface ProfileSummaryProps {
    name: string;
    savedThisMonth: number;
    achievementRate: number | null;
    ongoingChallenges: number;
}

const ProfileSummarySection = ({
    name,
    savedThisMonth,
    achievementRate,
    ongoingChallenges
}: ProfileSummaryProps) => {
    return (
        <Wrapper>
            <ProfileCard>
                <IconWrapper>
                    <ProfileIcon width={50} height={50} />
                </IconWrapper>
                <Info>
                    <Name>{name}</Name>
                    <SubInfo>{`이번 달 목표를 향해\n달려가고 있어요!💪`}</SubInfo>
                </Info>
            </ProfileCard>

            <SummaryGrid>
                <SummaryItem>
                    <Value $isEmpty={savedThisMonth == null}>
                        {savedThisMonth != null
                            ? `${savedThisMonth.toLocaleString()}원`
                            : "아직 소비 분석 결과가 없어요"}
                    </Value>
                    <Label>이번 달 절약 금액</Label>
                </SummaryItem>

                <SummaryItem>
                    <Value $isEmpty={achievementRate == null}>
                        {achievementRate != null
                            ? `${achievementRate}%`
                            : "아직 분석 결과가 없어요"}
                    </Value>
                    <Label>예산 달성률</Label>
                </SummaryItem>

                <SummaryItem>
                    <Value>{ongoingChallenges}개</Value>
                    <Label>진행 중인 챌린지</Label>
                </SummaryItem>
            </SummaryGrid>
        </Wrapper>
    );
};

export default ProfileSummarySection;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    background: white;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 10px;
    padding: 40px 50px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.10);
    gap: 25px;
`;

const ProfileCard = styled.div`
    flex: 1;
    display: flex;
    gap: 30px;
    align-items: center;
`;

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary[200]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Name = styled.div`
    font-size: 2.6rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const SubInfo = styled.div`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    white-space: pre-line;
    line-height: 1.3;
`;

const SummaryGrid = styled.div`
    flex: 2;
    display: flex;
    gap: 20px;
`;

const SummaryItem = styled.div`
    flex: 1;
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    border-radius: 13px;
    padding: 32px 20px;
    width: 240px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Value = styled.div<{ $isEmpty?: boolean }>`
    font-size: ${({ $isEmpty }) => ($isEmpty ? "1.7rem" : "2.4rem")};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const Label = styled.div`
    margin-top: 20px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;