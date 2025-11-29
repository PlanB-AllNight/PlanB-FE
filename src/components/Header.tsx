import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { pathname } = useLocation();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const checkAndNavigate = (path: string) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            navigate("/login");
            return;
        }
        navigate(path);
    };

    return (
        <Container>
            <Logo to="/">PlanB</Logo>

            <MenuList>
                <MenuItem
                    active={pathname === "/"}
                    onClick={() => navigate("/")}
                >홈</MenuItem>
                <MenuItem
                    active={pathname.startsWith("/analysis") || pathname.startsWith("/budget")}
                    onClick={() => checkAndNavigate("/analysis")}
                >
                    소비분석
                </MenuItem>
                <MenuItem
                    active={pathname === "/simulate" || pathname === "/result"}
                    onClick={() => checkAndNavigate("/simulate")}
                >
                    시뮬레이션
                </MenuItem>
                <MenuItem
                    active={pathname === "/support"}
                    onClick={() => checkAndNavigate("/support")}
                >지원정보/상담</MenuItem>

                {isLoggedIn ? (
                    <MenuItem
                        active={pathname === "/mypage"}
                        onClick={() => navigate("/mypage")}
                    >마이페이지</MenuItem>
                ) : (
                    <MenuItem
                        active={pathname === "/signup"}
                        onClick={() => navigate("/signup")}
                    >회원가입</MenuItem>
                )}
            </MenuList>
        </Container>
    );
};

export default Header;

const Container = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    height: 53px;
    padding: 0 50px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Logo = styled(Link)`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    cursor: pointer;
`;

const MenuList = styled.ul`
    display: flex;
    gap: 25px;
    list-style: none;
`;

const MenuItem = styled.div <{ active?: boolean }>`
    text-decoration: none;
    font-size: 1.7rem;
    font-weight: ${({ active, theme }) =>
        active ? theme.font.weight.bold : theme.font.weight.medium};
    color: ${({ active, theme }) =>
        active ? theme.colors.primary[500] : theme.colors.fontPrimary};
    cursor: pointer;
`;