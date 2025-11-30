import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";

const Header = () => {
    const { pathname } = useLocation();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const checkAndNavigate = (path: string) => {
        if (!isLoggedIn) {
            // alert("로그인 후 이용 가능합니다.");
            navigate("/login", { state: { from: path } });
            return;
        }
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("로그아웃 실패:", err);
        } finally {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            alert("로그아웃 되었습니다.");
        }
    }

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
                    <DropdownWrapper>
                        <MenuItem
                            active={pathname === "/mypage"}
                            onClick={() => checkAndNavigate("/mypage")}
                        >
                            마이페이지
                        </MenuItem>

                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => checkAndNavigate("/mypage")}

                            >
                                내 정보 확인하기
                            </DropdownItem>
                            <DropdownItem onClick={handleLogout}>
                                로그아웃
                            </DropdownItem>
                        </DropdownMenu>
                    </DropdownWrapper>
                ) : (
                    <MenuItem
                        active={pathname === "/login"}
                        onClick={() => navigate("/login")}
                    >로그인</MenuItem>
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

const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover > div {
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 110%;
    right: 0;
    min-width: 160px;

    background: white;
    border-radius: 10px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    padding: 8px 0;

    opacity: 0;
    visibility: hidden;
    transform: translateY(-5px);
    transition: 0.2s ease;
    z-index: 100;
`;

const DropdownItem = styled.div`
    padding: 12px 16px;
    cursor: pointer;
    font-size: 1.4rem;

    &:hover {
        background-color: #f5f9ff;
    }
`;