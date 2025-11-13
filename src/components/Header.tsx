import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();

    return (
        <Container>
            <Logo>PlanB</Logo>

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

const Logo = styled.div`
    font-size: 30px;
    font-weight: 700;
`;

const MenuList = styled.ul`
    display: flex;
    gap: 30px;
    list-style: none;
`;

const MenuItem = styled(Link) <{ active?: boolean }>`
    text-decoration: none;
    font-size: 20px;
    font-weight: 500;
    color: ${({ active, theme }) =>
        active ? theme.colors.primary[500] : theme.colors.fontPrimary};
    cursor: pointer;
`;