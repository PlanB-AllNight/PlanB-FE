import styled from "styled-components";
import Button from "../common/Button";
import type { Policy } from "../../pages/SupportPage";

interface Props {
  policy: Policy;
  onClick: () => void;
}

const PolicyCard = ({ policy, onClick }: Props) => {
  return (
    <Card onClick={onClick}>
      <Top>
        <Title>{policy.title}</Title>
      </Top>
      <Desc>{policy.description}</Desc>

      <InfoBox>
        <InfoRow>
          <Label>신청 기간:</Label>
          <Value>{policy.supporter}</Value>
        </InfoRow>
        <InfoRow>
          <Label>신청 기간:</Label>
          <Value>{policy.period}</Value>
        </InfoRow>
        <InfoRow>
          <Label>대상:</Label>
          <Value>{policy.target}</Value>
        </InfoRow>
        <InfoRow>
          <Label>지급 방식:</Label>
          <Value>{policy.payment}</Value>
        </InfoRow>
      </InfoBox>

      <ButtonWrapper>
        <Button
          variant="light"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          style={{ height: "40px", fontSize: "1.6rem" }}
        >
          자세히 보기
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

export default PolicyCard;

const Card = styled.div`
  background: white;
  border: 2px solid ${({theme}) => theme.colors.gray};
  border-radius: 13px;
  padding: 26px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const Desc = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.fontPrimary};
  margin-bottom: 16px;
  line-height: 1.2;
  min-height: 38.5px;
`;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 26px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.fontSecondary};
`;

const Value = styled.span`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.fontPrimary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;
