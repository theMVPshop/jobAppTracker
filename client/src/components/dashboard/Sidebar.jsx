import styled from "styled-components";
import UploadResume from "./UploadResume";
import { useEffect, useState } from "react";
import { Icon } from "@blueprintjs/core";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarWrapper>
      <Tab>
        <div onClick={handleClick}>
          {!isCollapsed && <StyledTab icon="caret-left" size={25} />}
          {isCollapsed && <StyledTab icon="caret-right" size={25} />}
        </div>
      </Tab>

      <SidebarContent className={isCollapsed ? "collapsed" : "expanded"}>
        {!isCollapsed && <UploadResume />}
        {isCollapsed && (
          <StyledIcon onClick={handleClick} icon="document" size={35} />
          
        )}
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.colors.gray2};
  border-right: 1px solid ${(props) => props.theme.colors.gray2};
  background-color: white;
  height: calc(100vh - 60px);

  .collapsed {
    width: 54px;
    margin: 35px 0;
  }
  .expanded {
    width: 200px;
    margin: 38px 17px;
    @media only screen and (max-width: 700px) {
      width: calc(100vw - 35px);
    }
  }
`;

const SidebarContent = styled.div`
  margin: 0 10px;
  justify-content: flex;
`;

const Tab = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
  button {
    width: fit-content;
  }
`;

const StyledTab = styled(Icon)`
  fill: ${(props) => props.theme.colors.gray2};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.colors.primaryBlue};
  }
`;

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primaryBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
  border-radius: ${(props) => props.theme.other.borderRadius};
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.colors.secondaryBlue};
    background-color: ${(props) => props.theme.colors.gray1};
  }
`;
