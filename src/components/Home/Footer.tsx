import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Wrapper>
            <Content>
                <Column>
                    <Logo>PlanB</Logo>
                    <SubText>코스콤 AI Agent Challenge 개인화 자산관리 플랫폼</SubText>
                </Column>

                <MenuWrapper>
                    <Column>
                        <Title>서비스</Title>
                        <ListLink to="/analysis">소비 분석</ListLink>
                        <ListLink to="/budget">예산 관리</ListLink>
                        <ListLink to="/consult">투자 상담</ListLink>
                        <ListLink to="/info">지원 정보</ListLink>
                    </Column>
                    <Column>
                        <Title>기술 파트너</Title>
                        <List>코스콤 마이데이터</List>
                        <List>코스콤 STO 플랫폼</List>
                        <List>AICC 금융상담</List>
                    </Column>
                    <Column>
                        <Title>연락처</Title>
                        <List>Email: planb@planb.co.kr</List>
                        <List>Tel: 02-1234-5678</List>
                    </Column>
                </MenuWrapper>
            </Content>

            <Divider />

            <Copyright>
                © 2025 PlanB. All rights reserved.
            </Copyright>
        </Wrapper >
    );
};

export default Footer;

const Wrapper = styled.footer`
    width: 100%;
    padding: 60px 70px;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 78px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 40px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const Logo = styled.h2`
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    margin-bottom: 12px;
`;

const SubText = styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const MenuWrapper = styled.div`
    display: flex;
    gap: 200px;
`

const Title = styled.h3`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    margin-bottom: 8px;
`;

const List = styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
`;

const ListLink = styled(Link)`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.fontSecondary};
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: ${({ theme }) => theme.colors.fontSecondary};
    margin-bottom: 70px;
`;

const Copyright = styled.p`
    text-align: center;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.colors.fontSecondary};
`;