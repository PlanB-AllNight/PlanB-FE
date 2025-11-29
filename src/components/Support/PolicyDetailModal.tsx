import styled from "styled-components";
import Button from "../common/Button";
import type { Policy } from "../../pages/SupportPage";

interface ModalProps {
  policy: Policy;
  onClose: () => void;
}

const PolicyDetailModal = ({ policy, onClose }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalContainer>
        <Header>
          <Title>{policy.title}</Title>
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </Header>

        <Content>
          <Section>
            <SectionLabel>지원 내용</SectionLabel>
            <DescText>{policy.description}</DescText>
          </Section>

          <Section>
            <SectionLabel>상세 정보</SectionLabel>
            <DetailBox>
              {policy.detailContent}
            </DetailBox>
          </Section>

          <NoticeBox>
            해당 지원 정책의 자세한 신청 방법과 필요 서류는 관련 기관 홈페이지에서 확인하실 수
            있습니다. AI 상담을 통해 더 자세한 안내를 받아보세요.
          </NoticeBox>
        </Content>

        <Footer>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open(policy.link, "_blank")}
          >
            공식 사이트
          </Button>
          <Button variant="gray" size="sm" onClick={onClose}>
            닫기
          </Button>
        </Footer>
      </ModalContainer>
    </Backdrop>
  );
};

export default PolicyDetailModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  width: 600px;
  background: white;
  border-radius: 13px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 3.5rem;
  color: #9ca3af;
  padding: 0;
  line-height: 0.5;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.fontPrimary};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SectionLabel = styled.h4`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.fontPrimary};
`;
const DescText = styled.p`
  font-size: 1.6rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.fontPrimary};
  white-space: pre-line;
`;

const DetailBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  padding: 16px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.fontPrimary};
  line-height: 1.4;
  white-space: pre-line;
`;

const NoticeBox = styled.div`
  background: ${({ theme }) => theme.colors.primary[100]};
  border-radius: 11px;
  padding: 15px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.fontSecondary};
  line-height: 1.3;
  text-align: left;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 13px;
  > button {
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    flex: 1;
  }
`;
