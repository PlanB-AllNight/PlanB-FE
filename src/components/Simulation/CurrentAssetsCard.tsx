import styled from "styled-components";
import Button from "../common/Button";
import WalletCircle from "../../assets/svgs/wallet-circle.svg?react";

interface CurrentAssetsCardProps {
    amount: string;
    onEdit: () => void;
}

const CurrentAssetsCard = ({ amount, onEdit }: CurrentAssetsCardProps) => {
    return (
        <Wrapper>
            <ContentWrapper>
                <TitleRow>
                    <WalletCircle width="52" height="52" />
                    <Title>현재 자산 현황</Title>
                </TitleRow>
                <Label>현재 보유 자금</Label>
                <Amount>{amount}원</Amount>
            </ContentWrapper>
            <Button variant="primary" size="sm" onClick={onEdit}>
                수정하기
            </Button>
        </Wrapper>
    );
};

export default CurrentAssetsCard;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 34px 50px;
    border-radius: 13px;
    box-shadow: 0px 8px 16px #00000033;

    > button {
        width: 127px;
        font-size: 1.6rem;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 17px;
    margin-bottom: 20px;
`;

const Title = styled.p`
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.fontPrimary};
`;

const Label = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 9px;
`;

const Amount = styled.p`
    font-size: 3.2rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary[500]};
`;