import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const NavBarWrapper = styled.div`
  width: auto;
  height: ${({ theme }) => theme.spacing.spacing11};
  background-color: ${({ theme }) => theme.colors.gray.gray00};

  display: flex;
  justify-content: center;
  align-items: center;

  position: sticky;
  top: 0px;
`;

const NavBarBackBtn = styled.button`
  width: ${({ theme }) => theme.spacing.spacing11};
  height: ${({ theme }) => theme.spacing.spacing11};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
  border: none;
  cursor: pointer;

  position: absolute;
  top: ${({ theme }) => theme.spacing.spacing0};
  left: ${({ theme }) => theme.spacing.spacing0};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavBarTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
  cursor: pointer;
`;

const NavBarProfileBtn = styled.button`
  width: ${({ theme }) => theme.spacing.spacing11};
  height: ${({ theme }) => theme.spacing.spacing11};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
  border: none;
  cursor: pointer;

  position: absolute;
  top: ${({ theme }) => theme.spacing.spacing0};
  right: ${({ theme }) => theme.spacing.spacing0};

  display: flex;
  justify-content: center;
  align-items: center;
`;

function NavBar() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleMyClick = () => {
    navigate('/my');
  };

  return (
    <NavBarWrapper>
      <NavBarBackBtn onClick={handleBackClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-left"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </NavBarBackBtn>
      <NavBarTitle onClick={handleHomeClick}>선물하기</NavBarTitle>
      <NavBarProfileBtn onClick={handleMyClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-user-round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 0 0-16 0"></path>
        </svg>
      </NavBarProfileBtn>
    </NavBarWrapper>
  );
}

export default NavBar;
