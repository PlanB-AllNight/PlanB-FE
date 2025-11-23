import styled from "styled-components";
import ProfileIcon from "../../assets/svgs/account.svg?react";

export interface UserProfileSummary {
    name: string;
    birth: string;
    phone: string;
    savedThisMonth: number;
    activeChallengeCount: number;
    completedChallengeCount: number;
}

interface ProfileSummaryProps {
    userProfileSummary: UserProfileSummary;
}

const ProfileSummarySection = ({ userProfileSummary }: ProfileSummaryProps) => {
    return (
        <Wrapper>
            <ProfileCard>
                <IconWrapper>
                    <ProfileIcon width={50} height={50} />
                </IconWrapper>
                <Info>
                    <Name>{userProfileSummary.name}</Name>
                    <SubInfo>{userProfileSummary.birth}</SubInfo>
                    <SubInfo>{userProfileSummary.phone}</SubInfo>
                </Info>
            </ProfileCard>

            <SummaryGrid>
                <SummaryItem>
                    <Value>{userProfileSummary.savedThisMonth.toLocaleString()}원</Value>
                    <Label>이번 달 절약 금액</Label>
                </SummaryItem>

                <SummaryItem>
                    <Value>{userProfileSummary.activeChallengeCount}개</Value>
                    <Label>참여 중인 챌린지</Label>
                </SummaryItem>

                <SummaryItem>
                    <Value>{userProfileSummary.completedChallengeCount}개</Value>
                    <Label>완료한 챌린지</Label>
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
`;

const Value = styled.div`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const Label = styled.div`
    margin-top: 20px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;