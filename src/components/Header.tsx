import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();

    return (
        <Container>
            <Logo to="/">PlanB</Logo>

            <MenuList>
                <MenuItem to="/" active={pathname === "/"}>홈</MenuItem>
                <MenuItem to="/analysis" active={pathname === "/analysis"}>소비분석</MenuItem>
                <MenuItem to="/simulate" active={pathname === "/simulate"}>시뮬레이션</MenuItem>
                <MenuItem to="/info" active={pathname === "/info"}>지원정보/상담</MenuItem>
                <MenuItem to="/mypage" active={pathname === "/mypage"}>마이페이지</MenuItem>
            </MenuList>
        </Container>
    );
};

export default Header;

const Container = styled.header`
    width: 100%;
    height: 70px;
    padding: 0 50px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled(Link)`
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    cursor: pointer;
`;

const MenuList = styled.ul`
    display: flex;
    gap: 30px;
    list-style: none;
`;

const MenuItem = styled(Link) <{ active?: boolean }>`
    text-decoration: none;
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ active, theme }) =>
        active ? theme.colors.primary[500] : theme.colors.fontPrimary};
    cursor: pointer;
`;